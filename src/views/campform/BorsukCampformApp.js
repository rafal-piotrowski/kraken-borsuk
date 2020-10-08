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
// import { until } from 'lit-html/directives/until';
import { BorsukCampformStyle } from './BorsukCampformStyle.js';
import { loadJSON } from '../../helpers/asyncFunctions.js';

import { BorsukApp } from '../BorsukApp.js';

import { registerDefaultIconsets } from '../../components/packages/icon/registerDefaultIconSet.js';

// import { titles } from '../../properties/titles.js';
// import { actions } from '../../properties/actions.js';
// import { events } from '../../properties/events.js';
// import { actions2events } from '../../properties/actions2events.js';

// podłączenie do Redux store.
import { store } from '../../redux/store.js';

// załadowanie kreatorów akcji.
import { getCesubofferTabs, getCesubofferSlots, getCeChannelTabs, getCeChannelSlots, getSidebarTypes, getSidebarNames, getSearchResults, 
    navigate, changeStatus, getVersionsList, getSchedulesList, getPublicationsList, getChannelActionsParams, updateHtmlFlg, getButtonsFlags } from '../../redux/actions/campform.js';
import { getProductGroupDict, getCategoryDict, getEventsDict, getPushActionDict, getPeriodsDict, getPhoneTypeDict, getMessageGroupDict, 
        getResponseCodesDict, getSquadsDict, getPersLevelDict, getUnusedEventsDict, getActionTypeDict, getEmployeeDict } from '../../redux/actions/dictionaries.js';
// import { setClickAction } from '../../redux/actions/customevents.js';
import { setGlobalVar } from '../../redux/actions/globals.js';

// podłączenie reducer-a.
import menu, { userInfoSelector } from '../../redux/reducers/menu.js';
import campform, { getActivePage, cesubofferSlotsSelector, cesubofferSlotsBckpSelector, ceChannelSlotsSelector, ceChannelSlotsBckpSelector,
    cesubofferPageReselector, cesubofferPageBckpReselector, ceChannelsSlotReselector, ceChannelsSlotBckpReselector } from '../../redux/reducers/campform.js';
import customevents, { actionClickSelector, actionParamSelector } from '../../redux/reducers/customevents.js';
import dictionaries from '../../redux/reducers/dictionaries.js';
import globals from '../../redux/reducers/globals.js';

store.addReducers({
    menu,
    campform,
    customevents,
    dictionaries,
    globals
});

// export class BorsukActionformsApp extends connect(store)(LitElement) {
export class BorsukCampformApp extends BorsukApp {
    static get styles() {
        return [
            super.styles,
            BorsukCampformStyle,
            css`
        `];
    }

    firstUpdated() {
        
        console.log('_______________ campFormApp - firstUpdated __________________');

        // poniższe do wycięcia po wdrożeniu do projektu
        // this._setUserInfo();

        this._setCampFormTabs();
        this._setCampFormSlots();
        this._setCeChannelTabs();
        this._setCeChannelSlots();
        this._setSidebarCampFormTypes();
        this._setSidebarCampFormNames();
        // this._setVersionsList();
        // this._setSchedulesList();
        // this._setPublicationsList();
        // this._setChannelActionsParams();
        // this._setButtonsFlags();

        // ładowanie słowników
        this._setProductGroupDict();
        // this._setCategoryDict();
        this._setPersLevelDict();
        this._setSquadsDict();
        this._setActionTypeDict();
        this._setEmployeeDict();
        this._setEventsDict();
        this._setUnusedEventsDict();
        // this._setPushActionDict();
        // this._setPeriodsDict();
        // this._setPhoneTypeDict();
        // this._setMessageGroupDict();
        // this._setResponseCodesDict();
        // this._setContentParamsDict();
        // this._setActionsParamsDict();

        // to tylko test wymuszenia aktywności taba
        // setTimeout(() => {
        //     this._forceActivePage('1845', 'S02');
        //   }, 7000);
        store.dispatch(setGlobalVar('app', this._app));

        registerDefaultIconsets();

    }

    // metody do zasilenia tabów
    _setCampFormTabs(jsonData) {
        console.log('_______________ campFormApp - setCampFormTabs __________________');

        if (jsonData) { store.dispatch(getCesubofferTabs(jsonData.campFormTabs)); } 
        else { loadJSON('/src/properties/_campFormTabs.json').then(data => { store.dispatch(getCesubofferTabs(data.campFormTabs)); }) }
    }

    _setCampFormSlots(jsonData) {
        console.log('_______________ campFormApp - setCampFormTabs __________________');

        if (jsonData) { store.dispatch(getCesubofferSlots(jsonData.campFormSlots)); } 
        else { loadJSON('/src/properties/_campFormSlots.json').then(data => { store.dispatch(getCesubofferSlots(data.campFormSlots)); }) }
    }

    _setCeChannelTabs(jsonData) {
        if (jsonData) { store.dispatch(getCeChannelTabs(jsonData.cfSecondLevelTabs)); } 
        else { loadJSON('/src/properties/_cfSecondLevelTabs.json').then(data => { store.dispatch(getCeChannelTabs(data.cfSecondLevelTabs)); }) }
    }

    _setCeChannelSlots(jsonData) {
        if (jsonData) { store.dispatch(getCeChannelSlots(jsonData.cfSecondLevelSlots)); } 
        else { loadJSON('/src/properties/_cfSecondLevelSlots.json').then(data => { store.dispatch(getCeChannelSlots(data.cfSecondLevelSlots)); }) }
    }

    // _setChannelActionsParams(jsonData) {
    //     if (jsonData) { store.dispatch(getChannelActionsParams(jsonData.channelActionsParams)); } 
    //     else { loadJSON('/src/properties/_channelActionsParams.json').then(data => { store.dispatch(getChannelActionsParams(data.channelActionsParams)); }) }
    // }

    // metody do zasilenia drzewa subofert
    _setSidebarCampFormTypes(jsonData) {
        if (jsonData) { store.dispatch(getSidebarTypes(jsonData.sidebarCampFormTypes)); } 
        else { loadJSON('/src/properties/_sidebarCampFormTypes.json').then(data => { store.dispatch(getSidebarTypes(data.sidebarCampFormTypes)); }) }
    }

    _setSidebarCampFormNames(jsonData) {
        if (jsonData) { store.dispatch(getSidebarNames(jsonData.sidebarCampFormNames)); } 
        else { loadJSON('/src/properties/_sidebarCampFormNames.json').then(data => { store.dispatch(getSidebarNames(data.sidebarCampFormNames)); }) }
    }

    // metody do zasilenia publikacji wersji
    // _setVersionsList(jsonData) {
    //     if (jsonData) { store.dispatch(getVersionsList(jsonData.ceVersionsList)); } 
    //     else { loadJSON('/src/properties/_ceVersionsList.json').then(data => { store.dispatch(getVersionsList(data.ceVersionsList)); }) }
    // }

    // _setSchedulesList(jsonData) {
    //     if (jsonData) { store.dispatch(getSchedulesList(jsonData.ceSchedulesList)); } 
    //     else { loadJSON('/src/properties/_ceSchedulesList.json').then(data => { store.dispatch(getSchedulesList(data.ceSchedulesList)); }) }
    // }

    // _setPublicationsList(jsonData) {
    //     if (jsonData) { store.dispatch(getPublicationsList(jsonData.cePublicationsList)); }
    //     else { loadJSON('/src/properties/_cePublicationsList.json').then(data => { store.dispatch(getPublicationsList(data.cePublicationsList)); }) }
    // }

    // metoda do zasilenia filtra
    // _setFilterContent(jsonData) {
    //     if (jsonData) { store.dispatch(getSearchResults(jsonData.searchResults)); } 
    //     else { loadJSON('/src/properties/_searchResults.json').then(data => { store.dispatch(getSearchResults(data.searchResults)); }) }
    // }

    // metody do zasilenia słowników
    _setProductGroupDict(jsonData) {
        if (jsonData) { store.dispatch(getProductGroupDict(jsonData.productGroupDict)); } 
        else { loadJSON('/src/properties/_productGroupDict.json').then(data => { store.dispatch(getProductGroupDict(data.productGroupDict)); }) }
    }

    // _setCategoryDict(jsonData) {
    //     if (jsonData) { store.dispatch(getCategoryDict(jsonData.categoryDict)); } 
    //     else { loadJSON('/src/properties/_categoryDict.json').then(data => { store.dispatch(getCategoryDict(data.categoryDict)); }) }
    // }

    _setPersLevelDict(jsonData) {
        if (jsonData) { store.dispatch(getPersLevelDict(jsonData.persLevelDict)); } 
        else { loadJSON('/src/properties/_persLevelDict.json').then(data => { store.dispatch(getPersLevelDict(data.persLevelDict)); }) }
    }

    _setSquadsDict(jsonData) {
        if (jsonData) { store.dispatch(getSquadsDict(jsonData.squadsDict)); } 
        else { loadJSON('/src/properties/_squadsDict.json').then(data => { store.dispatch(getSquadsDict(data.squadsDict)); }) }
    }

    _setActionTypeDict(jsonData) {
        if (jsonData) { store.dispatch(getActionTypeDict(jsonData.actionTypeDict)); } 
        else { loadJSON('/src/properties/_actionTypeDict.json').then(data => { store.dispatch(getActionTypeDict(data.actionTypeDict)); }) }
    }

    _setEmployeeDict(jsonData) {
        if (jsonData) { store.dispatch(getEmployeeDict(jsonData.employeeDict)); } 
        else { loadJSON('/src/properties/_employeeDict.json').then(data => { store.dispatch(getEmployeeDict(data.employeeDict)); }) }
    }

    _setEventsDict(jsonData) {
        if (jsonData) { store.dispatch(getEventsDict(jsonData.eventsDict)); } 
        else { loadJSON('/src/properties/_eventsDict.json').then(data => { store.dispatch(getEventsDict(data.eventsDict)); }) }
    }

    _setUnusedEventsDict(jsonData) {
        if (jsonData) { store.dispatch(getUnusedEventsDict(jsonData.unusedEventsDict)); } 
        else { loadJSON('/src/properties/_unusedEventsDict.json').then(data => { store.dispatch(getUnusedEventsDict(data.unusedEventsDict)); }) }
    }

    // _setPushActionDict(jsonData) {
    //     if (jsonData) { store.dispatch(getPushActionDict(jsonData.pushActionDict)); } 
    //     else { loadJSON('/src/properties/_pushActionDict.json').then(data => { store.dispatch(getPushActionDict(data.pushActionDict)); }) }
    // }

    // _setPeriodsDict(jsonData) {
    //     if (jsonData) { store.dispatch(getPeriodsDict(jsonData.periodsDict)); } 
    //     else { loadJSON('/src/properties/_periodsDict.json').then(data => { store.dispatch(getPeriodsDict(data.periodsDict)); }) }
    // }

    // _setPhoneTypeDict(jsonData) {
    //     if (jsonData) { store.dispatch(getPhoneTypeDict(jsonData.phoneTypeDict)); } 
    //     else { loadJSON('/src/properties/_phoneTypeDict.json').then(data => { store.dispatch(getPhoneTypeDict(data.phoneTypeDict)); }) }
    // }

    // _setMessageGroupDict(jsonData) {
    //     if (jsonData) { store.dispatch(getMessageGroupDict(jsonData.messageGroupDict)); } 
    //     else { loadJSON('/src/properties/_messageGroupDict.json').then(data => { store.dispatch(getMessageGroupDict(data.messageGroupDict)); }) }
    // }

    // _setResponseCodesDict(jsonData) {
    //     if (jsonData) { store.dispatch(getResponseCodesDict(jsonData.responseCodesDict)); } 
    //     else { loadJSON('/src/properties/_responseCodesDict.json').then(data => { store.dispatch(getResponseCodesDict(data.responseCodesDict)); }) }
    // }

    // _setContentParamsDict(jsonData) {
    //     if (jsonData) { store.dispatch(getContentParamsDict(jsonData.contentParamsDict)); } 
    //     else { loadJSON('/src/properties/_contentParamsDict.json').then(data => { store.dispatch(getContentParamsDict(data.contentParamsDict)); }) }
    // }

    // _setActionsParamsDict(jsonData) {
    //     if (jsonData) { store.dispatch(getActionsParamsDict(jsonData.actionsParamsDict)); } 
    //     else { loadJSON('/src/properties/_actionsParamsDict.json').then(data => { store.dispatch(getActionsParamsDict(data.actionsParamsDict)); }) }
    // }

    // metoda wymuszająca aktywność taba
    // _forceActivePage(page, slot) {
    //     store.dispatch(navigate(page, slot));
    // }

    // _changeStatus(tabPageId, status, statusDesc) {
    //     store.dispatch(changeStatus(tabPageId, status, statusDesc));
    // }

    // _setHtmlEditor(flag) {
    //     store.dispatch(updateHtmlFlg(flag));
    // }

    // metoda do zasilenia wyjatkow dla wylaczenia przyciskow akcji
    // _setButtonsFlags(jsonData) {
    //     if (jsonData) { store.dispatch(getButtonsFlags(jsonData.ceBtnsFlags)); } 
    //     else { loadJSON('/src/properties/_ceBtnsFlags.json').then(data => { store.dispatch(getButtonsFlags(data.ceBtnsFlags)); }) }
    // }

    get navbarTemplate() {
        return html`
            <div id="navLayout" class="flex-navbar">
                <borsuk-navbar id="navbarApp" .mainNavTitle=${"Formatki akcji"}></borsuk-navbar>
            </div>
        `;
    }

    static get properties() {
        return {
            _app: { type: String }
        };
    }

    constructor() {
        super();
        this._app = "campform";
        this.cesubofferNavbarTitle = 'Formatki akcji';
    }

}
