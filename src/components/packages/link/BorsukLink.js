/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */

import { LitElement, html, css } from 'lit-element';
import { BorsukLinkStyle } from './BorsukLinkStyle.js';

// export class BorsukButton extends customElements.get('paper-button') {
export class BorsukLink extends LitElement {
    static get styles() {
        return [BorsukLinkStyle,
                css`
                    :host { display: inline; }
                `,];
    }

    static get properties() {
        return {
            ...super.properties,
            icon: { type: Boolean }, 
            icon_checkmark: { type: Boolean },
            target: { type: String }, 
            href: { type: String },
            _iconAltText: { type: String },
        };
    
    }

    constructor() {
        super();
        if (!this.target) {
            this.target = '_self';
        }
    }

    _renderBefore() {
        return html`
        `;
    }

    render() {
        return html`
            <a href="${this.href}" class="link" target="${this.target}">
                <div class="link__content">
                    <span class="link__text">
                        <slot></slot>
                    </span>
                    ${this._renderAfter()}
                </div>
            </a>
        `;
    }

    _renderAfter() {
        return html`
        `;
    }
}
