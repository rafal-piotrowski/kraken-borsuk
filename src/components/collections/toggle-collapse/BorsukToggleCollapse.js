/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-lonely-if */
/* eslint-disable no-var */
/* eslint-disable prefer-template */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */

import { LitElement, html, css } from 'lit-element';
import { BorsukToggleCollapseStyle } from './BorsukToggleCollapseStyle.js';

import { borsukDoubleChevronUp, borsukDoubleChevronDown } from '../../../icons/icons.js';
import '@polymer/iron-icons/iron-icons';
import '@polymer/iron-icon/iron-icon';
import '@polymer/iron-collapse/iron-collapse';
import '@polymer/paper-toggle-button/paper-toggle-button';
import '../../packages/borsuk-button.js';

export class BorsukToggleCollapse extends LitElement {
    static get styles() {
        return [BorsukToggleCollapseStyle];
    }


    // <borsuk-button smicon id="hideFilter" class="btn-icon-animated btn-icon-ing" @click="${this.toggle}" aria-expanded="${this.opened}" aria-controls="collapse">
    //                             <borsuk-icon .svg=${borsukDoubleChevronDown}></borsuk-icon>
    //                         </borsuk-button>

    render() {
        return html`
            <div class="formFilter">
                <form>
                    <div class="titleNav">
                        <div class="filterHeader">
                            ${this.opened ? html`` : html`
                                <h4>Brak zdefiniowanej komunikacji dla tego kanału</h4>
                                `}
                        </div>
                        <div>
                            <paper-toggle-button 
                                id="togglePushChannel" 
                                class="toggleForChannels" 
                                @tap="${this.toggle}" 
                                aria-expanded="${this.opened}" 
                                aria-controls="collapse" 
                                ?checked="${this.opened}">
                            </paper-toggle-button>
                        </div>
                    </div>

                    <iron-collapse id="collapse" .opened="${this.opened}" .horizontal="${this.horizontal}" .no-animation="${this.noAnimation}" tabindex="0">
                        <slot></slot>
                    </iron-collapse>
                </form>
            </div>
        `;
    }

    static get properties() {
        return {
            horizontal: { type: Boolean },
            opened: {
                type: Boolean,
                reflectToAttribute: true,
            },
        };
    }

    toggle() {
        const activeToggle = (this.opened) ? false : true;
        this.shadowRoot.getElementById('collapse').toggle();
        this.dispatchEvent(new CustomEvent('change-toggle', {detail: {activeFlg: activeToggle}}));
    }

}
