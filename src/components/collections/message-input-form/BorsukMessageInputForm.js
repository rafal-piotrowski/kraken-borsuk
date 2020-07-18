/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable prefer-template */
/* eslint-disable import/no-useless-path-segments */
/* eslint-disable import/order */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-undef */
/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */

import { LitElement, html, css } from 'lit-element';
import { BorsukMessageInputFormStyle } from './BorsukMessageInputFormStyle.js';
import '@polymer/iron-form/iron-form';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu';
import '@polymer/paper-item/paper-item';
import '@polymer/paper-listbox/paper-listbox';
import '../../packages/borsuk-button.js';
import '../../collections/borsuk-events-modal.js';
import '../../borsuk-editor.js';

import { borsukTypographyBold, borsukTypographyItalic, borsukTypographyUnderline, borsukTypographyColor,
    borsukTypographyUndo, borsukTypographyRedo, borsukTypographyAlignLeft, borsukTypographyAlignRight,
    borsukTypographyAlignCenter, borsukTypographyAlignJustify, borsukTypographyListOrdered, borsukTypographyListBullet,
    borsukFormatParagraph, borsukFormatHeader, borsukFormatDiv, borsukSourceHtml, borsukRemove,
    borsukEmbedAttachment, borsukEmbedImage, borsukEmbedParam, borsukNonBreakingSpace } from '../../../icons/icons.js';

import  { actions } from '../../../properties/actions.js'

import { events } from '../../../properties/events.js';
import { titles } from '../../../properties/titles.js';
import { tooltips } from '../../../properties/tooltips.js';
// import { borsukRemove } from '../../../icons/icons.js';

// konektor służący podłączaniu się do store-a
import { connect } from 'pwa-helpers/connect-mixin.js';

// podłączenie do Redux store.
import { store } from '../../../redux/store.js';

// załadowanie kreatorów akcji.
import { changeFormValue, changeChannelActiveFlg } from '../../../redux/actions/cesuboffer.js';

import { getActivePage, getActiveSlot, getActiveChannelTabs, ceChannelSlotsReselector, getChannelContentFlg } from '../../../redux/reducers/cesuboffer.js';
import { dictEventsSelector, dictMessageGroupSelector } from '../../../redux/reducers/dictionaries.js';

export class BorsukMessageInputForm extends connect(store)(LitElement) {
    static get styles() {
        return [BorsukMessageInputFormStyle];
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
            <iron-form id="formMessage">
                <!-- <form> -->
                    <div class="formGrid formGrid12">
                        ${Object.keys(this.messageDetails).map((key) => {
                            const i = this.messageDetails[key];
                            return html`
                                <div class="inputGrid inputFrame formSpanGrid12 formBorder formBottomShadow">
                                    <paper-input
                                        type="text"
                                        label=${titles.get('messageTitleLabel')}
                                        id="formMessageTitle"
                                        class="br-input inputFormSize90"
                                        required
                                        value=${i.title}
                                        @change=${() => this.messageInputChanged('formMessageTitle')}
                                        char-counter
                                        maxlength=50
                                        error-message=${titles.get('messageTitleError')}
                                        allowed-pattern=${this.titleAllowedPattern}
                                        pattern=${this.titlePattern}>
                                    </paper-input>
                                </div>
 
                            <div class="inputGrid inputFrame formSpanGrid6 formBorder formBottomShadow">

                                <paper-dropdown-menu id="formMesagesGroupName" 
                                                    class="inputFormSize90" 
                                                    label=${titles.get('messageGroupLabel')} 
                                                    @iron-select=${() => this.messageGroupChanged('formMesagesGroup')}
                                                    selected-item-label=${i.groupId} required
                                                    error-message=${titles.get('errorMessageRequiredField')}>
                                    <paper-listbox id="formMesagesGroup" slot="dropdown-content" selected="${Object.values(this.messageGroupDict).findIndex(p => p.id === i.groupId)}">
                                        
                                        ${this.messageGroupDict ? html`
                                            ${Object.keys(this.messageGroupDict).map((subkey) => {
                                                const j = this.messageGroupDict[subkey];
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
                                    label=${titles.get('messageExpireTimeLabel')}
                                    id="formMessageExpireTime"
                                    class="br-input inputFormSize90"
                                    value=${i.expire}
                                    @change=${() => this.messageInputChanged('formMessageExpireTime')}
                                    char-counter
                                    maxlength=4
                                    error-message=${titles.get('messageExpireTimeError')}
                                    allowed-pattern="[0-9]"
                                    pattern="^[0-9]{0,4}">
                                </paper-input>
                            </div>
 
                            <div class="inputGrid inputFrame formGrid formGrid12 formSpanGrid12 formBorder formBottomShadow">

                                <paper-input
                                    type="text"
                                    label=${titles.get('messageEventLabel')}
                                    id="eventId"
                                    class="br-input inputFormSize90 formSpanGrid11"
                                    allowed-pattern="[]"
                                    @focus="${this.chooseEventFromDict}"
                                    error-message=${titles.get('errorMessageRequiredField')}
                                    value="${(i.eventId) ? this.eventsDict[Object.values(this.eventsDict).findIndex(p => p.id === i.eventId)].name : ''}">
                                </paper-input>

                                <borsuk-button smicon animate id="eventRemoveButton" class="inputGrid formSpanGrid1 inputFormSize90 btn-icon-animated btn-icon-ing" @click="${this.eventRemove}">
                                    <borsuk-icon .svg=${borsukRemove}></borsuk-icon>
                                </borsuk-button>
                                <paper-tooltip  id="eventRemoveButton-tooltip" for="eventRemoveButton">${tooltips.get('removeMessageEventTooltip')}</paper-tooltip>
                            </div>

                            <div class="inputGrid inputFrame formSpanGrid12 formMessageBorder formBottomShadow">
                                <borsuk-editor  class="editor-component" 
                                                .sourceButtons=${this.editorSourceButtons}
                                                .embedButtons=${this.editorEmbedButtons}
                                                .formatButtons=${this.editorFormatButtons}
                                                .listButtons=${this.editorListButtons}
                                                .alignButtons=${this.editorAlignButtons}
                                                .typoButtons=${this.editorTypoButtons}
                                                .histButtons=${this.editorHistButtons}
                                                @ev-confirm-text-change=${this.editorTextChanged}>
                                </borsuk-editor>
                            </div>
                        `})}
                    </div>
                <!-- </form> -->
 
                <borsuk-events-modal
                    id="eventModal"
                    @ev-confirm-event-chosen=${this.confirmModal}>
                </borsuk-events-modal>
            </iron-form>
        `;
    }

    static get properties() {
        return {
            active: { type: Boolean },
            contentFlg: { type: Boolean },
            _subslot: { type: String },
            messageDetails: { type: Object },
            groupSelected: { type: Object },
            eventsDict: { type: Array },
            messageGroupDict: { type: Array },
            editorSourceButtons: { type: Array },
            editorEmbedButtons: { type: Array },
            editorFormatButtons: { type: Array },
            editorListButtons: { type: Array },
            editorAlignButtons: { type: Array },
            editorTypoButtons: { type: Array },
            editorHistButtons: { type: Array },
        };
    }

    constructor() {
        super();
        this.titleStartPattern = "[a-zA-Z\u0105\u0107\u0119\u0142\u0144\u00F3\u015B\u017A\u017C\u0104\u0106\u0118\u0141\u0143\u00D3\u015A\u0179\u017B]";
        this.titleAllowedPattern = "[0-9a-zA-Z\u0105\u0107\u0119\u0142\u0144\u00F3\u015B\u017A\u017C\u0104\u0106\u0118\u0141\u0143\u00D3\u015A\u0179\u017B_ -]";     
        this.titlePattern = "^" + this.titleStartPattern + "+" + this.titleAllowedPattern + "{3,50}";
        this.messageDetails = {};
        this.eventsDict = [];
        this.messageGroupDict = [];
        this.groupSelected = null;
        this.contentFlg = false;

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

        this.editorTypoButtons = [{
            buttonId: actions.get('textBoldAction'),
            buttonTooltip: 'Pogrubione',
            buttonIcon: borsukTypographyBold,
            buttonActive: true,
            buttonPressed: false
        },{
            buttonId: actions.get('textItalicAction'),
            buttonTooltip: 'Kursywa',
            buttonIcon: borsukTypographyItalic,
            buttonActive: true,
            buttonPressed: false
        },{
            buttonId: actions.get('textUnderlineAction'),
            buttonTooltip: 'Podkreślenie',
            buttonIcon: borsukTypographyUnderline,
            buttonActive: true,
            buttonPressed: false
        },{
            buttonId: actions.get('textColorAction'),
            buttonTooltip: 'Zmień kolor',
            buttonIcon: borsukTypographyColor,
            buttonActive: true,
            buttonPressed: false
        }];

        this.editorAlignButtons = [{
            buttonId: actions.get('textAlignLeftAction'),
            buttonTooltip: 'Do lewej',
            buttonIcon: borsukTypographyAlignLeft,
            buttonActive: true,
            buttonPressed: false
        },{
            buttonId: actions.get('textAlignRightAction'),
            buttonTooltip: 'Do prawej',
            buttonIcon: borsukTypographyAlignRight,
            buttonActive: true,
            buttonPressed: false
        },{
            buttonId: actions.get('textAlignCenterAction'),
            buttonTooltip: 'Wyśrodkuj',
            buttonIcon: borsukTypographyAlignCenter,
            buttonActive: true,
            buttonPressed: false
        },{
            buttonId: actions.get('textAlignJustifyAction'),
            buttonTooltip: 'Wyjustuj',
            buttonIcon: borsukTypographyAlignJustify,
            buttonActive: true,
            buttonPressed: false
        }];

        this.editorListButtons = [{
            buttonId: actions.get('textListOrderedAction'),
            buttonTooltip: 'Numerowanie',
            buttonIcon: borsukTypographyListOrdered,
            buttonActive: true,
            buttonPressed: false
        },{
            buttonId: actions.get('textListBulletAction'),
            buttonTooltip: 'Lista',
            buttonIcon: borsukTypographyListBullet,
            buttonActive: true,
            buttonPressed: false
        }];

        this.editorFormatButtons = [{
            buttonId: actions.get('formatParagraphAction'),
            buttonTooltip: 'Akapit',
            buttonIcon: borsukFormatParagraph,
            buttonActive: true,
            buttonPressed: false
        },{
            buttonId: actions.get('formatHeaderAction'),
            buttonTooltip: 'Nagłówek',
            buttonIcon: borsukFormatHeader,
            buttonActive: true,
            buttonPressed: false
        },{
            buttonId: actions.get('formatDivAction'),
            buttonTooltip: 'Div',
            buttonIcon: borsukFormatDiv,
            buttonActive: true,
            buttonPressed: false
        }];

        this.editorEmbedButtons = [{
            buttonId: actions.get('embedAttachmentAction'),
            buttonTooltip: 'Wstaw link',
            buttonIcon: borsukEmbedAttachment,
            buttonActive: true,
            buttonPressed: false
        },{
            buttonId: actions.get('embedImageAction'),
            buttonTooltip: 'Wstaw obrazek',
            buttonIcon: borsukEmbedImage,
            buttonActive: false,
            buttonPressed: false
        },{
            buttonId: actions.get('embedParamAction'),
            buttonTooltip: 'Parametr Inbound',
            buttonIcon: borsukEmbedParam,
            buttonActive: true,
            buttonPressed: false
        }];

        this.editorSourceButtons = [{
            buttonId: actions.get('nonBreakingSpaceAction'),
            buttonTooltip: 'Twarda spacja (Ctrl+Shift+Space)',
            buttonIcon: borsukNonBreakingSpace,
            buttonActive: true,
            buttonPressed: false
        },{
            buttonId: actions.get('sourceHtmlAction'),
            buttonTooltip: 'Kod źródłowy',
            buttonIcon: borsukSourceHtml,
            buttonActive: false,
            buttonPressed: false
        }];
    }

    firstUpdated() {
        this.formGroupEl.addEventListener('value-changed', function (e) {
            if(e.detail.value) this.messageDetails.messageGroup = this.resolveIndexOfGroupName(e.detail.value);
        }.bind(this), false);
    }

    shouldUpdate() {
        return this.active;
    }

    stateChanged(state) {
        if (this.messageGroupDict !== dictMessageGroupSelector(state)) { this.messageGroupDict = dictMessageGroupSelector(state); }
        if (this.eventsDict !== dictEventsSelector(state)) { this.eventsDict = dictEventsSelector(state); }

        this._page = getActivePage(state);
        this._slot = getActiveSlot(state);

        if (this._slot === 'S02') {
            if (this.contentFlg !== getChannelContentFlg(state)) { this.contentFlg = getChannelContentFlg(state); }
            if (this.messageDetails !== ceChannelSlotsReselector(state)) { this.messageDetails = ceChannelSlotsReselector(state); }
            this._subpage = Object.values(getActiveChannelTabs(state)).filter(key => key.parentPageId === this._page)[0].tabPageId;
            this._subslot = Object.values(getActiveChannelTabs(state)).filter(key => key.parentPageId === this._page)[0].tabSlotId;
        }
        
    }

    editorTextChanged(event) {
        // console.log('___ jestem w input message, subpage to: '+this._subpage);
        // console.log('natomiast zawartosc edytora w postaci json jest następująca: ');
        // console.log(event.detail.textChanged);
        store.dispatch(changeFormValue(this._subpage, 'editor', event.detail.textChanged));
    }

    messageInputChanged(param) {
        store.dispatch(changeFormValue(this._subpage, param, this.shadowRoot.getElementById(param).value));
    }

    messageGroupChanged(param) {
        store.dispatch(changeFormValue(this._subpage, param, this.messageGroupDict[this.shadowRoot.getElementById(param).selected].id));
    }
 
    chooseEventFromDict() {
        this.shadowRoot.getElementById("eventModal").openModal();
    }
 
    confirmModal(event) {
        const chosenEvent = JSON.parse(event.detail.chosenEvent);
        store.dispatch(changeFormValue(this._subpage, 'notificationEventId', chosenEvent.event.id));
    }
 
    eventRemove() {
        store.dispatch(changeFormValue(this._subpage, 'notificationEventId', ''));
    }
 
    submitForm() {
        this.formTitleEl.validate();
        this.formGroupEl.validate();
        this.formExpireTimeEl.validate();
        this.formEventEl.validate();
        if (!this.formTitleEl.invalid && !this.formGroupEl.invalid && !this.formExpireTimeEl.invalid && !this.formEventEl.invalid) {
            this.dispatchEvent(new CustomEvent(events.get('messageFormSubmit'), { detail: { messageDetails: this.messageDetails } }));
            this.form.submit();
        }
    }     

    changeToggle(event) {
        store.dispatch(changeChannelActiveFlg(this._subpage, event.detail.activeFlg));
    }
}
