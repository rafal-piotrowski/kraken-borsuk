/* eslint-disable import/order */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-undef */
/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */

import { LitElement, html, css } from 'lit-element';
import { BorsukSubofferFormStyle } from './BorsukSubofferFormStyle.js';

// konektor służący podłączaniu się do store-a
import { connect } from 'pwa-helpers/connect-mixin.js';

// podłączenie do Redux store.
import { store } from '../redux/store.js';

export class BorsukSubofferForm extends connect(store)(LitElement) {
    static get styles() {
        return [BorsukSubofferFormStyle];
    }

    render() {
        return html`
            <div id="contentTabsForm">
                <div class="centerFace centerFrame">
                    <h2><strong>Ciało suboffer-form</strong></h2>
                    <p>Slot is: ${this._slot}</p>
                    <p>Page is: ${this._page}</p>
                </div>
            </div>
        `;
    }

    static get properties() {
        return {
            active: { type: Boolean },
            _page: { type: String },
            _slot: { type: String },
        };
    }

    constructor() {
        super();
    }

    firstUpdated() {
    }

    shouldUpdate() {
        return this.active;
    }

    stateChanged(state) {
        // IF statement warunkujący renderowanie kontentu od konkretnych wartości
        this._page = state.cesuboffer.page;
        this._slot = state.cesuboffer.slot;
    }

}
