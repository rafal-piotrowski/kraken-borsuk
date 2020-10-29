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

import { titles } from '../../properties/titles.js';
import { actions } from '../../properties/actions.js';
import { events } from '../../properties/events.js';
import { actions2events } from '../../properties/actions2events.js';

// podłączenie do Redux store.
import { store } from '../../redux/store.js';

// załadowanie kreatorów akcji.
import { getCesubofferTabs, getCesubofferSlots, getCeChannelTabs, getCeChannelSlots, getSidebarTypes, getSidebarNames, getSearchResults, 
    navigate, changeStatus, getVersionsList, getSchedulesList, getPublicationsList, getChannelActionsParams, updateHtmlFlg, getButtonsFlags } from '../../redux/actions/campform.js';
import { getCampaignProductGroups, getObligatoryConditions, getEventsDict, getCommonConditions, getParameters, getGroupTypes, getChannelCycleTypes, getProductCategories,
        getProductRelations, getSquadsDict, getGeneralPersonalization, getUnusedEventsDict, getActionCharacter, getActionMajorType, getActionMinorType, getUserAccounts,
        getDebitCardBinCodes, getCreditCardBinCodes, getChannelTypes, getDeliveryMethods } from '../../redux/actions/dictionaries.js';
import { setClickAction } from '../../redux/actions/customevents.js';
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
        
        // console.log('_______________ campFormApp - firstUpdated __________________');

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
        this._setCampaignProductGroups();
        // this._setCategoryDict();
        this._setGeneralPersonalization();
        this._setSquads();
        this._setActionCharacter();
        this._setUserAccounts();
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
    _setUserAccounts(jsonData) {
        if (jsonData) { store.dispatch(getUserAccounts(jsonData.userAccounts)); } 
        else { loadJSON('/src/properties/_userAccounts.json').then(data => { store.dispatch(getUserAccounts(data.userAccounts)); }) }
    }

    // ACTION MATRIX
    _setActionCharacter(jsonData) {
        if (jsonData) { store.dispatch(getActionCharacter(jsonData.actionCharacter)); } 
        else { loadJSON('/src/properties/_actionCharacter.json').then(data => { store.dispatch(getActionCharacter(data.actionCharacter)); }) }
    }

    _setActionMajorType(jsonData) {
        if (jsonData) { store.dispatch(getActionMajorType(jsonData.actionMajorType)); } 
        else { loadJSON('/src/properties/_actionMajorType.json').then(data => { store.dispatch(getActionMajorType(data.actionMajorType)); }) }
    }

    _setActionMinorType(jsonData) {
        if (jsonData) { store.dispatch(getActionMinorType(jsonData.actionMinorType)); } 
        else { loadJSON('/src/properties/_actionMinorType.json').then(data => { store.dispatch(getActionMinorType(data.actionMinorType)); }) }
    }

    _setCampaignProductGroups(jsonData) {
        if (jsonData) { store.dispatch(getCampaignProductGroups(jsonData.campaignProductGroups)); } 
        else { loadJSON('/src/properties/_campaignProductGroups.json').then(data => { store.dispatch(getCampaignProductGroups(data.campaignProductGroups)); }) }
    }

    _setSquads(jsonData) {
        if (jsonData) { store.dispatch(getSquadsDict(jsonData.squads)); } 
        else { loadJSON('/src/properties/_squads.json').then(data => { store.dispatch(getSquadsDict(data.squads)); }) }
    }

    _setObligatoryConditions(jsonData) {
        if (jsonData) { store.dispatch(getObligatoryConditions(jsonData.obligatoryConditions)); } 
        else { loadJSON('/src/properties/_obligatoryConditions.json').then(data => { store.dispatch(getObligatoryConditions(data.obligatoryConditions)); }) }
    }

    _setCommonConditions(jsonData) {
        if (jsonData) { store.dispatch(getCommonConditions(jsonData.commonConditions)); } 
        else { loadJSON('/src/properties/_commonConditions.json').then(data => { store.dispatch(getCommonConditions(data.commonConditions)); }) }
    }

    _setParameters(jsonData) {
        if (jsonData) { store.dispatch(getParameters(jsonData.parameters)); } 
        else { loadJSON('/src/properties/_parameters.json').then(data => { store.dispatch(getParameters(data.parameters)); }) }
    }

    _setGeneralPersonalization(jsonData) {
        if (jsonData) { store.dispatch(getGeneralPersonalization(jsonData.generalPersonalization)); } 
        else { loadJSON('/src/properties/_generalPersonalization.json').then(data => { store.dispatch(getGeneralPersonalization(data.generalPersonalization)); }) }
    }

    _setGroupTypes(jsonData) {
        if (jsonData) { store.dispatch(getGroupTypes(jsonData.groupTypes)); }
        else { loadJSON('/src/properties/_groupTypes.json').then(data => { store.dispatch(getGroupTypes(data.groupTypes)); }) }
    }

    _setChannelCycleTypes(jsonData) {
        if (jsonData) { store.dispatch(getChannelCycleTypes(jsonData.channelCycleTypes)); }
        else { loadJSON('/src/properties/_channelCycleTypes.json').then(data => { store.dispatch(getChannelCycleTypes(data.channelCycleTypes)); }) }
    }

    _setProductRelations(jsonData) {
        if (jsonData) { store.dispatch(getProductRelations(jsonData.productRelations)); }
        else { loadJSON('/src/properties/_productRelations.json').then(data => { store.dispatch(getProductRelations(data.productRelations)); }) }
    }

    _setProductCategories(jsonData) {
        if (jsonData) { store.dispatch(getProductCategories(jsonData.productCategories)); }
        else { loadJSON('/src/properties/_productCategories.json').then(data => { store.dispatch(getProductCategories(data.productCategories)); }) }
    }

    _setDebitCardBinCodes(jsonData) {
        if (jsonData) { store.dispatch(getDebitCardBinCodes(jsonData.debitCardBinCodes)); }
        else { loadJSON('/src/properties/_debitCardBinCodes.json').then(data => { store.dispatch(getDebitCardBinCodes(data.debitCardBinCodes)); }) }
    }

    _setCreditCardBinCodes(jsonData) {
        if (jsonData) { store.dispatch(getCreditCardBinCodes(jsonData.creditCardBinCodes)); }
        else { loadJSON('/src/properties/_creditCardBinCodes.json').then(data => { store.dispatch(getCreditCardBinCodes(data.creditCardBinCodes)); }) }
    }

    _setChannelTypes(jsonData) {
        if (jsonData) { store.dispatch(getChannelTypes(jsonData.channelTypes)); }
        else { loadJSON('/src/properties/_channelTypes.json').then(data => { store.dispatch(getChannelTypes(data.channelTypes)); }) }
    }

    _setDeliveryMethods(jsonData) {
        if (jsonData) { store.dispatch(getDeliveryMethods(jsonData.deliveryMethods)); }
        else { loadJSON('/src/properties/_deliveryMethods.json').then(data => { store.dispatch(getDeliveryMethods(data.deliveryMethods)); }) }
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
            _page: { type: String },
            _app: { type: String }
        };
    }

    constructor() {
        super();
        this._app = "campform";
        this.cesubofferNavbarTitle = 'Formatki akcji';
    }

}
