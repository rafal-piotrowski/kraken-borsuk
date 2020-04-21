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
// import { loadJSON } from '../../helpers/asyncFunctions.js';

// konektor służący podłączaniu się do store-a
import { connect } from 'pwa-helpers/connect-mixin.js';
import '../../components/borsuk-navbar.js';
import '../../components/borsuk-sidebar.js';
import '../../components/borsuk-content.js';
import '../../components/borsuk-alert.js';
import '../../components/collections/borsuk-dialog.js';

import { homeAction, infoAction, logoutAction, cesubofferNavbarTitle } from '../../properties/navbarProperties.js';

// podłączenie do Redux store.
import { store } from '../../redux/store.js';

// załadowanie kreatorów akcji.
// import { getUserInfo } from '../../redux/actions/menu.js';

// podłączenie reducer-a.
import menu, { actionClickSelector, actionParamSelector, userInfoSelector } from '../../redux/reducers/menu.js';
store.addReducers({
    menu
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
                <borsuk-navbar id="navbarApp" .mainNavTitle="${cesubofferNavbarTitle}"></borsuk-navbar>
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
        // this.setUserInfo();
    }

    // setUserInfo(jsonData) {
    //     if (jsonData) {
    //         store.dispatch(getUserInfo(jsonData.userInfo));
    //     } else {
    //         loadJSON('/src/properties/userInfo.json')
    //         .then(data => {
    //             store.dispatch(getUserInfo(data.userInfo));
    //         })
    //     }
    // }

    stateChanged(state) {
        if (actionClickSelector(state) === infoAction) { 
            this.openModal( 'M', 'I', 
                            'Użytkownik: '+userInfoSelector(state)[1].ckey, 
                            'Ostatnie logowanie: '+userInfoSelector(state)[1].lastLoginSuccess, 
                            'Ostatnie niepoprawne logowanie: '+userInfoSelector(state)[1].lastLoginFailure); 
        }
        if (actionClickSelector(state) === logoutAction) { this.quitCesuboffer(state, logoutAction); }
        if (actionClickSelector(state) === homeAction) { this.quitCesuboffer(state, homeAction); }
    }

    openModal(type, mode, textLine1, textLine2, textLine3, jsonToken, scale) {
        if (type === 'T') { this.shadowRoot.getElementById('dialogWindow').openToast(mode, textLine1, jsonToken) }
        if (type === 'M') { this.shadowRoot.getElementById('dialogWindow').openDialog(mode, textLine1, textLine2, textLine3, jsonToken, scale); }
    }

    confirmModal(event) {
        // u can find token information in event.detail
    }

    cancelModal(event) {
        // u can find token information in event.detail
    }

    quitCesuboffer(state, type, param) {
        let actionInfo = [];
        actionInfo.push({ actionType: type, actionParam: param });

        this.menuElements = JSON.stringify({ quitAction: actionInfo });
        console.log(this.menuElements);
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
