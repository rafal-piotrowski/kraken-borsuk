/* eslint-disable no-useless-constructor */
/* eslint-disable no-undef */
/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */

import { LitElement, html, css } from 'lit-element';
import { BorsukPage404Style } from './BorsukPage404Style.js';

export class BorsukPage404 extends LitElement {
    static get styles() {
        return [BorsukPage404Style];
    }

    render() {
        return html`
            <div id="contentTabsForm">
                <div class="centerFace centerFrame">
                    <h2><strong>Nie znaleziono takiego modułu.</strong></h2>
                    <p>Page is: ${this.page}</p>
                </div>
            </div>
        `;
    }

    static get properties() {
        return {
        };
    }

    constructor() {
        super();
    }

    firstUpdated() {
    }

}
