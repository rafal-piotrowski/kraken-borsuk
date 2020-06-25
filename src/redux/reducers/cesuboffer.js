/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-nested-ternary */
/* eslint-disable prefer-template */
/* eslint-disable consistent-return */
/* eslint-disable no-fallthrough */
/* eslint-disable no-case-declarations */
/* eslint-disable arrow-body-style */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
import {
    UPDATE_PAGE,
    ACTIVATE_CHANNEL_TAB,
    DISACTIVATE_CHANNEL_TAB,
    GET_CESUBOFFER_TABS,
    GET_CESUBOFFER_SLOTS,
    GET_CE_CHANNEL_TABS,
    GET_CE_CHANNEL_SLOTS,
    GET_SIDEBAR_TYPES,
    GET_SIDEBAR_NAMES,
    GET_SEARCH_RESULTS,
    CHANGE_FORM_VALUE,
    CHANGE_CHANNEL_ACTIVE_FLG
} from '../actions/cesuboffer.js';

import { createSelector } from 'reselect';
  
const INITIAL_STATE = {
    page: '',
    slot: '',
    cesubtabs: {},
    cesubslots: {},
    cechnltabs: {},
    cechnlslots: {},
    cesubtypes: {},
    cesubnames: {},
    searchresults: {}
};
  
const cesuboffer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_PAGE:
            return {
                ...state,
                page: action.page,
                slot: action.slot,
                cesubtabs: Object.keys(state.cesubtabs).map((key) => state.cesubtabs[key].tabPageId === action.page ? { ...state.cesubtabs[key], tabActive: true } : { ...state.cesubtabs[key], tabActive: false })
            };
        case ACTIVATE_CHANNEL_TAB:
            const activePage = Object.values(state.cesubtabs).filter(subtab => subtab.tabActive === true)[0].tabPageId;
            return {
                ...state,
                cechnltabs: Object.keys(state.cechnltabs).map((key) => (state.cechnltabs[key].parentPageId === activePage && (state.cechnltabs[key].tabPageId === action.page)) ? 
                                                                        { ...state.cechnltabs[key], tabActive: true } : { ...state.cechnltabs[key] })
            };
        case DISACTIVATE_CHANNEL_TAB:
            const disPage = Object.values(state.cesubtabs).filter(subtab => subtab.tabActive === true)[0].tabPageId;
            return {
                ...state,
                cechnltabs: Object.keys(state.cechnltabs).map((key) => (state.cechnltabs[key].parentPageId === disPage && (state.cechnltabs[key].tabPageId === action.prev)) ? 
                                                                        { ...state.cechnltabs[key], tabActive: false } : { ...state.cechnltabs[key] })
            };
        case GET_CESUBOFFER_TABS:
            return {
                ...state,
                cesubtabs: action.cesubtabs
            };
        case GET_CESUBOFFER_SLOTS:
            return {
                ...state,
                cesubslots: action.cesubslots
            };
        case GET_CE_CHANNEL_TABS:
            return {
                ...state,
                cechnltabs: action.cechnltabs
            };
        case GET_CE_CHANNEL_SLOTS:
            return {
                ...state,
                cechnlslots: action.cechnlslots
            };
        case GET_SIDEBAR_TYPES:
            return {
                ...state,
                cesubtypes: action.cesubtypes
            }
        case GET_SIDEBAR_NAMES:
            return {
                ...state,
                cesubnames: action.cesubnames
            }
        case GET_SEARCH_RESULTS:
            return {
                ...state,
                searchresults: action.searchresults
            }
        case CHANGE_FORM_VALUE:

            // formularz edycji suboferty
            if (action.sParam === 'subofferName') {
                return { ...state, cesubslots: Object.keys(state.cesubslots).map((key) => state.cesubslots[key].tabPageId === action.tabPageId ? { ...state.cesubslots[key], subofferName: action.nValue } : state.cesubslots[key]) }
            }
            if (action.sParam === 'groupId') {
                return { ...state, cesubslots: Object.keys(state.cesubslots).map((key) => state.cesubslots[key].tabPageId === action.tabPageId ? { ...state.cesubslots[key], groupId: action.nValue } : state.cesubslots[key]) }
            }
            if (action.sParam === 'categoryId') {
                return { ...state, cesubslots: Object.keys(state.cesubslots).map((key) => state.cesubslots[key].tabPageId === action.tabPageId ? { ...state.cesubslots[key], categoryId: action.nValue } : state.cesubslots[key]) }
            }
            if (action.sParam === 'eventId') {
                return { ...state, cesubslots: Object.keys(state.cesubslots).map((key) => state.cesubslots[key].tabPageId === action.tabPageId ? { ...state.cesubslots[key], eventId: action.nValue } : state.cesubslots[key]) }
            }

            // formularz edycji wersji
            if (action.sParam === 'versionName') {
                return { ...state, cesubslots: Object.keys(state.cesubslots).map((key) => state.cesubslots[key].tabPageId === action.tabPageId ? { ...state.cesubslots[key], versionName: action.nValue } : state.cesubslots[key]) }
            }
            if (action.sParam === 'pushAndSms') {
                return { ...state, cesubslots: Object.keys(state.cesubslots).map((key) => state.cesubslots[key].tabPageId === action.tabPageId ? { ...state.cesubslots[key], pushAndSms: action.nValue } : state.cesubslots[key]) }
            }

            // podformularz dla kanału PUSH, SMS, Wiadomość
            if (action.sParam === 'formMessageText') {
                return { ...state, cechnlslots: Object.keys(state.cechnlslots).map((key) => state.cechnlslots[key].tabPageId === action.tabPageId ? { ...state.cechnlslots[key], content: action.nValue } : state.cechnlslots[key]) }
            }
            if (action.sParam === 'formInLink') {
                return { ...state, cechnlslots: Object.keys(state.cechnlslots).map((key) => state.cechnlslots[key].tabPageId === action.tabPageId ? { ...state.cechnlslots[key], inLink: action.nValue } : state.cechnlslots[key]) }
            }
            if (action.sParam === 'formOutLink') {
                return { ...state, cechnlslots: Object.keys(state.cechnlslots).map((key) => state.cechnlslots[key].tabPageId === action.tabPageId ? { ...state.cechnlslots[key], outLink: action.nValue } : state.cechnlslots[key]) }
            }
            if (action.sParam === 'formPushAction') {
                return { ...state, cechnlslots: Object.keys(state.cechnlslots).map((key) => state.cechnlslots[key].tabPageId === action.tabPageId ? { ...state.cechnlslots[key], actionId: action.nValue } : state.cechnlslots[key]) }
            }
            if (action.sParam === 'formSendPeriod') {
                return { ...state, cechnlslots: Object.keys(state.cechnlslots).map((key) => state.cechnlslots[key].tabPageId === action.tabPageId ? { ...state.cechnlslots[key], sendPeriodId: action.nValue } : state.cechnlslots[key]) }
            }
            if (action.sParam === 'formPhoneType') {
                return { ...state, cechnlslots: Object.keys(state.cechnlslots).map((key) => state.cechnlslots[key].tabPageId === action.tabPageId ? { ...state.cechnlslots[key], phoneTypeId: action.nValue } : state.cechnlslots[key]) }
            }
            if (action.sParam === 'formMessageTitle') {
                return { ...state, cechnlslots: Object.keys(state.cechnlslots).map((key) => state.cechnlslots[key].tabPageId === action.tabPageId ? { ...state.cechnlslots[key], title: action.nValue } : state.cechnlslots[key]) }
            }
            if (action.sParam === 'formMessageExpireTime') {
                return { ...state, cechnlslots: Object.keys(state.cechnlslots).map((key) => state.cechnlslots[key].tabPageId === action.tabPageId ? { ...state.cechnlslots[key], expire: action.nValue } : state.cechnlslots[key]) }
            }
            if (action.sParam === 'formMesagesGroup') {
                return { ...state, cechnlslots: Object.keys(state.cechnlslots).map((key) => state.cechnlslots[key].tabPageId === action.tabPageId ? { ...state.cechnlslots[key], groupId: action.nValue } : state.cechnlslots[key]) }
            }
            if (action.sParam === 'notificationEventId') {
                return { ...state, cechnlslots: Object.keys(state.cechnlslots).map((key) => state.cechnlslots[key].tabPageId === action.tabPageId ? { ...state.cechnlslots[key], eventId: action.nValue } : state.cechnlslots[key]) }
            }
            if (action.sParam === 'formSendFrom') {
                return { ...state, cechnlslots: Object.keys(state.cechnlslots).map((key) => state.cechnlslots[key].tabPageId === action.tabPageId ? { ...state.cechnlslots[key], sendFrom: action.nValue } : state.cechnlslots[key]) }
            }
            if (action.sParam === 'formSendTo') {
                return { ...state, cechnlslots: Object.keys(state.cechnlslots).map((key) => state.cechnlslots[key].tabPageId === action.tabPageId ? { ...state.cechnlslots[key], sendTo: action.nValue } : state.cechnlslots[key]) }
            }

        case CHANGE_CHANNEL_ACTIVE_FLG:
            return { 
                ...state, 
                cechnltabs: Object.keys(state.cechnltabs).map((key) => state.cechnltabs[key].tabPageId === action.tabPageId ? { ...state.cechnltabs[key], channelActive: action.nValue } : state.cechnltabs[key]) 
            }

        default:
            return state;
    }
};
  
export default cesuboffer;

// const getActiveSlot = state => state.cesuboffer.slot;
// const getActivePage = state => state.cesuboffer.page;

export const cesubofferTabsSelector = state => state.cesuboffer.cesubtabs;
export const cesubofferSlotsSelector = state => state.cesuboffer.cesubslots;
export const ceChannelTabsSelector = state => state.cesuboffer.cechnltabs;
export const ceChannelSlotsSelector = state => state.cesuboffer.cechnlslots;
export const cesubofferTypesSelector = state => state.cesuboffer.cesubtypes;
export const cesubofferNamesSelector = state => state.cesuboffer.cesubnames;
export const ceSearchResultsSelector = state => state.cesuboffer.searchresults;

export const getActivePage = createSelector(
    [ cesubofferTabsSelector ],
    (cesubtabs) => {
        return Object.values(cesubtabs).filter(subtab => subtab.tabActive === true)[0].tabPageId;
    }
)

export const getActiveSlot = createSelector(
    [ cesubofferTabsSelector ],
    (cesubtabs) => {
        return Object.values(cesubtabs).filter(subtab => subtab.tabActive === true)[0].tabSlotId;
    }
)

export const getActiveChannelTabs = createSelector(
    [ ceChannelTabsSelector ],
    (cechnltabs) => {
        return Object.values(cechnltabs).filter(subtab => subtab.tabActive === true);
    }
)

export const cesubofferSlotsReselector = createSelector(
    [ cesubofferSlotsSelector, getActiveSlot ],
    (cesubslots, slot) => {
        return Object.values(cesubslots).filter(subslot => subslot.tabSlotId === slot);
    }
  )

export const cesubofferPageReselector = createSelector(
    [ cesubofferSlotsSelector, getActivePage ],
    (cesubslots, page) => {
        return Object.values(cesubslots).filter(subslot => subslot.tabPageId === page);
    }
  )

export const ceChannelTabsReselector = createSelector(
    [ ceChannelTabsSelector, getActivePage ],
    (cechnltabs, page) => {
        return Object.values(cechnltabs).filter(chnltab => chnltab.parentPageId === page);
    }
  )

export const getActiveChannelPage = createSelector(
    [getActiveChannelTabs, getActivePage],
    (cechnltabs, page) => {
        return Object.values(cechnltabs).filter(subtab => subtab.tabActive === true && subtab.parentPageId === page)[0].tabPageId;
    }
)

export const ceChannelSlotsReselector = createSelector(
    [ ceChannelSlotsSelector, getActiveChannelPage ],
    (cechnlslots, page) => {
        return Object.values(cechnlslots).filter(chnlslot => chnlslot.tabPageId === page);
    }
  )

export const ceChannelsSlotReselector = createSelector(
    [ ceChannelSlotsSelector, getActivePage ],
    (cechnlslots, page) => {
        return Object.values(cechnlslots).filter(chnlslot => chnlslot.parentPageId === page);
    }
  )

export const ceChannelsPageReselector = createSelector(
    [ ceChannelTabsSelector, getActivePage ],
    (cechnltabs, page) => {
        return Object.values(cechnltabs).filter(chnltab => chnltab.parentPageId === page);
    }
  )

export const getChannelContentFlg = createSelector(
    [getActiveChannelTabs, getActivePage],
    (cechnltabs, page) => {
        return Object.values(cechnltabs).filter(subtab => subtab.tabActive === true && subtab.parentPageId === page)[0].channelActive;
    }
)