/* eslint-disable lit/binding-positions */
/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */

import { LitElement, html, css } from 'lit-element';
import { BorsukNavbarButtonsStyle } from './BorsukNavbarButtonsStyle.js';
import '@polymer/paper-tooltip/paper-tooltip';
import '@polymer/iron-icons/iron-icons';
import '@polymer/iron-icon/iron-icon';
import '../../packages/borsuk-button.js';

export class BorsukNavbarButtons extends LitElement {
    static get styles() {
        return [BorsukNavbarButtonsStyle];
    }

    render() {
        return html`
                <!-- <paper-icon-button   -->
                                <!-- icon="${this.valuesButton.buttonIcon}"  -->
            <borsuk-button icon @click="${this.valuesButton.buttonAction}"
                                id="${this.valuesButton.buttonId}Button" 
                                class="navIconButton">
                <iron-icon icon="${this.valuesButton.buttonIcon}"></iron-icon>
            </borsuk-button>
                <!-- </paper-icon-button> -->
            <paper-tooltip  id="${this.valuesButton.buttonId}Tooltip" 
                            for="${this.valuesButton.buttonId}Button" 
                            animation_delay="500" animation-entry="scale-up-animation" 
                            animation-exit="scale-down-animation">
                ${this.valuesButton.buttonTooltip}
            </paper-tooltip>
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

    _home() {
        console.log('going home...');
    }

    _userinfo() {
    }

    _logout() {
        console.log('bye...');
    }

}
