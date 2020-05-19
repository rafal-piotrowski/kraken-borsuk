import {
    UPDATE_PAGE,
    GET_CESUBOFFER_TABS,
    GET_SIDEBAR_TYPES,
    GET_SIDEBAR_NAMES,
    GET_SEARCH_RESULTS
} from '../actions/cesuboffer.js';
  
const INITIAL_STATE = {
    page: '',
    slot: '',
    cesubtabs: {},
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
        default:
            return state;
    }
};
  
export default cesuboffer;

export const cesubofferTabsSelector = state => state.cesuboffer.cesubtabs;
export const cesubofferTypesSelector = state => state.cesuboffer.cesubtypes;
export const cesubofferNamesSelector = state => state.cesuboffer.cesubnames;
export const ceSearchResultsSelector = state => state.cesuboffer.searchresults;
