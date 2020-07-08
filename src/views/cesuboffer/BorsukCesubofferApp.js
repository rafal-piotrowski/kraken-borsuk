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
import { BorsukCesubofferStyle } from './BorsukCesubofferStyle.js';
import { loadJSON } from '../../helpers/asyncFunctions.js';

// konektor służący podłączaniu się do store-a
import { connect } from 'pwa-helpers/connect-mixin.js';
import '../../components/borsuk-navbar.js';
import '../../components/borsuk-sidebar.js';
import '../../components/borsuk-content.js';
import '../../components/borsuk-alert.js';
import '../../components/collections/borsuk-dialog.js';
import '../../components/collections/borsuk-preloader.js'

import { titles } from '../../properties/titles.js';
import { actions } from '../../properties/actions.js';
import { events } from '../../properties/events.js';
import { actions2events } from '../../properties/actions2events.js';

// podłączenie do Redux store.
import { store } from '../../redux/store.js';

// załadowanie kreatorów akcji.
// getUserInfo do wywalenia po wrzuceniu do projektu.
import { getUserInfo } from '../../redux/actions/menu.js';
import { getCesubofferTabs, getCesubofferSlots, getCeChannelTabs, getCeChannelSlots, getSidebarTypes, getSidebarNames, getSearchResults, navigate, changeStatus } from '../../redux/actions/cesuboffer.js';
import { getProductGroupDict, getCategoryDict, getEventsDict, getPushActionDict, getPeriodsDict, getPhoneTypeDict, getMessageGroupDict, 
        getResponseCodesDict, getContentParamsDict } from '../../redux/actions/dictionaries.js';
import { setClickAction } from '../../redux/actions/customevents.js';

// podłączenie reducer-a.
import menu, { userInfoSelector } from '../../redux/reducers/menu.js';
import cesuboffer from '../../redux/reducers/cesuboffer.js';
import customevents, { actionClickSelector, actionParamSelector } from '../../redux/reducers/customevents.js';
import dictionaries from '../../redux/reducers/dictionaries.js';

store.addReducers({
    menu,
    cesuboffer,
    customevents,
    dictionaries
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
                ${until(this.sidebarTemplate, html`<borsuk-preloader></borsuk-preloader>`)}
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
        this._setCeTabs();
        this._setCeSlots();
        this._setCeChannelTabs();
        this._setCeChannelSlots();
        this._setSidebarSubtypes();
        this._setSidebarSubnames();

        // ładowanie słowników
        this._setProductGroupDict();
        this._setCategoryDict();
        this._setEventsDict();
        this._setPushActionDict();
        this._setPeriodsDict();
        this._setPhoneTypeDict();
        this._setMessageGroupDict();
        this._setResponseCodesDict();
        this._setContentParamsDict();

        // to tylko test wymuszenia aktywności taba
        // setTimeout(() => {
        //     this._forceActivePage('1845', 'S02');
        //   }, 7000);
    }

    // setUserInfo do wycięcia po wdrożeniu do projektu
    _setUserInfo(jsonData) {
        if (jsonData) { store.dispatch(getUserInfo(jsonData.userInfo)); } 
        else { loadJSON('/src/properties/_userInfo.json').then(data => { store.dispatch(getUserInfo(data.userInfo)); }) }
    }

    // metody do zasilenia tabów
    _setCeTabs(jsonData) {
        if (jsonData) { store.dispatch(getCesubofferTabs(jsonData.ceTabs)); } 
        else { loadJSON('/src/properties/_cesubofferTabs.json').then(data => { store.dispatch(getCesubofferTabs(data.ceTabs)); }) }
    }

    _setCeSlots(jsonData) {
        if (jsonData) { store.dispatch(getCesubofferSlots(jsonData.ceSlots)); } 
        else { loadJSON('/src/properties/_cesubofferSlots.json').then(data => { store.dispatch(getCesubofferSlots(data.ceSlots)); }) }
    }

    _setCeChannelTabs(jsonData) {
        if (jsonData) { store.dispatch(getCeChannelTabs(jsonData.ceChannelTabs)); } 
        else { loadJSON('/src/properties/_ceChannelTabs.json').then(data => { store.dispatch(getCeChannelTabs(data.ceChannelTabs)); }) }
    }

    _setCeChannelSlots(jsonData) {
        if (jsonData) { store.dispatch(getCeChannelSlots(jsonData.ceChannelSlots)); } 
        else { loadJSON('/src/properties/_ceChannelSlots.json').then(data => { store.dispatch(getCeChannelSlots(data.ceChannelSlots)); }) }
    }

    // metody do zasilenia drzewa subofert
    _setSidebarSubtypes(jsonData) {
        if (jsonData) { store.dispatch(getSidebarTypes(jsonData.sidebarSubtypes)); } 
        else { loadJSON('/src/properties/_sidebarSubtypes.json').then(data => { store.dispatch(getSidebarTypes(data.sidebarSubtypes)); }) }
    }

    _setSidebarSubnames(jsonData) {
        if (jsonData) { store.dispatch(getSidebarNames(jsonData.sidebarSubnames)); } 
        else { loadJSON('/src/properties/_sidebarSubnames.json').then(data => { store.dispatch(getSidebarNames(data.sidebarSubnames)); }) }
    }

    // metoda do zasilenia filtra
    _setFilterContent(jsonData) {
        if (jsonData) { store.dispatch(getSearchResults(jsonData.searchResults)); } 
        else { loadJSON('/src/properties/_searchResults.json').then(data => { store.dispatch(getSearchResults(data.searchResults)); }) }
    }

    // metody do zasilenia słowników
    _setProductGroupDict(jsonData) {
        if (jsonData) { store.dispatch(getProductGroupDict(jsonData.productGroupDict)); } 
        else { loadJSON('/src/properties/_productGroupDict.json').then(data => { store.dispatch(getProductGroupDict(data.productGroupDict)); }) }
    }

    _setCategoryDict(jsonData) {
        if (jsonData) { store.dispatch(getCategoryDict(jsonData.categoryDict)); } 
        else { loadJSON('/src/properties/_categoryDict.json').then(data => { store.dispatch(getCategoryDict(data.categoryDict)); }) }
    }

    _setEventsDict(jsonData) {
        if (jsonData) { store.dispatch(getEventsDict(jsonData.eventsDict)); } 
        else { loadJSON('/src/properties/_eventsDict.json').then(data => { store.dispatch(getEventsDict(data.eventsDict)); }) }
    }

    _setPushActionDict(jsonData) {
        if (jsonData) { store.dispatch(getPushActionDict(jsonData.pushActionDict)); } 
        else { loadJSON('/src/properties/_pushActionDict.json').then(data => { store.dispatch(getPushActionDict(data.pushActionDict)); }) }
    }

    _setPeriodsDict(jsonData) {
        if (jsonData) { store.dispatch(getPeriodsDict(jsonData.periodsDict)); } 
        else { loadJSON('/src/properties/_periodsDict.json').then(data => { store.dispatch(getPeriodsDict(data.periodsDict)); }) }
    }

    _setPhoneTypeDict(jsonData) {
        if (jsonData) { store.dispatch(getPhoneTypeDict(jsonData.phoneTypeDict)); } 
        else { loadJSON('/src/properties/_phoneTypeDict.json').then(data => { store.dispatch(getPhoneTypeDict(data.phoneTypeDict)); }) }
    }

    _setMessageGroupDict(jsonData) {
        if (jsonData) { store.dispatch(getMessageGroupDict(jsonData.messageGroupDict)); } 
        else { loadJSON('/src/properties/_messageGroupDict.json').then(data => { store.dispatch(getMessageGroupDict(data.messageGroupDict)); }) }
    }

    _setResponseCodesDict(jsonData) {
        if (jsonData) { store.dispatch(getResponseCodesDict(jsonData.responseCodesDict)); } 
        else { loadJSON('/src/properties/_responseCodesDict.json').then(data => { store.dispatch(getResponseCodesDict(data.responseCodesDict)); }) }
    }

    _setContentParamsDict(jsonData) {
        if (jsonData) { store.dispatch(getContentParamsDict(jsonData.contentParamsDict)); } 
        else { loadJSON('/src/properties/_contentParamsDict.json').then(data => { store.dispatch(getContentParamsDict(data.contentParamsDict)); }) }
    }

    // metoda wymuszająca aktywność taba
    _forceActivePage(page, slot) {
        store.dispatch(navigate(page, slot));
    }

    _changeStatus(tabPageId, status, statusDesc) {
        store.dispatch(changeStatus(tabPageId, status, statusDesc));
    }

    stateChanged(state) {
        if (this.userInfo !== userInfoSelector(state)) { this.userInfo = userInfoSelector(state); }
        if (actionClickSelector(state) === actions.get('logoutAction')) { localStorage.clear(); location.reload(); }
        if (actionClickSelector(state)) { this.fireCustomEvent(state, actionClickSelector(state), actionParamSelector(state) ? actionParamSelector(state) : null) }
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
        setTimeout(() => store.dispatch(setClickAction('')), 200);
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
        };
    }

    constructor() {
        super();

        this.userInfo = [];
        this.heading = titles.get('headRwdAlert');
        this.footing = titles.get('footRwdAlert');
        this.title = titles.get('titleRwdAlert');

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
                        titles.get('lastLoginSuccessLabel')+this.userInfo[1].lastLoginSuccess, 
                        titles.get('lastLoginFailureLabel')+this.userInfo[1].lastLoginFailure);
    }

    handleCustomEvent(event) { 
        console.log(event.type);
        console.log(event.detail); 
    }
}
