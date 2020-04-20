/* eslint-disable prefer-const */
/* eslint-disable no-undef */
/* eslint-disable no-case-declarations */
/* eslint-disable prefer-destructuring */
/* eslint-disable arrow-body-style */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */
/* eslint-disable no-unused-vars */

import {
    GET_MENU_OPTIONS,
    GET_MENU_NOTIFICATIONS,
    GET_USER_INFO,
    CHANGE_MENU_INDEX,
    SET_CLICK_ACTION
  } from '../actions/menu.js';
  import { createSelector } from 'reselect';

const INITIAL_STATE = {
    moptions: {},
    mindexes: {},
    mnotifications: {},
    userinfos: {},
    actionclick: '',
    actionparam: '',
    error: ''
};

const menu = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_MENU_OPTIONS:
            return {
            ...state,
            moptions: action.moptions,
            mindexes: action.moptions
            };
        case GET_MENU_NOTIFICATIONS:
            return {
            ...state,
            mnotifications: action.mnotifications
            };
        case GET_USER_INFO:
            return {
            ...state,
            userinfos: action.userinfos
            };
        case CHANGE_MENU_INDEX:
            return {
                ...state,
                mindexes: Object.keys(state.mindexes).map((key) => state.mindexes[key].optionId === action.optionId ? { ...state.mindexes[key], newIndex: action.nIndex } : state.mindexes[key])
            };
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

export default menu;

export const menuNotificationsSelector = state => state.menu.mnotifications;
export const menuOptionsSelector = state => state.menu.moptions;
export const menuIndexesSelector = state => state.menu.mindexes;
export const actionClickSelector = state => state.menu.actionclick;
export const actionParamSelector = state => state.menu.actionparam;
export const userInfoSelector = state => state.menu.userinfos;
