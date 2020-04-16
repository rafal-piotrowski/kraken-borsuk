/* eslint-disable no-plusplus */
/* eslint-disable radix */
/* eslint-disable import/named */
/* eslint-disable no-return-await */
/* eslint-disable arrow-body-style */
/* eslint-disable prefer-template */
/* eslint-disable no-param-reassign */
/* eslint-disable import/newline-after-import */
/* eslint-disable import/order */
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
import Sortable from 'sortablejs';
import { BorsukMenuStyle } from './BorsukMenuStyle.js';
import { loadJSON } from '../../helpers/asyncFunctions.js';

// konektor służący podłączaniu się do store-a
import { connect } from 'pwa-helpers/connect-mixin.js';
import '../../components/borsuk-navbar.js';
import '../../components/collections/borsuk-main-option.js';

import { homeAction, infoAction, logoutAction } from '../../properties/navbarProperties.js';
import { buttonClickAction } from '../../properties/mainMenuProperties.js';

// podłączenie do Redux store.
import { store } from '../../redux/store.js';

// załadowanie kreatorów akcji.
import { getUserInfo, getMenuOptions, getMenuNotifications, changeMenuIndex } from '../../redux/actions/menu.js';

// podłączenie reducer-a.
import menu, { menuOptionsSelector, menuIndexesSelector, actionClickSelector, actionParamSelector } from '../../redux/reducers/menu.js';
store.addReducers({
  menu
});

export class BorsukMenuApp extends connect(store)(LitElement) {
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

          ${Object.keys(this.menuOptions).map((key) => {
                const i = this.menuOptions[key];
                return html`<borsuk-main-option  id="${i.optionId}"
                                                index="${i.index}"
                                                data-name="${i.optionTitle}"
                                                class="menuOption inputGrid inputFrame formSpanGrid6"
                                                .valuesMenu="${i}" >
                            </borsuk-main-option>
                `;
            })}

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
        this.activateDraggableElements();

        // poniższe akcje set do zakomentowania po wdrożeniu do projektu
        this.setMenuOptions();
        this.setMenuNotifications();
        this.setUserInfo();
    }

    setMenuOptions(jsonData) {
        if (jsonData) {
            store.dispatch(getMenuOptions(jsonData.menuOptions));
        } else {
            loadJSON('/src/properties/menuOptions.json')
            .then(data => {
                store.dispatch(getMenuOptions(data.menuOptions));
            })
        }
    }

    setMenuNotifications(jsonData) {
        if (jsonData) {
            store.dispatch(getMenuNotifications(jsonData.menuNotifications));
        } else {
            loadJSON('/src/properties/menuNotifications.json')
            .then(data => {
                store.dispatch(getMenuNotifications(data.menuNotifications));
            })
        }
    }

    setUserInfo(jsonData) {
        if (jsonData) {
            store.dispatch(getUserInfo(jsonData.userInfo));
        } else {
            loadJSON('/src/properties/userInfo.json')
            .then(data => {
                store.dispatch(getUserInfo(data.userInfo));
            })
        }
    }

    stateChanged(state) {
        if (this.menuOptions !== menuOptionsSelector(state)) { this.menuOptions = menuOptionsSelector(state); }
        if (actionClickSelector(state) === infoAction) { this.openModal(); }
        if (actionClickSelector(state) === logoutAction) { this.quitMenu(state, logoutAction); }
        if (actionClickSelector(state) === buttonClickAction) { this.quitMenu(state, buttonClickAction, actionParamSelector(state)); }
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
                for (let i = 0; i < evt.to.children.length; i++ ) {
                    store.dispatch(changeMenuIndex(parseInt(evt.to.children[i].id), i));
                }
            },
        });
    }

    openModal() {
        // modal will be soon
    }

    quitMenu(state, type, param) {
        let actionInfo = [];
        let menuInfo = [];
        actionInfo.push({ actionType: type, actionParam: param });
        for(let i = 0; i < Object.keys(menuIndexesSelector(state)).length; i++){
            menuInfo.push({ optionId: menuIndexesSelector(state)[i].optionId, 
                            optionTitle: menuIndexesSelector(state)[i].optionTitle,
                            newIndex: menuIndexesSelector(state)[i].newIndex
                        });
        }

        this.menuElements = JSON.stringify({quitAction: actionInfo, menuOptions: menuInfo});
    }

    static get properties() {
        return {
            menuOptions: { type: Array },
            userInfo: { type: Object },
            positions: { type: Number }
        };
    }

    constructor() {
        super();

        this.userInfo = [];
        this.menuOptions = [];
        this.positions = 0;
    }

}
