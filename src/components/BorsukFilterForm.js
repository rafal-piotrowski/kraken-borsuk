/* eslint-disable prefer-template */
/* eslint-disable prefer-object-spread */
/* eslint-disable prefer-const */
/* eslint-disable max-classes-per-file */
/* eslint-disable lit/binding-positions */
/* eslint-disable lit/no-legacy-template-syntax */
/* eslint-disable import/order */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-undef */
/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */

import { LitElement, html, css } from 'lit-element';
import { BorsukFilterFormStyle } from './BorsukFilterFormStyle.js';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-checkbox/paper-checkbox';
import './packages/borsuk-button.js';
import './packages/borsuk-icon.js';
import '@polymer/iron-collapse/iron-collapse';
import './collections/borsuk-events-modal.js';

import { filterConfirmAction, filterSelectResultAction, filterResetAction } from '../properties/actions.js';

import { borsukDoubleChevronUp, borsukDoubleChevronDown, borsukRemove } from '../icons/icons.js';

import { tooltips } from '../properties/tooltips.js';

// konektor służący podłączaniu się do store-a
import { connect } from 'pwa-helpers/connect-mixin.js';

// podłączenie do Redux store.
import { store } from '../redux/store.js';

// załadowanie kreatorów akcji.
import { setClickAction } from '../redux/actions/customevents.js';
// podłączenie reducer-a.
// import { ceSearchResultsSelector } from '../redux/reducers/cesuboffer.js';
import { dictEventsSelector } from '../redux/reducers/dictionaries.js';
import globals, { globalAppSelector } from '../redux/reducers/globals.js';

export class BorsukFilterForm extends connect(store)(LitElement) {
    static get styles() {
        return [BorsukFilterFormStyle];
    }

    render() {
        return html`
            
            <filter-collapse id="filterContentCollapse" @click=${this.isCollapsed}>
                <div class="formGrid formGrid12">
                    <div class="inputGrid formSpanGrid6">
                        <paper-input
                            type="text"
                            label="Nazwa suboferty"
                            id="filterSubofferName"
                            class="br-input inputFormSize90"
                            value=""
                            char-counter
                            maxlength=50
                            allowed-pattern="[0-9a-zA-Z\u0105\u0107\u0119\u0142\u0144\u00F3\u015B\u017A\u017C\u0104\u0106\u0118\u0141\u0143\u00D3\u015A\u0179\u017B_ -]"
                            pattern="^[a-zA-Z]+[0-9a-zA-Z_ -]{0,50}">
                        </paper-input>
                    
                    </div>
                    <div class="inputGrid formSpanGrid6">
                        <paper-input
                            type="text"
                            label="Nazwa wersji"
                            id="filterVersionName"
                            class="br-input inputFormSize90"
                            value=""
                            char-counter
                            maxlength=50
                            allowed-pattern="[0-9a-zA-Z\u0105\u0107\u0119\u0142\u0144\u00F3\u015B\u017A\u017C\u0104\u0106\u0118\u0141\u0143\u00D3\u015A\u0179\u017B_ -]"
                            pattern="^[a-zA-Z]+[0-9a-zA-Z_ -]{0,50}">
                        </paper-input>
                    
                    </div>

                    <div class="inputGrid formGrid12 formSpanGrid12">
                        <paper-input 
                            type="text"
                            label="Event" 
                            id="filterEvent"
                            class="br-input inputFormSize90 formSpanGrid11"
                            @focus="${this.chooseEventFromDict}"
                            value=""
                            char-counter
                            maxlength=50
                            allowed-pattern="[0-9a-zA-Z\u0105\u0107\u0119\u0142\u0144\u00F3\u015B\u017A\u017C\u0104\u0106\u0118\u0141\u0143\u00D3\u015A\u0179\u017B_ -]"
                            pattern="^[a-zA-Z]+[0-9a-zA-Z_ -]{0,50}">
                        </paper-input>

                        <borsuk-button smicon animate id="eventRemoveButton" class="inputGrid formSpanGrid1 inputFormSize90 btn-icon-animated btn-icon-ing" @click="${this.eventRemove}">
                            <borsuk-icon .svg=${borsukRemove}></borsuk-icon>
                        </borsuk-button>
                        <paper-tooltip  id="eventRemoveButton-tooltip" for="eventRemoveButton">${tooltips.get('removeMessageEventTooltip')}</paper-tooltip>
                    </div>

                    <div class="inputGrid formSpanGrid6">
                        <paper-input
                            type="text"
                            label="Właściciel"
                            id="filterOwner"
                            class="br-input inputFormSize90"
                            value=""
                            char-counter
                            maxlength=50
                            allowed-pattern="[0-9a-zA-Z\u0105\u0107\u0119\u0142\u0144\u00F3\u015B\u017A\u017C\u0104\u0106\u0118\u0141\u0143\u00D3\u015A\u0179\u017B_ -]"
                            pattern="^[a-zA-Z]+[0-9a-zA-Z_ -]{0,50}">
                        </paper-input>
                    </div>

                    <div class="inputGrid formSpanGrid6">
                        <paper-input
                            type="text"
                            label="Data utworzenia"
                            id="filterCreateDate"
                            class="br-input inputFormSize90"
                            value=""
                            char-counter
                            maxlength=4
                            allowed-pattern="[0-9]"
                            pattern="^[0-9]{0,4}">
                        </paper-input>
                    </div>

                    <div class="inputGrid formSpanGrid6 formGrid formGrid12 checkboxContener">
                            <p class="checkboxElement statusElement">Status: </p>
                            <paper-checkbox id="readyStatusCheckbox"><span class="titleCheckbox checkboxElement">w przygotowaniu</span></paper-checkbox>
                            <paper-checkbox id="approvedStatusCheckbox"><span class="titleCheckbox checkboxElement">zaakceptowane</span></paper-checkbox>
                    </div>

                    <div class="inputGrid formSpanGrid6 formGrid formGrid12 checkboxContener">
                            <p class="checkboxElement statusElement">Publikacja: </p>
                            <paper-checkbox id="testPublishedCheckbox"><span class="titleCheckbox checkboxElement">test</span></paper-checkbox>
                            <paper-checkbox id="prodPublishedCheckbox"><span class="titleCheckbox checkboxElement">produkcja</span></paper-checkbox>
                    </div>

                    <div class="inputGrid formSpanGrid12 checkboxContener">
                        <div class="flexbuttons">
                            <borsuk-button wide @click="${this.filterConfirm}">Filtruj</borsuk-button>
                            <borsuk-button wide white @click="${this.filterReset}">Wyczyść</borsuk-button>
                        </div>
                    </div>
                </div>
            </filter-collapse>

            <borsuk-events-modal
                id="eventModal"
                .events=${this.eventsDict}
                @ev-confirm-event-chosen=${this.confirmModal}>
            </borsuk-events-modal>

            ${this.resultsTemplate}

        `;
    }

    get resultsTemplate() {
        return html`
            <div class="resultFilter">
                <div class="titleNav">
                    <div class="filterHeader">
                        <h4>Wyniki szukania: </h4>
                    </div>
                </div>
                <div class="titleBody">
                    <table>
                        <tr>
                            <th>nazwa suboferty</th>
                            <th>nazwa eventu</th>
                            <th></th>
                        </tr>

                        ${this.searchResults ? html`
                            ${Object.keys(this.searchResults).map((key) => {
                                const i = this.searchResults[key];
                                return html`
                                    <tr>
                                        <td>${i.subofferName}</td>
                                        <td>${i.eventName}</td>
                                        <td><borsuk-button narrow @click="${(event) => { this.filterSelectResult(event, i.subofferId) } }">Otwórz</borsuk-button></td>
                                    </tr>
                                `})
                            }` : html`` }
                    </table>
                </div>
            </div>
        `;
    }

    static get properties() {
        return {
            active: { type: Boolean },
            _page: { type: String },
            _slot: { type: String },
            searchResults: { type: Array },
            eventsDict: { type: Array },
            app: { type: String }
        };
    }

    constructor() {
        super();
        this.searchResults = [];
        this.eventsDict = [];
    }

    chooseEventFromDict() {
        this.shadowRoot.getElementById("eventModal").openModal();
    }

    confirmModal(event) {
        const chosenEvent = JSON.parse(event.detail.chosenEvent);
        this.shadowRoot.getElementById("filterEvent").value = chosenEvent.event.name;
    }

    eventRemove() {
        this.shadowRoot.getElementById("filterEvent").value = '';
    }

    isCollapsed() {
        if (this.shadowRoot.getElementById("filterContentCollapse").getAttribute('opened') === null) {
            this.shadowRoot.getElementById("filterContentCollapse").setAttribute('opened', '');
        } else {
            this.shadowRoot.getElementById("filterContentCollapse").removeAttribute('opened');
        }
    }

    filterConfirm(event) {
        let filterData = [];
        filterData.push({ subofferName: this.shadowRoot.getElementById('filterSubofferName').value, 
                            versionName: this.shadowRoot.getElementById('filterVersionName').value,
                            eventName: this.shadowRoot.getElementById('filterEvent').value,
                            ownerName: this.shadowRoot.getElementById('filterOwner').value,
                            createDate: this.shadowRoot.getElementById('filterCreateDate').value,
                            readyStatus: this.shadowRoot.getElementById('readyStatusCheckbox').checked,
                            approvedStatus: this.shadowRoot.getElementById('approvedStatusCheckbox').checked,
                            testPublished: this.shadowRoot.getElementById('testPublishedCheckbox').checked,
                            prodPublished: this.shadowRoot.getElementById('prodPublishedCheckbox').checked,
                        });
        this.filterElements = Object.assign({filterOptions: filterData});
        store.dispatch(setClickAction(filterConfirmAction, this.filterElements));
    }

    filterReset(event) {

        // tu petla for budiet
        this.shadowRoot.getElementById('filterSubofferName').value = '';
        this.shadowRoot.getElementById('filterVersionName').value = '';
        this.shadowRoot.getElementById('filterEvent').value = '';
        this.shadowRoot.getElementById('filterOwner').value = '';
        this.shadowRoot.getElementById('filterCreateDate').value = '';
        this.shadowRoot.getElementById('readyStatusCheckbox').checked = false;
        this.shadowRoot.getElementById('approvedStatusCheckbox').checked = false;
        this.shadowRoot.getElementById('testPublishedCheckbox').checked = false;
        this.shadowRoot.getElementById('prodPublishedCheckbox').checked = false;

        store.dispatch(setClickAction(filterResetAction));
    }

    filterSelectResult(event, suboffer) {
        let eventParams = Object.assign({subofferId: suboffer});
        store.dispatch(setClickAction(filterSelectResultAction, eventParams));
    }

    firstUpdated() {
    }

    shouldUpdate() {
        return this.active;
    }

    stateChanged(state) {
        if (this.app !== globalAppSelector(state)) { this.app = globalAppSelector(state) }
        
        import('../redux/reducers/'+this.app+'.js').then((module) => {
            if (this.searchResults !== module.ceSearchResultsSelector(state)) { this.searchResults = module.ceSearchResultsSelector(state); }
        });
        if (this.eventsDict !== dictEventsSelector(state)) { this.eventsDict = dictEventsSelector(state); }
        
        // this._page = state.cesuboffer.page;
        // this._slot = state.cesuboffer.slot;
    }

}

class FilterCollapse extends LitElement {
    static get styles() {
        return [BorsukFilterFormStyle];
    }
    
    render() {
      return html`
        <div class="formFilter">
            <form>
                <div class="titleNav">
                    <div class="filterHeader">
                        <h4>Szukanie zaawansowane...</h4>
                    </div>
                    <div>
                        <borsuk-button smicon id="hideFilter" class="btn-icon-animated btn-icon-ing" @click="${this.toggle}" aria-expanded="${this.opened}" aria-controls="collapse">
                            ${this.opened? html`
                                <borsuk-icon .svg=${borsukDoubleChevronDown}></borsuk-icon>
                            ` : html`
                                <borsuk-icon .svg=${borsukDoubleChevronUp}></borsuk-icon>
                            `}
                        </borsuk-button>
                    </div>
                </div>

                <iron-collapse id="collapse" .opened="${this.opened}" .horizontal="${this.horizontal}" .no-animation="${this.noAnimation}" tabindex="0">
                    <slot></slot>
                </iron-collapse>
            </form>
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
        this.shadowRoot.getElementById('collapse').toggle();
    }
  }
  
  customElements.define('filter-collapse', FilterCollapse);
