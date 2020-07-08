/* eslint-disable default-case */
/* eslint-disable prefer-const */
/* eslint-disable lit/no-legacy-template-syntax */
/* eslint-disable prefer-template */
/* eslint-disable no-undef */
/* eslint-disable lit/no-invalid-html */
/* eslint-disable no-useless-constructor */
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
import { render } from 'lit-html';
import { styleMap } from 'lit-html/directives/style-map';
import { BorsukLinkToastStyle } from './BorsukLinkToastStyle.js';

import '@polymer/paper-toast';
import '@polymer/paper-dialog';
import '@polymer/paper-slider';

import '@polymer/iron-form/iron-form';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu';
import '@polymer/paper-input/paper-input'
import '@polymer/paper-item/paper-item';
import '@polymer/paper-listbox/paper-listbox';
import '@polymer/paper-checkbox/paper-checkbox';
import '../../packages/borsuk-button.js';

import { events } from '../../../properties/events.js';
import { titles } from '../../../properties/titles.js';

// konektor do store-a
import { connect } from 'pwa-helpers/connect-mixin.js';

// podłączenie do Redux store.
import { store } from '../../../redux/store.js';

import { dictPushActionSelector, dictResponseCodesSelector } from '../../../redux/reducers/dictionaries.js';

export class BorsukLinkToast extends connect(store)(LitElement) {

    static get styles() {
        return [BorsukLinkToastStyle];
    }

    firstUpdated() {
        super.firstUpdated();
    }

    render() {
        return html`
            <paper-dialog id="addLinkToast" duration="0" text="">
                <div class="searchToastBody quillToastLinkBody">
                    <div class="titleNav">
                        <div class="filterHeader"><h4>Wstaw link</h4></div>
                    </div>

                    <iron-form id="linkform" class="navbar-form">
                        <form>
                            <div class="details-cell formGrid formGrid12">
                                <div class="inputGrid formSpanGrid6 linkBorder linkBottomShadow">
                                    <paper-input
                                            type="text"
                                            label="Tekst do wyświetlenia"
                                            class="br-input inputFormSize90"
                                            char-counter
                                            maxlength=50
                                            auto-validate
                                            error-message=${titles.get('errorMessageRequiredField')}
                                            allowed-pattern="[${this.allowedPattern}]"
                                            pattern="^[${this.startPattern}]+[${this.allowedPattern}]{0,50}"
                                            id="linkText">
                                    </paper-input>
                                </div>
                                <div class="inputGrid formSpanGrid6 linkBorder linkBottomShadow">
                                    <paper-input
                                            type="text"
                                            label="Tytul"
                                            class="br-input inputFormSize90"
                                            char-counter
                                            maxlength=50
                                            auto-validate
                                            error-message=${titles.get('errorMessageRequiredField')}
                                            allowed-pattern="[${this.allowedPattern}]"
                                            pattern="^[${this.startPattern}]+[${this.allowedPattern}]{0,50}"
                                            id="linkTitle">
                                    </paper-input>
                                </div>
                                <div class="inputGrid linkFrame formSpanGrid12">
                                    <p>Wybierz rodzaj odnośnika:</p>
                                    <paper-radio-group id="linkRadioGroup" selected="${this.selectedLink}" @change=${this.linkRadioChange}>
                                        <paper-radio-button name="outLink">Zewnętrzny</paper-radio-button>
                                        <paper-radio-button name="inLink">Wewnętrzny</paper-radio-button>
                                        <paper-radio-button name="actionLink">Do procesu</paper-radio-button>
                                        <paper-radio-button name="attachLink">Do załącznika</paper-radio-button>
                                    </paper-radio-group>
                                </div>

                                <div class="inputGrid formSpanGrid12 linkBorder linkBottomShadow">

                                    <paper-input
                                            type="text"
                                            id="toastOutLink"
                                            label="zewnętrzny odnośnik"
                                            class="br-input inputFormSize90"
                                            error-message=${titles.get('errorMessageRequiredField')}
                                            allowed-pattern="[0-9a-zA-Z:/._-]"
                                            char-counter
                                            maxlength=50
                                            required>

                                    </paper-input>

                                    <paper-input
                                            type="text"
                                            id="toastInLink"
                                            label="wewnętrzny odnośnik"
                                            class="br-input inputFormSize90 displayNone"
                                            error-message=${titles.get('errorMessageRequiredField')}
                                            allowed-pattern="[0-9a-zA-Z:/._-]"
                                            char-counter
                                            maxlength=50
                                            required>
                                    </paper-input>

                                    <paper-dropdown-menu id="toastActionLink" class="inputFormSize90 displayNone" label="odnośnik do procesu" selected-item-label="${this.actionCodeSelected}"
                                                        error-message="wybierz wartość">
                                        <paper-listbox slot="dropdown-content" selected="${Object.values(this.pushActionDict).findIndex(p => p.id === this.actionCodeSelected)}">
                                            
                                            ${this.pushActionDict ? html`
                                                ${Object.keys(this.pushActionDict).map((subkey) => {
                                                    const j = this.pushActionDict[subkey];
                                                    return html`
                                                        <paper-item>${j.name}</paper-item>
                                                    `})
                                            }` : html`` }

                                        </paper-listbox>
                                    </paper-dropdown-menu>

                                    <paper-input
                                            type="text"
                                            id="toastAttachLink"
                                            label="ID dokumentu"
                                            class="br-input inputFormSize90 displayNone"
                                            char-counter
                                            maxlength=50
                                            error-message=${titles.get('errorMessageRequiredField')}
                                            allowed-pattern="[0-9a-zA-Z_-]"
                                            required>
                                    </paper-input>

                                    <div id="eventGrid" class="displayNone">
                                    </div>
                                </div>

                                <div class="inputGrid formSpanGrid8 linkBorder linkBottomShadow">
                                    <paper-dropdown-menu id="toastResponseCode" class="inputFormSize90" label="kod odpowiedzi" selected-item-label="${this.responseCodeSelected}">
                                        <paper-listbox slot="dropdown-content" selected="${Object.values(this.resCodesDict).findIndex(p => p.id === this.responseCodeSelected)}">
                                            
                                            ${this.resCodesDict ? html`
                                                ${Object.keys(this.resCodesDict).map((subkey) => {
                                                    const j = this.resCodesDict[subkey];
                                                    return html`
                                                        <paper-item>${j.name}</paper-item>
                                                    `})
                                            }` : html`` }

                                        </paper-listbox>
                                    </paper-dropdown-menu>

                                </div>

                                <div class="inputGrid formSpanGrid4">
                                    <div class="inputFormSize90">
                                        <paper-checkbox id="newWindowCheckbox" ?checked="${this.newWindowChecked}"><span class="titleCheckbox checkboxElement">otwórz w nowej zakładce</span></paper-checkbox>
                                    </div>
                                </div>

                                <div class="inputGrid linkFrame formSpanGrid12">
                                    <p>Wybierz rodzaj przycisku:</p>
                                    <paper-radio-group id="buttonRadioGroup" selected="${this.selectedButton}" @change=${this.changeSelectedLink}>
                                        <paper-radio-button name="noButton" class="ing-new-theme">Żaden</paper-radio-button>
                                        <paper-radio-button name="linkButton" class="ing-new-theme"><a class="link">Link</a></paper-radio-button>
                                        <paper-radio-button name="standardButton" class="ing-new-theme"><a class="btn btn-default">Button</a></paper-radio-button>
                                        <paper-radio-button name="primaryButton" class="ing-new-theme"><a class="btn btn-primary">Primary Button</a></paper-radio-button>
                                    </paper-radio-group>
                                </div>

                            </div>
                        </form>
                    </iron-form>

                    <div class="quillToastButtons">
                        <borsuk-button @click=${this.setChosenLink} data-item$="{{activeParam}}" class="btn btn-warning">Wstaw</borsuk-button>
                        <borsuk-button white @click=${this.quitLinkToast} class="btn btn-warning">Anuluj</borsuk-button>
                    </div>
                </div>
            </paper-dialog>`;
    }

    stateChanged(state) {
        if (this.pushActionDict !== dictPushActionSelector(state)) { this.pushActionDict = dictPushActionSelector(state); }
        if (this.resCodesDict !== dictResponseCodesSelector(state)) { this.resCodesDict = dictResponseCodesSelector(state); }
        // this._page = state.cesuboffer.page;
        // this._slot = state.cesuboffer.slot;
    }

    openToast() {
        this.shadowRoot.getElementById("addLinkToast").open();
    }

    quitLinkToast() {
        this.shadowRoot.getElementById("addLinkToast").toggle();

        this.selectedLink = 'outLink';
        this.selectedButton = 'noButton';
        this.newWindowChecked = false;
        this.shadowRoot.getElementById("toastActionLink").contentElement.set('selected', null);
        this.shadowRoot.getElementById("toastResponseCode").contentElement.set('selected', null);
        this.shadowRoot.getElementById("linkText").value = '';
        this.shadowRoot.getElementById("linkTitle").value = '';
        this.shadowRoot.getElementById("toastOutLink").value = '';
        this.shadowRoot.getElementById("toastInLink").value = '';
        this.shadowRoot.getElementById("toastAttachLink").value = '';
    }

    setChosenLink() {
        console.log('tu bedzie implementacja dodania przycisku do edytora');
        this.quitLinkToast();
        this.dispatchEvent(new CustomEvent('ev-confirm-link-chosen', { detail: { chosenHeader: "" } }));
    }

    changeSelectedLink() {
        let toastOutLink = this.shadowRoot.getElementById('toastOutLink');
        let toastInLink = this.shadowRoot.getElementById('toastInLink');
        let toastActionLink = this.shadowRoot.getElementById('toastActionLink');
        let toastAttachLink = this.shadowRoot.getElementById('toastAttachLink');

        toastOutLink.setAttribute("class", "br-input inputFormSize90 displayNone");
        toastInLink.setAttribute("class", "br-input inputFormSize90 displayNone");
        toastActionLink.setAttribute("class", "inputFormSize90 displayNone");
        toastAttachLink.setAttribute("class", "br-input inputFormSize90 displayNone");

        switch (this.selectedLink) {
            case 'outLink': { toastOutLink.setAttribute("class", "br-input inputFormSize90"); break; }
            case 'inLink': { toastInLink.setAttribute("class", "br-input inputFormSize90"); break; }
            case 'actionLink': { toastActionLink.setAttribute("class", "inputFormSize90"); break; }
            case 'attachLink': { toastAttachLink.setAttribute("class", "br-input inputFormSize90"); break; }
        }
    }

    static get properties() {
        return {
            startPattern: { type: String },
            allowedPattern: { type: String },
            selectedLink: { type: String },
            pushActionDict: { type: Array },
            resCodesDict: { type: Array },
            newWindowChecked: { type: Boolean },
            selectedButton: { type: String }
        }
    }

    constructor() {
        super();
        this.startPattern = "a-zA-Z\u0105\u0107\u0119\u0142\u0144\u00F3\u015B\u017A\u017C\u0104\u0106\u0118\u0141\u0143\u00D3\u015A\u0179\u017B";
        this.allowedPattern = "0-9a-zA-Z\u0105\u0107\u0119\u0142\u0144\u00F3\u015B\u017A\u017C\u0104\u0106\u0118\u0141\u0143\u00D3\u015A\u0179\u017B_ -";
        this.selectedLink = "outLink";
        this.pushActionDict = [];
        this.resCodesDict = [];
        this.newWindowChecked = false;
        this.selectedButton = 'noButton';
    }
}
