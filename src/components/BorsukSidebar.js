/* eslint-disable babel/no-unused-expressions */
/* eslint-disable lit/binding-positions */
/* eslint-disable lit/no-useless-template-literals */
/* eslint-disable lit/no-legacy-template-syntax */
/* eslint-disable no-undef */
/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */

import { LitElement, html, css } from 'lit-element';
import { BorsukSidebarStyle } from './BorsukSidebarStyle.js';
import '@polymer/paper-tooltip/paper-tooltip';
import '@polymer/iron-icons/iron-icons';
import '@polymer/iron-icon/iron-icon';
import '@polymer/paper-input/paper-input';
import '@polymer/iron-form/iron-form';
import '@polymer/paper-toast/paper-toast';
import './collections/borsuk-sidebar-collapse.js';
import './packages/borsuk-button.js';

export class BorsukSidebar extends LitElement {
    static get styles() {
        return [BorsukSidebarStyle];
    }

    render() {
        return html`
            <div class="null-place"></div>
            ${this.filterTemplate}
            ${this.treeTemplate}
            <div class="null-place-bottom"></div>   
        `;
    }

    get treeTemplate() {
        return html`
            <div class="flexbuttons">
                <borsuk-button icon id="addSuboffer" class="btn-icon-animated btn-icon-ing" @click="${this._addSuboffer}">
                    <iron-icon icon="add"></iron-icon>
                </borsuk-button>
                <paper-tooltip id="addSubofferTooltip" for="addSuboffer">Dodaj nową subofertę</paper-tooltip>
            </div>

            ${this.subtypes.map(i => html`
                ${i.show? html`
                    <borsuk-sidebar-collapse class="toFilterExpand" .title="${i.text}" .top="${true}">
                        <div class="content">
                            ${i.subnames.map(j => html`
                                ${j.show? html`
                                    <borsuk-sidebar-collapse class="toFilterExpandSub" .title="${j.text}" .data-item="${j.id}">
                                    </borsuk-sidebar-collapse>
                                `: html``}
                            `)}
 
                        </div>
                    </borsuk-sidebar-collapse>
                `: html``}
            `)}
        `;
    }
 
    get filterTemplate() {
        return html`
            <div id="sidebarFilter" class="sidebarFilter">
                <paper-input id="lightFinderInput" type="text" label="filtruj suboferty..." class="br-input" value="${this.filterText}">
                </paper-input>

                <borsuk-button icon reverse id="filterButton" class="fab ing" @click="${this._search}">
                    <iron-icon icon="search"></iron-icon>
                </borsuk-button>

                <!-- <paper-icon-button id="filterButton" icon="search" class="fab ing" @click="${this._search}">
                    <paper-ripple class="circle" recenters=""></paper-ripple>
                </paper-icon-button> -->
                <paper-tooltip id="filterButton_tooltip" for="filterButton">Szukanie zaawansowane...</paper-tooltip>

                <div>
                    <iron-form id="findform" class="navbar-form">
                        <form>
                            <div class="flexpaperform">
                                <div>
                                    <paper-toast id="searchToast" duration="2000" text="">
                                        <div class="searchToastBody">
                                            <div class="titleNav">
                                                <div class="filterHeader"><h4>Tu było kiedyś szukanie zaawansowane...</h4></div>
                                                <div><paper-icon-button id="filterCloseButton" icon="close" on-click="_searchCancel"></paper-icon-button></div>
                                            </div>
                                        </div>
                                    </paper-toast>
                                </div>
                            </div>
                        </form>
                    </iron-form>
                </div>
            </div>
        `;

    }

    _addSuboffer() {

    }

    _search(event) {
        this.subofferFilterValue =  this.filterText;
        (this.shadowRoot.querySelectorAll('.paper-toast-open')) ? this.shadowRoot.querySelector('#searchToast').toggle() : this.shadowRoot.querySelector('#searchToast').open();
    }

    _searchCancel() {
        this.filterText = this.subofferFilterValue;
        this.shadowRoot.querySelector('#searchToast').toggle();
    }

    refreshFilter() {

    }

    static get properties() {
        return {
            filterText: { observer: 'refreshFilter' },
            svlExpandStatus: { type: Boolean, attribute: false, reflect: true },
            svlSubofferName: { type: String },
            // activeItem: { observer: '_activeItemChanged' },
            // eventsDict: { type: Array },
            _suboffer_name: String,
            _suboffer_version: String,
            _suboffer_sourcesap: String,
            _suboffer_status: String,
            subtypes: { type: Array },
        };
    }

    constructor() {
        super();
        this.filterText = '';
        this.svlExpandStatus = false;
        this.subtypes  = [{
            text: 'Informacyjne',
            show: true,
            subnames: [{
                text: 'SmartSaverRejectedTransfer',
                show: true,
                subversions: [{
                        text: 'wersja #i.1.1',
                        show: true,
                    }, {
                        text: 'wersja #i.1.2',
                        show: true,
                    }, {
                        text: 'wersja #i.1.3',
                        show: true,
                    }]
            }, {
                text: 'standingOrderEnd_ANLI_1',
                show: true,
                subversions: [{
                        text: 'wersja #i.2.1',
                        show: true,
                    }, {
                        text: 'wersja #i.2.2',
                        show: true,
                    }, {
                        text: 'bardzo długa wersja #i.2.3',
                        show: true,
                    }]
            }, {
                text: '41_internationalTransferReject_powiadomienie_PUSH',
                show: true,
                subversions: [{
                        text: 'wersja #i.3.1',
                        show: true,
                    }, {
                        text: 'wersja #i.3.2',
                        show: true,
                    }, {
                        text: 'wersja #i.3.3',
                        show: true,
                    }]
            }]
    }, {
            text: 'Operacyjne',
            show: true,
            subnames: [{
                text: 'transferDeferredPlnRejected_ANLI_1',
                show: true,
                subversions: [{
                        text: 'wersja #i.1.1',
                        show: true,
                    }, {
                        text: 'wersja #i.1.2',
                        show: true,
                    }, {
                        text: 'wersja #i.1.3',
                        show: true,
                    }]
            }, {
                text: 'P2PAliasRemoved',
                show: true,
                subversions: [{
                        text: 'wersja #i.2.1',
                        show: true,
                    }, {
                        text: 'wersja #i.2.2',
                        show: true,
                    }, {
                        text: 'wersja #i.2.3',
                        show: true,
                    }]
            }, {
                text: 'P2PAliasRegistered',
                show: true,
                subversions: [{
                        text: 'wersja #i.3.1',
                        show: true,
                    }, {
                        text: 'wersja #i.3.2',
                        show: true,
                    }, {
                        text: 'wersja #i.3.3',
                        show: true,
                    }]
            }, {
                text: 'Zamowienie_gotowki_Chatbot',
                show: true,
                subversions: [{
                        text: 'wersja #i.3.1',
                        show: true,
                    }, {
                        text: 'wersja #i.3.2',
                        show: true,
                    }, {
                        text: 'wersja #i.3.3',
                        show: true,
                    }]
            }]
        }, {
            text: 'Marketingowe',
            show: true,
            subnames: [{
                text: '5_FLINK_standingOrderEnd',
                show: true,
                subversions: [{
                        text: 'wersja #i.1.1',
                        show: true,
                    }, {
                        text: 'wersja #i.1.2',
                        show: true,
                    }, {
                        text: 'wersja #i.1.3',
                        show: true,
                    }]
            }, {
                text: '12_FLINK_PrepaidTransReject',
                show: true,
                subversions: [{
                        text: 'wersja #i.2.1',
                        show: true,
                    }, {
                        text: 'wersja #i.2.2',
                        show: true,
                    }, {
                        text: 'wersja #i.2.3',
                        show: true,
                    }]
            }]
        }]
    }

    firstUpdated() {
    }

}
