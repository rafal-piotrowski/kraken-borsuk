/* eslint-disable import/named */
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
import { BorsukCesubofferStyle } from './BorsukCesubofferStyle.js';
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
        navigate, changeStatus, getVersionsList, getSchedulesList, getPublicationsList, getChannelActionsParams, updateHtmlFlg, getButtonsFlags } from '../../redux/actions/cesuboffer.js';
import { getProductGroupDict, getCategoryDict, getEventsDict, getPushActionDict, getPeriodsDict, getPhoneTypeDict, getMessageGroupDict, 
        getResponseCodesDict, getContentParamsDict, getActionsParamsDict, getUnusedEventsDict } from '../../redux/actions/dictionaries.js';
import { setGlobalVar } from '../../redux/actions/globals.js';

// podłączenie reducer-a.
import menu, { userInfoSelector } from '../../redux/reducers/menu.js';
import cesuboffer, { getActivePage, cesubofferSlotsSelector, cesubofferSlotsBckpSelector, ceChannelSlotsSelector, ceChannelSlotsBckpSelector,
    cesubofferPageReselector, cesubofferPageBckpReselector, ceChannelsSlotReselector, ceChannelsSlotBckpReselector } from '../../redux/reducers/cesuboffer.js';
import customevents, { actionClickSelector, actionParamSelector } from '../../redux/reducers/customevents.js';
import dictionaries from '../../redux/reducers/dictionaries.js';
import globals from '../../redux/reducers/globals.js';

store.addReducers({
    menu,
    cesuboffer,
    customevents,
    dictionaries,
    globals
});

export class BorsukCesubofferApp extends BorsukApp {
    static get styles() {
        return [
            super.styles,
            BorsukCesubofferStyle,
            css`
        `];
    }

    firstUpdated() {

        store.dispatch(setGlobalVar('app', this._app));
        // poniższe do wycięcia po wdrożeniu do projektu

        this._setCeTabs();
        this._setCeSlots();
        this._setCeChannelTabs();
        this._setCeChannelSlots();
        this._setSidebarSubtypes();
        this._setSidebarSubnames();
        this._setVersionsList();
        this._setSchedulesList();
        this._setPublicationsList();
        this._setChannelActionsParams();
        this._setButtonsFlags();

        // ładowanie słowników
        this._setProductGroupDict();
        this._setCategoryDict();
        this._setEventsDict();
        this._setUnusedEventsDict();
        this._setPushActionDict();
        this._setPeriodsDict();
        this._setPhoneTypeDict();
        this._setMessageGroupDict();
        this._setResponseCodesDict();
        this._setContentParamsDict();
        this._setActionsParamsDict();

        registerDefaultIconsets();
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

    _setChannelActionsParams(jsonData) {
        if (jsonData) { store.dispatch(getChannelActionsParams(jsonData.channelActionsParams)); } 
        else { loadJSON('/src/properties/_channelActionsParams.json').then(data => { store.dispatch(getChannelActionsParams(data.channelActionsParams)); }) }
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

    // metody do zasilenia publikacji wersji
    _setVersionsList(jsonData) {
        if (jsonData) { store.dispatch(getVersionsList(jsonData.ceVersionsList)); } 
        else { loadJSON('/src/properties/_ceVersionsList.json').then(data => { store.dispatch(getVersionsList(data.ceVersionsList)); }) }
    }

    _setSchedulesList(jsonData) {
        if (jsonData) { store.dispatch(getSchedulesList(jsonData.ceSchedulesList)); } 
        else { loadJSON('/src/properties/_ceSchedulesList.json').then(data => { store.dispatch(getSchedulesList(data.ceSchedulesList)); }) }
    }

    _setPublicationsList(jsonData) {
        if (jsonData) { store.dispatch(getPublicationsList(jsonData.cePublicationsList)); }
        else { loadJSON('/src/properties/_cePublicationsList.json').then(data => { store.dispatch(getPublicationsList(data.cePublicationsList)); }) }
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

    _setUnusedEventsDict(jsonData) {
        if (jsonData) { store.dispatch(getUnusedEventsDict(jsonData.unusedEventsDict)); } 
        else { loadJSON('/src/properties/_unusedEventsDict.json').then(data => { store.dispatch(getUnusedEventsDict(data.unusedEventsDict)); }) }
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

    _setActionsParamsDict(jsonData) {
        if (jsonData) { store.dispatch(getActionsParamsDict(jsonData.actionsParamsDict)); } 
        else { loadJSON('/src/properties/_actionsParamsDict.json').then(data => { store.dispatch(getActionsParamsDict(data.actionsParamsDict)); }) }
    }

    // metoda wymuszająca aktywność taba
    _forceActivePage(page, slot) {
        store.dispatch(navigate(page, slot));
    }

    _changeStatus(tabPageId, status, statusDesc) {
        store.dispatch(changeStatus(tabPageId, status, statusDesc));
    }

    _setHtmlEditor(flag) {
        store.dispatch(updateHtmlFlg(flag));
    }

    // metoda do zasilenia wyjatkow dla wylaczenia przyciskow akcji
    _setButtonsFlags(jsonData) {
        if (jsonData) { store.dispatch(getButtonsFlags(jsonData.ceBtnsFlags)); } 
        else { loadJSON('/src/properties/_ceBtnsFlags.json').then(data => { store.dispatch(getButtonsFlags(data.ceBtnsFlags)); }) }
    }

    static get properties() {
        return {
            _app: { type: String }
        };
    }

    constructor() {
        super();
        this._app = "cesuboffer";
    }

}
