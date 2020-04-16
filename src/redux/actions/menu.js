/* eslint-disable arrow-body-style */
/* eslint-disable no-param-reassign */

export const GET_MENU_OPTIONS = 'GET_MENU_OPTIONS';
export const GET_MENU_NOTIFICATIONS = 'GET_MENU_NOTIFICATIONS';
export const GET_USER_INFO = 'GET_USER_INFO';
export const CHANGE_MENU_INDEX = 'CHANGE_MENU_INDEX';
export const SET_CLICK_ACTION = 'SET_CLICK_ACTION';

export const getUserInfo = (userInfo) => (dispatch) => {
    const userinfos = userInfo.reduce((obj, info) => {
      obj[info.id] = info
      return obj
    }, {});
  
    dispatch({
      type: GET_USER_INFO,
      userinfos
    });
  };

export const getMenuOptions = (menuOptions) => (dispatch) => {
    const moptions = menuOptions.reduce((obj, option) => {
      obj[option.index] = option
      return obj
    }, {});
  
    dispatch({
      type: GET_MENU_OPTIONS,
      moptions
    });
  };

  export const getMenuNotifications = (menuNotifications) => (dispatch) => {
    const mnotifications = menuNotifications.reduce((obj, notification) => {
      obj[notification.notificationId] = notification
      return obj
    }, {});
  
    dispatch({
      type: GET_MENU_NOTIFICATIONS,
      mnotifications
    });
  };

export const changeMenuIndex = (optionId, nIndex) => {
    return {
      type: CHANGE_MENU_INDEX,
      optionId,
      nIndex
    };
  };

  export const setClickAction = (clickAction, clickParam) => {
    return {
      type: SET_CLICK_ACTION,
      clickAction,
      clickParam
    };
  };
