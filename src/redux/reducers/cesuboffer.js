import {
    UPDATE_PAGE,
    GET_CESUBOFFER_TABS,
    SET_CE_CLICK_ACTION
} from '../actions/cesuboffer.js';
  
const INITIAL_STATE = {
    page: '',
    slot: '',
    ceactionclick: '',
    ceactionparam: '',
    cesubtabs: {}
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
        default:
            return state;
    }
};
  
export default cesuboffer;

export const cesubofferTabsSelector = state => state.cesuboffer.cesubtabs;
export const ceActionClickSelector = state => state.cesuboffer.ceactionclick;
export const ceActionParamSelector = state => state.cesuboffer.ceactionparam;
  