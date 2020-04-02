/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */

import { LitElement, html, css } from 'lit-element';
import { BorsukInputStyle } from './BorsukInputStyle.js';

// export class BorsukButton extends customElements.get('paper-button') {
export class BorsukInput extends LitElement {
    static get styles() {
        return [BorsukInputStyle];
    }

    _renderBefore() {
        return html`
        `;
    }

    render() {
        return html`
        `;
    }

    _renderAfter() {
        return html`
        `;
    }
}
