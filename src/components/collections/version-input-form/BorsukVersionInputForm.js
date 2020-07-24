/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
/* eslint-disable prefer-template */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable spaced-comment */
/* eslint-disable no-lone-blocks */
/* eslint-disable babel/no-unused-expressions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/order */
/* eslint-disable lit/binding-positions */
/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
 
import { LitElement, html, css } from 'lit-element';
import { BorsukVersionInputFormStyle } from './BorsukVersionInputFormStyle.js';
 
import '@polymer/iron-form/iron-form';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-item/paper-item';
import '@polymer/paper-radio-group/paper-radio-group';
 
import '../../packages/borsuk-button.js';
 
import { events } from '../../../properties/events.js';
import { titles } from '../../../properties/titles.js';

// konektor do store-a
import { connect } from 'pwa-helpers/connect-mixin.js';

// podłączenie do Redux store.
import { store } from '../../../redux/store.js';

// załadowanie kreatorów akcji.
import { changeFormValue } from '../../../redux/actions/cesuboffer.js';

import { cesubofferPageReselector } from '../../../redux/reducers/cesuboffer.js';

export class BorsukVersionInputForm extends connect(store)(LitElement) {

    constructor() {
        super();       
        this.radioChanged = false;
        this.versionDetails = {};
    }
 
    static get properties() {
        return {
            versionDetails: { type: Object },
            radioChanged: { type: Boolean },
            _page: { type: String }
        }
    }
 
    static get styles() {
        return [BorsukVersionInputFormStyle];
    }
 
    firstUpdated() {
    }
 
    render() {
        return html`
            <iron-form id="formVersion" class="flexWrapper subofferDetailsBox">
                ${this.formTemplate}
            </iron-form>
        `;
    }
 
    get formTemplate() {
        return html`
            <form>
                <div class="formGrid formGrid12">
                    ${Object.keys(this.versionDetails).map((key) => {
                        const i = this.versionDetails[key];
                        return html`
                            <div class="inputGrid inputFrame formSpanGrid12 formBorder formBottomShadow">
                                <paper-input
                                    type="text"
                                    label=${titles.get('subofferNameLabel')}
                                    id="formSubofferName"
                                    class="br-input inputFormSize90"
                                    disabled
                                    value=${i.subofferName}>
                                </paper-input>
                            </div>

                            <div class="inputGrid inputFrame formSpanGrid12 formBorder formBottomShadow">
                                <paper-input
                                        type="text"
                                        label=${titles.get('versionName')}
                                        id="versionName"
                                        class="br-input inputFormSize90"
                                        required
                                        value=${i.versionName}
                                        @change=${() => this.versionNameChanged('versionName')}
                                        char-counter
                                        maxlength=50
                                        error-message=${titles.get('errorMessageRequiredName')}
                                        allowed-pattern=${titles.get('nameAllowedPattern')}
                                        pattern=${titles.get('namePattern')}>
                                </paper-input>
                            </div>

                            <div id="definedPushAndSms" class="inputGrid inputFrame formSpanGrid12 formBorder formBottomShadow">
                                <p>${titles.get('pushAndSmsPrompt')}</p>
                                <paper-radio-group id="pushAndSms" selected=${i.pushAndSms} @paper-radio-group-changed=${() => this.pushAndSmsChanged('pushAndSms')}>
                                    <paper-radio-button name="bothChannels">${titles.get('bothChannelsLabel')}</paper-radio-button>
                                    <paper-radio-button name="pushChannel">${titles.get('preferPushLabel')}</paper-radio-button>
                                </paper-radio-group>
                            </div>
                    `})}
                </div>
            </form>
        `;
    }

    versionNameChanged(param) {
        this.shadowRoot.getElementById(param).validate();
        if (this.shadowRoot.getElementById(param).invalid === false) {
            store.dispatch(changeFormValue(this._page, param, this.shadowRoot.getElementById(param).value));
        }
    }
 
    pushAndSmsChanged(param) {
        store.dispatch(changeFormValue(this._page, param, this.shadowRoot.getElementById(param).selected));
    }

    clearValidateStatus() {
        this.shadowRoot.getElementById("versionName").invalid = false;
    }

    validateForm(page) {
        if (page === this._page) {
            this.shadowRoot.getElementById("versionName").validate();

            if (this.shadowRoot.getElementById("versionName").invalid === false) {
                    return true;
                } else {
                    return false;
                }
        }
    }

    updated(changedProps) {
        if (changedProps.has('_page')) {
            this.clearValidateStatus();
        }
    }

    stateChanged(state) {
        if (this.versionDetails !== cesubofferPageReselector(state)) { this.versionDetails = cesubofferPageReselector(state); }
        this._page = state.cesuboffer.page;
        // this._slot = state.cesuboffer.slot;
    }
}
