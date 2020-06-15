/* eslint-disable no-param-reassign */
/* eslint-disable arrow-body-style */
export const GET_PRODUCT_GROUP_DICT = 'GET_PRODUCT_GROUP_DICT';
export const GET_CATEGORY_DICT = 'GET_CATEGORY_DICT';
export const GET_EVENTS_DICT = 'GET_EVENTS_DICT';
export const GET_PUSH_ACTION_DICT = 'GET_PUSH_ACTION_DICT';
export const GET_PERIODS_DICT = 'GET_PERIODS_DICT';
export const GET_PHONE_TYPE_DICT = 'GET_PHONE_TYPE_DICT';
export const GET_MESSAGE_GROUP_DICT = 'GET_MESSAGE_GROUP_DICT';

export const getProductGroupDict = (results) => (dispatch) => {
    const prdgrpdict = results.reduce((obj, option) => {
      obj[option.index] = option
      return obj
    }, {});
  
    dispatch({
      type: GET_PRODUCT_GROUP_DICT,
      prdgrpdict
    });
  };

export const getCategoryDict = (results) => (dispatch) => {
    const categorydict = results.reduce((obj, option) => {
      obj[option.index] = option
      return obj
    }, {});
  
    dispatch({
      type: GET_CATEGORY_DICT,
      categorydict
    });
  };

export const getEventsDict = (results) => (dispatch) => {
    const eventsdict = results.reduce((obj, option) => {
      obj[option.index] = option
      return obj
    }, {});
  
    dispatch({
      type: GET_EVENTS_DICT,
      eventsdict
    });
  };

  export const getPushActionDict = (results) => (dispatch) => {
    const pushactdict = results.reduce((obj, option) => {
      obj[option.index] = option
      return obj
    }, {});
  
    dispatch({
      type: GET_PUSH_ACTION_DICT,
      pushactdict
    });
  };

  export const getPeriodsDict = (results) => (dispatch) => {
    const periodsdict = results.reduce((obj, option) => {
      obj[option.index] = option
      return obj
    }, {});
  
    dispatch({
      type: GET_PERIODS_DICT,
      periodsdict
    });
  };

  export const getPhoneTypeDict = (results) => (dispatch) => {
    const phonetypedict = results.reduce((obj, option) => {
      obj[option.index] = option
      return obj
    }, {});
  
    dispatch({
      type: GET_PHONE_TYPE_DICT,
      phonetypedict
    });
  };

  export const getMessageGroupDict = (results) => (dispatch) => {
    const msggrpdict = results.reduce((obj, option) => {
      obj[option.index] = option
      return obj
    }, {});
  
    dispatch({
      type: GET_MESSAGE_GROUP_DICT,
      msggrpdict
    });
  };
