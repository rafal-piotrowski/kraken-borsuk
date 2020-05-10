/* eslint-disable no-restricted-globals */
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
import '../../components/collections/borsuk-dialog.js';

import { titles } from '../../properties/titles.js';
import { actions } from '../../properties/actions.js';
import { events } from '../../properties/events.js';

// podłączenie do Redux store.
import { store } from '../../redux/store.js';

// załadowanie kreatorów akcji.
import { getUserInfo, getMenuOptions, getMenuNotifications, changeMenuIndex, setClickAction } from '../../redux/actions/menu.js';

// podłączenie reducer-a.
import menu, { menuOptionsSelector, menuIndexesSelector, actionClickSelector, actionParamSelector, userInfoSelector } from '../../redux/reducers/menu.js';
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
            <borsuk-dialog  id="dialogWindow" 
                            @confirm-dialog-fired=${this.confirmModal} 
                            @cancel-dialog-fired=${this.cancelModal}>
            </borsuk-dialog>
        `;
    }

    get navTemplate() {
        return html`
            <div id="navLayout" class="inputGrid formSpanGrid12">
                <borsuk-navbar id="navbarApp" .mainNavi=${true} .mainNavTitle=${titles.get('menuNavbarTitle')}></borsuk-navbar>
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
        this._setMenuOptions();
        this._setMenuNotifications();
        this._setUserInfo();
    }

    _setMenuOptions(jsonData) {
        if (jsonData) {
            store.dispatch(getMenuOptions(jsonData.menuOptions));
        } else {
            loadJSON('/src/properties/_menuOptions.json')
            .then(data => {
                store.dispatch(getMenuOptions(data.menuOptions));
            })
        }
    }

    _setMenuNotifications(jsonData) {
        if (jsonData) {
            store.dispatch(getMenuNotifications(jsonData.menuNotifications));
        } else {
            loadJSON('/src/properties/_menuNotifications.json')
            .then(data => {
                store.dispatch(getMenuNotifications(data.menuNotifications));
            })
        }
    }

    _setUserInfo(jsonData) {
        if (jsonData) {
            store.dispatch(getUserInfo(jsonData.userInfo));
        } else {
            loadJSON('/src/properties/_userInfo.json')
            .then(data => {
                store.dispatch(getUserInfo(data.userInfo));
            })
        }
    }

    stateChanged(state) {
        if (this.menuOptions !== menuOptionsSelector(state)) { this.menuOptions = menuOptionsSelector(state); }
        if (actionClickSelector(state) === actions.get('infoAction')) { 
            store.dispatch(setClickAction(''));
            this.openModal( 'M', 'I', 
                            titles.get('ckeyLabel')+userInfoSelector(state)[1].ckey, 
                            titles.get('lastLoginSuccessLabel')+userInfoSelector(state)[1].lastLoginSuccess, 
                            titles.get('lastLoginFailureLabel')+userInfoSelector(state)[1].lastLoginFailure);
        }
        if (actionClickSelector(state) === actions.get('logoutAction')) { 
            store.dispatch(setClickAction('')); 
            this.fireCustomEvent(state, actions.get('logoutAction')); 
        }
        if (actionClickSelector(state) === actions.get('buttonClickAction')) { 
            store.dispatch(setClickAction('')); 
            this.fireCustomEvent(state, actions.get('buttonClickAction'), actionParamSelector(state)); 
        }
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

    fireCustomEvent(state, type, param) {
        let actionInfo = [];
        let menuInfo = [];
        actionInfo.push({ actionType: type, actionParam: param });
        for(let i = 0; i < Object.keys(menuIndexesSelector(state)).length; i++){
            menuInfo.push({ optionId: menuIndexesSelector(state)[i].optionId, 
                            optionTitle: menuIndexesSelector(state)[i].optionTitle,
                            newIndex: menuIndexesSelector(state)[i].newIndex
                        });
        }

        this.menuElements = JSON.stringify({menuAction: actionInfo, menuOptions: menuInfo});

        if (type === actions.get('logoutAction')) {
            this.eventName = events.get('logoutEvent');
        } else if (type === actions.get('buttonClickAction')) {
            this.eventName = events.get('buttonClickEvent');
        }
        this.dispatchEvent(new CustomEvent(this.eventName, { detail: this.menuElements }));
    }

    openModal(type, mode, textLine1, textLine2, textLine3, jsonToken, scale) {
        if (type === 'T') { this.shadowRoot.getElementById('dialogWindow').openToast(mode, textLine1, jsonToken) }
        if (type === 'M') { this.shadowRoot.getElementById('dialogWindow').openDialog(mode, textLine1, textLine2, textLine3, jsonToken, scale); }
    }

    confirmModal(event) {
        this.dialogElements = event.detail;
        this.dispatchEvent(new CustomEvent(events.get('confirmModalEvent'), { detail: this.dialogElements }));
    }

    cancelModal(event) {
        this.dialogElements = event.detail;
        this.dispatchEvent(new CustomEvent(events.get('cancelModalEvent'), { detail: this.dialogElements }));
    }

    static get properties() {
        return {
            menuOptions: { type: Array },
            userInfo: { type: Object },
            positions: { type: Number },
            eventName: { type: String }
        };
    }

    constructor() {
        super();

        this.userInfo = [];
        this.menuOptions = [];
        this.positions = 0;
        this.eventName = '';

        // **************************************
        // to powinno być chyba gdzieś w testach
        // **************************************
        this.addEventListener(events.get('logoutEvent'), this.handleCustomEvent);
        this.addEventListener(events.get('buttonClickEvent'), this.handleCustomEvent);
        this.addEventListener(events.get('confirmModalEvent'), this.handleCustomEvent);
        this.addEventListener(events.get('cancelModalEvent'), this.handleCustomEvent);
    }

    // **************************************
    // to powinno być chyba gdzieś w testach
    // **************************************
    handleCustomEvent(event) { 
        console.log(event.type);
        console.log(event.detail); 
    }

}
