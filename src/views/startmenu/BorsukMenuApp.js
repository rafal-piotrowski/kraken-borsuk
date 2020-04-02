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
import { BorsukMenuStyle } from './BorsukMenuStyle.js';
import '../../components/borsuk-navbar.js';
import '../../components/collections/borsuk-main-option.js';

export class BorsukMenuApp extends LitElement {
    static get styles() {
        return [
            BorsukMenuStyle,
            css`
        `];
    }

    render() {
        return html`
            <div id="mainMenuContainer">
                ${this.navTemplate}
                ${this.contentTemplate}
                ${this.footTemplate}
            </div>
        `;
    }

    get navTemplate() {
        return html`
            <div id="navLayout" class="inputGrid formSpanGrid12">
                <borsuk-navbar id="navbarApp" .mainNavi=${true} .mainNavTitle=${"BORSUK - MENU GŁÓWNE"}></borsuk-navbar>
            </div>
        `;
    }

    get contentTemplate() {
        return html`
          <div id="menuLayout" class="mainOptionsGrid formGrid12 list-group">
              ${this.menuOptions.map(i => html`<borsuk-main-option  id="option_${i.optionId}"
                                                                    data-start-position="${i.optionId}"
                                                                    data-end-position="${i.optionId}"
                                                                    data-name="${i.optionTitle}"
                                                                    class="menuOption inputGrid inputFrame formSpanGrid6"
                                                                    .valuesMenu="${i}" >
                                                </borsuk-main-option>`)}
          </div>
        `;
    }

    get footTemplate() {
        return html`<div id="footLayout"></div>`;
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

    activateDraggableElements() {
        let el = this.shadowRoot.querySelector('#menuLayout');
        let sortable = new Sortable(el, {
            /* options */
            animation: 300,
            easing: "cubic-bezier(0.23, 1, 0.32, 1)",
            ghostClass: "my-ghost-class",
            chosenClass: "my-chosen-class",
            dragClass: "my-drag-class",
            onEnd: function (evt) {
                evt.item.setAttribute('dataendposition', evt.newIndex + 1);
            },
        });
    }

    static get properties() {
        return {
            menuOptions: { type: Array },
        };
    }

    constructor() {
        super();
        this.menuOptions = [{
                optionId: 1,
                optionTitle: 'SUBOFERTY OPERACYJNE',
                optionList: [{
                    title: '',
                    text: 'Jeżeli chcesz dodać nową subofertę, kliknij w ten ...',
                    typeButton: '',
                    iconButton: '',
                    textButton: 'LINK',
                    show: true,
                },{
                    title: '',
                    text: 'Do wyszukiwarki zaprowadzi Cie ten ...',
                    typeButton: '',
                    iconButton: '',
                    textButton: 'LINK',
                    show: true,
                }],
                active: true,
            }, {
                optionId: 2,
                optionTitle: 'SUBOFERTY MARKETINGOWE',
                optionList: [{
                    title: '',
                    text: 'moduł w trakcie prac developerskich',
                    typeButton: '',
                    iconButton: '',
                    textButton: '',
                    show: true,
                }],
                active: true,
            }, {
                optionId: 3,
                optionTitle: 'FORMATKI MARKETINGOWE',
                optionList: [{
                    title: '',
                    text: 'moduł w trakcie zbierania wymagań',
                    typeButton: '',
                    iconButton: '',
                    textButton: '',
                    show: true,
                }],
                active: false,
            }, {
                optionId: 4,
                optionTitle: 'FORMATKI OPERACYJNE',
                optionList: [{
                    title: '',
                    text: 'moduł w trakcie zbierania wymagań',
                    typeButton: '',
                    iconButton: '',
                    textButton: '',
                    show: true,
                }],
                active: false,
            }, {
                optionId: 5,
                optionTitle: 'PANEL ADMINISTRACYJNY',
                optionList: [{
                    title: '',
                    text: 'moduł w trakcie zbierania wymagań',
                    typeButton: '',
                    iconButton: '',
                    textButton: '',
                    show: true,
                }],
                active: false,
            }
        ]
    }
}
