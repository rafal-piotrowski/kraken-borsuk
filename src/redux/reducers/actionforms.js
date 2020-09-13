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
    // ACTIVATE_CHANNEL_TAB,
    // DISACTIVATE_CHANNEL_TAB,
    GET_AFORMS_TABS,
    GET_AFORMS_SLOTS,
    // GET_CE_CHANNEL_TABS,
    // GET_CE_CHANNEL_SLOTS,
    GET_SIDEBAR_AFTYPES,
    GET_SIDEBAR_AFNAMES,
    // GET_SEARCH_RESULTS,
    // CHANGE_FORM_VALUE,
    // CHANGE_CHANNEL_ACTIVE_FLG,
    // UPDATE_STATUS_VAL,
    // UPDATE_STATUS_DESC,
    // GET_VERSIONS_LIST,
    // GET_SCHEDULES_LIST,
    // GET_PUBLICATIONS_LIST,
    // GET_CHANNEL_ACTIONS_PARAMS,
    // ADD_CHANNEL_ACTIONS_PARAM,
    // UPDATE_HTML_FLG,
    // GET_BUTTONS_FLAGS
} from '../actions/actionforms.js';

import { createSelector } from 'reselect';
  
const INITIAL_STATE = {
    page: '',
    slot: '',
    htmlflg: false,
    aformstabs: {},
    aformsslots: {},
    xformsslots: {},
    // cechnltabs: {},
    // cechnlslots: {},
    // cxchnlslots: {},
    aftypes: {},
    afnames: {},
    // searchresults: {},
    // ceverslist: {},
    // ceschlist: {},
    // cepubslist: {},
    // chnactparams: {},
    // cebtnsflgs: {}
};
  
const actionforms = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_PAGE:
            return {
                ...state,
                page: action.page,
                slot: action.slot,
                aformstabs: Object.keys(state.aformstabs).map((key) => state.aformstabs[key].tabPageId === action.page ? { ...state.aformstabs[key], tabActive: true } : { ...state.aformstabs[key], tabActive: false })
            };
        // case UPDATE_HTML_FLG:
        //     return {
        //         ...state,
        //         htmlflg: action.flag
        //     };
        // case ACTIVATE_CHANNEL_TAB:
        //     const activePage = Object.values(state.cesubtabs).filter(subtab => subtab.tabActive === true)[0].tabPageId;
        //     return {
        //         ...state,
        //         cechnltabs: Object.keys(state.cechnltabs).map((key) => (state.cechnltabs[key].parentPageId === activePage && (state.cechnltabs[key].tabPageId === action.page)) ? 
        //                                                                 { ...state.cechnltabs[key], tabActive: true } : { ...state.cechnltabs[key] })
        //     };
        // case DISACTIVATE_CHANNEL_TAB:
        //     const disPage = Object.values(state.cesubtabs).filter(subtab => subtab.tabActive === true)[0].tabPageId;
        //     return {
        //         ...state,
        //         cechnltabs: Object.keys(state.cechnltabs).map((key) => (state.cechnltabs[key].parentPageId === disPage && (state.cechnltabs[key].tabPageId === action.prev)) ? 
        //                                                                 { ...state.cechnltabs[key], tabActive: false } : { ...state.cechnltabs[key] })
        //     };
        case GET_AFORMS_TABS:
            return {
                ...state,
                aformstabs: action.aformstabs
            };
        case GET_AFORMS_SLOTS:
            return {
                ...state,
                aformsslots: action.aformsslots,
                xformsslots: action.aformsslots
            };
        // case GET_VERSIONS_LIST:
        //     return {
        //         ...state,
        //         ceverslist: action.ceverslist
        //     };
        // case GET_SCHEDULES_LIST:
        //     return {
        //         ...state,
        //         ceschlist: action.ceschlist
        //     };
        // case GET_PUBLICATIONS_LIST:
        //         return {
        //             ...state,
        //             cepubslist: action.cepubslist
        //         };
        // case GET_CHANNEL_ACTIONS_PARAMS:
        //     return {
        //         ...state,
        //         chnactparams: action.chnactparams
        //     };
        // case ADD_CHANNEL_ACTIONS_PARAM:
        //     return {
        //         ...state,
        //         chnactparams: action.chnactparam
        //     };
        // case GET_CE_CHANNEL_TABS:
        //     return {
        //         ...state,
        //         cechnltabs: action.cechnltabs
        //     };
        // case GET_CE_CHANNEL_SLOTS:
        //     return {
        //         ...state,
        //         cechnlslots: action.cechnlslots,
        //         cxchnlslots: action.cechnlslots
        //     };
        case GET_SIDEBAR_AFTYPES:
            return {
                ...state,
                aftypes: action.aftypes
            }
        case GET_SIDEBAR_AFNAMES:
            return {
                ...state,
                afnames: action.afnames
            }
        // case GET_BUTTONS_FLAGS:
        //     return {
        //         ...state,
        //         cebtnsflgs: action.cebtnsflgs
        //     }
        // case GET_SEARCH_RESULTS:
        //     return {
        //         ...state,
        //         searchresults: action.searchresults
        //     }
        // case CHANGE_FORM_VALUE:

        //     if (action.sParam === 'subofferName') {
        //         return { ...state, cesubslots: Object.keys(state.cesubslots).map((key) => state.cesubslots[key].tabPageId === action.tabPageId ? { ...state.cesubslots[key], subofferName: action.nValue } : state.cesubslots[key]) }
        //     }
        //     if (action.sParam === 'groupId') {
        //         return { ...state, cesubslots: Object.keys(state.cesubslots).map((key) => state.cesubslots[key].tabPageId === action.tabPageId ? { ...state.cesubslots[key], groupId: action.nValue } : state.cesubslots[key]) }
        //     }
        //     if (action.sParam === 'categoryId') {
        //         return { ...state, cesubslots: Object.keys(state.cesubslots).map((key) => state.cesubslots[key].tabPageId === action.tabPageId ? { ...state.cesubslots[key], categoryId: action.nValue } : state.cesubslots[key]) }
        //     }
        //     if (action.sParam === 'eventId') {
        //         return { ...state, cesubslots: Object.keys(state.cesubslots).map((key) => state.cesubslots[key].tabPageId === action.tabPageId ? { ...state.cesubslots[key], eventId: action.nValue } : state.cesubslots[key]) }
        //     }

        // case CHANGE_CHANNEL_ACTIVE_FLG:
        //     return { 
        //         ...state, 
        //         cechnltabs: Object.keys(state.cechnltabs).map((key) => state.cechnltabs[key].tabPageId === action.tabPageId ? { ...state.cechnltabs[key], channelActive: action.nValue } : state.cechnltabs[key]) 
        //     }

        // case UPDATE_STATUS_VAL:
        //     return { 
        //         ...state,
        //         cesubslots: Object.keys(state.cesubslots).map((key) => state.cesubslots[key].tabPageId === action.tabPageId ? { ...state.cesubslots[key], status: action.statusVal } : state.cesubslots[key])
        //     }

        // case UPDATE_STATUS_DESC:
        //     return { 
        //         ...state,
        //         cesubslots: Object.keys(state.cesubslots).map((key) => state.cesubslots[key].tabPageId === action.tabPageId ? { ...state.cesubslots[key], statusDesc: action.statusDesc } : state.cesubslots[key])
        //     }

        default:
            return state;
    }
};
  
export default actionforms;

// const getActiveSlot = state => state.cesuboffer.slot;
// const getActivePage = state => state.cesuboffer.page;

export const actionformsTabsSelector = state => state.actionforms.aformstabs;
export const actionformsSlotsSelector = state => state.actionforms.aformsslots;
export const actionformsSlotsBckpSelector = state => state.actionforms.xformsslots;
// export const ceChannelTabsSelector = state => state.cesuboffer.cechnltabs;
// export const ceChannelSlotsSelector = state => state.cesuboffer.cechnlslots;
// export const ceChannelSlotsBckpSelector = state => state.cesuboffer.cxchnlslots;
export const actionformsTypesSelector = state => state.actionforms.aftypes;
export const actionformsNamesSelector = state => state.actionforms.afnames;
// export const ceSearchResultsSelector = state => state.cesuboffer.searchresults;
// export const ceVersionsListSelector = state => state.cesuboffer.ceverslist;
// export const ceSchedulesListSelector = state => state.cesuboffer.ceschlist;
// export const cePublicationsListSelector = state => state.cesuboffer.cepubslist;
// export const ceChnActParamsSelector = state => state.cesuboffer.chnactparams;
// export const ceBtnsFlagsSelector = state => state.cesuboffer.cebtnsflgs;

export const getActivePage = createSelector(
    [ actionformsTabsSelector ],
    (aformstabs) => {
        return Object.values(aformstabs).filter(formtab => formtab.tabActive === true)[0].tabPageId;
    }
)

export const getActiveSlot = createSelector(
    [ actionformsTabsSelector ],
    (aformstabs) => {
        return Object.values(aformstabs).filter(formtab => formtab.tabActive === true)[0].tabSlotId;
    }
)

// export const getActiveChannelTabs = createSelector(
//     [ ceChannelTabsSelector ],
//     (cechnltabs) => {
//         return Object.values(cechnltabs).filter(subtab => subtab.tabActive === true);
//     }
// )

// export const cesubofferSlotsReselector = createSelector(
//     [ cesubofferSlotsSelector, getActiveSlot ],
//     (cesubslots, slot) => {
//         return Object.values(cesubslots).filter(subslot => subslot.tabSlotId === slot);
//     }
//   )

// export const cesubofferPageReselector = createSelector(
//     [ cesubofferSlotsSelector, getActivePage ],
//     (cesubslots, page) => {
//         return Object.values(cesubslots).filter(subslot => subslot.tabPageId === page);
//     }
//   )

// export const cesubofferPageBckpReselector = createSelector(
//     [ cesubofferSlotsBckpSelector, getActivePage ],
//     (cxsubslots, page) => {
//         return Object.values(cxsubslots).filter(subslot => subslot.tabPageId === page);
//     }
//   )

// export const ceBtnsFlagsReselector = createSelector(
//     [ ceBtnsFlagsSelector, getActivePage ],
//     (cebtnsflgs, page) => {
//         return Object.values(cebtnsflgs).filter(btnflag => btnflag.tabPageId === page);
//     }
//   )

// export const ceVersionsListReselector = createSelector(
//     [ ceVersionsListSelector, getActivePage ],
//     (ceverslist, page) => {
//         return Object.values(ceverslist).filter(version => version.tabPageId === page);
//     }
//   )

// export const cePublicationsListReselector = createSelector(
//     [ cePublicationsListSelector, getActivePage ],
//     (cepubslist, page) => {
//         return Object.values(cepubslist).filter(cepublic => cepublic.tabPageId === page);
//     }
//   )

// export const ceChannelTabsReselector = createSelector(
//     [ ceChannelTabsSelector, getActivePage ],
//     (cechnltabs, page) => {
//         return Object.values(cechnltabs).filter(chnltab => chnltab.parentPageId === page);
//     }
//   )

// export const getActiveChannelPage = createSelector(
//     [getActiveChannelTabs, getActivePage],
//     (cechnltabs, page) => {
//         return Object.values(cechnltabs).filter(subtab => subtab.tabActive === true && subtab.parentPageId === page)[0].tabPageId;
//     }
// )

// export const ceChannelSlotsReselector = createSelector(
//     [ ceChannelSlotsSelector, getActiveChannelPage ],
//     (cechnlslots, page) => {
//         return Object.values(cechnlslots).filter(chnlslot => chnlslot.tabPageId === page);
//     }
//   )

// export const ceChannelsSlotReselector = createSelector(
//     [ ceChannelSlotsSelector, getActivePage ],
//     (cechnlslots, page) => {
//         return Object.values(cechnlslots).filter(chnlslot => chnlslot.parentPageId === page);
//     }
//   )

// export const ceChannelsSlotBckpReselector = createSelector(
//     [ ceChannelSlotsBckpSelector, getActivePage ],
//     (cxchnlslots, page) => {
//         return Object.values(cxchnlslots).filter(chnlslot => chnlslot.parentPageId === page);
//     }
//   )

// export const ceChannelsPageReselector = createSelector(
//     [ ceChannelTabsSelector, getActivePage ],
//     (cechnltabs, page) => {
//         return Object.values(cechnltabs).filter(chnltab => chnltab.parentPageId === page);
//     }
//   )

// export const getChannelContentFlg = createSelector(
//     [getActiveChannelTabs, getActivePage],
//     (cechnltabs, page) => {
//         return Object.values(cechnltabs).filter(subtab => subtab.tabActive === true && subtab.parentPageId === page)[0].channelActive;
//     }
// )

// export const ceChnActParamsReselector = createSelector(
//     [ ceChnActParamsSelector, getActivePage],
//     (chnactparams, page) => {
//         return Object.values(chnactparams).filter(subparam => subparam.parentPageId === page);
//     }
// )
