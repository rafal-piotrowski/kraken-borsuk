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
import { BorsukEmployeeModalStyle } from './BorsukEmployeeModalStyle.js';

import '@polymer/paper-dialog'
import '@polymer/paper-button'
import '@polymer/paper-input/paper-input'
import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@vaadin/vaadin-grid/vaadin-grid-filter-column.js';
import '@vaadin/vaadin-grid/vaadin-grid-filter.js';
import '@vaadin/vaadin-grid/vaadin-grid-column.js';
import '@vaadin/vaadin-grid/vaadin-grid-selection-column.js';
import '@vaadin/vaadin-grid/vaadin-grid-column-group.js';
import '../../packages/borsuk-button.js';

import { events } from '../../../properties/events.js';
import { titles } from '../../../properties/titles.js';

// konektor do store-a
import { connect } from 'pwa-helpers/connect-mixin.js';

// podłączenie do Redux store.
import { store } from '../../../redux/store.js';

// import { dictEventsSelector } from '../../../redux/reducers/dictionaries.js';

export class BorsukEmployeeModal extends connect(store)(LitElement) {
    static get properties() {
        return {
            eventsDict: {
                hasChanged: () => true  // Bez tego shita grid nie pokaze danych
            },
            selectedItem: {
                type: Array
            },
        }
    }

    constructor() {
        super();
    }

    static get styles() {
        return [BorsukEmployeeModalStyle];
    }

    firstUpdated() {
        super.firstUpdated();
    }

    render() {
        return html`
            <paper-dialog id="addEmployeeDialog" modal>
                <div class="searchToastBody">
                    <div class="titleNav">
                        <div class="filterHeader"><h4>Wybierz pracownika ...</h4></div>
                        <paper-icon-button icon="close" id="closeIcon" @click="${this._addEventCancel}" dialog-dismiss></paper-icon-button>
                    </div>

                    <vaadin-grid    class="vaadinEmployees"
                                    id="employeeGrid"
                                    theme="no-border no-row-borders"
                                    .items=${Object.values(this.employees)}
                                    .selectedItems=${this.selectedItem}
                                    @active-item-changed="${this.activeItemChanged}">
                        
                        <vaadin-grid-filter-column width="33%" path="name" header="Imie"></vaadin-grid-filter-column>
                        <vaadin-grid-filter-column width="33%" path="surname" header="Nazwisko"></vaadin-grid-filter-column>
                        <vaadin-grid-filter-column width="33%" path="ckey" header="CKey"></vaadin-grid-filter-column>

                    </vaadin-grid>

                    <div class="flexbuttons">
                        <borsuk-button gap id="dialogOkButton" class="btn-modal" @click=${this.setChosenEmployee} dialog-confirm autofocus>Dodaj</borsuk-button>
                        <borsuk-button white gap id="dialogCancelButton" dialog-dismiss autofocus>Anuluj</borsuk-button>
                    </div>
                </div>
            </paper-dialog>`;
    }

    get grid() {
        return this.shadowRoot.querySelector('vaadin-grid');
      }

    indexRenderer(root, column, rowData) {
        render(
          html`
            <div>${rowData.index}</div>
          `, 
          root
        );
      }

    activeItemChanged(event) {
        const item = event.detail.value;
        this.selectedItem = item ? [item] : [];
        this.requestUpdate('selectedItem');
    }

    stateChanged(state) {
        // if (this.eventsDict !== dictEventsSelector(state)) { this.eventsDict = dictEventsSelector(state); }
        // this._page = state.cesuboffer.page;
        // this._slot = state.cesuboffer.slot;
    }

    openModal() {
        this.shadowRoot.getElementById("addEmployeeDialog").open();
    }

    setChosenEmployee() {
        this.chosenEmployee = JSON.stringify({
            event: this.selectedItem && this.selectedItem[0] ? this.selectedItem[0]: null
       });

        this.dispatchEvent(new CustomEvent('ev-confirm-employee-chosen', { detail: { chosenEmployee: this.chosenEmployee } }));
    }
}
