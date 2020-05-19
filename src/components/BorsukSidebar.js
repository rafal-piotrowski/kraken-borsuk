/* eslint-disable prefer-template */
/* eslint-disable prefer-const */
/* eslint-disable prefer-object-spread */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable arrow-body-style */
/* eslint-disable array-callback-return */
/* eslint-disable import/order */
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
import { BorsukSidebarCollapseStyle } from './collections/sidebar-collapse/BorsukSidebarCollapseStyle.js';
import { borsukAddSuboffer, borsukAddVersion, borsukApprove, borsukCopySuboffer, borsukCopyVersion, 
        borsukEditSuboffer, borsukEditVersion, borsukPublic, borsukChevronDown, borsukChevronUp,
        borsukRemoveSuboffer, borsukRemoveVersion, borsukSaveSuboffer, borsukSaveVersion } from '../icons/icons.js';
import '@polymer/paper-tooltip/paper-tooltip';
import '@polymer/iron-icons/iron-icons';
import '@polymer/iron-icon/iron-icon';
import '@polymer/paper-input/paper-input';
import '@polymer/iron-form/iron-form';
import '@polymer/paper-toast/paper-toast';
import './collections/borsuk-sidebar-collapse.js';
import './packages/borsuk-button.js';
import './packages/borsuk-icon.js';

import { addSubofferAction, editSubofferAction, filterOpenAction } from '../properties/actions.js';

import { tooltips } from '../properties/tooltips.js';

// konektor służący podłączaniu się do store-a
import { connect } from 'pwa-helpers/connect-mixin.js';

// podłączenie do Redux store.
import { store } from '../redux/store.js';

// załadowanie kreatorów akcji.
import { setClickAction } from '../redux/actions/customevents.js';

// podłączenie reducer-a.
import cesuboffer, { cesubofferTypesSelector, cesubofferNamesSelector } from '../redux/reducers/cesuboffer.js';

export class BorsukSidebar extends connect(store)(LitElement) {
    static get styles() {
        return [BorsukSidebarStyle,BorsukSidebarCollapseStyle];
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
                <borsuk-button smicon animate id="addSuboffer" class="btn-icon-animated btn-icon-ing" @click="${this.addSuboffer}">
                    <borsuk-icon .svg=${borsukAddSuboffer}></borsuk-icon>
                </borsuk-button>
                <paper-tooltip id="addSubofferTooltip" for="addSuboffer">${tooltips.get('addSubofferTooltip')}</paper-tooltip>
            </div>

            ${Object.keys(this.sidebarSubtypes).map((key) => {
                const i = this.sidebarSubtypes[key];
                return html`
                    ${i.show? html`
                            <borsuk-sidebar-collapse class="toFilterExpand" .title="${i.text}" .top="${true}">
                                <div class="content">
                                    ${Object.keys(this.sidebarSubnames)
                                    .filter((subkey) => { return this.sidebarSubnames[subkey].subtypeId === i.subtypeId })
                                    .map((subkey) => {
                                        const j = this.sidebarSubnames[subkey];
                                        return html`
                                                ${j.show? html`

                                                    <div class="card card-collapse">
                                                        <div class="subcard-header header-flex">
                                                            <button id="notrigger" class="mb-1" @click="${(event) => { this.editSuboffer(event, j.subnameId) } }">
                                                                <div class="titleNav">
                                                                    <div>${this.getTitle(j.text)}</div>
                                                                </div>
                                                            </button>
                                                        </div>
                                                    </div>

                                                `: html``}
                                            
                                        `;
                                    })}
                                </div>
                            </borsuk-sidebar-collapse>
                        `: html``}
                `;
                })
            }
        `;
    }

    getTitle(title) {
        return (title.length > 23) ? (title.substr(0,23) + '...') : title;
    }

    get filterTemplate() {
        return html`
            <div id="sidebarFilter" class="sidebarFilter">
                <paper-input id="lightFinderInput" type="text" label="filtruj suboferty..." class="br-input" value="${this.filterText}">
                </paper-input>

                <borsuk-button icon reverse id="filterButton" class="fab ing" @click="${this.openFilter}">
                    <iron-icon icon="search"></iron-icon>
                </borsuk-button>
                <paper-tooltip id="filterButton_tooltip" for="filterButton">${tooltips.get('advancedFilterTooltip')}</paper-tooltip>
            </div>
        `;

    }

    addSuboffer(event) {
        store.dispatch(setClickAction(addSubofferAction));
    }

    editSuboffer(event, suboffer) {
        let eventParams = Object.assign({subofferId: suboffer});
        store.dispatch(setClickAction(editSubofferAction, eventParams));
      }

    openFilter(event) {
        store.dispatch(setClickAction(filterOpenAction));
    }

    _searchCancel() {
        this.filterText = this.subofferFilterValue;
        this.shadowRoot.querySelector('#searchToast').toggle();
    }

    refreshFilter() {

    }

    stateChanged(state) {
        if (this.sidebarSubtypes !== cesubofferTypesSelector(state)) { this.sidebarSubtypes = cesubofferTypesSelector(state); }
        if (this.sidebarSubnames !== cesubofferNamesSelector(state)) { this.sidebarSubnames = cesubofferNamesSelector(state); }
    }

    static get properties() {
        return {
            filterText: { observer: 'refreshFilter' },
            svlExpandStatus: { type: Boolean, attribute: false, reflect: true },
            svlSubofferName: { type: String },
            _suboffer_name: String,
            _suboffer_version: String,
            _suboffer_sourcesap: String,
            _suboffer_status: String,
            sidebarSubtypes: { type: Array },
            sidebarSubnames: { type: Array }
        };
    }

    constructor() {
        super();
        this.filterText = '';
        this.svlExpandStatus = false;
        this.sidebarSubtypes = [];
        this.sidebarSubnames = [];
    }

    firstUpdated() {
    }

}
