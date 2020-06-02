/* eslint-disable no-fallthrough */
/* eslint-disable no-case-declarations */
/* eslint-disable arrow-body-style */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
import {
    UPDATE_PAGE,
    GET_CESUBOFFER_TABS,
    GET_CESUBOFFER_SLOTS,
    GET_SIDEBAR_TYPES,
    GET_SIDEBAR_NAMES,
    GET_SEARCH_RESULTS,
    CHANGE_FORM_VALUE
} from '../actions/cesuboffer.js';

import { createSelector } from 'reselect';
  
const INITIAL_STATE = {
    page: '',
    slot: '',
    cesubtabs: {},
    cesubslots: {},
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
                slot: action.slot
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
            if (action.sParam === 'subofferName') {
                return {
                    ...state,
                    cesubslots: Object.keys(state.cesubslots).map((key) => state.cesubslots[key].tabPageId === action.tabPageId ? { ...state.cesubslots[key], subofferName: action.nValue } : state.cesubslots[key])
                }
            }
            if (action.sParam === 'groupId') {
                return {
                    ...state,
                    cesubslots: Object.keys(state.cesubslots).map((key) => state.cesubslots[key].tabPageId === action.tabPageId ? { ...state.cesubslots[key], groupId: action.nValue } : state.cesubslots[key])
                }
            }
            if (action.sParam === 'categoryId') {
                return {
                    ...state,
                    cesubslots: Object.keys(state.cesubslots).map((key) => state.cesubslots[key].tabPageId === action.tabPageId ? { ...state.cesubslots[key], categoryId: action.nValue } : state.cesubslots[key])
                }
            }
            if (action.sParam === 'eventId') {
                return {
                    ...state,
                    cesubslots: Object.keys(state.cesubslots).map((key) => state.cesubslots[key].tabPageId === action.tabPageId ? { ...state.cesubslots[key], eventId: action.nValue } : state.cesubslots[key])
                }
            }
            if (action.sParam === 'versionName') {
                return {
                    ...state,
                    cesubslots: Object.keys(state.cesubslots).map((key) => state.cesubslots[key].tabPageId === action.tabPageId ? { ...state.cesubslots[key], versionName: action.nValue } : state.cesubslots[key])
                }
            }
            if (action.sParam === 'pushAndSms') {
                return {
                    ...state,
                    cesubslots: Object.keys(state.cesubslots).map((key) => state.cesubslots[key].tabPageId === action.tabPageId ? { ...state.cesubslots[key], pushAndSms: action.nValue } : state.cesubslots[key])
                }
            }
        default:
            return state;
    }
};
  
export default cesuboffer;

const getActiveSlot = state => state.cesuboffer.slot;
const getActivePage = state => state.cesuboffer.page;

export const cesubofferTabsSelector = state => state.cesuboffer.cesubtabs;
export const cesubofferSlotsSelector = state => state.cesuboffer.cesubslots;
export const cesubofferTypesSelector = state => state.cesuboffer.cesubtypes;
export const cesubofferNamesSelector = state => state.cesuboffer.cesubnames;
export const ceSearchResultsSelector = state => state.cesuboffer.searchresults;

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
