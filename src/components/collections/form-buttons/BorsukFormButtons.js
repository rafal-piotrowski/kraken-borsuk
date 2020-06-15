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
import { BorsukFormButtonsStyle } from './BorsukFormButtonsStyle.js';
import { borsukAddSuboffer, borsukAddVersion, borsukApprove, borsukCopySuboffer, borsukCopyVersion, 
    borsukPublishTest, borsukPublishProd, borsukPublic, borsukChevronDown, borsukChevronUp,
    borsukRemoveSuboffer, borsukRemoveVersion, borsukSaveSuboffer, borsukSaveVersion } from '../../../icons/icons.js';

// konektor do store-a
import { connect } from 'pwa-helpers/connect-mixin.js';
import '@polymer/paper-tooltip/paper-tooltip';
import '@polymer/iron-icons/iron-icons';
import '@polymer/iron-icon/iron-icon';
import '../../packages/borsuk-button.js';
import '../../packages/borsuk-icon.js';

// podłączenie do Redux store.
import { store } from '../../../redux/store.js';

// załadowanie kreatorów akcji.
import { setClickAction } from '../../../redux/actions/customevents.js';

// podłączenie reducer-a.
import cesuboffer, { getActivePage } from '../../../redux/reducers/cesuboffer.js';

export class BorsukFormButtons extends connect(store)(LitElement) {
    static get styles() {
        return [BorsukFormButtonsStyle];
    }

    static get properties() {
        return {
            _page: { type: String },
        };
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
            <borsuk-button smicon animate id="${this.valuesButton.buttonId}Button" class="btn-icon-animated btn-icon-ing" @click=${this.clickAction}>
                <borsuk-icon .svg=${this.valuesButton.buttonIcon}></borsuk-icon>
            </borsuk-button>
        `;
    }

    get buttonDisabledTemplate() {
        return html`
            <borsuk-button smicon animate disable id="${this.valuesButton.buttonId}Button" class="btn-icon-animated btn-icon-ing">
                <borsuk-icon .svg=${this.valuesButton.buttonIcon}></borsuk-icon>
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
        let eventParams = Object.assign({pageId: this._page});
        store.dispatch(setClickAction(this.valuesButton.buttonId, eventParams));
    }

    stateChanged(state) {
        this._page = getActivePage(state);
    }

}
