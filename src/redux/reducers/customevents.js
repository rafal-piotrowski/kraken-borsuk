import {
    SET_CLICK_ACTION
  } from '../actions/customevents.js';

  const INITIAL_STATE = {
    actionclick: '',
    actionparam: ''
};

const customevents = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_CLICK_ACTION:
            return {
                ...state,
                actionclick: action.clickAction,
                actionparam: action.clickParam
            }
        default:
            return state;
    }
  };

export default customevents;

export const actionClickSelector = state => state.customevents.actionclick;
export const actionParamSelector = state => state.customevents.actionparam;
