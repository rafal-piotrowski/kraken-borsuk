import {
    GET_PRODUCT_GROUP_DICT,
    GET_CATEGORY_DICT,
    GET_EVENTS_DICT
  } from '../actions/dictionaries.js';

  const INITIAL_STATE = {
    prdgrpdict: {},
    categorydict: {},
    eventsdict: {}
};

const dictionaries = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_PRODUCT_GROUP_DICT:
            return {
                ...state,
                prdgrpdict: action.prdgrpdict
            }
        case GET_CATEGORY_DICT:
            return {
                ...state,
                categorydict: action.categorydict
            }
        case GET_EVENTS_DICT:
            return {
                ...state,
                eventsdict: action.eventsdict
            }
        default:
            return state;
    }
  };

export default dictionaries;

export const dictProductGroupSelector = state => state.dictionaries.prdgrpdict;
export const dictCategorySelector = state => state.dictionaries.categorydict;
export const dictEventsSelector = state => state.dictionaries.eventsdict;
