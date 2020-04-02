/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */

import { LitElement, html, css } from 'lit-element';
import '@polymer/paper-button/paper-button';
import { BorsukButtonStyle } from './BorsukButtonStyle.js';

// export class BorsukButton extends customElements.get('paper-button') {
export class BorsukButton extends LitElement {
    static get styles() {
        return [BorsukButtonStyle];
    }

    _renderBefore() {
        return html`
        `;
    }

    render() {
        return html`
            <paper-button>
                <slot></slot>
            </paper-button>
        `;
    }

    _renderAfter() {
        return html`
        `;
    }
}
