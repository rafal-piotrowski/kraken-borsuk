/* eslint-disable no-unneeded-ternary */
/* eslint-disable max-classes-per-file */
/* eslint-disable lit/no-useless-template-literals */
/* eslint-disable no-else-return */
/* eslint-disable consistent-return */
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
import { BorsukGroupInputFormStyle } from './BorsukGroupInputFormStyle.js';
import '@polymer/iron-form/iron-form';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu';
import '@polymer/paper-item/paper-item';
import '@polymer/paper-listbox/paper-listbox';

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

import { borsukAddSuboffer, borsukAddVersion, borsukApprove, borsukCopySuboffer, borsukCopy, 
    borsukPublishTest, borsukPublishProd, borsukPublic, borsukChevronDown, borsukChevronUp,
    borsukRemoveSuboffer, borsukRemoveVersion, borsukSaveSuboffer, borsukSaveVersion,borsukTypographyBold, 
    borsukTypographyItalic, borsukTypographyUnderline, borsukTypographyColor,
    borsukTypographyUndo, borsukTypographyRedo, borsukTypographyAlignLeft, borsukTypographyAlignRight,
    borsukTypographyAlignCenter, borsukTypographyAlignJustify, borsukTypographyListOrdered, borsukTypographyListBullet,
    borsukFormatParagraph, borsukFormatHeader, borsukFormatDiv, borsukSourceHtml, borsukRemove,
    borsukEmbedAttachment, borsukEmbedImage, borsukEmbedParam, borsukNonBreakingSpace } from '../../../icons/icons.js';

import { actions, saveSubofferAction, removeSubofferAction, copySubofferAction, 
        addVersionAction, publishTestAction, publishProdAction, validateVersionAction,
        saveVersionAction, removeVersionAction, copyVersionAction, approveVersionAction } from '../../../properties/actions.js';

import { events } from '../../../properties/events.js';
import { titles } from '../../../properties/titles.js';
import { tooltips } from '../../../properties/tooltips.js';
// import { borsukRemove } from '../../../icons/icons.js';

import { MinMaxDate, Required, IsDate, MinDate, MaxDate } from '@lion/form-core';

// konektor służący podłączaniu się do store-a
import { connect } from 'pwa-helpers/connect-mixin.js';

// podłączenie do Redux store.
import { store } from '../../../redux/store.js';

// załadowanie kreatorów akcji.
import { changeFormValue, changeChannelActiveFlg } from '../../../redux/actions/campform.js';

import { getActivePage, getActiveSlot, getActiveChannelTabs, ceChannelSlotsReselector, getChannelContentFlg } from '../../../redux/reducers/campform.js';
import { dictEventsSelector, dictUnusedEventsSelector, dictPersLevelSelector, dictEmployeeSelector } from '../../../redux/reducers/dictionaries.js';

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

export class BorsukGroupInputForm extends connect(store)(LitElement) {
    static get styles() {
        return [BorsukGroupInputFormStyle];
    }

    render() {
        return html`
            <borsuk-employee-modal
                id="employeeModal"
                .employees=${this.employeesDict}
                @ev-confirm-employee-chosen=${this.confirmModal}>
            </borsuk-employee-modal>

            <div class="gridButtons formGrid6">
                ${this.formButtons.map(i => html`<borsuk-form-buttons .valuesButton="${i}"></borsuk-form-buttons>`)}
            </div>

            <div class="formGrid formGrid12">
                <div class="inputGrid inputFrame formSpanGrid12 formBorder formBottomShadow">
                    <borsuk-input
                        class="input90"
                        label="Nazwa grupy docelowej">
                            <div slot="help-text">wpisz nazwe planowanej grupy do komunikacji</div>
                            <!-- <div slot="before" style="color: red;">*</div> -->
                    </borsuk-input>
                </div>

                <div class="inputGrid inputFrame formSpanGrid12 formBorder formBottomShadow">
                    <borsuk-textarea
                        class="input90"
                        label="Kryteria doboru grup do akcji"
                        max-rows="4">
                            <div slot="help-text">wpisz kryteria doboru danej grupy docelowej np. dot. transakcyjności, osadu, etc. (w tym numery produktów, kryteria wykluczeń klientów z akcji)</div>
                            <!-- <div slot="before" style="color: red;">*</div> -->
                    </borsuk-textarea>
                </div>

                <div class="inputGrid inputFrame formSpanGrid12 formBorder formBottomShadow">
                    <borsuk-textarea
                        class="input90"
                        label="Co chcemy zakomunikować w grupie docelowej"
                        max-rows="4">
                            <div slot="help-text">główny przekaz i benefity</div>
                            <!-- <div slot="before" style="color: red;">*</div> -->
                    </borsuk-textarea>
                </div>

                <div class="inputGrid inputFrame formSpanGrid12 formBorder formBottomShadow">
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
                    <borsuk-select
                        class="input90"
                        label="Poziom personalizacji ogólnej">
                        <!-- <div slot="help-text">uzupełnij zgodnie z wartwami decyzyjnymi</div> -->
                        <div slot="before" style="color: red;">*</div>
                        <select slot="input">
                            <option selected hidden></option>
                            ${this.persLevelDict ? html`
                                ${Object.keys(this.persLevelDict).map((subkey) => {
                                    const j = this.persLevelDict[subkey];
                                    return html`
                                        <option>${j.name}</option>
                                    `})
                            }` : html`` }
                        </select>
                    </borsuk-select>
                </div>

                <div class="inputGrid inputFrame formSpanGrid6 formBorder formBottomShadow">
                    <borsuk-select
                        class="input90"
                        label="Poziom personalizacji szczegółowej">
                        <!-- <div slot="help-text">określ grupę produktową zgodnie ze słownikiem</div> -->
                        <!-- <div slot="before" style="color: red;">*</div> -->
                        <select slot="input">
                            <option selected hidden></option>
                            ${this.persLevelDict ? html`
                                ${Object.keys(this.persLevelDict).map((subkey) => {
                                    const j = this.persLevelDict[subkey];
                                    return html`
                                        <option>${j.name}</option>
                                    `})
                            }` : html`` }
                        </select>
                    </borsuk-select>
                </div>

                <div class="inputGrid formSpanGrid12 formBottomShadow formBottomBackground">
                    <h2>KANAŁY</h2>
                </div>

                ${Object.keys(this.channelsList).map((key) => {
                const i = this.channelsList[key];
                return html`
                    <div class="inputGrid inputCollapseFrame formSpanGrid12">
                        <borsuk-channel-collapse 
                            .opened="${i.channelActive}" 
                            .channelName=${i.channelName} 
                            class="input100" 
                            @change-toggle=${this.changeToggle}>
                                ${this.channelTemplate}
                        </borsuk-channel-collapse>
                    </div>
                `})}

                
            </div>
        `;
    }

    get channelTemplate() {
        return html`
            <div class="formGrid formGrid12">
                <div class="inputGrid inputFrame formSpanGrid12 formBorder formBottomShadow">
                    <borsuk-input
                        class="input90"
                        label="liczebność"
                        .modelValue=${'1'}
                        .validators=${[new IsRequired()]}>
                            <div slot="after">tys.</div>
                    </borsuk-input>
                </div>

                <div class="inputGrid inputFrame formSpanGrid12 formBorder formBottomShadow">
                    <borsuk-radio-group label="Cykl akcji" name="status">
                        <borsuk-radio label="brak" .modelValue=${{ value: 'brak', checked: true }}></borsuk-radio>
                        <borsuk-radio label="dzienna" .modelValue=${{ value: 'dzienna', checked: false }}></borsuk-radio>
                        <borsuk-radio label="tygodniowa" .modelValue=${{ value: 'tygodniowa', checked: false }}></borsuk-radio>
                        <borsuk-radio label="miesieczna" .modelValue=${{ value: 'miesieczna', checked: false }}></borsuk-radio>
                    </borsuk-radio-group>
                </div>

                <div class="inputGrid inputFrame formSpanGrid12 formBorder formBottomShadow">
                    <borsuk-input
                        label="Osoba przygotowywująca bazę"
                        id="eventId"
                        class="input90"
                        @focus="${this.chooseEmployeeFromDict}"
                        value=""
                        required>
                            <div slot="help-text">Wybierz wartość z modala.</div>
                            <button slot="suffix" type="button" @click="${this.clearEventInput}">
                                USUŃ
                                <!-- <ing-icon icon-id="borsuk:filledin-functionalities:calendar" class="invoker-icon"></ing-icon> -->
                            </button>
                    </borsuk-input>
                </div>

                <div class="inputGrid inputFrame formSpanGrid12 formBorder formBottomShadow">
                    <borsuk-input
                        label="Osoba przygotowywująca kreację kanału"
                        id="eventId"
                        class="input90"
                        @focus="${this.chooseEmployeeFromDict}"
                        value=""
                        required>
                            <div slot="help-text">Wybierz wartość z modala.</div>
                            <button slot="suffix" type="button" @click="${this.clearEventInput}">
                                USUŃ
                                <!-- <ing-icon icon-id="borsuk:filledin-functionalities:calendar" class="invoker-icon"></ing-icon> -->
                            </button>
                    </borsuk-input>
                </div>

                <div class="inputGrid inputFrame formSpanGrid6 formBorder formBottomShadow">
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
                </div>
            </div>
        `;
    }

    static get properties() {
        return {
            active: { type: Boolean },
            contentFlg: { type: Boolean },
            _subslot: { type: String },
            formButtons: { type: Array },
            channelsList: { type: Array },
            employeesDict: { type: Array },
            persLevelDict: { type: Array },
        };
    }

    constructor() {
        super();
        this.employeesDict = [];
        this.persLevelDict = [];
        this.formButtons = [{
            buttonId: removeVersionAction,
            buttonTooltip: 'Usuń grupę',
            buttonIcon: borsukRemove,
            buttonActive: true,
            buttonList: [{
            }],
        },{
            buttonId: copyVersionAction,
            buttonTooltip: 'Kopiuj grupę',
            buttonIcon: borsukCopy,
            buttonActive: true,
            buttonList: [{
            }],
        }];

        this.channelsList =[{
            channelId: 1,
            channelName: "Moje ING - Start marketing",
            channelActive: false
        },{
            channelId: 2,
            channelName: "Moje ING - Historia transakcji",
            channelActive: false
        },{
            channelId: 3,
            channelName: "Moje ING - Baner na Prod Info",
            channelActive: false
        },{
            channelId: 4,
            channelName: "ATM - slot 1",
            channelActive: false
        },{
            channelId: 5,
            channelName: "Mailing",
            channelActive: false
        }]
    }

    firstUpdated() {
    }

    shouldUpdate() {
        return this.active;
    }

    chooseEmployeeFromDict() {
        this.shadowRoot.getElementById("employeeModal").openModal();
    }

    stateChanged(state) {
        // if (this.messageGroupDict !== dictMessageGroupSelector(state)) { this.messageGroupDict = dictMessageGroupSelector(state); }
        // if (this.eventsDict !== dictEventsSelector(state)) { this.eventsDict = dictEventsSelector(state); }
        // if (this.unusedEventsDict !== dictUnusedEventsSelector(state)) { this.unusedEventsDict = dictUnusedEventsSelector(state); }

        this._page = getActivePage(state);
        this._slot = getActiveSlot(state);

        if (this._slot === 'S21' || this._slot === 'S22') {
            if (this.contentFlg !== getChannelContentFlg(state)) { this.contentFlg = getChannelContentFlg(state); }
            if (this.messageDetails !== ceChannelSlotsReselector(state)) { this.messageDetails = ceChannelSlotsReselector(state); }
            this._subpage = Object.values(getActiveChannelTabs(state)).filter(key => key.parentPageId === this._page)[0].tabPageId;
            this._subslot = Object.values(getActiveChannelTabs(state)).filter(key => key.parentPageId === this._page)[0].tabSlotId;
        }

        if (this.employeesDict !== dictEmployeeSelector(state)) { this.employeesDict = dictEmployeeSelector(state) }        
        if (this.persLevelDict !== dictPersLevelSelector(state)) { this.persLevelDict = dictPersLevelSelector(state) }
    }

    clearValidateStatus() {
        // this.shadowRoot.getElementById("formMessageTitle").invalid = false;
    }

    validateForm(page) {
        // if (page === this._page) {
        //     this.shadowRoot.getElementById("formMessageTitle").validate();

            // _________ walidacja tresci wiadomosci
            // let invalidEditor = false;

            // if (this.shadowRoot.getElementById("formMessageText").getText().trim().length > 0) {
            //     this.shadowRoot.getElementById("formMessageText").removeAttribute("error");
            //     invalidEditor = false;
            // } else {
            //     this.shadowRoot.getElementById("formMessageText").setAttribute("error", "");
            //     invalidEditor = true;
            // }

            // _________ informacja zwrotna do komponentu rodzica
        //     if (this.shadowRoot.getElementById("formMessageTitle").invalid === false &&
        //         invalidEditor === false) {
        //             return true;
        //         } else {
        //             return false;
        //         }
        // }
    }
}

import '@polymer/iron-icons/iron-icons';
import '@polymer/iron-icon/iron-icon';
import '@polymer/iron-collapse/iron-collapse';
import '@polymer/paper-toggle-button/paper-toggle-button';

class BorsukChannelCollapse extends LitElement {
    static get styles() {
        return [BorsukGroupInputFormStyle];
    }

    render() {
        return html`
            <div class="formFilter formGrid">
                <!-- <form> -->
                    <div class="inputCollapseGrid formSpanGrid8">
                        <span class="chanelName">${this.channelName}</span>
                    </div>
                    <div class="inputCollapseGrid formSpanGrid4">
                        <paper-toggle-button 
                            id="togglePushChannel" 
                            class="toggleForChannels" 
                            @tap="${this.toggle}" 
                            aria-expanded="${this.opened}" 
                            aria-controls="collapse" 
                            ?checked="${this.opened}">
                        </paper-toggle-button>
                    </div>

                    <div class="inputGrid formSpanGrid12">
                        <iron-collapse id="collapse" .opened="${this.opened}" .horizontal="${this.horizontal}" .no-animation="${this.noAnimation}" class="input100 ironKolaps" tabindex="0">
                            <slot></slot>
                        </iron-collapse>
                    </div>
                <!-- </form> -->
            </div>
        `;
    }

    static get properties() {
        return {
            horizontal: { type: Boolean },
            opened: {
                type: Boolean,
                reflectToAttribute: true,
            },
        };
    }

    toggle() {
        const activeToggle = (this.opened) ? false : true;
        this.shadowRoot.getElementById('collapse').toggle();
        this.dispatchEvent(new CustomEvent('change-toggle', {detail: {activeFlg: activeToggle}}));
    }

}

customElements.define('borsuk-channel-collapse', BorsukChannelCollapse);
