import {
    UPDATE_PAGE,
    GET_CESUBOFFER_TABS,
    SET_CE_CLICK_ACTION,
    GET_SIDEBAR_TYPES,
    GET_SIDEBAR_NAMES
} from '../actions/cesuboffer.js';
  
const INITIAL_STATE = {
    page: '',
    slot: '',
    ceactionclick: '',
    ceactionparam: '',
    cesubtabs: {},
    cesubtypes: {},
    cesubnames: {}
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
        case SET_CE_CLICK_ACTION:
            return {
                ...state,
                ceactionclick: action.ceClickAction,
                ceactionparam: action.ceClickParam
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
        default:
            return state;
    }
};
  
export default cesuboffer;

export const cesubofferTabsSelector = state => state.cesuboffer.cesubtabs;
export const cesubofferTypesSelector = state => state.cesuboffer.cesubtypes;
export const cesubofferNamesSelector = state => state.cesuboffer.cesubnames;
export const ceActionClickSelector = state => state.cesuboffer.ceactionclick;
export const ceActionParamSelector = state => state.cesuboffer.ceactionparam;
  