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
    UPDATE_ACTPARAMS_VISIBLE,
    GET_UNUSED_EVENTS_DICT,
    GET_ACTION_CHARACTER,
    GET_ACTION_MAJOR_TYPE,
    GET_ACTION_MINOR_TYPE,
    GET_USER_ACCOUNTS,
    GET_GENERAL_PERSONALIZATION,
    GET_SQUADS_DICT,
    GET_CAMPAIGN_PRODUCT_GROUPS,
    GET_OBLIGATORY_CONDITIONS,
    GET_COMMON_CONDITIONS,
    GET_PARAMETERS,
    GET_GROUP_TYPES,
    GET_CHANNEL_CYCLE_TYPES,
    GET_PRODUCT_RELATIONS,
    GET_PRODUCT_CATEGORIES,
    GET_DEBIT_CARD_BIN_CODES,
    GET_CREDIT_CARD_BIN_CODES,
    GET_CHANNEL_TYPES,
    GET_DELIVERY_METHODS

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
    actpardict: {},
    uneventsdict: {},
    actioncharacter: {},
    employeedict: {},
    persleveldict: {},
    squadsdict: {},
    camprdgrps: {},
    obligocndts: {},
    commoncndts: {},
    parameters: {},
    grouptypes: {},
    chncycletypes: {},
    prdrelations: {},
    prdcategories: {},
    debitbins: {},
    creditbins: {},
    channeltypes: {},
    deliverymethods: {}
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
        case GET_GENERAL_PERSONALIZATION:
            return {
                ...state,
                persleveldict: action.persleveldict
            }
        case GET_SQUADS_DICT:
            return {
                ...state,
                squadsdict: action.squadsdict
            }
        case GET_USER_ACCOUNTS:
            return {
                ...state,
                employeedict: action.employeedict
            }
        case GET_EVENTS_DICT:
            return {
                ...state,
                eventsdict: action.eventsdict
            }
        case GET_UNUSED_EVENTS_DICT:
            return {
                ...state,
                uneventsdict: action.uneventsdict
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
        case GET_ACTION_MAJOR_TYPE:
            return {
                ...state,
                actionmajortype: action.actionmajortype
            }
        case GET_ACTION_MINOR_TYPE:
            return {
                ...state,
                actionminortype: action.actionminortype
            }
        case GET_ACTION_CHARACTER:
            return {
                ...state,
                actioncharacter: action.actioncharacter
            }
        case GET_CAMPAIGN_PRODUCT_GROUPS:
            return {
                ...state,
                camprdgrps: action.camprdgrps
            }
        case GET_OBLIGATORY_CONDITIONS:
            return {
                ...state,
                obligocndts: action.obligocndts
            }
        case GET_COMMON_CONDITIONS:
            return {
                ...state,
                commoncndts: action.commoncndts
            }
        case GET_PARAMETERS:
            return {
                ...state,
                parameters: action.parameters
            }
        case GET_GROUP_TYPES:
            return {
                ...state,
                grouptypes: action.grouptypes
            }
        case GET_CHANNEL_CYCLE_TYPES:
            return {
                ...state,
                chncycletypes: action.chncycletypes
            }
        case GET_PRODUCT_RELATIONS:
            return {
                ...state,
                prdrelations: action.prdrelations
            }
        case GET_PRODUCT_CATEGORIES:
            return {
                ...state,
                prdcategories: action.prdcategories
            }
        case GET_DEBIT_CARD_BIN_CODES:
            return {
                ...state,
                debitbins: action.debitbins
            }
        case GET_CREDIT_CARD_BIN_CODES:
            return {
                ...state,
                creditbins: action.creditbins
            }
        case GET_CHANNEL_TYPES:
            return {
                ...state,
                channeltypes: action.channeltypes
            }
        case GET_DELIVERY_METHODS:
            return {
                ...state,
                deliverymethods: action.deliverymethods
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
export const dictUnusedEventsSelector = state => state.dictionaries.uneventsdict;
export const dictActionCharacterSelector = state => state.dictionaries.actioncharacter;
export const dictActionMajorTypeSelector = state => state.dictionaries.actionmajortype;
export const dictActionMinorTypeSelector = state => state.dictionaries.actionminortype;
export const dictEmployeeSelector = state => state.dictionaries.employeedict;
export const dictPersLevelSelector = state => state.dictionaries.persleveldict;
export const dictSquadsSelector = state => state.dictionaries.squadsdict;
export const dictCampaignProductGroupsSelector = state => state.dictionaries.camprdgrps;
export const dictObligatoryConditionsSelector = state => state.dictionaries.obligocndts;
export const dictCommonConditionsSelector = state => state.dictionaries.commoncndts;
export const dictParametersSelector = state => state.dictionaries.parameters;
export const dictGroupTypesSelector = state => state.dictionaries.grouptypes;
export const dictChannelCycleTypesSelector = state => state.dictionaries.chncycletypes;
export const dictProductRelationsSelector = state => state.dictionaries.prdrelations;
export const dictProductCategoriesSelector = state => state.dictionaries.prdcategories;
export const dictDebitBinsSelector = state => state.dictionaries.debitbins;
export const dictCreditBinsSelector = state => state.dictionaries.creditbins;
export const dictChannelTypesSelector = state => state.dictionaries.channeltypes;
export const dictDeliveryMethodsSelector = state => state.dictionaries.deliverymethods;
