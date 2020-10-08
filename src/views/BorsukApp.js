/* eslint-disable lines-between-class-members */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-plusplus */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable no-prototype-builtins */
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
import { until } from 'lit-html/directives/until';
import { BorsukAppStyle } from './BorsukAppStyle.js';
// import { borsukAddSuboffer, borsukAdd, borsukClose, borsukAddVersion, borsukApprove, borsukCopySuboffer, borsukCopyVersion, 
//     borsukEditSuboffer, borsukEditVersion, borsukPublic, borsukChevronDown, borsukChevronUp,
//     borsukRemoveSuboffer, borsukRemoveVersion, borsukSaveSuboffer, borsukSaveVersion } from '../icons/icons.js';
import { loadJSON } from '../helpers/asyncFunctions.js';

// konektor służący podłączaniu się do store-a
import { connect } from 'pwa-helpers/connect-mixin.js';
import '../components/borsuk-navbar.js';
import '../components/borsuk-sidebar.js';
import '../components/borsuk-content.js';
import '../components/borsuk-alert.js';
import '../components/packages/borsuk-button.js';
import '../components/packages/borsuk-icon.js';
import '../components/collections/borsuk-dialog.js';
import '../components/collections/borsuk-preloader.js'

// import { registerDefaultIconsets } from '../components/packages/icon/registerDefaultIconSet.js';

import { titles } from '../properties/titles.js';
import { actions } from '../properties/actions.js';
import { events } from '../properties/events.js';
import { actions2events } from '../properties/actions2events.js';

// podłączenie do Redux store.
import { store } from '../redux/store.js';

// załadowanie kreatorów akcji.
// getUserInfo do wywalenia po wrzuceniu do projektu.
import { getUserInfo } from '../redux/actions/menu.js';
// import { getCesubofferTabs, getCesubofferSlots, getCeChannelTabs, getCeChannelSlots, getSidebarTypes, getSidebarNames, getSearchResults, 
//     navigate, changeStatus, getVersionsList, getSchedulesList, getPublicationsList, getChannelActionsParams, updateHtmlFlg, getButtonsFlags } from '../redux/actions/campform.js';
// import { getProductGroupDict, getCategoryDict, getEventsDict, getPushActionDict, getPeriodsDict, getPhoneTypeDict, getMessageGroupDict, 
//         getResponseCodesDict, getContentParamsDict, getActionsParamsDict, getUnusedEventsDict } from '../redux/actions/dictionaries.js';
import { setClickAction } from '../redux/actions/customevents.js';
// import { setGlobalVar } from '../redux/actions/globals.js';

// podłączenie reducer-a.
import menu, { userInfoSelector } from '../redux/reducers/menu.js';
import actionforms, { getActivePage, cesubofferSlotsSelector, cesubofferSlotsBckpSelector, ceChannelSlotsSelector, ceChannelSlotsBckpSelector,
    cesubofferPageReselector, cesubofferPageBckpReselector, ceChannelsSlotReselector, ceChannelsSlotBckpReselector } from '../redux/reducers/campform.js';
import customevents, { actionClickSelector, actionParamSelector } from '../redux/reducers/customevents.js';
import dictionaries from '../redux/reducers/dictionaries.js';
import globals from '../redux/reducers/globals.js';

store.addReducers({
    menu,
    customevents,
    dictionaries,
    globals
});

export class BorsukApp extends connect(store)(LitElement) {
    static get styles() {
        return [
            BorsukAppStyle,
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
                ${until(this.sidebarTemplate, html`<borsuk-preloader></borsuk-preloader>`)}

                <div id="workLayout" class="stretch-right">
                    <div id="navLayout" class="flex-navbar">
                        <borsuk-navbar id="navbarApp" .mainNavTitle="${this.cesubofferNavbarTitle}" @change-collapse-sidebar=${this.collapseSidebar}></borsuk-navbar>
                    </div>
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
                <div id="sidewrapLayout" class="sidebar-wrapper">
                    <borsuk-sidebar id="treeView"></borsuk-sidebar>
                </div>
            </div>
        `;
    }

    get navbarTemplate() {
        return html`
            <div id="navLayout" class="flex-navbar">
                <borsuk-navbar id="navbarApp" @change-collapse-sidebar=${this.collapseSidebar} .mainNavTitle="${titles.get('cesubofferNavbarTitle')}"></borsuk-navbar>
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

    collapseSidebar(event) {

        if (this.shadowRoot.getElementById("treeLayout").style.width === "0px") {
            this.shadowRoot.getElementById("treeLayout").style.width = "325px";
            setTimeout(() => { 
                this.shadowRoot.getElementById("sidewrapLayout").style.width = "325px";
                this.shadowRoot.getElementById("workLayout").style.paddingLeft = "325px";
            }, 300);
        } else {
            this.shadowRoot.getElementById("treeLayout").style.width = "0px";
            setTimeout(() => { 
                this.shadowRoot.getElementById("sidewrapLayout").style.width = "0px";
                this.shadowRoot.getElementById("workLayout").style.paddingLeft = "0px";
            }, 300);
        }
    }

    firstUpdated() {
        // poniższe do wycięcia po wdrożeniu do projektu
        this._setUserInfo();
    }

    // setUserInfo do wycięcia po wdrożeniu do projektu
    _setUserInfo(jsonData) {
        if (jsonData) { store.dispatch(getUserInfo(jsonData.userInfo)); } 
        else { loadJSON('/src/properties/_userInfo.json').then(data => { store.dispatch(getUserInfo(data.userInfo)); }) }
    }

    // metody do zasilenia tabów
    _setCampFormTabs(jsonData) {}

    _setCampFormSlots(jsonData) {}

    _setCeChannelTabs(jsonData) {}

    _setCeChannelSlots(jsonData) {}

    _setChannelActionsParams(jsonData) {}

    // metody do zasilenia drzewa subofert
    _setSidebarCampFormTypes(jsonData) {}

    _setSidebarCampFormNames(jsonData) {}

    // metody do zasilenia publikacji wersji
    _setVersionsList(jsonData) {}

    _setSchedulesList(jsonData) {}

    _setPublicationsList(jsonData) {}

    // metoda do zasilenia filtra
    _setFilterContent(jsonData) {}

    // metody do zasilenia słowników
    _setProductGroupDict(jsonData) {}

    _setCategoryDict(jsonData) {}

    _setEventsDict(jsonData) {}

    _setUnusedEventsDict(jsonData) {}

    _setPushActionDict(jsonData) {}

    _setPeriodsDict(jsonData) {}

    _setPhoneTypeDict(jsonData) {}

    _setMessageGroupDict(jsonData) {}

    _setResponseCodesDict(jsonData) {}

    _setContentParamsDict(jsonData) {}

    _setActionsParamsDict(jsonData) {}

    // metoda wymuszająca aktywność taba
    _forceActivePage(page, slot) {}

    _changeStatus(tabPageId, status, statusDesc) {}

    _setHtmlEditor(flag) {}

    // metoda do zasilenia wyjatkow dla wylaczenia przyciskow akcji
    _setButtonsFlags(jsonData) {}

    stateChanged(state) {
        if (this.userInfo !== userInfoSelector(state)) { this.userInfo = userInfoSelector(state); }
        // if (actionClickSelector(state) === actions.get('logoutAction')) { localStorage.clear(); location.reload(); }
        if (this.currentActionClick !== actionClickSelector(state)) { this.currentActionClick = actionClickSelector(state)}
        if (actionClickSelector(state) === actions.get('closeTabAction') ||
            actionClickSelector(state) === actions.get('homeAction') ||
            actionClickSelector(state) === actions.get('logoutAction') ||
            actionClickSelector(state) === actions.get('addSubofferAction') ||
            actionClickSelector(state) === actions.get('editSubofferAction') ||
            actionClickSelector(state) === actions.get('editVersionAction') ||
            actionClickSelector(state) === actions.get('addVersionAction') ||
            actionClickSelector(state) === actions.get('copySubofferAction') ||
            actionClickSelector(state) === actions.get('copyVersionAction') ||
            actionClickSelector(state) === actions.get('removeVersionAction') ||
            actionClickSelector(state) === actions.get('removeSubofferAction') ||
            actionClickSelector(state) === actions.get('filterOpenAction')) {
            this.fireProtectEvent(state, actionClickSelector(state), actionParamSelector(state) ? actionParamSelector(state) : null);
        } else {
            this.fireCustomEvent(state, actionClickSelector(state), actionParamSelector(state) ? actionParamSelector(state) : null)
        }
        // this._page = getActivePage(state);
    }

    openModal(type, mode, textLine1, textLine2, textLine3, jsonToken, scale) {
        // import('../../components/collections/borsuk-dialog.js').then((module) => {
        //     if (type === 'T') { this.shadowRoot.getElementById('dialogWindow').openToast(mode, textLine1, jsonToken) }
        //     if (type === 'M') { this.shadowRoot.getElementById('dialogWindow').openDialog(mode, textLine1, textLine2, textLine3, jsonToken, scale); } 
        // });
        if (type === 'T') { this.shadowRoot.getElementById('dialogWindow').openToast(mode, textLine1, jsonToken) }
        if (type === 'M') { this.shadowRoot.getElementById('dialogWindow').openDialog(mode, textLine1, textLine2, textLine3, jsonToken, scale); }
    }

    confirmModal(event) {
        this.dialogElements = event.detail;
        let actionType = JSON.parse(this.dialogElements.tokenValues).tokenKey;
        if (actionType === actions.get('closeTabAction') ||
            actionType === actions.get('homeAction') ||
            actionType === actions.get('logoutAction') ||
            actionType === actions.get('addSubofferAction') ||
            actionType === actions.get('editSubofferAction') ||
            actionType === actions.get('editVersionAction') ||
            actionType === actions.get('addVersionAction') ||
            actionType === actions.get('copySubofferAction') ||
            actionType === actions.get('copyVersionAction') ||
            actionType === actions.get('removeVersionAction') ||
            actionType === actions.get('removeSubofferAction') ||
            actionType === actions.get('filterOpenAction')) {
                this.fireCustomEvent("", actionType, this.closingPage);
                if (actionType === actions.get('logoutAction')) { localStorage.clear(); location.reload(); }
        } else {
            this.dispatchEvent(new CustomEvent(events.get('confirmModalEvent'), { detail: this.dialogElements }));
        }
    }

    cancelModal(event) {
        this.dialogElements = event.detail;
        this.dispatchEvent(new CustomEvent(events.get('cancelModalEvent'), { detail: this.dialogElements }));
    }

    fireProtectEvent(state, type, param) {

        let checkingState = Object.values(cesubofferSlotsSelector(state));
        let originState = Object.values(cesubofferSlotsBckpSelector(state));
        let checkingChannelsState = Object.values(ceChannelSlotsSelector(state));
        let originChannelsState = Object.values(ceChannelSlotsBckpSelector(state));

        let token = {"tokenKey": type}
        this.closingPage = param;

        if (JSON.stringify(checkingState) === JSON.stringify(originState) &&
            JSON.stringify(checkingChannelsState) === JSON.stringify(originChannelsState))
        {
            this.fireCustomEvent(state, type, param);
        } else {
            this.openModal( 'M', 'C',
                        "",
                        titles.get('errorSavingLabel'),
                        "", JSON.stringify(token));
        }
    }

    fireCustomEvent(state, type, param) {
        if (this.currentActionClick !== '') {
            setTimeout(() => store.dispatch(setClickAction('')), 200);    
        }
        
        if (!param) {
            this.dispatchEvent(new CustomEvent(actions2events.get(type)));
        } else {
            this.dispatchEvent(new CustomEvent(actions2events.get(type), { detail: JSON.stringify(Object.assign(param)) }));
        }
    }

    static get properties() {
        return {
            heading: { type: String },
            footing: { type: String },
            title: { type: String },
            userInfo: { type: Object },
            _page: { type: String },
            _slot: { type: String },
            closingPage: { type: Object },
            currentActionClick: { type: String },
            cesubofferNavbarTitle: { type: String }
        };
    }

    constructor() {
        super();

        this.userInfo = [];
        this.heading = titles.get('headRwdAlert');
        this.footing = titles.get('footRwdAlert');
        this.title = titles.get('titleRwdAlert');
        this.cesubofferNavbarTitle = 'BORSUK';

        // this._app = "actionforms";

        // do celow produkcyjnych potrzebny będzie tylko listener dla infoEvent w celu otwarcia modala z info o użytkowniku
        for (let [eventKey, eventValue] of events) {
            this.addEventListener(eventValue, (eventValue === events.get('infoEvent')) ? this.handleInfoEvent : this.handleCustomEvent);
        }
    }

    handleInfoEvent(event) {
        console.log(event.type);
        console.log(event.detail); 
        store.dispatch(setClickAction(''));
        this.openModal( 'M', 'I', 
                        titles.get('ckeyLabel')+this.userInfo[1].ckey, 
                        "{\"node\":\"root\",\"child\":[{\"node\":\"element\",\"tag\":\"p\",\"attr\":{\"class\":\"ql-align-center\"},\"child\":[{\"node\":\"text\",\"text\":\""+titles.get('lastLoginSuccessLabel')+"\"},{\"node\":\"element\",\"tag\":\"strong\",\"attr\":{\"style\":[\"color:\",\"rgb(52,\",\"150,\",\"81);\"]},\"child\":[{\"node\":\"text\",\"text\":\""+this.userInfo[1].lastLoginSuccess+"\"}]}]},{\"node\":\"element\",\"tag\":\"p\",\"attr\":{\"class\":\"ql-align-center\"},\"child\":[{\"node\":\"text\",\"text\":\""+titles.get('lastLoginFailureLabel')+"\"},{\"node\":\"element\",\"tag\":\"strong\",\"attr\":{\"style\":[\"color:\",\"rgb(255,\",\"0,\",\"0);\"]},\"child\":[{\"node\":\"text\",\"text\":\""+this.userInfo[1].lastLoginFailure+"\"}]}]}]}",
                        "");
    }

    handleCustomEvent(event) { 
        console.log(event.type);
        console.log(event.detail); 
    }
}
