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
import { BorsukEventsModalStyle } from './BorsukEventsModalStyle.js';

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

import { dictEventsSelector } from '../../../redux/reducers/dictionaries.js';

export class BorsukEventsModal extends connect(store)(LitElement) {
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
        return [BorsukEventsModalStyle];
    }

    firstUpdated() {
        super.firstUpdated();
    }

    render() {
        return html`
            <paper-dialog id="addEventDialog" modal>
                <div class="searchToastBody">
                    <div class="titleNav">
                        <div class="filterHeader"><h4>Wybierz event ...</h4></div>
                        <paper-icon-button icon="close" id="closeIcon" @click="${this._addEventCancel}" dialog-dismiss></paper-icon-button>
                    </div>

                    <vaadin-grid    class="vaadinEvents"
                                    id="eventsGrid"
                                    theme="no-border no-row-borders"
                                    .items=${Object.values(this.eventsDict)}
                                    .selectedItems=${this.selectedItem}
                                    @active-item-changed="${this.activeItemChanged}">
                        
                        <vaadin-grid-filter-column width="40%" path="eventName" header="Nazwa"></vaadin-grid-filter-column>
                        <vaadin-grid-filter-column width="20%" path="sourceGroup" header="sourceGroup"></vaadin-grid-filter-column>
                        <vaadin-grid-filter-column width="40%" path="sourceSap" header="sourceSap"></vaadin-grid-filter-column>

                    </vaadin-grid>

                    <div class="flexbuttons">
                        <borsuk-button gap id="dialogOkButton" class="btn-modal" @click=${this.setChosenEvent} dialog-confirm autofocus>Dodaj</borsuk-button>
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
        if (this.eventsDict !== dictEventsSelector(state)) { this.eventsDict = dictEventsSelector(state); }
        // this._page = state.cesuboffer.page;
        // this._slot = state.cesuboffer.slot;
    }

    openModal() {
        this.shadowRoot.getElementById("addEventDialog").open();
    }

    setChosenEvent() {
        this.chosenEvent = JSON.stringify({
            event: this.selectedItem && this.selectedItem[0] ? this.selectedItem[0]: null
       });

        this.dispatchEvent(new CustomEvent('ev-confirm-event-chosen', { detail: { chosenEvent: this.chosenEvent } }));
    }
}
