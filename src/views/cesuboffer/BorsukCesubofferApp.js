/* eslint-disable import/newline-after-import */
/* eslint-disable prefer-template */
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
import { BorsukCesubofferStyle } from './BorsukCesubofferStyle.js';
import { loadJSON } from '../../helpers/asyncFunctions.js';

// konektor służący podłączaniu się do store-a
import { connect } from 'pwa-helpers/connect-mixin.js';
import '../../components/borsuk-navbar.js';
import '../../components/borsuk-sidebar.js';
import '../../components/borsuk-content.js';
import '../../components/borsuk-alert.js';
import '../../components/collections/borsuk-dialog.js';

import { titles } from '../../properties/titles.js';
import { actions } from '../../properties/actions.js';
import { events } from '../../properties/events.js';

// podłączenie do Redux store.
import { store } from '../../redux/store.js';

// załadowanie kreatorów akcji.
// getUserInfo do wywalenia po wrzuceniu do projektu.
import { getUserInfo, setClickAction } from '../../redux/actions/menu.js';
import { getCesubofferTabs, setCeClickAction } from '../../redux/actions/cesuboffer.js';

// podłączenie reducer-a.
import menu, { actionClickSelector, actionParamSelector, userInfoSelector } from '../../redux/reducers/menu.js';
import cesuboffer, { ceActionClickSelector, ceActionParamSelector } from '../../redux/reducers/cesuboffer.js';
store.addReducers({
    menu,
    cesuboffer
});

export class BorsukCesubofferApp extends connect(store)(LitElement) {
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

            <borsuk-dialog  id="dialogWindow" 
                            @confirm-dialog-fired=${this.confirmModal} 
                            @cancel-dialog-fired=${this.cancelModal}>
            </borsuk-dialog>
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
                <borsuk-navbar id="navbarApp" .mainNavTitle="${titles.get('cesubofferNavbarTitle')}"></borsuk-navbar>
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

        // poniższe do wycięcia po wdrożeniu do projektu
        this._setUserInfo();
        this._setCesubofferTabs();
    }

    // setUserInfo do wycięcia po wdrożeniu do projektu
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

    _setCesubofferTabs(jsonData) {
        if (jsonData) {
            store.dispatch(getCesubofferTabs(jsonData.cesubofferTabs));
        } else {
            loadJSON('/src/properties/_cesubofferTabs.json')
            .then(data => {
                store.dispatch(getCesubofferTabs(data.cesubofferTabs));
            })
        }
    }

    stateChanged(state) {
        if (ceActionClickSelector(state) === actions.get('closeTabAction')) {
            this.fireCustomEvent(state, actions.get('closeTabAction'), ceActionParamSelector(state));
        }

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
        if (actionClickSelector(state) === actions.get('homeAction')) { 
            store.dispatch(setClickAction(''));
            this.fireCustomEvent(state, actions.get('homeAction')); 
        }
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

    fireCustomEvent(state, type, param) {
        let actionInfo = [];
        actionInfo.push({ actionType: type, actionParam: param });

        this.menuElements = JSON.stringify({ cesubofferAction: actionInfo });
        
        if (type === actions.get('logoutAction')) {
            this.eventName = events.get('logoutEvent');
        } else if (type === actions.get('homeAction')) {
            this.eventName = events.get('homeEvent');
        } else if (type === actions.get('closeTabAction')) {
            this.eventName = events.get('closeTabEvent');
            setTimeout(() => store.dispatch(setCeClickAction('')), 200);
        }
        this.dispatchEvent(new CustomEvent(this.eventName, { detail: this.menuElements }));
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
        this.heading = titles.get('headRwdAlert');
        this.footing = titles.get('footRwdAlert');
        this.title = titles.get('titleRwdAlert');
    
        // **************************************
        // to powinno być chyba gdzieś w testach
        // **************************************
        this.addEventListener(events.get('logoutEvent'), this.handleCustomEvent);
        this.addEventListener(events.get('homeEvent'), this.handleCustomEvent);
        this.addEventListener(events.get('closeTabEvent'), this.handleCustomEvent);
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
