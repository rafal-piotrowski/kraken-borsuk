/* eslint-disable no-undef */
/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */

import { LitElement, html, css } from 'lit-element';
import { BorsukNavbarStyle } from './BorsukNavbarStyle.js';
import { BorsukIngLogo } from './packages/borsuk-ing-logo.js';
import './collections/borsuk-navbar-buttons.js';

export class BorsukNavbar extends LitElement {
    static get styles() {
        return [BorsukNavbarStyle];
    }

    render() {
        return html`
            ${this.mainNavi? html`${this.mainNaviTemplate}`: html`${this.operNaviTemplate}`}
        `;
    }

    get mainNaviTemplate() {
        return html`
            <nav class="navbar navbar-expand-lg navbar-transparent navbar-fixed navbar-gradient">
                <div class="mainOptionsGrid mainOptionNav formGrid12">
                    ${this.logoTemplate}
                    ${this.titleTemplate}
                    <div class="navbar-brand buttonsGrid inputFrame formSpanGrid3">${this.navigationTamplete}</div>
                </div>
            </nav>   
        `;
    }

    get logoTemplate() {
        return html`
            <div class="simple-text logo inputGrid inputFrame formSpanGrid3">
                <div class="img">${BorsukIngLogo}</div>
            </div>
        `;
    }

    get titleTemplate() {
        return html`<div class="inputGrid inputFrame formSpanGrid6">${this.mainNavTitle}</div>`;
    }

    get navigationTamplete() {
        return html`${this.buttonOptions.map(i => html`<borsuk-navbar-buttons .valuesButton="${i}"></borsuk-navbar-buttons>`)}`;
    }

    get operNaviTemplate() {
        return html`
            <nav class="navbar-expand-lg navbar-transparent navbar-fixed">
                <div class="container-fluid">
                    <div class="flex-navbar navbar-gradient">
                        <div class="logo navbar-wrapper flexnav-left">
                            <div class="simple-text logo-normal">
                                <img src="../../../img/ing_logo_ux.png">
                            </div>
                            <div class="navbar-brand">${this.mainNavTitle}</div>
                        </div>
                        <div id="filterLayout" class="flexnav-right">
                            <div class="flexpaper">
                                <div>${this.navigationTamplete}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        `;
    }

    static get properties() {
        return {
            buttonOptions: { type: Array },
            imgsrcIngLogo: { type: String },
            corporateKey: { type: String },
            lastSuccessLogin: { type: String },
            lastFailureLogin: { type: String },
            // mainNavTitle: { type: String },
            _suboffer_name: String,
            _suboffer_version: String,
            _suboffer_status: String,
        };
    }

    constructor() {
        super();

        // this.mainNavTitle = "MENU GŁÓWNE";
        this.buttonOptions = [{
            buttonId: 'home',
            buttonTooltip: 'Przejdź do strony głównej',
            buttonIcon: 'home',
            buttonAction: '_home',
            buttonList: [{
            }],
        },{
            buttonId: 'info',
            buttonTooltip: 'Zobacz informacje o użytkowniku',
            buttonIcon: 'supervisor-account',
            buttonAction: '_userinfo',
            buttonList: [{
            }],
        },{
            buttonId: 'logout',
            buttonTooltip: 'Wyloguj',
            buttonIcon: 'power-settings-new',
            buttonAction: '_logout',
            buttonList: [{
            }],
        }]
    }

    firstUpdated() {
    }

}
