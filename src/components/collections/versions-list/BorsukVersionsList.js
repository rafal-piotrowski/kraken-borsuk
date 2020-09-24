/* eslint-disable no-unneeded-ternary */
/* eslint-disable max-classes-per-file */
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
import { BorsukVersionsListStyle } from './BorsukVersionsListStyle.js';
import { borsukClose, borsukDone, borsukMinusSign, borsukChevronDown, borsukPlusSign, borsukEditVersion, borsukSchedule } from '../../../icons/icons.js';

import '@polymer/paper-button';
import '@vaadin/vaadin-grid/vaadin-grid-column';
import '@vaadin/vaadin-grid/vaadin-grid-column-group';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-filter-column.js';
import '@vaadin/vaadin-grid/vaadin-grid-filter.js';
import '@polymer/iron-form/iron-form';
import '../../packages/borsuk-button.js';
import '../../packages/borsuk-datepicker.js';

import { MinMaxDate, Required, IsDate, MinDate, MaxDate } from '@lion/form-core';
// import '@lion/input-datepicker/lion-input-datepicker.js';
import '@polymer/paper-input/paper-input';
import moment from 'moment/dist/moment';

import { editVersionAction, addScheduleAction, editScheduleAction, removeScheduleAction } from '../../../properties/actions.js'; 
import { events } from '../../../properties/events.js';
import { titles } from '../../../properties/titles.js';

// konektor do store-a
import { connect } from 'pwa-helpers/connect-mixin.js';

// podłączenie do Redux store.
import { store } from '../../../redux/store.js';

// załadowanie kreatorów akcji.
import { setClickAction } from '../../../redux/actions/customevents.js';

import { ceVersionsListReselector, ceVersionsListSelector, ceSchedulesListSelector } from '../../../redux/reducers/cesuboffer.js';

// class IsMinMaxDate extends MinMaxDate {
//     static getMessage({ fieldName }) {
//         return `Wprowadź poprawną datę ${fieldName} z określonego zakresu.`;
//     }
// }
 
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
 
class IsMinDate extends MinDate {
    static getMessage({ fieldName }) {
        return `Pole ${fieldName} nie może być mniejsza od Daty od.`;
    }
}
 
const beginDate = new Date();
 
const IsMinDateRef = new IsMinDate(beginDate, {
        message: `Data do nie może być mniejsza od Daty od.`
    });
 
// class IsMaxDate extends MaxDate {
//     static getMessage({ fieldName }) {
//         return `Nieprawidłowy zakres dat.`;
//     }
// }

export class BorsukVersionsList extends connect(store)(LitElement) {

    static get properties() {
        return {
            versionsData: {
                type: Object,
                hasChanged: () => true // see https://github.com/Polymer/lit-element/issues/107#issuecomment-416376381 
            },
            pubsData: {
                type: Array,
                hasChanged: () => true
            },
            addScheduleToastTitle: {
                type: String,
                hasChanged: () => true
            },
            today: { type: Date, reflect: true }
        }
    }
   
    constructor() {
        super();
        this.versionsData = {};
        this.pubsData = [];
        this.today = new Date();

        this.addScheduleToastTitle = "";

        // need this for use of class metods inside the renderers:
        this._chevronColumnRendererBound = this.chevronColumnRenderer.bind(this);
        this._addScheduleButtonRendererBound = this.addScheduleButtonRenderer.bind(this);
        this._rowDetailsRendererBound = this.rowDetailsRenderer.bind(this);
        this._goToVersionRendererBound = this.goToVersionRenderer.bind(this);
    }
  
    static get styles() {
        return [BorsukVersionsListStyle];
    }
 
    firstUpdated() {
    }
 
    render() {
        return html`
            <div id="versionsList" class="container-fluid containerVersions btn-no-visible">
                <div class="card card-nav-tabs text-center">
                    <div class="card-header card-header-warning">Lista wersji</div>
                    <div id="placeForVaadinGrid" class="card-body flex">
                        <vaadin-grid  id="versionGrid"
                                    aria-label="Lista wersji"
                                    size="200"
                                    .items=${Object.values(this.versionsData)}
                                    .rowDetailsRenderer=${this._rowDetailsRendererBound}
                                    theme="no-border no-row-borders">
                            <vaadin-grid-column-group>
                                <vaadin-grid-column width="8%" id="statusCol" .renderer=${this.statusColumnRenderer}>
                                </vaadin-grid-column>

                                <vaadin-grid-column width="8%" id="chevronCol" .renderer=${this._chevronColumnRendererBound}>
                                </vaadin-grid-column>
                                <!-- <vaadin-grid-column width="64%" id="nazwaCol">
                                    <template class="header">Nazwa</template>
                                    <template>[[item.versionName]]</template>
                                    <template class="footer">Nazwa</template>
                                </vaadin-grid-column> -->

                                <vaadin-grid-filter-column width="64%" path="versionName" header="Nazwa wersji"></vaadin-grid-filter-column>

                                <vaadin-grid-column width="10%" id="buttonCol" .renderer=${this._goToVersionRendererBound}>
                                </vaadin-grid-column>
                                <vaadin-grid-column width="10%" id="buttonCol" .renderer=${this._addScheduleButtonRendererBound}>
                                </vaadin-grid-column>

                                <div class="test123">[[item]]</div>
                            </vaadin-grid-column-group>
                        </vaadin-grid>
                    </div>
                </div>

                <iron-form id="addScheduleForm" class="navbar-form">
                    <paper-toast id="addScheduleToast" duration="0" text="">
                        <div class="searchToastBody">
                            <div class="titleNav">
                                <div class="filterHeader"><h4>${this.addScheduleToastTitle}</h4></div>
                            </div>
                            <hr/>
                            <div class="details-cell">
                                <!-- <paper-input id="datePickerStart" label="Data od" required></paper-input>
                                <paper-input id="datePickerEnd" label="Data do" required></paper-input> -->
                                <borsuk-datepicker
                                    id="datePickerStart"
                                    label="Data od"
                                    .modelValue=${beginDate}
                                    @model-value-changed="${({ target: { modelValue, errorState } }) => {
                                        if (!errorState) {
                                            IsMinDateRef.param = modelValue;
                                        }
                                    }}"
                                    .validators=${[new IsRequired(), new IsRealDate()]}>
                                    <div slot="help-text">
                                       
                                    </div>
                                </borsuk-datepicker>
                                <borsuk-datepicker
                                    id="datePickerEnd"
                                    label="Data do"
                                    .modelValue=${this.today}
                                    .validators=${[new IsRequired(), new IsRealDate(), IsMinDateRef]}>
                                    <div slot="help-text">
                                    
                                    </div>
                                </borsuk-datepicker>
                            </div>
                            <div class="flexbuttons">
                                <borsuk-button id="addScheduleConfirmButton" @click=${this._changeScheduleConfirm} class="btn btn-warning" data-item>OK</borsuk-button>
                                <borsuk-button white @click=${this._changeScheduleCancel} class="btn btn-warning">Anuluj</borsuk-button>
                            </div>
                        </div>
                    </paper-toast>
                </iron-form>
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

    get addScheduleToast() {
        return this.shadowRoot.getElementById('addScheduleToast');
    }

    get datePickerStart() {
        return this.shadowRoot.getElementById('datePickerStart');
    }

    get datePickerEnd() {
        return this.shadowRoot.getElementById('datePickerEnd');
    }

    get addScheduleConfirmButton() {
        return this.shadowRoot.getElementById('addScheduleConfirmButton');
    }

    // renderers:
    rowDetailsRenderer(root, column, rowData) {
        render(
            html`
            ${rowData.item && this.pubsData ? html`<div class="row-details">
                    <div class="version-grid-details">
                        <table class="tg">
                            <tr>
                                <th class="tg-cly1">DATA OD</th>
                                <th class="tg-cly1">DATA DO</th>
                                <th class="tg-cly1">ZMIEŃ</th>
                                <th class="tg-cly2">USUŃ</th>
                            </tr>
                            ${Object.keys(this.pubsData)
                            .filter((subkey) => { return this.pubsData[subkey].versionId === rowData.item.versionId })
                            .map((subkey) => {
                                const pub = this.pubsData[subkey];
                                return html`
                                    <tr>
                                        <td class="tg-cly1">${moment.unix(pub.intervalStart/1000).format("DD.MM.YYYY")}</td>
                                        <td class="tg-cly1">${moment.unix(pub.intervalEnd/1000).format("DD.MM.YYYY")}</td>
                                        <td class="tg-cly1">
                                        <borsuk-button smicon animate 
                                            class="btn-icon-animated btn-icon-ing">
                                            <borsuk-icon class="doneStatusIcon" .svg=${borsukSchedule} @click=${e => this._editVersionSchedule(rowData.item, pub)}></borsuk-icon>
                                        </borsuk-button>
                                        <paper-tooltip position="left" 
                                            class="addTooltip" 
                                            position="left">Zmiana dat ważności wersji</paper-tooltip>
                                        </td>
                                        <td class="tg-cly2">
                                        <borsuk-button smicon animate 
                                            lass="btn-icon-animated btn-icon-ing">
                                            <borsuk-icon class="doneStatusIcon" .svg=${borsukMinusSign} @click=${e => this._remVersionFromSchedule(rowData.item, pub)}></borsuk-icon>
                                        </borsuk-button>
                                        <paper-tooltip position="left" 
                                            class="addTooltip" 
                                            position="left">Zmiana dat ważności wersji</paper-tooltip>
                                        </td>
                                    </tr>`})}
                        </table>
                    </div>
                </template>
            </div>`: html`<p>niy ma tu nic</p>`}`,
        root
        );    
    }

    statusColumnRenderer(root, column, rowData) {
        render(
            (parseInt(rowData.item.versionStatus)) ? html`
            <borsuk-button smicon animate 
                class="btn-icon-animated btn-icon-ing">
                    <borsuk-icon class="closeStatusIcon" .svg=${borsukClose}></borsuk-icon>
            </borsuk-button>
            ` :
            html`
            <borsuk-button smicon animate 
                class="btn-icon-animated btn-icon-ing">
                    <borsuk-icon class="doneStatusIcon" .svg=${borsukDone}></borsuk-icon>
            </borsuk-button>
            `, 
            root
        );
    }

    chevronColumnRenderer(root, column, rowData) {
        render(
            (Object.values(this.pubsData).filter(pub => pub.versionId === rowData.item.versionId).length > 0) ?
            html`
            <borsuk-button @click=${e => this._toggleDetails(rowData.item)} smicon animate 
                id="" 
                class="btn-icon-animated btn-icon-ing">
                    <borsuk-icon 
                        class="chevronIcon"
                        .svg=${borsukChevronDown}>
                    </borsuk-icon>
            </borsuk-button>
            ` : null,
            root
        );
    }

    addScheduleButtonRenderer(root, column, rowData) {
        render(
            html`
            <borsuk-button smicon animate 
                id=${"addVerToSchButton_" + rowData.item.versionId} 
                class="btn-icon-animated btn-icon-ing"
                @click=${this._addVersionToSchedule.bind(this, rowData.item)}>
                    <borsuk-icon class="btn-icon-leaf" .svg=${borsukPlusSign}></borsuk-icon>
            </borsuk-button>
            <paper-tooltip position="left" 
                class="addTooltip"
                id=${"addVerToSchTooltip_" + rowData.item.versionId} 
                for=${"addVerToSchButton_" + rowData.item.versionId}  
                position="left">Dodaj nową pozycję do harmonogramu</paper-tooltip>
            `,
            root
        );
    }

    goToVersionRenderer(root, column, rowData) {
        render(
            html`
            <borsuk-button smicon animate 
                class="btn-icon-animated btn-icon-ing"  
                @click=${this._goToVersion.bind(this, rowData.item.versionId)}>
                    <borsuk-icon class="btn-icon-leaf" .svg=${borsukEditVersion}></borsuk-icon>
            </borsuk-button>
            <paper-tooltip position="left" 
                class="goToVersionEdit" 
                position="left">Przejdż do edycji wersji</paper-tooltip>
            `,
            root
        );
    }

    // schedule modal:
    _changeScheduleCancel() {
        this.addScheduleToast.close();
    }

    _changeScheduleConfirm() {
        const action = this.addScheduleConfirmButton.getAttribute('data-action');
        const error = (this.datePickerStart.getAttribute('shows-feedback-for') === 'error') ||
                        (this.datePickerEnd.getAttribute('shows-feedback-for') === 'error') ? true : false;
 
        if (!error) {
            switch(action) {
                case 'R':
                    this.removeSchedule();
                    break;
                case 'A':
                    this.addSchedule();
                    break;
                case 'E':
                    this.editSchedule();
                    break;
            }
        }
    }

    addSchedule() {

        console.log('Walidacja OK');
        const dateStartDate = moment(this.datePickerStart.value, 'YYYY-MM-DD', true);
        const dateEndDate = moment(this.datePickerEnd.value, 'YYYY-MM-DD', true);
        (!dateStartDate.isValid()) ? this.datePickerStart.invalid = true : this.datePickerStart.invalid = false;
        (!dateEndDate.isValid() || !moment(dateStartDate).isSameOrBefore(dateEndDate)) ? this.datePickerEnd.invalid = true : this.datePickerEnd.invalid = false;
    
        if (!this.datePickerStart.invalid && !this.datePickerEnd.invalid) {
            const versionId = this.addScheduleConfirmButton.getAttribute('data-item');

            let eventParams = Object.assign({versionId: versionId, startDate: this._formatDate(dateStartDate), endDate: this._formatDate(dateEndDate)});
            store.dispatch(setClickAction(addScheduleAction, eventParams));

            this.addScheduleToast.close();
        }
    }

    editSchedule() {
        const dateStartDate = moment(this.datePickerStart.value, 'YYYY-MM-DD', true);
        const dateEndDate = moment(this.datePickerEnd.value, 'YYYY-MM-DD', true);
        (!dateStartDate.isValid()) ? this.datePickerStart.invalid = true : this.datePickerStart.invalid = false;
        (!dateEndDate.isValid() || !moment(dateStartDate).isSameOrBefore(dateEndDate)) ? this.datePickerEnd.invalid = true : this.datePickerEnd.invalid = false;
    
        if (!this.datePickerStart.invalid && !this.datePickerEnd.invalid) {
            const versionId = this.addScheduleConfirmButton.getAttribute('data-item');
            const intervalId = this.addScheduleConfirmButton.getAttribute('data-pub');

            let eventParams = Object.assign({versionId: versionId, intervalId: intervalId, startDate: this._formatDate(dateStartDate), endDate: this._formatDate(dateEndDate)});
            store.dispatch(setClickAction(editScheduleAction, eventParams));

            this.addScheduleToast.close();
        }
    }

    removeSchedule() {
        const versionId = this.addScheduleConfirmButton.getAttribute('data-item');
        const intervalId = this.addScheduleConfirmButton.getAttribute('data-pub');

        let eventParams = Object.assign({versionId: versionId, intervalId: intervalId});
        store.dispatch(setClickAction(removeScheduleAction, eventParams));

        this.addScheduleToast.close();
    }

    validateModalDates() {

    }

    // actions:
    _goToVersion(versionId) {
        let eventParams = Object.assign({versionId: versionId});
        store.dispatch(setClickAction(editVersionAction, eventParams));
    }

    _addVersionToSchedule(item) {
        // console.log('%%%%%%%%%%%% addVersionToSchedule %%%%%%%%%%%%%%');
        // console.log(item);

        this.resetDatepickerInputValidation();
 
        this.addScheduleToastTitle = 'Dodawanie pozycji do harmonogramu';
        this.addScheduleToast.open();
 
        this.datePickerStart.value = moment(new Date()).format("DD.MM.YYYY");
        this.datePickerStart.removeAttribute("readonly");
        this.datePickerEnd.value = moment(new Date()).format("DD.MM.YYYY");
        this.datePickerEnd.removeAttribute("readonly");

        this.addScheduleConfirmButton.setAttribute("data-item", item.versionId);
        this.addScheduleConfirmButton.setAttribute("data-pub", "0");
        this.addScheduleConfirmButton.setAttribute("data-action", "A");
    }

    _editVersionSchedule(item, publication) {
        // console.log('%%%%%%%%%%%% editSchedule %%%%%%%%%%%%%%');
        // console.log(item);
        // console.log(publication);

        this.resetDatepickerInputValidation();
 
        this.addScheduleToastTitle = 'Zmiana pozycji w harmonogramie';
        this.addScheduleToast.open();
 
        this.datePickerStart.value = moment.unix(publication.intervalStart/1000).format("DD.MM.YYYY");
        this.datePickerStart.removeAttribute("readonly");
        this.datePickerEnd.value = moment.unix(publication.intervalEnd/1000).format("DD.MM.YYYY");
        this.datePickerEnd.removeAttribute("readonly");

        this.addScheduleConfirmButton.setAttribute("data-item", item.versionId);
        this.addScheduleConfirmButton.setAttribute("data-pub", publication.intervalId);
        this.addScheduleConfirmButton.setAttribute("data-action", "E");
    }

    resetDatepickerInputValidation() {
        // const datePickerStart = this.shadowRoot.getElementById('datePickerStart');
        // const datePickerEnd = this.shadowRoot.getElementById('datePickerEnd');
 
        this.datePickerStart.reset();
        this.datePickerEnd.reset();
    }

    _remVersionFromSchedule(item, publication) {
        // console.log('%%%%%%%%%%%% _remVersionFromSchedule %%%%%%%%%%%%%%');
        // console.log(item);
        // console.log(publication);
        
        this.addScheduleToastTitle = 'Czy na pewno chcesz usunąć pozycję z harmonogramu ?';
        this.addScheduleToast.open();

        this.datePickerStart.value = moment.unix(publication.intervalStart/1000).format("DD.MM.YYYY");
        this.datePickerStart.setAttribute("readonly", "");
        this.datePickerEnd.value = moment.unix(publication.intervalEnd/1000).format("DD.MM.YYYY");
        this.datePickerEnd.setAttribute("readonly", "");

        this.addScheduleConfirmButton.setAttribute("data-item", item.versionId);
        this.addScheduleConfirmButton.setAttribute("data-pub", publication.intervalId);
        this.addScheduleConfirmButton.setAttribute("data-action", "R");
    }

    _toggleDetails(item) {
        if (!this.grid._isDetailsOpened(item)) {
        this.grid.openItemDetails(item);
        } else {
        this.grid.closeItemDetails(item);
        }
    }

    _reToggleDetails(item) {
        if (this.grid._isDetailsOpened(item)) {
            this.grid.closeItemDetails(item);
            this.grid.openItemDetails(item);
        } else {
            this.grid.openItemDetails(item);
        }
    }

    _formatDate(date) {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    stateChanged(state) {
        if (this.versionsData !== ceVersionsListReselector(state)) { this.versionsData = ceVersionsListReselector(state); }
        if (this.pubsData !== ceSchedulesListSelector(state)) { this.pubsData = ceSchedulesListSelector(state); }
        
        this._page = state.cesuboffer.page;
        // this._slot = state.cesuboffer.slot;
    }

}
