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
import cesuboffer, { cesubofferTabsSelector } from '../redux/reducers/cesuboffer.js';
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
            <borsuk-tabs .tabsList="${this.cesubofferTabsList}">
                <borsuk-welcome class="page" ?active="${this._slot === 'S00'}" .page=${this._page}></borsuk-welcome>
                <borsuk-suboffer-form class="page" ?active="${this._slot === 'S01'}" .page=${this._page}></borsuk-suboffer-form>
                <borsuk-version-form class="page" ?active="${this._slot === 'S02'}" .page=${this._page}></borsuk-version-form>
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
        };
    }

    constructor() {
        super();
        this.appTitle = "BORSUK";
        this.cesubofferTabsList = [];
    }

    firstUpdated() {
    }

    updated(changedProps) {
        if (changedProps.has('_page')) {
            const pageTitle = this.appTitle + ' - ' + this._page;
            updateMetadata({
                title: pageTitle,
                description: pageTitle
                // This object also takes an image property, that points to an img src.
            });
        }
    }

    stateChanged(state) {
        if (this.cesubofferTabsList !== cesubofferTabsSelector(state)) { this.cesubofferTabsList = cesubofferTabsSelector(state); }
        this._page = state.cesuboffer.page;
        this._slot = state.cesuboffer.slot;
    }

}
