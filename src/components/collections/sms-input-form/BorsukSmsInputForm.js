/* eslint-disable no-else-return */
/* eslint-disable consistent-return */
/* eslint-disable radix */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-const */
/* eslint-disable prefer-template */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable import/extensions */
/* eslint-disable import/order */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-undef */
/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */

import { LitElement, html, css } from 'lit-element';
import { BorsukSmsInputFormStyle } from './BorsukSmsInputFormStyle.js';
import '@polymer/iron-form/iron-form';
import '@polymer/paper-input/paper-textarea';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu';
import '@polymer/paper-input/paper-input'
import '@polymer/paper-item/paper-item';
import '@polymer/paper-listbox/paper-listbox';

import '../borsuk-toggle-collapse.js';
import '../../packages/borsuk-button.js';

import { events } from '../../../properties/events';
import { titles } from '../../../properties/titles';

// konektor służący podłączaniu się do store-a
import { connect } from 'pwa-helpers/connect-mixin.js';

// podłączenie do Redux store.
import { store } from '../../../redux/store.js';

// załadowanie kreatorów akcji.
import { changeFormValue, changeChannelActiveFlg } from '../../../redux/actions/cesuboffer.js';

import { getActivePage, getActiveSlot, getActiveChannelTabs, ceChannelSlotsReselector, getChannelContentFlg } from '../../../redux/reducers/cesuboffer.js';
import { dictPhoneTypeSelector, dictPeriodsSelector } from '../../../redux/reducers/dictionaries.js';

export class BorsukSmsInputForm extends connect(store)(LitElement) {
    static get styles() {
        return [BorsukSmsInputFormStyle];
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
            <iron-form id="formSms">
                <!-- <form> -->
                <div class="formGrid formGrid12">
                    ${Object.keys(this.smsDetails).map((key) => {
                        const i = this.smsDetails[key];
                        return html`
                            <div class="inputGrid inputFrame formSpanGrid12 formBorder formBottomShadow">
                                <paper-input
                                    label=${titles.get('smsContentLabel')}
                                    rows=4
                                    class="br-input inputFormSize90"
                                    id="formMessageText"
                                    value=${i.content}
                                    required
                                    char-counter
                                    maxlength=160
                                    @change=${() => this.smsInputChanged('formMessageText')}
                                    @input=${this.smsTextChange}
                                    error-message=${titles.get('errorMessageEmptyText')}>
                                </paper-input>
                            </div>

                            <div class="inputGrid inputFrame formSpanGrid6 formBorder formBottomShadow">
                                <paper-dropdown-menu id="formPhoneTypeName" 
                                                    class="inputFormSize90" 
                                                    label=${titles.get('phoneTypeLabel')} 
                                                    @iron-select=${() => this.smsPhoneTypeChanged('formPhoneType')}
                                                    @tap=${() => this.openGate()}
                                                    selected-item-label=${i.phoneTypeId} required
                                                    error-message=${titles.get('errorMessageRequiredField')}>
                                    <paper-listbox id="formPhoneType" slot="dropdown-content" selected="${Object.values(this.phoneTypeDict).findIndex(p => p.id === i.phoneTypeId)}">
                                        
                                        ${this.phoneTypeDict ? html`
                                            ${Object.keys(this.phoneTypeDict).map((subkey) => {
                                                const j = this.phoneTypeDict[subkey];
                                                return html`
                                                    <paper-item>${j.name}</paper-item>
                                                `})
                                        }` : html`` }

                                    </paper-listbox>
                                </paper-dropdown-menu>
                            </div>

                            <div class="inputGrid inputFrame formSpanGrid6 formBorder formBottomShadow">
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

                            <div class="inputGrid formSpanGrid2"></div>
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
                            <div class="inputGrid formSpanGrid2"></div>
                    `})}
                </div>
                <!-- </form> -->

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
            smsDetails: { type: Object },
            phoneTypeDict: { type: Array },
            periodsDict: { type: Array },
            gateState: { type: Boolean }
        };
    }

    constructor() {
        super();
        this.phoneTypeDict = [];
        this.periodsDict = [];
        this.smsDetails = {};
        this.contentFlg = false;
        this.gateState = false;
    }

    firstUpdated() {
        // this.formPhoneTypeEl.addEventListener('value-changed', function (e) {
        //     if(e.detail.value) this.smsDetails.phoneType = this.resolveIndexOfPhoneTypeName(e.detail.value);
        // }.bind(this), false);
       
        // this.formSendPeriodEl.addEventListener('value-changed', function (e) {
        //     this.smsDetails.sendPeriod = e.detail.value;
        // }.bind(this), false);
    }

    shouldUpdate() {
        return this.active;
    }

    updated(changedProps) {
        if (changedProps.has('_page')) {
            this.gateState = false;
            this.clearValidateStatus();
        }
    }

    stateChanged(state) {
        if (this.phoneTypeDict !== dictPhoneTypeSelector(state)) { this.phoneTypeDict = dictPhoneTypeSelector(state); }
        if (this.periodsDict !== dictPeriodsSelector(state)) { this.periodsDict = dictPeriodsSelector(state); }

        this._page = getActivePage(state);
        this._slot = getActiveSlot(state);

        if (this._slot === 'S02') {
            if (this.contentFlg !== getChannelContentFlg(state)) { this.contentFlg = getChannelContentFlg(state); }
            if (this.smsDetails !== ceChannelSlotsReselector(state)) { this.smsDetails = ceChannelSlotsReselector(state); }
            this._subpage = Object.values(getActiveChannelTabs(state)).filter(key => key.parentPageId === this._page)[0].tabPageId;
            this._subslot = Object.values(getActiveChannelTabs(state)).filter(key => key.parentPageId === this._page)[0].tabSlotId;
        }
    }

    smsInputChanged(param) {
        this.shadowRoot.getElementById(param).validate();
        if (this.shadowRoot.getElementById(param).invalid === false) {
            store.dispatch(changeFormValue(this._page, param, this.shadowRoot.getElementById(param).value, this._subpage));
        }
    }

    smsTextChange(event) {
        let formMessageText = this.shadowRoot.querySelector('#formMessageText');
        let s = formMessageText.value.split('');
 
        for (let i = 0; i < s.length; i++) {
            switch (s[i]) {
                case '\u0104': s[i] = '\u0041'; break; // Ą
                case '\u0106': s[i] = '\u0043'; break; // Ć
                case '\u0118': s[i] = '\u0045'; break; // Ę
                case '\u0141': s[i] = '\u004C'; break; // Ł
                case '\u0143': s[i] = '\u004E'; break; // Ń
                case '\u00D3': s[i] = '\u004F'; break; // Ó
                case '\u015A': s[i] = '\u0053'; break; // Ś
                case '\u017B': s[i] = '\u005A'; break; // Ż
                case '\u0179': s[i] = '\u005A'; break; // Ź
                case '\u0105': s[i] = '\u0061'; break; // ą
                case '\u0107': s[i] = '\u0063'; break; // ć
                case '\u0119': s[i] = '\u0065'; break; // ę
                case '\u0142': s[i] = '\u006C'; break; // ł
                case '\u0144': s[i] = '\u006E'; break; // ń
                case '\u00F3': s[i] = '\u006F'; break; // ó
                case '\u015B': s[i] = '\u0073'; break; // ś
                case '\u017C': s[i] = '\u007A'; break; // ż
                case '\u017A': s[i] = '\u007A'; break; // ź
                default: break;
            }
        }
        formMessageText.value = s.join('');
    }

    openGate() {
        this.gateState = true;
    }

    smsPhoneTypeChanged(param) {
        store.dispatch(changeFormValue(this._page, param+((this.gateState)?'Change':'Insert'), this.phoneTypeDict[this.shadowRoot.getElementById(param).selected].id, this._subpage));        
        this.gateState = false;
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

    changeToggle(event) {
        store.dispatch(changeChannelActiveFlg(this._subpage, event.detail.activeFlg));
    }

    clearValidateStatus() {
        this.shadowRoot.getElementById("formSendFrom").invalid = false;
        this.shadowRoot.getElementById("formSendTo").invalid = false;
        this.shadowRoot.getElementById("formMessageText").invalid = false;
    }
        
    validateForm(page) {
        if (page === this._page) {

            this.shadowRoot.getElementById("formMessageText").validate();

            // _________ walidacja dat wysylki
            this.shadowRoot.getElementById("formSendFrom").validate();
            this.shadowRoot.getElementById("formSendTo").validate();

            if (parseInt(this.shadowRoot.getElementById("formSendFrom").value) >= parseInt(this.shadowRoot.getElementById("formSendTo").value)) {
                this.shadowRoot.getElementById("formSendFrom").setAttribute('error-message', titles.get('errorMessageWrongTime'));
                this.shadowRoot.getElementById("formSendTo").setAttribute('error-message', titles.get('errorMessageWrongTime'));
                this.shadowRoot.getElementById("formSendFrom").invalid = true;
                this.shadowRoot.getElementById("formSendTo").invalid = true;
            }
            
            // _________ informacja zwrotna do komponentu rodzica
            if (this.shadowRoot.getElementById("formSendFrom").invalid === false &&
                this.shadowRoot.getElementById("formSendTo").invalid === false &&
                this.shadowRoot.getElementById("formMessageText").invalid === false) {
                    return true;
                } else {
                    return false;
                }
        }
    }
}
