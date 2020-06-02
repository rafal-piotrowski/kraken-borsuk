import {
    SET_CLICK_ACTION,
    SET_COMPONENT_READY
  } from '../actions/customevents.js';

  const INITIAL_STATE = {
    actionclick: '',
    actionparam: '',
    componentready: '',
    componentparam: ''
};

const customevents = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_CLICK_ACTION:
            return {
                ...state,
                actionclick: action.clickAction,
                actionparam: action.clickParam
            }
        case SET_COMPONENT_READY:
            return {
                ...state,
                componentready: action.componentReady,
                componentparam: action.componentParam
            }
        default:
            return state;
    }
  };

export default customevents;

export const actionClickSelector = state => state.customevents.actionclick;
export const actionParamSelector = state => state.customevents.actionparam;
export const componentReadySelector = state => state.customevents.componentready;
export const componentParamSelector = state => state.customevents.componentparam;
