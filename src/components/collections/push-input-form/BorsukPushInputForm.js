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
import { render } from 'lit-html';
import { BorsukPushInputFormStyle } from './BorsukPushInputFormStyle.js';
import '@polymer/iron-form/iron-form';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-input/paper-textarea';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu';
import '@polymer/paper-item/paper-item';
import '@polymer/paper-listbox/paper-listbox';
import '@polymer/iron-icons/iron-icons';
import '@polymer/paper-icon-button/paper-icon-button';

import '../borsuk-toggle-collapse.js';
import '../../packages/borsuk-button.js';

import { events } from '../../../properties/events.js';
import { titles } from '../../../properties/titles.js';

// import { borsukPlusSign, borsukMinusSign } from '../../../icons/icons.js';

// konektor służący podłączaniu się do store-a
import { connect } from 'pwa-helpers/connect-mixin.js';

// podłączenie do Redux store.
import { store } from '../../../redux/store.js';


// załadowanie kreatorów akcji.
import { changeFormValue, changeChannelActiveFlg } from '../../../redux/actions/cesuboffer.js';

import { getActivePage, getActiveSlot, getActiveChannelTabs, ceChannelSlotsReselector, getActiveChannelPage, getChannelContentFlg } from '../../../redux/reducers/cesuboffer.js';
import { dictPushActionSelector, dictPeriodsSelector } from '../../../redux/reducers/dictionaries.js';

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
                            <div class="inputGrid inputFrame formSpanGrid12 formBorder formBottomShadow">
                                <paper-input
                                    label=${titles.get('pushContentLabel')}
                                    rows=4
                                    class="br-input inputFormSize90"
                                    id="formMessageText"
                                    @change=${() => this.pushInputChanged('formMessageText')}
                                    value=${i.content}
                                    required
                                    char-counter
                                    maxlength=160
                                    error-message="">
                                </paper-input>
                            </div>
                            <div class="inputGrid inputFrame formSpanGrid12 formBorder formBottomShadow">
                                <paper-dropdown-menu id="formPushActionName" 
                                                    class="inputFormSize90" 
                                                    label=${titles.get('pushActionGoTo')}
                                                    @iron-select=${() => this.pushActionChanged('formPushAction')}
                                                    selected-item-label="${i.actionId}"
                                                    error-message="parametr nie został wybrany lub jest już na liście dodanych">

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
                                    @change=${() => this.startTimeValidate('formSendFrom')}
                                    auto-validate
                                    allowed-pattern="[0-9]"
                                    pattern="^([0-9]|0[0-9]|1[0-9]|2[0-3])$"
                                    error-message="wprować wartość od 0 do 23"
                                    required>
                                </paper-input>

                                <paper-input
                                    label=${titles.get('sendToLabel')}
                                    value=${i.sendTo}
                                    id="formSendTo"
                                    class="br-input inputFormSize90 formSpanGrid4"
                                    clear-button-visible
                                    @change=${() => this.endTimeValidate('formSendTo')}
                                    allowed-pattern="[0-9]"
                                    pattern="^([0-9]|0[0-9]|1[0-9]|2[0-3])$"
                                    error-message="wprować wartość od 0 do 23"
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
            _subslot: { type: String },
            pushDetails: { type: Object },
            periodsDict: { type: Array },
            pushActionDict: { type: Array }
        };
    }

    constructor() {
        super();
        this.periodsDict = [];
        this.pushActionDict = [];
        this.periodSelected = null;
        this.actionSelected = null;
        this.pushDetails = [];
        this.actionsDict = [];
        this.actionParamsDict = [];
        this.paramsToItems = [];
        this.contentFlg = false;
    }

    firstUpdated() {
        this.formSendPeriodEl.addEventListener('value-changed', function (e) {
            this.pushDetails.sendPeriod = e.detail.value;
        }.bind(this), false);
    }

    shouldUpdate() {
        return this.active;
    }

    stateChanged(state) {
        if (this.pushActionDict !== dictPushActionSelector(state)) { this.pushActionDict = dictPushActionSelector(state); }
        if (this.periodsDict !== dictPeriodsSelector(state)) { this.periodsDict = dictPeriodsSelector(state); }

        this._page = getActivePage(state);
        this._slot = getActiveSlot(state);

        if (this._slot === 'S02') {
            if (this.contentFlg !== getChannelContentFlg(state)) { this.contentFlg = getChannelContentFlg(state); }
            if (this.pushDetails !== ceChannelSlotsReselector(state)) { this.pushDetails = ceChannelSlotsReselector(state); }
            this._subpage = Object.values(getActiveChannelTabs(state)).filter(key => key.parentPageId === this._page)[0].tabPageId;
            this._subslot = Object.values(getActiveChannelTabs(state)).filter(key => key.parentPageId === this._page)[0].tabSlotId;
        }
        
    }

    pushInputChanged(param) {
        store.dispatch(changeFormValue(this._subpage, param, this.shadowRoot.getElementById(param).value));
    }

    pushActionChanged(param) {
        store.dispatch(changeFormValue(this._subpage, param, this.pushActionDict[this.shadowRoot.getElementById(param).selected].id));
    }

    periodsChanged(param) {
        store.dispatch(changeFormValue(this._subpage, param, this.periodsDict[this.shadowRoot.getElementById(param).selected].id));
    }
 
    startTimeValidate(param) {
        if (this.shadowRoot.getElementById(param).value >=0 && this.shadowRoot.getElementById(param).value <= 23) {
            store.dispatch(changeFormValue(this._subpage, param, this.shadowRoot.getElementById(param).value));
        } else {
            console.log('BLAD');
        }
    }
 
    endTimeValidate(param) {
        if (this.shadowRoot.getElementById(param).value >=0 && this.shadowRoot.getElementById(param).value <= 23) {
            store.dispatch(changeFormValue(this._subpage, param, this.shadowRoot.getElementById(param).value));
        } else {
            console.log('BLAD');
        }
    }
 
    validateLinksAndActions() {
       return ((this.formOutLinkEl.value) ? 1 : 0) + ((this.formInLinkEl.value) ? 1 : 0);
    }

    changeToggle(event) {
        store.dispatch(changeChannelActiveFlg(this._subpage, event.detail.activeFlg));
    }
}
