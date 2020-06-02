/* eslint-disable no-param-reassign */
/* eslint-disable arrow-body-style */
export const GET_PRODUCT_GROUP_DICT = 'GET_PRODUCT_GROUP_DICT';
export const GET_CATEGORY_DICT = 'GET_CATEGORY_DICT';
export const GET_EVENTS_DICT = 'GET_EVENTS_DICT';

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
