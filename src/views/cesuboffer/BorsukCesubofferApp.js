/* eslint-disable no-nested-ternary */
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

import { titles } from '../../properties/titles.js';
import { actions } from '../../properties/actions.js';
import { events } from '../../properties/events.js';
import { actions2events } from '../../properties/actions2events.js';

// podłączenie do Redux store.
import { store } from '../../redux/store.js';

// załadowanie kreatorów akcji.
import { getCesubofferTabs, getCesubofferSlots, getCeChannelTabs, getCeChannelSlots, getSidebarTypes, getSidebarNames, getSearchResults, 
        navigate, changeStatus, getVersionsList, getSchedulesList, getPublicationsList, getChannelActionsParams, updateHtmlFlg, getButtonsFlags,
        removeCeTab, addCeTab, removeCeSlot, addCeSlot, updateCeTab, disactivateChangedFlg } from '../../redux/actions/cesuboffer.js';
import { getProductGroupDict, getCategoryDict, getEventsDict, getPushActionDict, getPeriodsDict, getPhoneTypeDict, getMessageGroupDict, 
        getResponseCodesDict, getContentParamsDict, getActionsParamsDict, getUnusedEventsDict } from '../../redux/actions/dictionaries.js';
import { setClickAction } from '../../redux/actions/customevents.js';
import { setGlobalVar } from '../../redux/actions/globals.js';

// podłączenie reducer-a.
import menu, { userInfoSelector } from '../../redux/reducers/menu.js';
import cesuboffer, { getActivePage, cesubofferSlotsSelector, cesubofferSlotsBckpSelector, ceChannelSlotsSelector, ceChannelSlotsBckpSelector, cesubofferTabsSelector,
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

    _addCeTab(ceTab, type) {
        // sprawdzenie czy tabPageId jest juz w tabach
        if (Object.values(this.cesubofferTabsList).filter(subtab => subtab.tabPageId === ceTab[0].tabPageId).length) {

            // jeżeli jest już w tabach to sprawdzam czy jest nieaktywny i go aktywuję w przeciwnym wypadku nie robie nic
            if (!Object.values(this.cesubofferTabsList).filter(subtab => subtab.tabPageId === ceTab[0].tabPageId)[0].tabActive) {
                this._forceActivePage(ceTab[0].tabPageId, ceTab[0].tabSlotId);
            }
        } else {
            // jeżeli brak takiego tabPageId w tabach to go dodaję i aktywuję
            store.dispatch(addCeTab(ceTab));

                if (type === actions.get('filterOpenAction')) {
                    loadJSON('/src/properties/_ceSlot.json').then(data => { this._addCeSlot(data.ceSlot); });
                }
                if (type === actions.get('addSubofferAction')) {
                    loadJSON('/src/properties/_ceSlotAddSuboffer.json').then(data => { this._addCeSlot(data.ceSlotAddSuboffer); });
                }
                if (type === actions.get('editSubofferAction')) {
                    loadJSON('/src/properties/_ceSlotEditSuboffer.json').then(data => { this._addCeSlot(data.ceSlotEditSuboffer); });
                }
                if (type === actions.get('addVersionAction')) {
                    loadJSON('/src/properties/_ceSlotAddVersion.json').then(data => { this._addCeSlot(data.ceSlotAddVersion); });
                }
                if (type === actions.get('editVersionAction')) {
                    loadJSON('/src/properties/_ceSlotEditVersion.json').then(data => { this._addCeSlot(data.ceSlotEditVersion); });
                }

            this._forceActivePage(ceTab[0].tabPageId, ceTab[0].tabSlotId);
        }
    }

    _removeCeTab(pageId) {
        // jezeli tab jest nieaktywny to go usuwam
        if (!Object.values(this.cesubofferTabsList).filter(subtab => subtab.tabPageId === pageId)[0].tabActive) {
            store.dispatch(removeCeTab(pageId));
            this._removeCeSlot(pageId);
        } else {
            // w przeciwnym wypadku zdejmuje z niego aktywnosc na rzecz pierwszego i go usuwam
            this._forceActivePage(Object.values(this.cesubofferTabsList).filter(subtab => subtab.tabPageId !== pageId)[0].tabPageId, 
                                    Object.values(this.cesubofferTabsList).filter(subtab => subtab.tabPageId !== pageId)[0].tabSlotId);
            store.dispatch(removeCeTab(pageId));
            this._removeCeSlot(pageId);
        }
    }

    _updateCeTab(pageId, tabTitle, tabSubtitle) {
        store.dispatch(updateCeTab(pageId, tabTitle, tabSubtitle));
    }

    _setCeSlots(jsonData) {
        if (jsonData) { store.dispatch(getCesubofferSlots(jsonData.ceSlots)); } 
        else { loadJSON('/src/properties/_cesubofferSlots.json').then(data => { store.dispatch(getCesubofferSlots(data.ceSlots)); }) }
    }

    _addCeSlot(ceSlot) {
        store.dispatch(addCeSlot(ceSlot));
    }

    _removeCeSlot(pageId) {
        store.dispatch(removeCeSlot(pageId));
    }

    _updateCeSlot() {}

    _setCeChannelTabs(jsonData) {
        if (jsonData) { store.dispatch(getCeChannelTabs(jsonData.ceChannelTabs)); } 
        else { loadJSON('/src/properties/_ceChannelTabs.json').then(data => { store.dispatch(getCeChannelTabs(data.ceChannelTabs)); }) }
    }

    _addCeChannelTab() {}

    _removeCeChannelTab() {}

    _updateCeChannelTab() {}

    _setCeChannelSlots(jsonData) {
        if (jsonData) { store.dispatch(getCeChannelSlots(jsonData.ceChannelSlots)); } 
        else { loadJSON('/src/properties/_ceChannelSlots.json').then(data => { store.dispatch(getCeChannelSlots(data.ceChannelSlots)); }) }
    }

    _addCeChannelSlot() {}

    _removeCeChannelSlot() {}

    _updateCeChannelSlot() {}

    _setChannelActionsParams(jsonData) {
        if (jsonData) { store.dispatch(getChannelActionsParams(jsonData.channelActionsParams)); } 
        else { loadJSON('/src/properties/_channelActionsParams.json').then(data => { store.dispatch(getChannelActionsParams(data.channelActionsParams)); }) }
    }

    // metody do zasilenia drzewa subofert
    _setSidebarSubtypes(jsonData) {
        if (jsonData) { store.dispatch(getSidebarTypes(jsonData.sidebarSubtypes)); } 
        else { loadJSON('/src/properties/_sidebarSubtypes.json').then(data => { store.dispatch(getSidebarTypes(data.sidebarSubtypes)); }) }
    }

    _addSidebarSubtype() {}

    _removeSidebarSubtype() {}

    _updateSidebarSubtype() {}

    _setSidebarSubnames(jsonData) {
        if (jsonData) { store.dispatch(getSidebarNames(jsonData.sidebarSubnames)); } 
        else { loadJSON('/src/properties/_sidebarSubnames.json').then(data => { store.dispatch(getSidebarNames(data.sidebarSubnames)); }) }
    }

    _addSidebarSubname() {}

    _removeSidebarSubname() {}

    _updateSidebarSubname() {}

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

    stateChanged(state) {
        if (this.userInfo !== userInfoSelector(state)) { this.userInfo = userInfoSelector(state); }
        if (this.cesubofferTabsList !== cesubofferTabsSelector(state)) { this.cesubofferTabsList = cesubofferTabsSelector(state); }
        if (this.cesubofferSlotsList !== cesubofferSlotsSelector(state)) { this.cesubofferSlotsList = cesubofferSlotsSelector(state); }

        // if (actionClickSelector(state) === actions.get('logoutAction')) { localStorage.clear(); location.reload(); }
        if (this.currentActionClick !== actionClickSelector(state)) { this.currentActionClick = actionClickSelector(state)}
        if (actionClickSelector(state) === actions.get('closeTabAction') ||
            // actionClickSelector(state) === actions.get('homeAction') ||
            // actionClickSelector(state) === actions.get('logoutAction') ||
            // actionClickSelector(state) === actions.get('addSubofferAction') ||
            actionClickSelector(state) === actions.get('editSubofferAction') ||
            actionClickSelector(state) === actions.get('editVersionAction') ||
            actionClickSelector(state) === actions.get('addVersionAction') ||
            actionClickSelector(state) === actions.get('copySubofferAction') ||
            actionClickSelector(state) === actions.get('copyVersionAction') ||
            actionClickSelector(state) === actions.get('removeVersionAction') ||
            actionClickSelector(state) === actions.get('removeSubofferAction') 
            // ||
            // actionClickSelector(state) === actions.get('filterOpenAction')
            ) 
            {
            this.fireProtectEvent(state, actionClickSelector(state), actionParamSelector(state) ? actionParamSelector(state) : null);
        } else {
            this.fireCustomEvent(state, actionClickSelector(state), actionParamSelector(state) ? actionParamSelector(state) : null)
        }

        if (actionClickSelector(state) === actions.get('saveSubofferAction') ||
            actionClickSelector(state) === actions.get('saveVersionAction')) {
                store.dispatch(setClickAction(''));
                store.dispatch(disactivateChangedFlg(actionParamSelector(state).pageId));
        }

        this._page = getActivePage(state);
        // console.log('============ page from stateChanged is: '+this._page);
        
    }

    fireProtectEvent(state, type, param) {

        // let checkingState = Object.values(cesubofferSlotsSelector(state));
        // let originState = Object.values(cesubofferSlotsBckpSelector(state));
        // let checkingChannelsState = Object.values(ceChannelSlotsSelector(state));
        // let originChannelsState = Object.values(ceChannelSlotsBckpSelector(state));

        let token = {"tokenKey": type}
        this.closingPage = param;

        // console.log('============================================ fireProtectEvent =========================================');
        // console.log('actual page is: '+this._page);
        // console.log(type);
        // console.log('event pageId is: '+param.pageId);
        // console.log('event nodeId is: '+param.nodeId);
        // console.log(this.cesubofferSlotsList);

        const paramPageId = (param.pageId) ? param.pageId : this._page;

        // console.log(paramPageId);

        if (Object.values(this.cesubofferSlotsList).filter(subslot => subslot.tabPageId === paramPageId)[0].changedFlg) {
            this.openModal( 'M', 'C',
                        "",
                        titles.get('errorSavingLabel'),
                        "", JSON.stringify(token));
        } else {
            this.fireCustomEvent(state, type, param);
        }

        // if (JSON.stringify(checkingState) === JSON.stringify(originState) &&
        //     JSON.stringify(checkingChannelsState) === JSON.stringify(originChannelsState))
        // {
        //     this.fireCustomEvent(state, type, param);
        // } else {
        //     this.openModal( 'M', 'C',
        //                 "",
        //                 titles.get('errorSavingLabel'),
        //                 "", JSON.stringify(token));
        // }
    }

    fireCustomEvent(state, type, param) {
        
        if (this.currentActionClick !== '') {
            setTimeout(() => {
                store.dispatch(setClickAction(''));
                if (type === actions.get('closeTabAction')) {
                    this._removeCeTab(param.pageId);
                }
                if (type === actions.get('filterOpenAction')) {
                    loadJSON('/src/properties/_ceTab.json').then(data => { this._addCeTab(data.ceTab, type); });
                }
                if (type === actions.get('addSubofferAction')) {
                    loadJSON('/src/properties/_ceTabAddSuboffer.json').then(data => { this._addCeTab(data.ceTabAddSuboffer, type); });
                }
                if (type === actions.get('editSubofferAction')) {
                    loadJSON('/src/properties/_ceTabEditSuboffer.json').then(data => { this._addCeTab(data.ceTabEditSuboffer, type); });
                }
                if (type === actions.get('addVersionAction')) {
                    loadJSON('/src/properties/_ceTabAddVersion.json').then(data => { this._addCeTab(data.ceTabAddVersion, type); });
                }
                if (type === actions.get('editVersionAction')) {
                    loadJSON('/src/properties/_ceTabEditVersion.json').then(data => { this._addCeTab(data.ceTabEditVersion, type); });
                }
                if (type === actions.get('saveSubofferAction')) {
                    this._updateCeTab(param.pageId, "Testowy UPDATE", "");
                }
            }, 200);
            
        }
        
        if (!param) {
            this.dispatchEvent(new CustomEvent(actions2events.get(type)));
        } else {
            this.dispatchEvent(new CustomEvent(actions2events.get(type), { detail: JSON.stringify(Object.assign(param)) }));
        }
    }

    static get properties() {
        return {
            _page: { type: String },
            _app: { type: String },
            cesubofferTabsList: { type: Array },
            cesubofferSlotsList: { type: Array },
        };
    }

    constructor() {
        super();
        this._app = "cesuboffer";
        this.cesubofferTabsList = [];
        this.cesubofferSlotsList = [];
    }

}
