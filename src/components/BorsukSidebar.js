/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-plusplus */
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
import { borsukAddSuboffer, borsukAdd, borsukAddVersion, borsukApprove, borsukCopySuboffer, borsukCopyVersion, 
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
// import cesuboffer, { cesubofferTypesSelector, cesubofferNamesSelector } from '../redux/reducers/cesuboffer.js';
import globals, { globalAppSelector } from '../redux/reducers/globals.js';

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
                    <borsuk-icon .svg=${borsukAdd}></borsuk-icon>
                </borsuk-button>
                <paper-tooltip id="addSubofferTooltip" for="addSuboffer">${tooltips.get('addSubofferTooltip')}</paper-tooltip>
            </div>

            ${Object.keys(this.sidebarSubtypes).map((key) => {
                const i = this.sidebarSubtypes[key];
                return html`
                    ${i.show? html`
                            <borsuk-sidebar-collapse id="collapse_${i.subtypeId}" class="toFilterExpand" .title="${i.text}" .top="${true}" @click=${() => {this.isCollapsed("collapse_"+i.subtypeId)}}>
                                <div class="content">
                                    ${Object.keys(this.sidebarSubnames)
                                    .filter((subkey) => { return this.sidebarSubnames[subkey].subtypeId === i.subtypeId })
                                    .filter((subkey) => { return this.sidebarSubnames[subkey].text.toUpperCase().indexOf(this.filterText.toUpperCase()) !== -1 })
                                    .map((subkey) => {
                                        const j = this.sidebarSubnames[subkey];
                                        return html`
                                                ${j.show? html`

                                                    <div class="card card-collapse">
                                                        <div class="subcard-header header-flex">
                                                            <button id="notrigger" class="mb-1" @click="${(event) => { this.editSuboffer(event, j.subnameId) } }">
                                                                <div class="titleNav">
                                                                    <div class="overflowEllipsis">${j.text}</div>
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
                <paper-input id="lightFinderInput" 
                            type="text" 
                            label="filtruj suboferty..." 
                            class="br-input" 
                            value="${this.filterText}" 
                            @keyup=${this.refreshFilter}>
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
        let eventParams = Object.assign({nodeId: suboffer});
        store.dispatch(setClickAction(editSubofferAction, eventParams));
      }

    openFilter(event) {
        store.dispatch(setClickAction(filterOpenAction));
    }

    _searchCancel() {
        this.filterText = this.subofferFilterValue;
        this.shadowRoot.querySelector('#searchToast').toggle();
    }

    isCollapsed(eventId) {
        console.log(eventId);
        if (this.shadowRoot.querySelector("#"+eventId).getAttribute('opened') === null) {
            this.shadowRoot.querySelector("#"+eventId).setAttribute('opened', '');
        } else {
            this.shadowRoot.querySelector("#"+eventId).removeAttribute('opened');
            this.allCollapseFlg = false;
        }
    }

    refreshFilter() {
        if (!this.allCollapseFlg) {
            let attribute = this.shadowRoot.querySelectorAll('.toFilterExpand');
            for (let i=0; i < attribute.length; i++) {
                attribute[i].setAttribute('opened', ''); 
            }
            this.allCollapseFlg = true;

            setTimeout(() => {
                this.shadowRoot.querySelector('#lightFinderInput').focus();
            }, 100); 
        }
        
        this.filterText = this.shadowRoot.querySelector('#lightFinderInput').value;
    }

    stateChanged(state) {
        if (this.app !== globalAppSelector(state)) { this.app = globalAppSelector(state) }

        import('../redux/reducers/'+this.app+'.js').then((module) => {
            if (this.sidebarSubtypes !== module.cesubofferTypesSelector(state)) { this.sidebarSubtypes = module.cesubofferTypesSelector(state); }
            if (this.sidebarSubnames !== module.cesubofferNamesSelector(state)) { this.sidebarSubnames = module.cesubofferNamesSelector(state); }
        });
    }

    static get properties() {
        return {
            filterText: { type: String },
            svlExpandStatus: { type: Boolean, attribute: false, reflect: true },
            svlSubofferName: { type: String },
            _suboffer_name: String,
            _suboffer_version: String,
            _suboffer_sourcesap: String,
            _suboffer_status: String,
            sidebarSubtypes: { type: Array },
            sidebarSubnames: { type: Array },
            allCollapseFlg: { type: Boolean },
            app: { type: String }
        };
    }

    constructor() {
        super();
        this.filterText = '';
        this.svlExpandStatus = false;
        this.sidebarSubtypes = [];
        this.sidebarSubnames = [];
        this.allCollapseFlg = false;
    }

    firstUpdated() {
    }

}
