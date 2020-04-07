/* eslint-disable no-useless-constructor */
/* eslint-disable no-undef */
/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */

import { LitElement, html, css } from 'lit-element';
import { BorsukAlertStyle } from './BorsukAlertStyle.js';

export class BorsukAlert extends LitElement {
    static get styles() {
        return [BorsukAlertStyle];
    }

    render() {
        return html`
            <div class="wrapper-rwd">
                <div id="main-view" class="container flex">
                    <div class="flexmargin"></div>
                    <div class="flexcenter">
                        <div class="card card-nav-tabs text-center">
                            <div class="card-header card-header-warning">
                                ${this.heading}
                            </div>
            
                            <div class="card-body flex">
                                <div class="flexmargin"></div>
                                <div class="flexformcenter">

                                    <h2>${this.title}</h2>
                
                                </div>
                                <div class="flexmargin"></div>
                            </div>
                            <div class="card-footer text-muted">
                                ${this.footing}
                            </div>
                        </div>
                    </div>
                    <div class="flexmargin"></div>
                </div>
            </div>
        `;
    }

    static get properties() {
        return {
        };
    }

    constructor() {
        super();
    }

    firstUpdated() {
    }

}
