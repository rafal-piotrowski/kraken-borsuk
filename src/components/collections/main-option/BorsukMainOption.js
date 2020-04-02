/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */

import { LitElement, html, css } from 'lit-element';
import { BorsukMainOptionStyle } from './BorsukMainOptionStyle.js';
import '../../packages/borsuk-button.js';
import '../../packages/borsuk-link.js';

export class BorsukMainOption extends LitElement {
    static get styles() {
        return [BorsukMainOptionStyle];
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
                ${this.valuesMenu.optionList.map(i => html`<div class="box">${i.text}</div><div class="buttonBox"><borsuk-link>${i.textButton}</borsuk-link></div>`)}
            </div>
        `;
    }

    get buttonActiveTemplate() {
        return html`<div class="buttonHeader ing-new-theme">${this.buttonInsideTemplate}</div>`;
    }

    get buttonInactiveTemplate() {
        return html`<div class="buttonHeader ing-new-theme" disabled>${this.buttonInsideTemplate}</div>`;
    }

    get buttonInsideTemplate() {
        return html`<borsuk-button id="${this.valuesMenu.optionId}">przejdź...</borsuk-button>`;
    }

    static get properties() {
        return {
            endPosition: { type: Number },
        };
    }

}
