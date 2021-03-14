/* eslint-disable prefer-template */
/* eslint-disable prefer-object-spread */
/* eslint-disable prefer-const */
/* eslint-disable spaced-comment */
/* eslint-disable no-lone-blocks */
/* eslint-disable babel/no-unused-expressions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/order */
/* eslint-disable lit/binding-positions */
/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */

import { LitElement, html, css } from 'lit-element';
import { RichFormButtonsStyle } from './rich-form-buttons-style.js';

import '@polymer/paper-tooltip/paper-tooltip';
// import '@polymer/iron-icons/iron-icons';
// import '@polymer/iron-icon/iron-icon';
import './rich-button.js';
import './rich-icon.js';

export class RichFormButtons extends LitElement {
    static get styles() {
        return [RichFormButtonsStyle];
    }

    static get properties() {
        return {
            _page: { type: String },
            app: { type: String }
        };
    }

    render() {
        return html`
            ${this.valuesButton.buttonActive ? html`${this.buttonActiveTemplate}` : html`${this.buttonDisabledTemplate}`}
            <paper-tooltip  id="${this.valuesButton.buttonId}Tooltip" 
                            for="${this.valuesButton.buttonId}Button" 
                            animation_delay="100" animation-entry="scale-up-animation" 
                            animation-exit="scale-down-animation">
                ${this.valuesButton.buttonTooltip}
            </paper-tooltip>
        `;
    }

    get buttonActiveTemplate() {
        return html`
            <rich-button smicon animate id="${this.valuesButton.buttonId}Button" class="btn-icon-animated btn-icon-ing" @click=${this.clickAction}>
                <rich-icon ?pressed="${this.valuesButton.buttonPressed === true}" .svg=${this.valuesButton.buttonIcon}></rich-icon>
            </rich-button>
        `;
    }

    get buttonDisabledTemplate() {
        return html`
            <rich-button smicon animate disable id="${this.valuesButton.buttonId}Button" class="btn-icon-animated btn-icon-ing">
                <rich-icon noactive .svg=${this.valuesButton.buttonIcon}></rich-icon>
            </rich-button>
        `;
    }

    createRenderRoot() {
        /**
         * Render template without shadow DOM. Note that shadow DOM features like
         * encapsulated CSS and slots are unavailable.
         */
        return this;
    }

    firstUpdated() {
    }

    clickAction() {
        let eventParams = Object.assign({pageId: this._page});
        this.dispatchEvent(new CustomEvent('rich-button-click', { detail: { buttonId: this.valuesButton.buttonId, eventParams: eventParams }}));
    }
}

customElements.define('rich-form-buttons', RichFormButtons);
