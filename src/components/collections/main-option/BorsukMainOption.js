/* eslint-disable prefer-object-spread */
/* eslint-disable prefer-template */
/* eslint-disable prefer-const */
/* eslint-disable no-undef */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable arrow-body-style */
/* eslint-disable import/order */
/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */

import { LitElement, html, css } from 'lit-element';
import { BorsukMainOptionStyle } from './BorsukMainOptionStyle.js';

// konektor służący podłączaniu się do store-a
import { connect } from 'pwa-helpers/connect-mixin.js';
import '../../packages/borsuk-button.js';
import '../../packages/borsuk-link.js';

import { actions } from '../../../properties/actions.js';
import { titles } from '../../../properties/titles.js';

// podłączenie do Redux store.
import { store } from '../../../redux/store.js';

// załadowanie kreatorów akcji.
import { setClickAction } from '../../../redux/actions/customevents.js';

// podłączenie reducer-a.
import { menuNotificationsSelector } from '../../../redux/reducers/menu.js';

export class BorsukMainOption extends connect(store)(LitElement) {
    static get styles() {
        return [BorsukMainOptionStyle];
    }

    firstUpdated() {
    }

    render() {
        return html`
            <div class="headContainer optionContainer">
              <div class="optionHeader">
                <h3>${this.valuesMenu.optionTitle}</h3>
              </div>
              ${this.valuesMenu.active? html`${this.buttonActiveTemplate}`: html`${this.buttonInactiveTemplate}`}
            </div>
    
            <div class="bodyContainer optionContainer">
                ${Object.keys(this.menuNotifications)
                    .filter((key) => { return this.menuNotifications[key].optionId === this.valuesMenu.optionId})
                    .map((key) => {
                    const i = this.menuNotifications[key];
                    return html`<div class="box">${i.notificationTitle}</div>
                                <div class="buttonBox">
                                ${i.showLink
                                    ? html`<borsuk-link>${titles.get('linkRedirectLabel')}</borsuk-link>`
                                    : ''}
                                </div>`;
                })}
            </div>
        `;
    }

    stateChanged(state) {
        if (this.menuNotifications !== menuNotificationsSelector(state)) { this.menuNotifications = menuNotificationsSelector(state); }
    }

    get buttonActiveTemplate() {
        return html`<div class="buttonHeader ing-new-theme">${this.buttonInsideTemplate}</div>`;
    }

    get buttonInactiveTemplate() {
        return html`<div class="buttonHeader ing-new-theme" disabled>${this.buttonInsideTemplate}</div>`;
    }

    get buttonInsideTemplate() {
        return html`<borsuk-button id="${this.valuesMenu.optionId}" @click=${this.clickAction}>${titles.get('buttonRedirectLabel')}</borsuk-button>`;
    }

    static get properties() {
        return {
            endPosition: { type: Number },
            menuNotifications: { type: Array }
        };
    }

    clickAction(event) {
        let eventParams = Object.assign({actionRedirect: this.valuesMenu.optionId});
        store.dispatch(setClickAction(actions.get('buttonClickAction'), eventParams));
    }

    constructor() {
        super();
        this.menuNotifications = [];
    }

}
