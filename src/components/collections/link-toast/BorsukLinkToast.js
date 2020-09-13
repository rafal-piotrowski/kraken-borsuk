/* eslint-disable no-unneeded-ternary */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-lonely-if */
/* eslint-disable eqeqeq */
/* eslint-disable dot-notation */
/* eslint-disable no-plusplus */
/* eslint-disable lit/no-duplicate-template-bindings */
/* eslint-disable lit/attribute-value-entities */
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
            <link rel='stylesheet' href='/src/styles/styles-production-ing.css'>
            <style>
                .ing-new-theme p {
                    font-size: 1.2em !important;
                }

                .ing-new-theme .link {
                    font-size: 1.2em !important;
                    line-height: 1em !important;
                }

                .ing-new-theme .btn {
                    font-size: 1.2em !important;
                    height: 2.4em !important;
                    line-height: 2.4em !important;
                    margin-top: 0.8em !important;
                    margin-bottom: 0.8em !important;
                    text-transform: none !important;
                    border: 1px solid #FF6200 !important;
                }

                .ing-new-theme .btn:hover {
                    box-shadow: none !important;
                }
            </style>

            <paper-dialog id="addLinkToast" duration="0" text="">
                <div class="searchToastBody quillToastLinkBody">
                    <div class="titleNav">
                        <div class="filterHeader"><h4>Wstaw link</h4></div>
                    </div>

                        <nav class="toolbar-list">
                            <a ?selected="${this._toastpage === 'view1'}" @click=${() => { this._toastpage = 'view1'}}>Wprowadź treść</a>
                            <a ?selected="${this._toastpage === 'view2'}" @click=${() => { this._toastpage = 'view2'}}>Zdefiniuj link</a>
                            <a ?selected="${this._toastpage === 'view3'}" @click=${() => { this._toastpage = 'view3'}}>Wybierz rodzaj przycisku</a>
                        </nav>

                        <div role="main" class="main-toast-content">
                            <div id ="view1" class="details-cell formGrid formGrid12 toastpage" ?active="${this._toastpage === 'view1'}">${this.textFormTemplate}</div>
                            <div id ="view2" class="details-cell formGrid formGrid12 toastpage" ?active="${this._toastpage === 'view2'}">${this.linkFormTemplate}</div>
                            <div id ="view3" class="details-cell formGrid formGrid12 toastpage" ?active="${this._toastpage === 'view3'}">${this.buttonFormTemplate}</div>
                        </div>

                    <div class="quillToastButtons">
                        <borsuk-button @click=${this.setChosenLink} data-item$="{{activeParam}}" class="btn btn-warning">Wstaw</borsuk-button>
                        <borsuk-button white @click=${this.quitLinkToast} class="btn btn-warning">Anuluj</borsuk-button>
                    </div>
                </div>
            </paper-dialog>`;
    }

    get textFormTemplate() {
        return html`
            <div class="inputGrid formSpanGrid12 linkBorder linkBottomShadow">
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
            <div class="inputGrid formSpanGrid12 linkBorder linkBottomShadow">
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
        `;
    }

    get linkFormTemplate() {
        return html`
            <div class="inputGrid linkFrame formSpanGrid12">
                <p>Wybierz rodzaj odnośnika:</p>
                <paper-radio-group id="linkRadioGroup" selected="${this.selectedLink}" @paper-radio-group-changed=${() => { this.changeSelectedLink('linkRadioGroup')} }>
                    <paper-radio-button class="radioSelectedLink" name="outLink">Zewnętrzny</paper-radio-button>
                    <paper-radio-button class="radioSelectedLink" name="inLink">Wewnętrzny</paper-radio-button>
                    <paper-radio-button class="radioSelectedLink" name="actionLink">Do procesu</paper-radio-button>
                    <paper-radio-button class="radioSelectedLink" name="attachLink">Do załącznika</paper-radio-button>
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
        `;
    }

    get buttonFormTemplate() {
        return html`
            <div class="inputGrid linkFrame formSpanGrid12">
                <p>Wybierz rodzaj przycisku:</p>
                <paper-radio-group id="buttonRadioGroup" selected="${this.selectedButton}">
                    <paper-radio-button name="noButton" class="ing-new-theme">Żaden</paper-radio-button>
                    <paper-radio-button name="linkButton" class="ing-new-theme"><a class="link">Link</a></paper-radio-button>
                    <paper-radio-button name="standardButton" class="ing-new-theme"><a class="btn btn-default btn-borsuk">Button</a></paper-radio-button>
                    <paper-radio-button name="primaryButton" class="ing-new-theme"><a class="btn btn-primary btn-borsuk">Primary Button</a></paper-radio-button>
                </paper-radio-group>
            </div>
        `;
    }

    stateChanged(state) {
        if (this.pushActionDict !== dictPushActionSelector(state)) { this.pushActionDict = dictPushActionSelector(state); }
        if (this.resCodesDict !== dictResponseCodesSelector(state)) { this.resCodesDict = dictResponseCodesSelector(state); }
        // this._page = state.cesuboffer.page;
        // this._slot = state.cesuboffer.slot;
    }

    openToast(startattribs) {
        let linkText = this.shadowRoot.querySelector('#linkText');
        let linkTitle = this.shadowRoot.querySelector('#linkTitle');
        let toastOutLink = this.shadowRoot.querySelector('#toastOutLink');
        let toastInLink = this.shadowRoot.querySelector('#toastInLink');
        let toastActionLink = this.shadowRoot.querySelector('#toastActionLink');
        let toastAttachLink = this.shadowRoot.querySelector('#toastAttachLink');
        let toastResponseCode = this.shadowRoot.querySelector('#toastResponseCode');
        let linkRadioGroup = this.shadowRoot.querySelector('#linkRadioGroup');
        let buttonRadioGroup = this.shadowRoot.querySelector('#buttonRadioGroup');
        let newWindowCheckbox = this.shadowRoot.querySelector('#newWindowCheckbox');

        linkTitle.value = '';
        toastOutLink.value = '';
        toastInLink.value = '';
        this.actionCodeSelected = '';
        toastAttachLink.value = '';
        this.responseCodeSelected = '';
        newWindowCheckbox.selected = false;
        buttonRadioGroup.selected = 'noButton';
        linkRadioGroup.selected = 'outLink'

        linkText.validate();
        linkTitle.validate();

        if (startattribs) {
            if (startattribs["selection"]) {
                linkText.value = startattribs["linkText"];
                let selection = startattribs["selection"];

                if (selection.ops[0].attributes) {
                    if (selection.ops[0].attributes.borlink) {
                        linkTitle.value = (selection.ops[0].attributes.borlink["title"]) ? selection.ops[0].attributes.borlink["title"] : '';
                        toastOutLink.value = (selection.ops[0].attributes.borlink["data-ext-action"]) ? selection.ops[0].attributes.borlink["data-ext-action"] : '';
                        toastInLink.value = (selection.ops[0].attributes.borlink["data-off-action"]) ? selection.ops[0].attributes.borlink["data-off-action"] : '';
                        let actionCode = (selection.ops[0].attributes.borlink["data-int-action"] &&
                            selection.ops[0].attributes.borlink["data-int-action"] != 'GO-TO-SHOWDMFILE') ? selection.ops[0].attributes.borlink["data-int-action"] : '';
                        if (actionCode) { toastActionLink.contentElement.set('selected', Object.values(this.pushActionDict).filter(p => p.name === actionCode)[0].index); }
                        toastAttachLink.value = (selection.ops[0].attributes.borlink["data-int-actparams"]) ? selection.ops[0].attributes.borlink["data-int-actparams"] : '';
                        let responseCode = (selection.ops[0].attributes.borlink["data-inb-res"]) ? selection.ops[0].attributes.borlink["data-inb-res"] : '';
                        if (responseCode) { toastResponseCode.contentElement.set('selected', Object.values(this.resCodesDict).filter(p => p.name === responseCode)[0].index); }
                        newWindowCheckbox.selected = (selection.ops[0].attributes.borlink["target"]) ? true : false;

                        if (selection.ops[0].attributes.borlink["class"] == "btn btn-primary") {
                            buttonRadioGroup.selected = 'primaryButton';
                        } else {
                            if (selection.ops[0].attributes.borlink["class"] == "btn btn-default") {
                                buttonRadioGroup.selected = 'standardButton';
                            } else {
                                if (selection.ops[0].attributes.borlink["class"] == "link") {
                                    buttonRadioGroup.selected = 'linkButton';
                                } else {
                                    buttonRadioGroup.selected = 'noButton';
                                }
                            }
                        }
                        linkRadioGroup.selected = ((toastInLink.value) ? 'inLink' :
                            ((toastAttachLink.value) ? 'attachLink' :
                                ((toastActionLink.value) ? 'actionLink' : 'outLink')));
                    }
                }
            }

            if (startattribs["selectionLinkText"]) {
                linkText.value = startattribs["selectionLinkText"];
            }
        }
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
        // let linkform = this.shadowRoot.querySelector('#linkform');
        let linkText = this.shadowRoot.querySelector('#linkText');
        let linkTitle = this.shadowRoot.querySelector('#linkTitle');
        let toastOutLink = this.shadowRoot.querySelector('#toastOutLink');
        let toastInLink = this.shadowRoot.querySelector('#toastInLink');
        let toastActionLink = this.shadowRoot.querySelector('#toastActionLink');
        let toastAttachLink = this.shadowRoot.querySelector('#toastAttachLink');
        let toastResponseCode = this.shadowRoot.querySelector('#toastResponseCode');
        let linkRadioGroup = this.shadowRoot.querySelector('#linkRadioGroup');
        let buttonRadioGroup = this.shadowRoot.querySelector('#buttonRadioGroup');
        let newWindowCheckbox = this.shadowRoot.querySelector('#newWindowCheckbox');

        let content = {};
        let attribs = {};

        linkText.validate();
        linkTitle.validate();

        if ((linkText.invalid) || (linkTitle.invalid)) {
            console.log('Niepoprawna walidacja !!!!!!!!!!!!!!');
        } else {

            if (linkText.value) {
                content["text"] = linkText.value;
            }
            if (linkTitle.value) {
                attribs["title"] = linkTitle.value;
            }
            if (toastResponseCode.value && toastResponseCode.value !== 'brak') {
                attribs["data-inb-res"] = toastResponseCode.value;
            }
            if (newWindowCheckbox.checked) {
                attribs["target"] = '_blank';
            }

            switch (linkRadioGroup.selected) {
                case 'outLink': {
                    if (toastOutLink.value) {
                        attribs["data-ext-action"] = toastOutLink.value;
                    }
                    break;
                }
                case 'inLink': {
                    if (toastInLink.value) {
                        attribs["data-off-action"] = toastInLink.value;
                    }
                    break;
                }
                case 'actionLink': {
                    if (toastActionLink.value && toastActionLink.value != 'brak') {
                        attribs["data-int-action"] = toastActionLink.value;
                    }
                    break;
                }
                case 'attachLink': {
                    if (toastAttachLink.value) {
                        attribs["data-int-actparams"] = 'id:' + toastAttachLink.value;
                        attribs["data-int-action"] = 'GO-TO-SHOWDMFILE';
                    }
                }
            }

            if (buttonRadioGroup.selected == 'linkButton') {
                attribs["class"] = 'link';
            } else {
                if (buttonRadioGroup.selected === 'standardButton') {
                    attribs["class"] = 'btn btn-default';
                } else {
                    if (buttonRadioGroup.selected === 'primaryButton') {
                        attribs["class"] = 'btn btn-primary';
                    }
                }
            }
            
            toastActionLink.contentElement.set('selected', null);
            toastResponseCode.contentElement.set('selected', null);

            this.quitLinkToast();
            this.dispatchEvent(new CustomEvent('ev-confirm-link-chosen', { detail: { chosenLinkContent: content, chosenLinkAttribs: attribs } }));
        }
    }

    changeSelectedLink(param) {

        let toastOutLink = this.shadowRoot.getElementById('toastOutLink');
        let toastInLink = this.shadowRoot.getElementById('toastInLink');
        let toastActionLink = this.shadowRoot.getElementById('toastActionLink');
        let toastAttachLink = this.shadowRoot.getElementById('toastAttachLink');

        toastOutLink.setAttribute("class", "br-input inputFormSize90 displayNone");
        toastInLink.setAttribute("class", "br-input inputFormSize90 displayNone");
        toastActionLink.setAttribute("class", "inputFormSize90 displayNone");
        toastAttachLink.setAttribute("class", "br-input inputFormSize90 displayNone");

        switch (this.shadowRoot.getElementById(param).selected) {
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
            selectedButton: { type: String },
            _toastpage: { type: String },
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
        this._toastpage = 'view1';
    }
}
