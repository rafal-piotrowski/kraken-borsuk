/* eslint-disable arrow-body-style */
export const SET_CLICK_ACTION = 'SET_CLICK_ACTION';
export const SET_COMPONENT_READY = 'SET_COMPONENT_READY';

export const setClickAction = (clickAction, clickParam) => {
    return {
      type: SET_CLICK_ACTION,
      clickAction,
      clickParam
    };
  };

export const setComponentReady = (componentReady, componentParam) => {
    return {
      type: SET_COMPONENT_READY,
      componentReady,
      componentParam
    };
  };
