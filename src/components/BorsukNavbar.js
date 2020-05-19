/* eslint-disable no-else-return */
/* eslint-disable no-undef */
/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */

import { LitElement, html, css } from 'lit-element';
import { BorsukNavbarStyle } from './BorsukNavbarStyle.js';
import { BorsukIngLogo } from './packages/borsuk-ing-logo.js';

import { homeAction, infoAction, logoutAction } from '../properties/actions.js';

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

    get operNaviTemplate() {
        return html`
            <nav class="navbar-expand-lg navbar-transparent navbar-fixed navbar-oper">
                <div class="mainOptionsGrid mainOptionNav formGrid12">
                    <div class="simple-text logo inputGrid formSpanGrid3">
                        <div class="img">${BorsukIngLogo}</div>
                    </div>
                    <div class="inputGrid formSpanGrid6">${this.mainNavTitle}</div>
                    <div class="navbar-brand buttonsGrid buttonsOper formSpanGrid3">${this.navigationTamplete}</div>
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
        if (this.mainNavi) {
            return html`${this.mainButtons.map(i => html`<borsuk-navbar-buttons .valuesButton="${i}"></borsuk-navbar-buttons>`)}`;
        } else {
            return html`${this.operButtons.map(i => html`<borsuk-navbar-buttons .valuesButton="${i}"></borsuk-navbar-buttons>`)}`;
        }
    }

    static get properties() {
        return {
            mainButtons: { type: Array },
            operButtons: { type: Array },
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
        this.mainButtons = [{
            buttonId: homeAction,
            buttonTooltip: 'Przejdź do strony głównej',
            buttonIcon: 'home',
            buttonActive: false,
            buttonList: [{
            }],
        },{
            buttonId: infoAction,
            buttonTooltip: 'Zobacz informacje o użytkowniku',
            buttonIcon: 'supervisor-account',
            buttonActive: true,
            buttonList: [{
            }],
        },{
            buttonId: logoutAction,
            buttonTooltip: 'Wyloguj',
            buttonIcon: 'power-settings-new',
            buttonActive: true,
            buttonList: [{
            }],
        }];

        this.operButtons = [{
            buttonId: homeAction,
            buttonTooltip: 'Przejdź do strony głównej',
            buttonIcon: 'home',
            buttonActive: true,
            buttonList: [{
            }],
        },{
            buttonId: infoAction,
            buttonTooltip: 'Zobacz informacje o użytkowniku',
            buttonIcon: 'supervisor-account',
            buttonActive: true,
            buttonList: [{
            }],
        },{
            buttonId: logoutAction,
            buttonTooltip: 'Wyloguj',
            buttonIcon: 'power-settings-new',
            buttonActive: true,
            buttonList: [{
            }],
        }]
    }

    firstUpdated() {
    }

}
