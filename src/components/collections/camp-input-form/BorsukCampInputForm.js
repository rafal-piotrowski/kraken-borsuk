/* eslint-disable arrow-body-style */
/* eslint-disable lit/no-useless-template-literals */
/* eslint-disable max-classes-per-file */
/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
/* eslint-disable no-console */
/* eslint-disable prefer-template */
/* eslint-disable lit/no-value-attribute */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
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

import { LitElement, html, css } from '@lion/core';
import { BorsukCampInputFormStyle } from './BorsukCampInputFormStyle.js';

// import { actionCreatorTemplate } from '../../../templates/action-creator-template.js';
// import { testTemplate } from '../../../templates/test-template.js';

import 'web-animations-js/web-animations.min.js';
import '@polymer/iron-form/iron-form';
import '@polymer/paper-input/paper-input';
// import '@polymer/paper-dropdown-menu/paper-dropdown-menu';
// import '@polymer/paper-item/paper-item';
// import '@polymer/paper-listbox/paper-listbox';
// import '@polymer/paper-checkbox/paper-checkbox';

import '../borsuk-employee-modal.js';
import '../../packages/borsuk-button.js';
import '../../packages/borsuk-input.js';
import '../../packages/borsuk-select.js';
import '../../packages/borsuk-checkbox-group.js';
import '../../packages/borsuk-checkbox.js';
import '../../packages/borsuk-radio-group.js';
import '../../packages/borsuk-radio.js';
import '../../packages/borsuk-textarea.js';
import '../../packages/borsuk-range.js';
import '../../packages/borsuk-datepicker.js';
import '../../packages/borsuk-icon.js';
import { IngIcon } from '../../packages/icon/ing-icon.js';

import { MinMaxDate, Required, MinLength, MaxLength, IsDate, MinDate, MaxDate } from '@lion/form-core';

import { events } from '../../../properties/events.js';
import { titles } from '../../../properties/titles.js';

import { validateSubofferAction } from '../../../properties/actions.js';

// konektor do store-a
import { connect } from 'pwa-helpers/connect-mixin.js';

// podłączenie do Redux store.
import { store } from '../../../redux/store.js';

// załadowanie kreatorów akcji.
// import { changeFormValue } from '../../../redux/actions/cesuboffer.js';

import customevents, { actionClickSelector, actionParamSelector } from '../../../redux/reducers/customevents.js';
import { dictProductGroupSelector, dictCategorySelector, dictEventsSelector, dictUnusedEventsSelector, dictActionTypeSelector, dictEmployeeSelector } from '../../../redux/reducers/dictionaries.js';
import { cesubofferPageReselector } from '../../../redux/reducers/campform.js';

class IsRealDate extends IsDate {
    static getMessage({ fieldName }) {
        return `Wprowadź poprawną datę ${fieldName} w formacie "Dzien.Miesiąc.Rok".`;
    }
}
 
class IsRequired extends Required {
    static getMessage({ fieldName }) {
        return `Pole ${fieldName} jest wymagane.`;
    }
}

class IsAreaRequired extends Required {
    static getMessage() {
        return `Pole jest wymagane.`;
    }
}

const actionCreatorTemplate = (name) => {
    return html`
        <borsuk-input
            class="input90"
            label="Zgłaszający akcję"
            readonly
            .modelValue=${name}
            .validators=${[new IsRequired()]}>
                <div slot="help-text">imię i nazwisko zgłaszającego akcję</div>
                <div slot="before" style="color: red;">*</div>
        </borsuk-input>
    `;
}

const actionNameTemplate = () => {
    return html`
        <borsuk-input
            class="input90"
            label="Nazwa akcji">
                <div slot="help-text">podaj nazwę zgłaszanej akcji</div>
                <div slot="before" style="color: red;">*</div>
        </borsuk-input>
    `;
}

const actionCharacterTemplate = (actionTypeDict) => {
    return html`
        <borsuk-select
            class="input90"
            label="Charakter akcji">
            <div slot="help-text">uzupełnij zgodnie z wartwami decyzyjnymi</div>
            <div slot="before" style="color: red;">*</div>
            <select slot="input">
                <option selected hidden>wybierz wartość z listy...</option>
                ${actionTypeDict ? html`
                    ${Object.keys(actionTypeDict).map((subkey) => {
                        const j = actionTypeDict[subkey];
                        return html`
                            <option>${j.name}</option>
                        `})
                }` : html`` }
            </select>
        </borsuk-select>
    `;
}

const actionProductGroupTemplate = (productGroupDict) => {
    return html`
        <borsuk-select
            class="input90"
            label="Grupa produktowa">
            <div slot="help-text">określ grupę produktową zgodnie ze słownikiem</div>
            <div slot="before" style="color: red;">*</div>
            <select slot="input">
            <option selected hidden>wybierz wartość z listy...</option>
                ${productGroupDict ? html`
                    ${Object.keys(productGroupDict).map((subkey) => {
                        const j = productGroupDict[subkey];
                        return html`
                            <option>${j.name}</option>
                        `})
                }` : html`` }
            </select>
        </borsuk-select>
    `;
}

const actionSquadsTemplate = (squadsDict) => {
    return html`
        <borsuk-select
            class="input90"
            label="Scrum / Squad">
            <div slot="help-text"></div>
            <select slot="input">
                <option selected hidden></option>
                ${squadsDict ? html`
                    ${Object.keys(squadsDict).map((subkey) => {
                        const j = squadsDict[subkey];
                        return html`
                            <option>${j.name}</option>
                        `})
                }` : html`` }
            </select>
        </borsuk-select>
    `;
}

const actionUserAccountTemplate = (focusAction, clearEventAction, employeeId, employeesDict) => {
    return html`
        <borsuk-input
            label="Osoba odpowiedzialna za akcję biznesową"
            id="employeeId"
            class="input90"
            @focus="${focusAction}"
            value="${(employeeId) ? employeesDict[Object.values(employeesDict).findIndex(p => p.id === employeeId)].name : ''}"
            required>
                <div slot="help-text">Wybierz wartość z modala.</div>
                <button slot="suffix" type="button" @click="${clearEventAction}">
                    USUŃ
                    <!-- <ing-icon icon-id="borsuk:filledin-functionalities:calendar" class="invoker-icon"></ing-icon> -->
                </button>
        </borsuk-input>
    `;
}

export class BorsukCampInputForm extends connect(store)(LitElement) {
    constructor() {
        super();       
        this.categoryDict = [];
        this.productGroupDict = [];
        this.eventsDict = [];
        this.unusedEventsDict = [];
        this.actionTypeDict = [];
        this.subOfferDetails = {};
        this.employeesDict = [];
    }

    static get properties() {
        return {
            eventsDict: { type: Array },
            unusedEventsDict: { type: Array },
            categoryDict: { type: Array },
            productGroupDict: { type: Array },
            subOfferDetails: { type: Object },
            _page: { type: String },
            actionTypeDict: { type: Array },
            employeesDict: { type: Array }
        }
    }

    static get styles() {
        return [BorsukCampInputFormStyle];
    }

    firstUpdated() {
        this.dispatchEvent(new CustomEvent('input-form-rendered', { detail: true }));
    }

    render() {
        return html`
            <iron-form id="formSuboffer">
                ${this.formTemplate}
                
                <borsuk-employee-modal
                    id="employeeModal"
                    .employees=${this.employeesDict}
                    @ev-confirm-employee-chosen=${this.confirmModal}>
                </borsuk-employee-modal>
            </iron-form>
        `;
    }

    get formTemplate() {
        return html`
            <form>
                <div class="formGrid formGrid12">

                    ${Object.keys(this.subOfferDetails).map((key) => {
                        const i = this.subOfferDetails[key];
                        return html`

                            <div class="inputGrid inputFrame formSpanGrid12 formBorder formBottomShadow">
                                ${actionCreatorTemplate('Rafał Piotrowski')}
                            </div>

                            <div class="inputGrid inputFrame formSpanGrid12 formBorder formBottomShadow">
                                ${actionNameTemplate()}
                            </div>

                            <div class="inputGrid inputFrame formSpanGrid6 formBorder formBottomShadow">
                                ${actionCharacterTemplate(this.actionTypeDict)}
                            </div>

                            <div class="inputGrid inputFrame formSpanGrid6 formBorder formBottomShadow">
                                ${actionProductGroupTemplate(this.productGroupDict)}
                            </div>

                            <div class="inputGrid inputFrame formSpanGrid12 formBorder formBottomShadow">
                                ${actionSquadsTemplate(this.squadsDict)}
                            </div>

                            <div class="inputGrid inputFrame formSpanGrid12 formBorder formBottomShadow">
                                ${actionUserAccountTemplate(this.chooseEmployeeFromDict, this.clearEventInput, i.employeeId, this.employeesDict)}
                            </div>

                            <!-- <div class="inputGrid inputFrame formSpanGrid12 formBorder formBottomShadow">
                                <borsuk-textarea
                                    .validators="${[new IsAreaRequired({}, { type: 'error' })]}"
                                    label="Uzasadnienie"
                                    .modelValue=${'uzasadnienie: Lorem ipsum dolor sit amet'}
                                    class="input90"
                                    max-rows="4">
                                        <div slot="help-text">wpisz uzasadnienie daty rozpoczęcia akcji np. wysyłka mailingu od DD.MM, wystawienie komunikatu w IBOL w dniu DD.MM (uzasadnienie: zgodnie np. z terminem promocji, wymóg poinformowania klientów na XX dni przed wejściem zmiany)</div>
                                        <div slot="before" style="color: red;">*</div>
                                </borsuk-textarea>
                            </div> -->

                            <!-- <div class="inputGrid inputFrame formSpanGrid12 formBorder formBottomShadow">
                                <borsuk-range
                                    class="input90"
                                    label="Priorytet kampanii"
                                    min="0"
                                    max="50"
                                    .modelValue="${20}">
                                </borsuk-range>
                            </div>

                            <div class="inputGrid inputFrame formSpanGrid12 formBorder formBottomShadow">
                                <borsuk-button gap id="attachmentButton">Dodaj załącznik</borsuk-button>
                            </div>

                            <div class="inputGrid inputFrame formSpanGrid12 formBorder formBottomShadow">
                                <borsuk-input
                                    label="Przygotowywujący kreacje"
                                    id="eventId"
                                    class="input90"
                                    @focus="${this.chooseEmployeeFromDict}"
                                    value="${(i.employeeId) ? this.employeesDict[Object.values(this.employeesDict).findIndex(p => p.id === i.employeeId)].name : ''}"
                                    required>
                                        <div slot="help-text">Wybierz wartość z modala.</div>
                                        <button slot="suffix" type="button" @click="${this.clearEventInput}">
                                            USUŃ -->
                                            <!-- <ing-icon icon-id="borsuk:filledin-functionalities:calendar" class="invoker-icon"></ing-icon> -->
                                        <!-- </button>
                                </borsuk-input>
                            </div> -->

                            <!-- <div class="inputGrid inputFrame formSpanGrid6 formBorder formBottomShadow">
                                <borsuk-datepicker
                                    id="datePickerStart"
                                    label="Oczekiwany termin rozpoczęcia akcji"
                                    .validators=${[new IsRequired(), new IsRealDate()]}>
                                    <div slot="help-text">
                                        
                                    </div>
                                </borsuk-datepicker>
                            </div>

                            <div class="inputGrid inputFrame formSpanGrid6 formBorder formBottomShadow">
                                <borsuk-datepicker
                                    id="datePickerStart"
                                    label="Termin ważności oferty"
                                    .validators=${[new IsRequired(), new IsRealDate()]}>
                                    <div slot="help-text">
                                        Wprowadź termin ważności oferty.
                                    </div>
                                </borsuk-datepicker>
                            </div> -->

                            <!-- <div class="inputGrid formSpanGrid6 formGrid formGrid12 checkboxContener"> -->
                            <!-- <div class="inputGrid inputFrame formSpanGrid6 formBorder formBottomShadow">
                                <borsuk-checkbox-group label="Segment" name="status">
                                    <div slot="help-text">zaznacz jakich segmentów dotyczy akcja.</div>
                                    <borsuk-checkbox label="MASS" .modelValue=${{ value: 'MASS', checked: true }}></borsuk-checkbox>
                                    <borsuk-checkbox label="SB" .modelValue=${{ value: 'SB', checked: false }}></borsuk-checkbox>
                                    <borsuk-checkbox label="PB" .modelValue=${{ value: 'PB', checked: false }}></borsuk-checkbox>
                                    <borsuk-checkbox label="PvB" .modelValue=${{ value: 'PvB', checked: false }}></borsuk-checkbox>
                                    <borsuk-checkbox label="WM" .modelValue=${{ value: 'WM', checked: false }}></borsuk-checkbox>
                                </borsuk-checkbox-group>
                            </div>

                            <div class="inputGrid inputFrame formSpanGrid6 formBorder formBottomShadow">
                                <borsuk-radio-group label="Cykl akcji" name="status">
                                    <borsuk-radio label="brak" .modelValue=${{ value: 'brak', checked: true }}></borsuk-radio>
                                    <borsuk-radio label="dzienna" .modelValue=${{ value: 'dzienna', checked: false }}></borsuk-radio>
                                    <borsuk-radio label="tygodniowa" .modelValue=${{ value: 'tygodniowa', checked: false }}></borsuk-radio>
                                    <borsuk-radio label="miesieczna" .modelValue=${{ value: 'miesieczna', checked: false }}></borsuk-radio>
                                </borsuk-radio-group>
                            </div> -->

                    `})}
                </div>
            </form>
        `;
    }

    chooseEmployeeFromDict() {
        this.shadowRoot.getElementById("employeeModal").openModal();
    }

    subofferNameChanged(param) {
        this.shadowRoot.getElementById(param).validate();
        if (this.shadowRoot.getElementById(param).invalid === false) {
            // store.dispatch(changeFormValue(this._page, param, this.shadowRoot.getElementById(param).value));
        }
    }

    productGroupChanged(param) {
        this.shadowRoot.getElementById("formProductGroup").validate();
        if (this.shadowRoot.getElementById("formProductGroup").invalid === false) {
            // store.dispatch(changeFormValue(this._page, param, this.productGroupDict[this.shadowRoot.getElementById(param).selected].id));
        }
    }

    categoryChanged(param) {
        this.shadowRoot.getElementById("formCategory").validate();
        if (this.shadowRoot.getElementById("formCategory").invalid === false) {
            // store.dispatch(changeFormValue(this._page, param, this.categoryDict[this.shadowRoot.getElementById(param).selected].id));
        }
    }

    clearEventInput() {
        console.log('usuwam event');
    }

    confirmModal(event) {
        const chosenEvent = JSON.parse(event.detail.chosenEvent);
        // store.dispatch(changeFormValue(this._page, 'eventId', chosenEvent.event.id));
        this.shadowRoot.getElementById("eventId").invalid = false;
    }

    clearValidateStatus() {
        // this.shadowRoot.getElementById("subofferName").invalid = false;
        // this.shadowRoot.getElementById("formCategory").invalid = false;
        // this.shadowRoot.getElementById("formProductGroup").invalid = false;
        // this.shadowRoot.getElementById("eventId").invalid = false;
    }

    validateForm(page) {
        if (page === this._page) {
            this.shadowRoot.getElementById("subofferName").validate();
            this.shadowRoot.getElementById("formCategory").validate();
            this.shadowRoot.getElementById("formProductGroup").validate();
            this.shadowRoot.getElementById("eventId").validate();

            if (this.shadowRoot.getElementById("subofferName").invalid === false &&
                this.shadowRoot.getElementById("formCategory").invalid === false &&
                this.shadowRoot.getElementById("formProductGroup").invalid === false &&
                this.shadowRoot.getElementById("eventId").invalid === false) {
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
        if (this.productGroupDict !== dictProductGroupSelector(state)) { this.productGroupDict = dictProductGroupSelector(state); }
        if (this.categoryDict !== dictCategorySelector(state)) { this.categoryDict = dictCategorySelector(state); }
        if (this.eventsDict !== dictEventsSelector(state)) { this.eventsDict = dictEventsSelector(state); }
        if (this.unusedEventsDict !== dictUnusedEventsSelector(state)) { this.unusedEventsDict = dictUnusedEventsSelector(state); }
        if (this.subOfferDetails !== cesubofferPageReselector(state)) { this.subOfferDetails = cesubofferPageReselector(state); }

        if (this.actionTypeDict !== dictActionTypeSelector(state)) { this.actionTypeDict = dictActionTypeSelector(state) }
        if (this.employeesDict !== dictEmployeeSelector(state)) { this.employeesDict = dictEmployeeSelector(state) }

        if (actionClickSelector(state) === validateSubofferAction) { this.validateForm(state, this._page); }
        this._page = state.campform.page;
        this._slot = state.campform.slot;
    }
}
