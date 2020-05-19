/* eslint-disable arrow-body-style */
export const SET_CLICK_ACTION = 'SET_CLICK_ACTION';

export const setClickAction = (clickAction, clickParam) => {
    return {
      type: SET_CLICK_ACTION,
      clickAction,
      clickParam
    };
  };
