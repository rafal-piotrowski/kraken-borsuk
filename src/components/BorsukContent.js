/* eslint-disable no-restricted-globals */
/* eslint-disable no-return-assign */
/* eslint-disable lit/no-legacy-template-syntax */
/* eslint-disable lit/binding-positions */
/* eslint-disable prefer-template */
/* eslint-disable import/order */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-undef */
/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */

import { LitElement, html, css } from 'lit-element';
import { BorsukContentStyle } from './BorsukContentStyle.js';
import './collections/borsuk-tabs.js';

// konektor służący podłączaniu się do store-a
import { connect } from 'pwa-helpers/connect-mixin.js';
import { installRouter } from 'pwa-helpers/router.js';
import { updateMetadata } from 'pwa-helpers/metadata.js';

// import './borsuk-welcome.js';
// import './borsuk-suboffer-form.js';
// import './borsuk-version-form.js';

// podłączenie do Redux store.
import { store } from '../redux/store.js';

// załadowanie kreatorów akcji.
import { navigate } from '../redux/actions/cesuboffer.js';

// podłączenie reducer-a.
import cesuboffer, { cesubofferTabsSelector, getActivePage, getActiveSlot, cesubofferPageReselector, 
                    cesubofferPageBckpReselector, ceChannelsSlotReselector, ceChannelsSlotBckpReselector } from '../redux/reducers/cesuboffer.js';
// store.addReducers({
//     cesuboffer
// });

export class BorsukContent extends connect(store)(LitElement) {
    static get styles() {
        return [BorsukContentStyle];
    }

    render() {
        return html`
            <div class="flex-subcontent">
                <div class="flex-margin"></div>
                    <div class="flex-midsubcontent">
                        ${this.tabsContent}
                    </div>
                </div>
                <div class="flex-margin"></div>
            </div>
        `;
    }

    get tabsContent() {
        return html`
            <borsuk-tabs .tabsList="${this.cesubofferTabsList}" .activePage="${this._page}" @change-tab=${this.changeTab}>
                <borsuk-welcome class="page" ?active="${this._slot === 'S00'}" .page=${this._page}></borsuk-welcome>
                <borsuk-suboffer-form id="subofferContent" class="page" ?active="${this._slot === 'S01'}" .page=${this._page}></borsuk-suboffer-form>
                <borsuk-version-form id="versionContent" class="page" ?active="${this._slot === 'S02'}" .page=${this._page}></borsuk-version-form>
                <borsuk-filter-form class="page" ?active="${this._slot === 'S99'}" .page=${this._page}></borsuk-filter-form>
                <borsuk-page404 class="page" ?active="${this._slot === 'S404'}" .page=${this._page}></borsuk-page404>
            </borsuk-tabs>
        `;
    }

    static get properties() {
        return {
            appTitle: { type: String },
            _page: { type: String },
            _slot: { type: String },
            cesubofferTabsList: { type: Array },
            ceSlotValues: { type: Array },
            ceChannelsValues: { type: Array },
            ceSlotBckpValues: { type: Array },
            ceChannelsBckpValues: { type: Array }
        };
    }

    constructor() {
        super();
        this.appTitle = "BORSUK";
        this.cesubofferTabsList = [];
        this.ceSlotValues = [];
        this.ceChannelsValues = [];
        this.ceSlotBckpValues = [];
        this.ceChannelsBckpValues = [];
    }

    firstUpdated() {
        // setTimeout(() => {
        //     store.dispatch(navigate(this._page, this._slot));
        //   }, 1000);
    }

    updated(changedProps) {
        if (changedProps.has('_page')) {
            this.inspectStateChanges();
            const pageTitle = this.appTitle + ' - ' + this._page;
            updateMetadata({
                title: pageTitle,
                description: pageTitle
                // This object also takes an image property, that points to an img src.
            });
        }

        if (changedProps.has('_slot')) {
            setTimeout(() => {
                    store.dispatch(navigate(this._page, this._slot));
                  }, 1000);
        }
    }

    changeTab(event) {
        // console.log(event.detail);
        store.dispatch(navigate(event.detail.pageId, event.detail.slotId));
    }

    stateChanged(state) {
        if (this.cesubofferTabsList !== cesubofferTabsSelector(state)) { this.cesubofferTabsList = cesubofferTabsSelector(state); }
        if (this.ceSlotValues !== cesubofferPageReselector(state)) { this.ceSlotValues = cesubofferPageReselector(state); this.inspectStateChanges(); }
        if (this.ceChannelsValues !== ceChannelsSlotReselector(state)) { this.ceChannelsValues = ceChannelsSlotReselector(state); this.inspectStateChanges(); }
        if (this.ceSlotBckpValues !== cesubofferPageBckpReselector(state)) { this.ceSlotBckpValues = cesubofferPageBckpReselector(state) }
        if (this.ceChannelsBckpValues !== ceChannelsSlotBckpReselector(state)) { this.ceChannelsBckpValues = ceChannelsSlotBckpReselector(state) }
        // if (this._page !== getActivePageFromFlag(state)) { this._page = getActivePageFromFlag(state); }
        // if (this._slot !== getActiveSlotFromFlag(state)) { this._slot = getActiveSlotFromFlag(state); }
        // this._page = getActivePage(state);
        this._page = getActivePage(state);
        this._slot = getActiveSlot(state);
        
    }

    inspectStateChanges() {
        if (JSON.stringify(Object.values(this.ceSlotValues)) === JSON.stringify(Object.values(this.ceSlotBckpValues)) &&
            JSON.stringify(Object.values(this.ceChannelsValues)) === JSON.stringify(Object.values(this.ceChannelsBckpValues)))
        {
            if (this._slot === 'S01') { this.shadowRoot.getElementById("subofferContent").removeAttribute("unsaved"); }
            if (this._slot === 'S02') { this.shadowRoot.getElementById("versionContent").removeAttribute("unsaved"); }
        } else {
            if (this._slot === 'S01') { this.shadowRoot.getElementById("subofferContent").setAttribute("unsaved", ""); }
            if (this._slot === 'S02') { this.shadowRoot.getElementById("versionContent").setAttribute("unsaved", ""); }
        }
    }

}
