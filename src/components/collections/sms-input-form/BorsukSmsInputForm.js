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
                                    error-message=${titles.get('errorMessageRequiredField')}>
                                </paper-input>
                            </div>

                            <div class="inputGrid inputFrame formSpanGrid6 formBorder formBottomShadow">
                                <paper-dropdown-menu id="formPhoneTypeName" 
                                                    class="inputFormSize90" 
                                                    label=${titles.get('phoneTypeLabel')} 
                                                    @iron-select=${() => this.smsPhoneTypeChanged('formPhoneType')}
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
                                    auto-validate
                                    allowed-pattern="[0-9]"
                                    pattern="^([0-9]|0[0-9]|1[0-9]|2[0-3])$"
                                    error-message="wprować wartość od 0 do 23"
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
            _subslot: { type: String },
            smsDetails: { type: Object },
            phoneTypeDict: { type: Array },
            periodsDict: { type: Array }
        };
    }

    constructor() {
        super();
        this.phoneTypeDict = [];
        this.periodsDict = [];
        this.smsDetails = {};
        this.contentFlg = false;
    }

    firstUpdated() {
        this.formPhoneTypeEl.addEventListener('value-changed', function (e) {
            if(e.detail.value) this.smsDetails.phoneType = this.resolveIndexOfPhoneTypeName(e.detail.value);
        }.bind(this), false);
       
        this.formSendPeriodEl.addEventListener('value-changed', function (e) {
            this.smsDetails.sendPeriod = e.detail.value;
        }.bind(this), false);
    }

    shouldUpdate() {
        return this.active;
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
        store.dispatch(changeFormValue(this._subpage, param, this.shadowRoot.getElementById(param).value));
    }

    smsPhoneTypeChanged(param) {
        store.dispatch(changeFormValue(this._subpage, param, this.phoneTypeDict[this.shadowRoot.getElementById(param).selected].id));
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

    changeToggle(event) {
        store.dispatch(changeChannelActiveFlg(this._subpage, event.detail.activeFlg));
    }
}
