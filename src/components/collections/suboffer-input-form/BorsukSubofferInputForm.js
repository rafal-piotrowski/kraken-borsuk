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

import { LitElement, html, css } from 'lit-element';
import { BorsukSubofferInputFormStyle } from './BorsukSubofferInputFormStyle.js';

import 'web-animations-js/web-animations.min.js';
import '@polymer/iron-form/iron-form';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu';
import '@polymer/paper-item/paper-item';
import '@polymer/paper-listbox/paper-listbox';

import '../borsuk-events-modal.js';
import '../../packages/borsuk-button.js';

import { events } from '../../../properties/events.js';
import { titles } from '../../../properties/titles.js';

// konektor do store-a
import { connect } from 'pwa-helpers/connect-mixin.js';

// podłączenie do Redux store.
import { store } from '../../../redux/store.js';

// załadowanie kreatorów akcji.
import { changeFormValue } from '../../../redux/actions/cesuboffer.js';

import { dictProductGroupSelector, dictCategorySelector, dictEventsSelector } from '../../../redux/reducers/dictionaries.js';
import { cesubofferPageReselector } from '../../../redux/reducers/cesuboffer.js';


export class BorsukSubofferInputForm extends connect(store)(LitElement) {
    constructor() {
        super();       
        this.categoryDict = [];
        this.productGroupDict = [];
        this.eventsDict = [];
        this.subOfferDetails = {};
    }

    static get properties() {
        return {
            eventsDict: { type: Array },
            categoryDict: { type: Array },
            productGroupDict: { type: Array },
            subOfferDetails: { type: Object },
        }
    }

    static get styles() {
        return [BorsukSubofferInputFormStyle];
    }

    firstUpdated() {
        this.dispatchEvent(new CustomEvent('input-form-rendered', { detail: true }));
    }

    render() {
        return html`
            <iron-form id="formSuboffer">
                ${this.formTemplate}
                
                <borsuk-events-modal
                    id="eventModal"
                    @ev-confirm-event-chosen=${this.confirmModal}>
                </borsuk-events-modal>
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
                                <paper-input
                                    type="text"
                                    label=${titles.get('subofferNameLabel')}
                                    id="subofferName"
                                    class="br-input inputFormSize90"
                                    required
                                    @change=${() => this.subofferNameChanged('subofferName')}
                                    char-counter
                                    maxlength=50
                                    value=${i.subofferName}
                                    error-message=${titles.get('errorMessageSubofferName')}
                                    allowed-pattern="[0-9a-zA-Z_]"
                                    pattern="^[a-zA-Z]+[0-9a-zA-Z_]{3,50}">
                                </paper-input>
                            </div>

                            <div class="inputGrid inputFrame formSpanGrid6 formBorder formBottomShadow">
                                <paper-dropdown-menu
                                    id="formCategory"
                                    class="inputFormSize90"
                                    label=${titles.get('subofferCategoryLabel')}
                                    @iron-select=${() => this.categoryChanged('categoryId')}
                                    selected-item-label=${i.categoryId} required
                                    error-message=${titles.get('errorMessageRequiredField')}>
                        
                                    <paper-listbox id="categoryId" slot="dropdown-content" selected="${Object.values(this.categoryDict).findIndex(p => p.categoryId === i.categoryId)}">

                                        ${this.categoryDict ? html`
                                            ${Object.keys(this.categoryDict).map((subkey) => {
                                                const j = this.categoryDict[subkey];
                                                return html`
                                                    <paper-item>${j.categoryName}</paper-item>
                                                `})
                                        }` : html`` }

                                    </paper-listbox>
                                </paper-dropdown-menu>
                            </div>


                            <div class="inputGrid inputFrame formSpanGrid6 formBorder formBottomShadow">
                                <paper-dropdown-menu
                                    id="formProductGroup"
                                    class="inputFormSize90"
                                    label=${titles.get('subofferProductGroupLabel')}
                                    @iron-select=${() => this.productGroupChanged('groupId')}
                                    selected-item-label=${i.groupId}>
                                
                                    <paper-listbox id="groupId" slot="dropdown-content" selected="${Object.values(this.productGroupDict).findIndex(p => p.groupId === i.groupId)}">

                                        ${this.productGroupDict ? html`
                                            ${Object.keys(this.productGroupDict).map((subkey) => {
                                                const j = this.productGroupDict[subkey];
                                                return html`
                                                    <paper-item>${j.groupName}</paper-item>
                                                `})
                                        }` : html`` }

                                    </paper-listbox>
                                </paper-dropdown-menu>
                            </div>

                            <div class="inputGrid inputFrame formSpanGrid12 formBorder formBottomShadow">
                                    <paper-input
                                        type="text"
                                        label=${titles.get('subofferEventLabel')}
                                        id="eventId"
                                        class="br-input inputFormSize90"
                                        allowed-pattern="[]"
                                        @focus="${this.chooseEventFromDict}"
                                        error-message=${titles.get('errorMessageRequiredField')}
                                        value="${(i.eventId) ? this.eventsDict[Object.values(this.eventsDict).findIndex(p => p.eventId === i.eventId)].eventName : ''}"
                                        required>
                                    </paper-input>

                            </div>
                    `})}
                </div>
            </form>
        `;
    }

    chooseEventFromDict() {
        this.shadowRoot.getElementById("eventModal").openModal();
    }

    subofferNameChanged(param) {
        store.dispatch(changeFormValue(this._page, param, this.shadowRoot.getElementById(param).value));
    }

    productGroupChanged(param) {
        store.dispatch(changeFormValue(this._page, param, this.productGroupDict[this.shadowRoot.getElementById(param).selected].groupId));
    }

    categoryChanged(param) {
        store.dispatch(changeFormValue(this._page, param, this.categoryDict[this.shadowRoot.getElementById(param).selected].categoryId));
    }

    confirmModal(event) {
        const chosenEvent = JSON.parse(event.detail.chosenEvent);
        store.dispatch(changeFormValue(this._page, 'eventId', chosenEvent.event.eventId));
    }

    stateChanged(state) {
        if (this.productGroupDict !== dictProductGroupSelector(state)) { this.productGroupDict = dictProductGroupSelector(state); }
        if (this.categoryDict !== dictCategorySelector(state)) { this.categoryDict = dictCategorySelector(state); }
        if (this.eventsDict !== dictEventsSelector(state)) { this.eventsDict = dictEventsSelector(state); }
        if (this.subOfferDetails !== cesubofferPageReselector(state)) { this.subOfferDetails = cesubofferPageReselector(state); }
        this._page = state.cesuboffer.page;
        // this._slot = state.cesuboffer.slot;
    }
}
