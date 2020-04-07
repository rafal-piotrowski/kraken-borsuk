/* eslint-disable func-names */
/* eslint-disable no-undef */
/* eslint-disable prefer-const */
/* eslint-disable object-shorthand */
/* eslint-disable lit/no-useless-template-literals */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
/* eslint-disable lit/no-legacy-template-syntax */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */

import { LitElement, html, css } from 'lit-element';
import { BorsukCesubofferStyle } from './BorsukCesubofferStyle.js';
import '../../components/borsuk-navbar.js';
import '../../components/borsuk-sidebar.js';
import '../../components/borsuk-content.js';
import '../../components/borsuk-alert.js';

export class BorsukCesubofferApp extends LitElement {
    static get styles() {
        return [
            BorsukCesubofferStyle,
            css`
        `];
    }

    render() {
        return html`
            <borsuk-alert   class="drawer" 
                            id="drawerInfo"
                            .heading="${this.heading}"
                            .title="${this.title}"
                            .footing="${this.footing}">
            </borsuk-alert>>

            <div id="subofferOper" class="wrapper flex-stretch-align">
                    ${this.sidebarTemplate}
                <div id="workLayout" class="stretch-right">
                    ${this.navbarTemplate}
                    ${this.contentTemplate}
                </div>
            </div>
        `;
    }

    get sidebarTemplate() {
        return html`
            <div id="treeLayout" class="sidebar flex-leftbar" data-color="orange" data-background-color="white">
                <div class="sidebar-wrapper">
                    <borsuk-sidebar id="treeView"></borsuk-sidebar>
                </div>
            </div>
        `;
    }

    get navbarTemplate() {
        return html`
            <div id="navLayout" class="flex-navbar">
                <borsuk-navbar id="navbarApp" .mainNavTitle="${"SUBOFERTY OPERACYJNE"}"></borsuk-navbar>
            </div>
        `;
    }

    get contentTemplate() {
        return html`
            <div id="tabsLayout" class="flex-content">
                <borsuk-content id="contentApp"></borsuk-content>
            </div>
        `;
    }

    // createRenderRoot() {
    /**
     * Render template without shadow DOM. Note that shadow DOM features like
     * encapsulated CSS and slots are unavailable.
     */
    //     return this;
    // }

    firstUpdated() {
        // this.activateDraggableElements();
    }

    static get properties() {
        return {
            heading: { type: String },
            footing: { type: String },
            title: { type: String }
        };
    }

    constructor() {
        super();
        this.heading = ' Drogi użytkowniku';
        this.footing = 'Przejdź do strony głównej lub zgłoś problem do administratora sytemu';
        this.title = 'Na chwilę obecną nie możemy obsłużyć tej rozdzielczości ekranu';
    }
}
