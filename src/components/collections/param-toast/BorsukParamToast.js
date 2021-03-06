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
import { BorsukParamToastStyle } from './BorsukParamToastStyle.js';

import '@polymer/paper-toast';
import '@polymer/paper-dialog';
import '@polymer/paper-slider';
import '@polymer/paper-input/paper-input';
import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@vaadin/vaadin-grid/vaadin-grid-filter-column.js';
import '@vaadin/vaadin-grid/vaadin-grid-filter.js';
import '@vaadin/vaadin-grid/vaadin-grid-column.js';
import '../../packages/borsuk-button.js';

import { events } from '../../../properties/events.js';
import { titles } from '../../../properties/titles.js';

// konektor do store-a
import { connect } from 'pwa-helpers/connect-mixin.js';

// podłączenie do Redux store.
import { store } from '../../../redux/store.js';

import { dictContentParamsSelector } from '../../../redux/reducers/dictionaries.js';

export class BorsukParamToast extends connect(store)(LitElement) {

    static get styles() {
        return [BorsukParamToastStyle];
    }

    firstUpdated() {
        super.firstUpdated();
    }

    render() {
        return html`
            <paper-dialog id="addParamToast" duration="0" text="">
                <div class="searchToastBody quillToastColorBody">
                    <div class="titleNav">
                        <div class="filterHeader"><h4>Wybierz parametr</h4></div>
                    </div>

                    <div class="details-cell">

                        <vaadin-grid  id="paramsGrid"
                                    class="vaadinParams"
                                    aria-label="Lista parametrów"
                                    size="250"
                                    theme="no-border no-row-borders"
                                    .items=${Object.values(this.contentParamsDict)}
                                    .selectedItems=${this.selectedItem}
                                    @active-item-changed="${this.activeItemChanged}">

                            <vaadin-grid-filter-column width="40%" path="name" header="Nazwa"></vaadin-grid-filter-column>
                            <vaadin-grid-filter-column width="60%" path="paramDesc" header="Opis"></vaadin-grid-filter-column>

                        </vaadin-grid>

                        <div class="quillToastButtons">
                            <borsuk-button @click=${this.setChosenParam} class="btn btn-warning">Wstaw</borsuk-button>
                            <borsuk-button white @click=${this.quitParamToast} class="btn btn-warning">Anuluj</borsuk-button>
                        </div>

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

    stateChanged(state) {
        if (this.contentParamsDict !== dictContentParamsSelector(state)) { this.contentParamsDict = dictContentParamsSelector(state); }
        // this._page = state.cesuboffer.page;
        // this._slot = state.cesuboffer.slot;
    }

    openToast(index) {
        this.startPosition = index;
        this.shadowRoot.getElementById("addParamToast").open();
    }

    quitParamToast() {
        this.shadowRoot.getElementById("addParamToast").toggle();
    }

    activeItemChanged(event) {
        const item = event.detail.value;
        this.selectedItem = item ? [item] : [];
        this.requestUpdate('selectedItem');
    }

    setChosenParam() {
        this.quitParamToast();
        this.chosenParam = this.selectedItem && this.selectedItem[0] ? this.selectedItem[0]: null;
        this.dispatchEvent(new CustomEvent('ev-confirm-param-chosen', { detail: { chosenParam: this.chosenParam, position: this.startPosition } }));
    }

    static get properties() {
        return {
            contentParamsDict: { type: Array },
            selectedItem: { type: Array },
            startPosition: {type: Number}
        }
    }

    constructor() {
        super();
        this.contentParamsDict = [];
    }
}
