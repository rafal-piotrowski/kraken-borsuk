/* eslint-disable no-plusplus */
/* eslint-disable prefer-const */
/* eslint-disable prefer-template */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable no-console */
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
import { BorsukVersionStatusStyle } from './BorsukVersionStatusStyle.js';

import '../../packages/borsuk-step.js';
import '../../packages/borsuk-steps.js';
import '../borsuk-steps-indicator.js';
 
import { events } from '../../../properties/events.js';
import { titles } from '../../../properties/titles.js';

// konektor do store-a
import { connect } from 'pwa-helpers/connect-mixin.js';

// podłączenie do Redux store.
import { store } from '../../../redux/store.js';

// załadowanie kreatorów akcji.
import { changeFormValue } from '../../../redux/actions/cesuboffer.js';

import { cesubofferPageReselector } from '../../../redux/reducers/cesuboffer.js';

export class BorsukVersionStatus extends connect(store)(LitElement) {

    constructor() {
        super();
        this.versionDetails = {};
    }
 
    static get properties() {
        return {
            versionDetails: { type: Object },
        }
    }
 
    static get styles() {
        return [BorsukVersionStatusStyle];
    }
 
    firstUpdated() {
    }
 
    render() {
        return html`
        ${Object.keys(this.versionDetails).map((key) => {
            const i = this.versionDetails[key];
            return html`
                <borsuk-steps id="vsteps_${i.tabPageId}">
                    <borsuk-steps-indicator slot="indicator"></borsuk-steps-indicator>
                        <borsuk-step class="versionStep" initial-step label="">${i.statusDesc}</borsuk-step>
                        <borsuk-step class="versionStep" label="">${i.statusDesc}</borsuk-step>
                        <borsuk-step class="versionStep" label="">${i.statusDesc}</borsuk-step>
                </borsuk-steps>
            `})}
        `;
    }

    stateChanged(state) {
        if (this.versionDetails !== cesubofferPageReselector(state)) { 
            this.versionDetails = cesubofferPageReselector(state);
            setTimeout(() => {
                this.updateStatus();
            }, 200); 
        }
        this._page = state.cesuboffer.page;
        // this._slot = state.cesuboffer.slot;
    }

    updateStatus() {
        let attribute = this.shadowRoot.querySelectorAll('.versionStep');
        for (let i=0; i < attribute.length; i++) {
            attribute[i].setAttribute('status', 'untouched'); 
        }

        if (this.versionDetails[0].tabSlotId === 'S02') {
            this.shadowRoot.getElementById('vsteps_'+this.versionDetails[0].tabPageId)._goTo(this.versionDetails[0].status,0,false); 
        }
    }
}
