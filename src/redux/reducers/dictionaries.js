import {
    GET_PRODUCT_GROUP_DICT,
    GET_CATEGORY_DICT,
    GET_EVENTS_DICT,
    GET_PUSH_ACTION_DICT,
    GET_PERIODS_DICT,
    GET_PHONE_TYPE_DICT,
    GET_MESSAGE_GROUP_DICT,
    GET_RESPONSE_CODES_DICT,
    GET_CONTENT_PARAMS_DICT,
    GET_ACTIONS_PARAMS_DICT,
    UPDATE_ACTPARAMS_VISIBLE
  } from '../actions/dictionaries.js';

  const INITIAL_STATE = {
    prdgrpdict: {},
    categorydict: {},
    eventsdict: {},
    pushactdict: {},
    periodsdict: {},
    phonetypedict: {},
    msggrpdict: {},
    rescodesdict: {},
    conpardict: {},
    actpardict: {}
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
        case GET_PUSH_ACTION_DICT:
            return {
                ...state,
                pushactdict: action.pushactdict
            }
        case GET_PERIODS_DICT:
            return {
                ...state,
                periodsdict: action.periodsdict
            }
        case GET_PHONE_TYPE_DICT:
            return {
                ...state,
                phonetypedict: action.phonetypedict
            }
        case GET_MESSAGE_GROUP_DICT:
            return {
                ...state,
                msggrpdict: action.msggrpdict
            }
        case GET_RESPONSE_CODES_DICT:
            return {
                ...state,
                rescodesdict: action.rescodesdict
            }
        case GET_CONTENT_PARAMS_DICT:
            return {
                ...state,
                conpardict: action.conpardict
            }
        case GET_ACTIONS_PARAMS_DICT:
            return {
                ...state,
                actpardict: action.actpardict
            }
        case UPDATE_ACTPARAMS_VISIBLE:
            return {
                ...state,
                actpardict: Object.keys(state.actpardict).map((key) => state.actpardict[key].id === action.paramId ? { ...state.actpardict[key], visibleFlg: action.paramStatus } : { ...state.actpardict[key] })
            };
        default:
            return state;
    }
  };

export default dictionaries;

export const dictProductGroupSelector = state => state.dictionaries.prdgrpdict;
export const dictCategorySelector = state => state.dictionaries.categorydict;
export const dictEventsSelector = state => state.dictionaries.eventsdict;
export const dictPushActionSelector = state => state.dictionaries.pushactdict;
export const dictPeriodsSelector = state => state.dictionaries.periodsdict;
export const dictPhoneTypeSelector = state => state.dictionaries.phonetypedict;
export const dictMessageGroupSelector = state => state.dictionaries.msggrpdict;
export const dictResponseCodesSelector = state => state.dictionaries.rescodesdict;
export const dictContentParamsSelector = state => state.dictionaries.conpardict;
export const dictActionsParamsSelector = state => state.dictionaries.actpardict;
