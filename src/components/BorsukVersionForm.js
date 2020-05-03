/* eslint-disable import/order */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-undef */
/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */

import { LitElement, html, css } from 'lit-element';
import { BorsukVersionFormStyle } from './BorsukVersionFormStyle.js';

// konektor służący podłączaniu się do store-a
import { connect } from 'pwa-helpers/connect-mixin.js';

// podłączenie do Redux store.
import { store } from '../redux/store.js';

export class BorsukVersionForm extends connect(store)(LitElement) {
    static get styles() {
        return [BorsukVersionFormStyle];
    }

    render() {
        return html`
            <div id="contentTabsForm">
                <div class="centerFace centerFrame">
                    <h2><strong>Ciało version-form</strong></h2>
                    <p>Page is: ${this.page}</p>
                </div>
            </div>
        `;
    }

    static get properties() {
        return {
            active: { type: Boolean }
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

}
