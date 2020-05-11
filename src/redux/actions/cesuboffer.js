/* eslint-disable no-nested-ternary */
/* eslint-disable prefer-template */
/* eslint-disable no-param-reassign */
/* eslint-disable babel/no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable no-use-before-define */
import { LitElement, html, css } from 'lit-element';

export const UPDATE_PAGE = 'UPDATE_PAGE';
export const GET_CESUBOFFER_TABS = 'GET_CESUBOFFER_TABS';
export const SET_CE_CLICK_ACTION = 'SET_CE_CLICK_ACTION';
export const GET_SIDEBAR_TYPES = 'GET_SIDEBAR_TYPES';
export const GET_SIDEBAR_NAMES = 'GET_SIDEBAR_NAMES';

export const navigate = (path, search) => (dispatch) => {
  // Extract the page name from path.
  const page = path === '/' ? '1' : path.slice(1);
  const slot = !search ? (page === '1' ? 'S00' : 'S404') : search.slice(1);

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
        // console.log('loading ... '+slot+' - '+page);
    });
      break;
    case 'S02':
      import('../../components/borsuk-version-form.js').then((module) => {
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

export const setCeClickAction = (ceClickAction, ceClickParam) => {
  return {
    type: SET_CE_CLICK_ACTION,
    ceClickAction,
    ceClickParam
  };
};