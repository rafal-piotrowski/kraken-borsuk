/* eslint-disable no-useless-constructor */
/* eslint-disable no-undef */
/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */

import { LitElement, html, css } from 'lit-element';
import { BorsukInfoStyle } from './BorsukInfoStyle.js';

export class BorsukInfo extends LitElement {
    static get styles() {
        return [BorsukInfoStyle];
    }

    render() {
        return html`
            <div class="wrapper-rwd">
                <div id="main-view" class="container flex">
                    <div class="flexmargin"></div>
                    <div class="flexcenter">
                        <!-- <div class="card card-nav-tabs text-center">
                            <div class="card-header card-header-warning">
                                header
                            </div>
            
                            <div class="card-body flex">
                                <div class="flexmargin"></div>
                                <div class="flexformcenter"> -->

                                    <h2>BORSUK 2</h2>
                
                                <!-- </div>
                                <div class="flexmargin"></div>
                            </div>
                            <div class="card-footer text-muted">
                                Kraken
                            </div>
                        </div> -->
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
