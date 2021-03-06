/* eslint-disable eqeqeq */
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
import { BorsukNavbarButtonsStyle } from './BorsukNavbarButtonsStyle.js';
import { Router } from '@vaadin/router';
import { homeAction, infoAction, logoutAction } from '../../../properties/actions.js';
// konektor do store-a
import { connect } from 'pwa-helpers/connect-mixin.js';
import '@polymer/paper-tooltip/paper-tooltip';
import '@polymer/iron-icons/iron-icons';
import '@polymer/iron-icon/iron-icon';
import '../../packages/borsuk-button.js';

// podłączenie do Redux store.
import { store } from '../../../redux/store.js';

// załadowanie kreatorów akcji.
import { setClickAction } from '../../../redux/actions/customevents.js';

export class BorsukNavbarButtons extends connect(store)(LitElement) {
// export class BorsukNavbarButtons extends LitElement {
    static get styles() {
        return [BorsukNavbarButtonsStyle];
    }

    render() {
        return html`
            ${this.valuesButton.buttonActive ? html`${this.buttonActiveTemplate}` : html`${this.buttonDisabledTemplate}`}
            <paper-tooltip  id="${this.valuesButton.buttonId}Tooltip" 
                            for="${this.valuesButton.buttonId}Button" 
                            animation_delay="500" animation-entry="scale-up-animation" 
                            animation-exit="scale-down-animation">
                ${this.valuesButton.buttonTooltip}
            </paper-tooltip>
        `;
    }

    get buttonActiveTemplate() {
        return html`
            <borsuk-button icon @click=${this.clickAction} id="${this.valuesButton.buttonId}Button">
                <iron-icon icon="${this.valuesButton.buttonIcon}"></iron-icon>
            </borsuk-button>
        `;
    }

    get buttonDisabledTemplate() {
        return html`
            <borsuk-button icon disable id="${this.valuesButton.buttonId}Button">
                <iron-icon icon="${this.valuesButton.buttonIcon}"></iron-icon>
            </borsuk-button>
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
        store.dispatch(setClickAction(this.valuesButton.buttonId));
        if (this.valuesButton.buttonId == homeAction) {
            Router.go(`/menu`);
        } else if (this.valuesButton.buttonId == logoutAction) {
            Router.go(`/`);
        }
    }

}
