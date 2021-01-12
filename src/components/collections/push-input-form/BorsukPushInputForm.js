/* eslint-disable no-else-return */
/* eslint-disable consistent-return */
/* eslint-disable radix */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable prefer-object-spread */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-properties */
/* eslint-disable prefer-const */
/* eslint-disable lit/no-template-bind */
/* eslint-disable lit/no-duplicate-template-bindings */
/* eslint-disable lit/no-useless-template-literals */
/* eslint-disable import/no-unresolved */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-console */
/* eslint-disable prefer-template */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable import/order */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-undef */
/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */

import { LitElement, html, css } from 'lit-element';
import { render, nothing } from 'lit-html';
import { BorsukPushInputFormStyle } from './BorsukPushInputFormStyle.js';

import '@polymer/iron-form/iron-form';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-input/paper-textarea';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu';
import '@polymer/paper-item/paper-item';
import '@polymer/paper-listbox/paper-listbox';
import '@polymer/iron-icons/iron-icons';
import '@polymer/paper-icon-button/paper-icon-button';
import '@vaadin/vaadin-grid/vaadin-grid-column';
import '@vaadin/vaadin-grid/vaadin-grid-column-group';
import '@vaadin/vaadin-grid/vaadin-grid';

import '../borsuk-toggle-collapse.js';
import '../../packages/borsuk-button.js';
import '../../borsuk-editor.js';

import { borsukTypographyBold, borsukTypographyItalic, borsukTypographyUnderline, borsukTypographyColor,
    borsukTypographyUndo, borsukTypographyRedo, borsukTypographyAlignLeft, borsukTypographyAlignRight,
    borsukTypographyAlignCenter, borsukTypographyAlignJustify, borsukTypographyListOrdered, borsukTypographyListBullet,
    borsukFormatParagraph, borsukFormatHeader, borsukFormatDiv, borsukSourceHtml, borsukRemove,
    borsukEmbedAttachment, borsukEmbedImage, borsukEmbedParam, borsukNonBreakingSpace,
    borsukMinusSign, borsukPlusSign } from '../../../icons/icons.js';

import  { actions } from '../../../properties/actions.js'

import { events } from '../../../properties/events.js';
import { titles } from '../../../properties/titles.js';

// konektor służący podłączaniu się do store-a
import { connect } from 'pwa-helpers/connect-mixin.js';

// podłączenie do Redux store.
import { store } from '../../../redux/store.js';


// załadowanie kreatorów akcji.
import { changeFormValue, changeChannelActiveFlg, addChanelActionsParam } from '../../../redux/actions/cesuboffer.js';
import { updateActparamsVisible } from '../../../redux/actions/dictionaries.js';

import { getActivePage, getActiveSlot, getActiveChannelTabs, ceChannelSlotsReselector, ceChnActParamsSelector, getChannelContentFlg } from '../../../redux/reducers/cesuboffer.js';
import { dictPushActionSelector, dictPeriodsSelector, dictActionsParamsSelector } from '../../../redux/reducers/dictionaries.js';

export class BorsukPushInputForm extends connect(store)(LitElement) {
    static get styles() {
        return [BorsukPushInputFormStyle];
    }

    render() {
        return html`
            <borsuk-toggle-collapse .opened="${this.contentFlg}" @change-toggle=${this.changeToggle}>
                ${this.formTemplate}
            </borsuk-toggle-collapse>
        `;
    }

    get formTemplate() {
        return html`
            <iron-form id="formPush">
                <div class="formGrid formGrid12">

                    ${Object.keys(this.pushDetails).map((key) => {
                        const i = this.pushDetails[key];
                        return html`
                            <div class="inputGrid inputFrame formSpanGrid12 formMessageBorder formBottomShadow">
                                
                                <borsuk-editor  class="editor-component" 
                                                id="formMessageText"
                                                .listButtons=${this.editorEmbedButtons}
                                                .histButtons=${this.editorHistButtons}
                                                @click=${() => this.openGate()}
                                                @ev-confirm-text-change=${this.editorTextChanged}>
                                </borsuk-editor>
                            </div>

                            <div id="actionsControler" class="inputGrid inputFrame formSpanGrid12  formGrid12 formBorder formBottomShadow">
                                <div id="inputForActions" class="inputGrid formSpanGrid12 inputFormSize90">
                                    <paper-dropdown-menu id="formPushActionName" 
                                                        class="inputFormSize90" 
                                                        label=${titles.get('pushActionGoTo')}
                                                        @iron-select=${() => this.pushActionChanged('formPushAction')}
                                                        @tap=${() => this.openGate()}
                                                        selected-item-label="${i.actionId}"
                                                        error-message=${titles.get('errorMessageLinkField')}>

                                        <paper-listbox id="formPushAction" slot="dropdown-content" selected="${Object.values(this.pushActionDict).findIndex(p => p.id === i.actionId)}">

                                            ${this.pushActionDict ? html`
                                                ${Object.keys(this.pushActionDict).map((subkey) => {
                                                    const j = this.pushActionDict[subkey];
                                                    return html`
                                                        <paper-item>${j.name}</paper-item>
                                                    `})
                                            }` : html`` }

                                        </paper-listbox>
                                    </paper-dropdown-menu>
                                </div>

                                <div id="paramsInputs" class="formSpanGrid12 formGrid12 inputGrid inputFormSize90 inputsNoVisible">
                                    <div id="inputForActionParam" class="inputGrid formSpanGrid5 inputFormSize100">
                                        <paper-dropdown-menu id="formActionParamName" 
                                                            class="inputFormSize100" 
                                                            label="Parametr - nazwa" 
                                                            @iron-activate=${this.onParamsMenuActivate} 
                                                            selected-item-label="{{paramSelected}}"
                                                            error-message=${titles.get('errorMessageLinkField')}>
                                            
                                            <paper-listbox id="formParamAction" slot="dropdown-content">

                                                ${this.actionsParamsDict ? html`
                                                    ${Object.keys(this.actionsParamsDict).map((subkey) => {
                                                        const j = this.actionsParamsDict[subkey];
                                                        return html`
                                                            ${j.visibleFlg ? html`<paper-item>${j.name}</paper-item>` : nothing}
                                                        `})
                                                }` : html`` }

                                            </paper-listbox>

                                        </paper-dropdown-menu>
                                        <!-- <input is="iron-input" name="param" type="hidden" value$="[[paramSelected]]"></input> -->
                                    </div>
                                    <div id="inputForActionValue" class="inputGrid formSpanGrid6 inputFormSize100">
                                        <paper-input
                                            type="text"
                                            label="Parametr - wartość"
                                            class="br-input inputFormSize90"
                                            id="formActionParamValue"
                                            error-message="wartość parametru nie może być pusta"
                                            value="">
                                        </paper-input>
                                    </div>
                                    <div id="buttonForAddAction" class="inputGrid formSpanGrid1 inputFormSize90">

                                        <borsuk-button smicon animate 
                                            id="addActionParamToForm" 
                                            class="btn-icon-animated btn-icon-ing"
                                            @click=${this.addActionToList}>
                                                <borsuk-icon class="btn-icon-leaf" .svg=${borsukPlusSign}></borsuk-icon>
                                        </borsuk-button>
                                        <paper-tooltip position="left" 
                                            class="addTooltip"
                                            id="addActionParamToFormTooltip"
                                            for="addActionParamToForm" 
                                            position="left">Dodaj parametr do listy
                                        </paper-tooltip>

                                    </div>

                                    <vaadin-grid  id="paramsGrid"
                                                class="vaadinParamGrid formSpanGrid12 inputFormSize100"
                                                aria-label="Lista parametrów"
                                                theme="no-border no-row-borders"
                                                size="200"
                                                style="height: 0px;"
                                                .items=${Object.values(this.channelActionsParams).filter(param => param.tabPageId === i.tabPageId)}>

                                        <vaadin-grid-column id="paramName" width="40%" path="paramName" header="Nazwa parametru"></vaadin-grid-column>
                                        <vaadin-grid-column id="paramValue" width="51%" path="paramValue" header="Wartość parametru"></vaadin-grid-column>
                                        <vaadin-grid-column id="paramButton" width="9%" .renderer=${this._removeParamButtonRendererBound} header="Usuń"></vaadin-grid-column>

                                    </vaadin-grid>

                                </div>

                            </div>

                            <div class="inputGrid inputFrame formSpanGrid6 formBorder formBottomShadow">
                                <paper-input
                                    type="text"
                                    label=${titles.get('pushLinkInLabel')}
                                    class="br-input inputFormSize90"
                                    id="formInLink"
                                    error-message=${titles.get('errorMessageLinkField')}
                                    @change=${() => this.pushInputChanged('formInLink')}
                                    value=${i.inLink}>
                                </paper-input>
                            </div>
                            <div class="inputGrid inputFrame formSpanGrid6 formBorder formBottomShadow">
                                <paper-input
                                    type="text"
                                    label=${titles.get('pushLinkOutLabel')}
                                    class="br-input inputFormSize90"
                                    id="formOutLink"
                                    error-message=${titles.get('errorMessageLinkField')}
                                    @change=${() => this.pushInputChanged('formOutLink')}
                                    value=${i.outLink}>
                                </paper-input>
                            </div>

                            <div class="inputGrid inputFrame formSpanGrid4 formBorder formBottomShadow">
                                <paper-dropdown-menu id="formSendPeriodName" 
                                                    class="inputFormSize90" 
                                                    label=${titles.get('sendPeriodLabel')} 
                                                    @iron-select=${() => this.periodsChanged('formSendPeriod')}
                                                    @tap=${() => this.openGate()}
                                                    selected-item-label=${i.sendPeriodId} 
                                                    required
                                                    error-message=${titles.get('errorMessageRequiredField')}>

                                    <paper-listbox id="formSendPeriod" slot="dropdown-content" selected="${Object.values(this.periodsDict).findIndex(p => p.id === i.sendPeriodId)}">

                                        ${this.periodsDict ? html`
                                            ${Object.keys(this.periodsDict).map((subkey) => {
                                                const j = this.periodsDict[subkey];
                                                return html`
                                                    <paper-item>${j.name}</paper-item>
                                                `})
                                        }` : html`` }

                                    </paper-listbox>

                                </paper-dropdown-menu>
                            </div>

                            <div class="inputGrid inputFrame formSpanGrid8 formGrid8 formBorder formBottomShadow">
                                <paper-input
                                    label=${titles.get('sendFromLabel')}
                                    value=${i.sendFrom}
                                    id="formSendFrom"
                                    class="br-input inputFormSize90 formSpanGrid4"
                                    clear-button-visible
                                    @change=${this.timeValidate}
                                    maxlength=2
                                    allowed-pattern=${titles.get('timeAllowedPattern')}
                                    pattern=${titles.get('timePattern')}
                                    error-message=${titles.get('errorMessageRequiredTime')}
                                    required>
                                </paper-input>

                                <paper-input
                                    label=${titles.get('sendToLabel')}
                                    value=${i.sendTo}
                                    id="formSendTo"
                                    class="br-input inputFormSize90 formSpanGrid4"
                                    clear-button-visible
                                    @change=${this.timeValidate}
                                    maxlength=2
                                    allowed-pattern=${titles.get('timeAllowedPattern')}
                                    pattern=${titles.get('timePattern')}
                                    error-message=${titles.get('errorMessageRequiredTime')}
                                    required>
                                </paper-input>
                            </div>
                        `})}    
                </div>

            </iron-form>
        `;
    }

    static get properties() {
        return {
            active: { type: Boolean },
            contentFlg: { type: Boolean },
            _page: { type: String },
            _subpage: { type: String },
            _subslot: { type: String },
            pushDetails: { type: Object },
            channelActionsParams: { type: Object },
            periodsDict: { type: Array },
            pushActionDict: { type: Array },
            actionsParamsDict: { type: Array },
            editorEmbedButtons: { type: Array },
            editorHistButtons: { type: Array },
            gateState: { type: Boolean }
        };
    }

    constructor() {
        super();
        this.periodsDict = [];
        this.pushActionDict = [];
        this.periodSelected = null;
        this.actionSelected = null;
        this.pushDetails = [];
        this.channelActionsParams = [];
        this.actionsDict = [];
        this.actionsParamsDict = [];
        this.paramsToItems = [];
        this.contentFlg = false;
        this.gateState = false;

        this._removeParamButtonRendererBound = this.removeParamButtonRenderer.bind(this);

        this.editorHistButtons = [{
            buttonId: actions.get('textUndoAction'),  // definicja z actions
            buttonTooltip: 'Cofnij',
            buttonIcon: borsukTypographyUndo,
            buttonActive: true,
            buttonPressed: false
        },{
            buttonId: actions.get('textRedoAction'),
            buttonTooltip: 'Ponów',
            buttonIcon: borsukTypographyRedo,
            buttonActive: true,
            buttonPressed: false
        }];

        this.editorEmbedButtons = [{
            buttonId: actions.get('embedParamAction'),
            buttonTooltip: 'Parametr Inbound',
            buttonIcon: borsukEmbedParam,
            buttonActive: true,
            buttonPressed: false
        }];
    }

    firstUpdated() {

        this.renderParamsGrid(Object.values(this.channelActionsParams).filter(param => param.tabPageId === this._subpage));

        this.formSendPeriodEl.addEventListener('value-changed', function (e) {
            this.pushDetails.sendPeriod = e.detail.value;
        }.bind(this), false);
    }

    shouldUpdate() {
        return this.active;
    }

    updated(changedProps) {
        changedProps.forEach((oldValue, propName) => {
            console.log(`${propName} changed. oldValue: ${oldValue}`);
          });

        if (changedProps.has('_subpage') || changedProps.has('channelActionsParams')) {
            this.renderParamsGrid(Object.values(this.channelActionsParams).filter(param => param.tabPageId === this._subpage));
        }

        if (changedProps.has('_page')) {
            this.gateState = false;
            this.clearValidateStatus();
        }
    }

    stateChanged(state) {
        if (this.pushActionDict !== dictPushActionSelector(state)) { this.pushActionDict = dictPushActionSelector(state); }
        if (this.periodsDict !== dictPeriodsSelector(state)) { this.periodsDict = dictPeriodsSelector(state); }
        if (this.actionsParamsDict !== dictActionsParamsSelector(state)) { this.actionsParamsDict = dictActionsParamsSelector(state); }

        this._page = getActivePage(state);
        this._slot = getActiveSlot(state);

        if (this._slot === 'S02') {
            this._subpage = Object.values(getActiveChannelTabs(state)).filter(key => key.parentPageId === this._page)[0].tabPageId;
            this._subslot = Object.values(getActiveChannelTabs(state)).filter(key => key.parentPageId === this._page)[0].tabSlotId;

            if (this.contentFlg !== getChannelContentFlg(state)) { this.contentFlg = getChannelContentFlg(state); }
            if (this.pushDetails !== ceChannelSlotsReselector(state)) { this.pushDetails = ceChannelSlotsReselector(state); }
            if (this.channelActionsParams !== ceChnActParamsSelector(state)) { 
                this.channelActionsParams = ceChnActParamsSelector(state); 
                // this.renderParamsGrid(Object.values(this.channelActionsParams).filter(param => param.tabPageId === this._subpage));
            }

        }
        
    }

    editorTextChanged(event) {
        if (this.shadowRoot.getElementById("formMessageText").getText().trim().length > 0) {
            this.shadowRoot.getElementById("formMessageText").removeAttribute("error");
            store.dispatch(changeFormValue(this._page, 'editor'+((this.gateState)?'Change':'Insert'), event.detail.textChanged, this._subpage));
        } else {
            this.shadowRoot.getElementById("formMessageText").setAttribute("error", "");
        }
    }

    removeParamButtonRenderer(root, column, rowData) {
        render(
            html`
                <borsuk-button smicon animate 
                    id=${"actionRemoveButton_" + rowData.item.paramId} 
                    class="btn-icon-animated btn-icon-ing"
                    @click=${this._removeActionsParam.bind(this, rowData.item)}>
                        <borsuk-icon class="btn-icon-leaf" .svg=${borsukMinusSign}></borsuk-icon>
                </borsuk-button>
                <paper-tooltip position="left" 
                    class="addTooltip"
                    id=${"actionRemoveButtonTooltip_" + rowData.item.paramId} 
                    for=${"actionRemoveButton_" + rowData.item.paramId}  
                    position="left">Usuń parametr z listy</paper-tooltip>
            `,
            root
        );
    }

    _removeActionsParam(item) {
        let newActionsParams = Object.values(this.channelActionsParams);
        for (let i=0; i < Object.values(newActionsParams).length; i++) {
            if (newActionsParams[i].paramId === item.paramId && newActionsParams[i].tabPageId === item.tabPageId) {
                newActionsParams.splice(i, 1);
            }
        }

        store.dispatch(addChanelActionsParam(newActionsParams));
        
        // na koniec reset
        setTimeout(() => {
            this.renderParamsGrid(Object.values(this.channelActionsParams).filter(param => param.tabPageId === this._subpage));
        }, 200); 
    }

    renderParamsGrid(actionsParams) {

        for (let i = 0; i < Object.values(this.actionsParamsDict).length; i++) {
            store.dispatch(updateActparamsVisible(Object.values(this.actionsParamsDict)[i].id, true));
        }

        // let gridHeight = ((actionsParams.length > 1) ? ((actionsParams.length * 70) - (Math.pow(actionsParams.length, 2))) : (actionsParams.length * 80));
        let gridHeight = ((actionsParams.length > 1) ? (actionsParams.length * 85) : (actionsParams.length * 120));
        this.shadowRoot.getElementById("paramsGrid").setAttribute("style", "height: "+gridHeight+"px;");

        for (let i = 0; i < actionsParams.length; i++) {
            for (let j = 0; j < Object.values(this.actionsParamsDict).length; j++) {
                if (actionsParams[i].paramId === Object.values(this.actionsParamsDict)[j].id) {
                    store.dispatch(updateActparamsVisible(actionsParams[i].paramId, false));
                }
            }
        }
    }

    pushInputChanged(param) {
        store.dispatch(changeFormValue(this._page, param, this.shadowRoot.getElementById(param).value, this._subpage));
    }

    openGate() {
        this.gateState = true;
    }

    pushActionChanged(param) {
        console.log(this.pushActionDict[this.shadowRoot.getElementById(param).selected]);
        console.log(this.pushActionDict[this.shadowRoot.getElementById(param).selected].id);

        if (this.pushActionDict[this.shadowRoot.getElementById(param).selected].index > 0) {
            this.shadowRoot.getElementById('paramsInputs').removeAttribute("class");
            this.shadowRoot.getElementById('paramsInputs').setAttribute("class", "formSpanGrid12 formGrid12 inputGrid inputFormSize90 inputsVisible");
            this.shadowRoot.getElementById('actionsControler').removeAttribute("class");
            this.shadowRoot.getElementById('actionsControler').setAttribute("class", "inputGrid inputFrame formSpanGrid12 formGrid12 formMessBorder formBottomShadow");
        } else {
            this.shadowRoot.getElementById('paramsInputs').removeAttribute("class");
            this.shadowRoot.getElementById('paramsInputs').setAttribute("class", "formSpanGrid12 formGrid12 inputGrid inputFormSize90 inputsNoVisible");
            this.shadowRoot.getElementById('actionsControler').removeAttribute("class");
            this.shadowRoot.getElementById('actionsControler').setAttribute("class", "inputGrid inputFrame formSpanGrid12 formGrid12 formBorder formBottomShadow");
        }

        store.dispatch(changeFormValue(this._page, param+((this.gateState)?'Change':'Insert'), this.pushActionDict[this.shadowRoot.getElementById(param).selected].id, this._subpage));        
        this.gateState = false;
    }

    addActionToList() {
        let maxIndex = 0;
        for (let i=0; i < Object.values(this.channelActionsParams).length; i++) {
            maxIndex = (Object.values(this.channelActionsParams)[i].index > maxIndex) ? Object.values(this.channelActionsParams)[i].index : maxIndex;
        }

        let assinedActionsParams = Object.values(this.channelActionsParams);
        assinedActionsParams.push({
            "tabPageId": this._subpage,
            "parentPageId": this._page, 
            "tabSlotId": this._subslot,
            "paramId": this.actionsParamsDict[Object.values(this.actionsParamsDict).findIndex(p => p.name === this.shadowRoot.getElementById('formActionParamName').value)].id,
            "paramName": this.actionsParamsDict[Object.values(this.actionsParamsDict).findIndex(p => p.name === this.shadowRoot.getElementById('formActionParamName').value)].name,
            "paramValue": this.shadowRoot.getElementById('formActionParamValue').value,
            "index": maxIndex + 1
        });

        store.dispatch(addChanelActionsParam(assinedActionsParams));
        
        // na koniec reset
        this.shadowRoot.getElementById('formActionParamName').contentElement.set('selected', null);
        this.shadowRoot.getElementById('formActionParamValue').value = '';
        setTimeout(() => {
            this.renderParamsGrid(Object.values(this.channelActionsParams).filter(param => param.tabPageId === this._subpage));
        }, 200); 
        
    }

    periodsChanged(param) {
        store.dispatch(changeFormValue(this._page, param+((this.gateState)?'Change':'Insert'), this.periodsDict[this.shadowRoot.getElementById(param).selected].id, this._subpage));        
        this.gateState = false;
    }
 
    timeValidate() {
        this.shadowRoot.getElementById("formSendFrom").validate();
        this.shadowRoot.getElementById("formSendTo").validate();

        if (parseInt(this.shadowRoot.getElementById("formSendFrom").value) >= parseInt(this.shadowRoot.getElementById("formSendTo").value)) {
            this.shadowRoot.getElementById("formSendFrom").setAttribute('error-message', titles.get('errorMessageWrongTime'));
            this.shadowRoot.getElementById("formSendTo").setAttribute('error-message', titles.get('errorMessageWrongTime'));
            this.shadowRoot.getElementById("formSendFrom").invalid = true;
            this.shadowRoot.getElementById("formSendTo").invalid = true;
        }

        store.dispatch(changeFormValue(this._page, "formSendFrom", this.shadowRoot.getElementById("formSendFrom").value, this._subpage));
        store.dispatch(changeFormValue(this._page, "formSendTo", this.shadowRoot.getElementById("formSendTo").value, this._subpage));

    }
 
    validateLinksAndActions() {
       return ((this.formOutLinkEl.value) ? 1 : 0) + ((this.formInLinkEl.value) ? 1 : 0);
    }

    changeToggle(event) {
        store.dispatch(changeChannelActiveFlg(this._subpage, event.detail.activeFlg));
    }

    clearValidateStatus() {
        this.shadowRoot.getElementById("formSendFrom").invalid = false;
        this.shadowRoot.getElementById("formSendTo").invalid = false;
        this.shadowRoot.getElementById("formInLink").invalid = false;
        this.shadowRoot.getElementById("formOutLink").invalid = false;
        this.shadowRoot.getElementById("formPushActionName").invalid = false;
    }
        
    validateForm(page) {
        if (page === this._page) {

            // _________ walidacja dat wysylki
            this.shadowRoot.getElementById("formSendFrom").validate();
            this.shadowRoot.getElementById("formSendTo").validate();

            if (parseInt(this.shadowRoot.getElementById("formSendFrom").value) >= parseInt(this.shadowRoot.getElementById("formSendTo").value)) {
                this.shadowRoot.getElementById("formSendFrom").setAttribute('error-message', titles.get('errorMessageWrongTime'));
                this.shadowRoot.getElementById("formSendTo").setAttribute('error-message', titles.get('errorMessageWrongTime'));
                this.shadowRoot.getElementById("formSendFrom").invalid = true;
                this.shadowRoot.getElementById("formSendTo").invalid = true;
            }

            // __________ walidacja akcji GOTO i linkow
            let formInLink = this.shadowRoot.getElementById("formInLink");
            let formOutLink = this.shadowRoot.getElementById("formOutLink");
            let formActionMenu = this.shadowRoot.getElementById("formPushActionName");
            let actionSelected = this.pushActionDict[this.shadowRoot.getElementById('formPushAction').selected].id;

            let validateActionFlg = (
                ((formOutLink.value) ? 1 : 0) + ((formInLink.value) ? 1 : 0) + ((actionSelected !== '-1') ? 1 : 0)
            );

            if (validateActionFlg > 1) {
                formActionMenu.invalid = true;
                formInLink.invalid = true;
                formOutLink.invalid = true;
            } else {
                formActionMenu.invalid = false;
                formInLink.invalid = false;
                formOutLink.invalid = false;
            }

            // _________ walidacja tresci wiadomosci
            let invalidEditor = false;

            if (this.shadowRoot.getElementById("formMessageText").getText().trim().length > 0) {
                this.shadowRoot.getElementById("formMessageText").removeAttribute("error");
                invalidEditor = false;
            } else {
                this.shadowRoot.getElementById("formMessageText").setAttribute("error", "");
                invalidEditor = true;
            }

            // _________ informacja zwrotna do komponentu rodzica
            if (this.shadowRoot.getElementById("formSendFrom").invalid === false &&
                this.shadowRoot.getElementById("formSendTo").invalid === false &&
                formActionMenu.invalid === false &&
                formInLink.invalid === false &&
                formOutLink.invalid === false &&
                invalidEditor === false) {
                    return true;
                } else {
                    return false;
                }
        }
    }
}
