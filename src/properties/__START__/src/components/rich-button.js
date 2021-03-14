/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */

import { LitElement, html, css } from 'lit-element';
import '@polymer/paper-button/paper-button';
import { RichButtonStyle } from './rich-button-style.js';

export class RichButton extends LitElement {
    static get styles() {
        return [RichButtonStyle];
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

customElements.define('rich-button', RichButton);
