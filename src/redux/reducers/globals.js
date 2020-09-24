import {
    SET_GLOBAL_APP
  } from '../actions/globals.js';

  const INITIAL_STATE = {
    app: ''
};

const globals = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_GLOBAL_APP:
            return {
                ...state,
                app: action.globvalue
            }
        default:
            return state;
    }
  };

export default globals;

export const globalAppSelector = state => state.globals.app;
