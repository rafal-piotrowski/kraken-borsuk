/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */

import { LitElement, html, css } from 'lit-element';
import { BorsukPreloaderStyle } from './BorsukPreloaderStyle.js';

export class BorsukPreloader extends LitElement {
    static get styles() {
        return [BorsukPreloaderStyle];
    }

    _renderBefore() {
        return html`
        `;
    }

    render() {
        return html`
            <h4>Loading page ...</h4>
        `;
    }

    _renderAfter() {
        return html`
        `;
    }
}
