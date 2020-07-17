/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-nested-ternary */
/* eslint-disable prefer-template */
/* eslint-disable no-param-reassign */
/* eslint-disable babel/no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable no-use-before-define */
import { LitElement, html, css } from 'lit-element';

export const UPDATE_PAGE = 'UPDATE_PAGE';
export const ACTIVATE_CHANNEL_TAB = 'ACTIVATE_CHANNEL_TAB';
export const DISACTIVATE_CHANNEL_TAB = 'DISACTIVATE_CHANNEL_TAB';
export const GET_CESUBOFFER_TABS = 'GET_CESUBOFFER_TABS';
export const GET_CESUBOFFER_SLOTS = 'GET_CESUBOFFER_SLOTS';
export const GET_CE_CHANNEL_TABS = 'GET_CE_CHANNEL_TABS';
export const GET_CE_CHANNEL_SLOTS = 'GET_CE_CHANNEL_SLOTS';
export const GET_SIDEBAR_TYPES = 'GET_SIDEBAR_TYPES';
export const GET_SIDEBAR_NAMES = 'GET_SIDEBAR_NAMES';
export const GET_SEARCH_RESULTS = 'GET_SEARCH_RESULTS';
export const CHANGE_FORM_VALUE = 'CHANGE_FORM_VALUE';
export const CHANGE_CHANNEL_ACTIVE_FLG = 'CHANGE_CHANNEL_ACTIVE_FLG';
export const UPDATE_STATUS_VAL = 'UPDATE_STATUS_VAL';
export const UPDATE_STATUS_DESC = 'UPDATE_STATUS_DESC';
export const GET_VERSIONS_LIST = 'GET_VERSIONS_LIST';
export const GET_SCHEDULES_LIST = 'GET_SCHEDULES_LIST';
export const GET_CHANNEL_ACTIONS_PARAMS = 'GET_CHANNEL_ACTIONS_PARAMS';
export const ADD_CHANNEL_ACTIONS_PARAM = 'ADD_CHANNEL_ACTIONS_PARAM';

export const navigate = (path, search) => (dispatch) => {

  // console.log('_PATH is: ' + path);
  // console.log('_SEARCH is: ' + search);

  const page = (path) ? path : '1';
  const slot = !search ? (page === '1' ? 'S00' : 'S404') : search;

  // Any other info you might want to extract from the path (like page type),
  // you can do here
  dispatch(loadPage(page, slot));
};

const loadPage = (page, slot) => (dispatch) => {
  switch(slot) {
    case 'S00':
      import('../../components/borsuk-welcome.js').then((module) => {
        // console.log('loading ... '+slot+' - '+page);

        // Put code in here that you want to run every time when
        // navigating to view1 after my-view1.js is loaded.
      });
      break;
    case 'S01':
      import('../../components/borsuk-suboffer-form.js').then((module) => {
        import('../../components/collections/borsuk-suboffer-input-form.js');
        // console.log('loading ... '+slot+' - '+page);
      });
      break;
    case 'S02':
      import('../../components/borsuk-version-form.js').then((module) => {
        import('../../components/collections/borsuk-version-input-form.js');
        // console.log('loading ... '+slot+' - '+page);
      });
      break;
    case 'S11':
      import('../../components/collections/borsuk-push-input-form.js').then((module) => {
        // console.log('loading ... '+slot+' - '+page);
      });
      break;
    case 'S12':
      import('../../components/collections/borsuk-sms-input-form.js').then((module) => {
        // console.log('loading ... '+slot+' - '+page);
      });
      break;
    case 'S13':
        import('../../components/collections/borsuk-message-input-form.js').then((module) => {
          // console.log('loading ... '+slot+' - '+page);
        });
        break;
    case 'S99':
      import('../../components/borsuk-filter-form.js').then((module) => {
          // console.log('loading ... '+slot+' - '+page);
      });
        break;
    default:
      slot = 'S404';
      import('../../components/borsuk-page404.js');
  }

  dispatch(updatePage(page, slot));
};

const updatePage = (page, slot) => {
    return {
      type: UPDATE_PAGE,
      page, slot
    };
};

export const switchannel = (prev, page, slot) => (dispatch) => {
  switch(slot) {
    case 'S11':
      import('../../components/collections/borsuk-push-input-form.js').then((module) => {
        // console.log('loading ... '+slot+' - '+page);
      });
      break;
    case 'S12':
      import('../../components/collections/borsuk-sms-input-form.js').then((module) => {
        // console.log('loading ... '+slot+' - '+page);
      });
      break;
    case 'S13':
        import('../../components/collections/borsuk-message-input-form.js').then((module) => {
          // console.log('loading ... '+slot+' - '+page);
        });
        break;
    default:
      slot = 'S404';
      import('../../components/borsuk-page404.js');
  }
 
  dispatch(activateChannelTab(page, slot));
  dispatch(disactivateChannelTab(prev, slot));
};

const disactivateChannelTab = (prev, slot) => {
  return {
    type: DISACTIVATE_CHANNEL_TAB,
    prev, slot
  };
};

const activateChannelTab = (page, slot) => {
  return {
    type: ACTIVATE_CHANNEL_TAB,
    page, slot
  };
};

export const getCesubofferTabs = (cesubofferTabs) => (dispatch) => {
  const cesubtabs = cesubofferTabs.reduce((obj, option) => {
    obj[option.tabIndex] = option
    return obj
  }, {});

  dispatch({
    type: GET_CESUBOFFER_TABS,
    cesubtabs
  });
};

export const getCesubofferSlots = (cesubofferSlots) => (dispatch) => {
  const cesubslots = cesubofferSlots.reduce((obj, option) => {
    obj[option.tabPageId] = option
    return obj
  }, {});

  dispatch({
    type: GET_CESUBOFFER_SLOTS,
    cesubslots
  });
};

export const getCeChannelTabs = (ceChannelTabs) => (dispatch) => {
  const cechnltabs = ceChannelTabs.reduce((obj, option) => {
    obj[option.tabPageId + option.tabIndex] = option
    return obj
  }, {});

  dispatch({
    type: GET_CE_CHANNEL_TABS,
    cechnltabs
  });
};

export const getCeChannelSlots = (ceChannelSlots) => (dispatch) => {
  const cechnlslots = ceChannelSlots.reduce((obj, option) => {
    obj[option.tabPageId] = option
    return obj
  }, {});

  dispatch({
    type: GET_CE_CHANNEL_SLOTS,
    cechnlslots
  });
};

export const getSidebarTypes = (subtypes) => (dispatch) => {
  const cesubtypes = subtypes.reduce((obj, option) => {
    obj[option.index] = option
    return obj
  }, {});

  dispatch({
    type: GET_SIDEBAR_TYPES,
    cesubtypes
  });
};

export const getSidebarNames = (subnames) => (dispatch) => {
  const cesubnames = subnames.reduce((obj, option) => {
    obj[option.subtypeId + option.index] = option
    return obj
  }, {});

  dispatch({
    type: GET_SIDEBAR_NAMES,
    cesubnames
  });
};

export const getSearchResults = (results) => (dispatch) => {
  const searchresults = results.reduce((obj, option) => {
    obj[option.index] = option
    return obj
  }, {});

  dispatch({
    type: GET_SEARCH_RESULTS,
    searchresults
  });
};

export const changeFormValue = (tabPageId, sParam, nValue) => {
  return {
    type: CHANGE_FORM_VALUE,
    tabPageId,
    sParam,
    nValue
  };
};

export const changeChannelActiveFlg = (tabPageId, nValue) => {
  return {
    type: CHANGE_CHANNEL_ACTIVE_FLG,
    tabPageId,
    nValue
  };
};

export const changeStatus = (tabPageId, statusVal, statusDesc) => (dispatch) => {
  dispatch(changeStatusVal(tabPageId, statusVal));
  dispatch(changeStatusDesc(tabPageId, statusDesc));
}

const changeStatusVal = (tabPageId, statusVal) => {
  return {
    type: UPDATE_STATUS_VAL,
    tabPageId, statusVal
  };
};

const changeStatusDesc = (tabPageId, statusDesc) => {
  return {
    type: UPDATE_STATUS_DESC,
    tabPageId, statusDesc
  };
};

export const getVersionsList = (ceVersionsList) => (dispatch) => {
  const ceverslist = ceVersionsList.reduce((obj, option) => {
    obj[option.versionId] = option
    return obj
  }, {});

  dispatch({
    type: GET_VERSIONS_LIST,
    ceverslist
  });
};

export const getSchedulesList = (ceSchedulesList) => (dispatch) => {
  const ceschlist = ceSchedulesList.reduce((obj, option) => {
    obj[option.intervalId] = option
    return obj
  }, {});

  dispatch({
    type: GET_SCHEDULES_LIST,
    ceschlist
  });
};

export const getChannelActionsParams = (channelActionsParams) => (dispatch) => {
  const chnactparams = channelActionsParams.reduce((obj, option) => {
    obj[option.index] = option
    return obj
  }, {});

  dispatch({
    type: GET_CHANNEL_ACTIONS_PARAMS,
    chnactparams
  });
};

export const addChanelActionsParam = (channelActionsParam) => (dispatch) => {
  const chnactparam = channelActionsParam.reduce((obj, option) => {
    obj[option.index] = option
    return obj
  }, {});

  dispatch({
    type: ADD_CHANNEL_ACTIONS_PARAM,
    chnactparam
  });
};
