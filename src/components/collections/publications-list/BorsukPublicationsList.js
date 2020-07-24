/* eslint-disable no-param-reassign */
/* eslint-disable prefer-object-spread */
/* eslint-disable object-shorthand */
/* eslint-disable arrow-body-style */
/* eslint-disable one-var */
/* eslint-disable no-var */
/* eslint-disable default-case */
/* eslint-disable lit/no-template-bind */
/* eslint-disable radix */
/* eslint-disable lit/no-duplicate-template-bindings */
/* eslint-disable no-undef */
/* eslint-disable lit/no-invalid-html */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-const */
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
import { render } from 'lit-html';
import { BorsukPublicationsListStyle } from './BorsukPublicationsListStyle.js';
 
import '@vaadin/vaadin-grid/vaadin-grid-column';
import '@vaadin/vaadin-grid/vaadin-grid-column-group';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-filter-column.js';
import '@vaadin/vaadin-grid/vaadin-grid-filter.js';

import '../../packages/borsuk-button.js';
import '@polymer/paper-input/paper-input';

// konektor do store-a
import { connect } from 'pwa-helpers/connect-mixin.js';
 
// podłączenie do Redux store.
import { store } from '../../../redux/store.js';
 
import { ceVersionsListReselector, cePublicationsListReselector, ceSchedulesListSelector } from '../../../redux/reducers/cesuboffer.js';
 
export class BorsukPublicationsList extends connect(store)(LitElement) {
 
    static get properties() {
        return {
            versionsData: {
                type: Object,
                hasChanged: () => true // see https://github.com/Polymer/lit-element/issues/107#issuecomment-416376381
            },
        }
    }
    
    constructor() {
        super();
        this.versionsData = {};
        // this.pubsData = [];
        // this.addScheduleToastTitle = "";
    }
  
    static get styles() {
        return [BorsukPublicationsListStyle];
    }
 
    firstUpdated() {
    }
 
    render() {
        return html`
            <div id="versionsList" class="container-fluid containerVersions btn-no-visible">
                <div class="card card-nav-tabs text-center">
                    <div class="card-header card-header-warning">Harmonogram</div>
                    <div id="placeForVaadinGrid" class="card-body flex">

                        <vaadin-grid  id="versionGrid"
                                    aria-label="Lista wersji"
                                    size="200"
                                    .items=${Object.values(this.versionsData)}
                                    .rowDetailsRenderer=${this._rowDetailsRendererBound}
                                    theme="no-border no-row-borders">
                            <vaadin-grid-column-group>
 
                                <vaadin-grid-column width="25%" .renderer=${this.statusColumnRenderer} header="Status wersji"></vaadin-grid-column>
                                <vaadin-grid-filter-column width="30%" path="versionName" header="Nazwa wersji"></vaadin-grid-filter-column>
                                <vaadin-grid-filter-column width="15%" path="publishNo" header="Numer publikacji"></vaadin-grid-filter-column>
                                <vaadin-grid-column width="15%" path="startDate" header="Data od"></vaadin-grid-column>
                                <vaadin-grid-column width="15%" path="endDate" header="Data do"></vaadin-grid-column>
 
                            </vaadin-grid-column-group>
                        </vaadin-grid>
                    </div>
                </div>
            </div>
        `;
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
 
    statusColumnRenderer(root, column, rowData) {
        switch (rowData.item.versionStatus) {
            case 'A':
                render(html`<span>Archiwalna</span>`, root); break;
            case 'S':
                render(html`<span>Przygotowana do publikacji</span>`, root); break;
            case 'U':
                render(html`<span>Opublikowana na teście</span>`, root); break;
            case 'P':
                render(html`<span>Opublikowana na produkcji</span>`, root); break;
            default:
                render(html`<span>Brak statusu</span>`, root); break;
        }
    }
 
    createCustomDateFormat(timestampDate) {
        let uDate = new Date(timestampDate);
        return uDate.getFullYear() +
            '-' + ('0' + (uDate.getMonth()+1)).slice(-2) +
            '-' + ('0' + uDate.getDate()).slice(-2) +
            ' ' + ('0' + uDate.getHours()).slice(-2) +
            ':' + ('0' + uDate.getMinutes()).slice(-2) 
            // +
            // ':' + ('0' + uDate.getSeconds()).slice(-2) +
            // '.' + (uDate.getMilliseconds() / 1000).toFixed(3).slice(2, 5)
    }

    stateChanged(state) {
        if (this.versionsData !== cePublicationsListReselector(state)) { 
            this.versionsData = cePublicationsListReselector(state); 
            
            this.versionsData.forEach(element => {
                element.startDate = this.createCustomDateFormat(parseInt(element.startDate));
                element.endDate = this.createCustomDateFormat(parseInt(element.endDate));
            });
        }
        // if (this.pubsData !== ceSchedulesListSelector(state)) { this.pubsData = ceSchedulesListSelector(state); }
       
        this._page = state.cesuboffer.page;
        // this._slot = state.cesuboffer.slot;
    }
 
}
