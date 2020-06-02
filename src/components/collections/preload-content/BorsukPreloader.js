/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */

import { LitElement, html, css } from 'lit-element';
import { BorsukPreloaderStyle } from './BorsukPreloaderStyle.js';
import '@polymer/paper-spinner/paper-spinner';

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
            <div class="loadingList">
                <div class="listCircle">
                    <paper-spinner active></paper-spinner>
                </div>
                <div class="listText">
                    <h4>Proszę czekać ...</h4>
                </div>
            </div>
        `;
    }

    _renderAfter() {
        return html`
        `;
    }
}
