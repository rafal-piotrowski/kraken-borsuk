/* eslint-disable prefer-const */
/* eslint-disable lit/no-legacy-template-syntax */
/* eslint-disable prefer-template */
/* eslint-disable no-undef */
/* eslint-disable lit/no-invalid-html */
/* eslint-disable no-useless-constructor */
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
import { render } from 'lit-html';
import { styleMap } from 'lit-html/directives/style-map';
import { BorsukHeaderToastStyle } from './BorsukHeaderToastStyle.js';

import '@polymer/paper-toast';
import '@polymer/paper-dialog';
import '@polymer/paper-button';
import '@polymer/paper-slider';
import '@polymer/paper-input/paper-input';
import '../../packages/borsuk-button.js';

import { events } from '../../../properties/events.js';
import { titles } from '../../../properties/titles.js';

// konektor do store-a
import { connect } from 'pwa-helpers/connect-mixin.js';

// podłączenie do Redux store.
import { store } from '../../../redux/store.js';

export class BorsukHeaderToast extends connect(store)(LitElement) {

    static get styles() {
        return [BorsukHeaderToastStyle];
    }

    firstUpdated() {
        super.firstUpdated();
    }

    render() {
        return html`
            <paper-dialog id="addHeaderToast" duration="0" text="">
                <div class="searchToastBody quillToastColorBody">
                    <div class="titleNav">
                        <div class="filterHeader"><h4>Wybierz wielkość nagłówka</h4></div>
                    </div>

                    <div class="formGrid formGrid12">
                        <div id="headerChangeResult" class="ing-new-theme inputGrid formSpanGrid12">
                            <h1 id="headerValue">Nagłówek</h1>
                        </div>
                        <div class="inputGrid formSpanGrid12 formBorder formBottomShadow">
                            <paper-slider id="grade" class="inputFormSize90" pin snaps value="0" min="0" max="6" max-markers="6" step="1" @change=${this.headSliderChanged}></paper-slider>
                        </div>
                    </div>

                    <div class="quillToastButtons">
                        <borsuk-button @click=${this.setChosenHeader} class="btn btn-warning">Wstaw</borsuk-button>
                        <borsuk-button white @click=${this.quitHeaderToast} class="btn btn-warning">Anuluj</borsuk-button>
                    </div>

                </div>
            </paper-dialog>`;
    }

    stateChanged(state) {
        // this._page = state.cesuboffer.page;
        // this._slot = state.cesuboffer.slot;
    }

    openToast() {
        this.shadowRoot.getElementById("addHeaderToast").open();
    }

    quitHeaderToast() {
        this.shadowRoot.getElementById("addHeaderToast").toggle();
    }

    headSliderChanged() {
        let grade = this.shadowRoot.getElementById('grade');
        let headerChangeResult = this.shadowRoot.getElementById('headerChangeResult');
        let headerValue = this.shadowRoot.getElementById('headerValue');

        if (headerValue) { headerChangeResult.removeChild(headerValue); }

        if (grade.value > 0) {
            let newHeader = window.document.createElement('h'+grade.value);
            newHeader.innerHTML = "Nagłówek H"+grade.value;
            newHeader.setAttribute("id", "headerValue");
            headerChangeResult.appendChild(newHeader);
        } else {
            let newHeader = window.document.createElement('p');
            newHeader.innerHTML = "brak nagłówka";
            newHeader.setAttribute("id", "headerValue");
            headerChangeResult.appendChild(newHeader);
        }
    }

    setChosenHeader() {
        let grade = this.shadowRoot.getElementById('grade').value;
        this.quitHeaderToast();
        this.dispatchEvent(new CustomEvent('ev-confirm-header-chosen', { detail: { chosenHeader: grade } }));
    }

    static get properties() {
        return {
        }
    }

    constructor() {
        super();
    }
}
