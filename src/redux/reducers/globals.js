import {
    SET_GLOBAL_APP,
    SET_GLOBAL_SIDEBAR
  } from '../actions/globals.js';

  const INITIAL_STATE = {
    app: '',
    sidebar: true
};

const globals = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_GLOBAL_APP:
            return {
                ...state,
                app: action.globvalue
            }
        case SET_GLOBAL_SIDEBAR:
            return {
                ...state,
                sidebar: action.globvalue
            }
        default:
            return state;
    }
  };

export default globals;

export const globalAppSelector = state => state.globals.app;
export const globalSidebarSelector = state => state.globals.sidebar;
