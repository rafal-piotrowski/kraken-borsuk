/* eslint-disable no-use-before-define */
/* eslint-disable arrow-body-style */
export const SET_GLOBAL_APP = 'SET_GLOBAL_APP';
export const SET_GLOBAL_SIDEBAR = 'SET_GLOBAL_SIDEBAR';

export const setGlobalVar = (globvariable, globvalue) => (dispatch) => {
    switch(globvariable) {
      case 'app':
            dispatch(setGlobalApp(globvalue));
        break;
      case 'sidebar':
        dispatch(setGlobalSidebar(globvalue));
      break;
      default:
        break;
    }
  };

export const setGlobalApp = (globvalue) => {
    return {
      type: SET_GLOBAL_APP,
      globvalue
    };
  };

export const setGlobalSidebar = (globvalue) => {
  return {
    type: SET_GLOBAL_SIDEBAR,
    globvalue
  };
};