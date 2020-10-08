/* eslint-disable no-param-reassign */
/* eslint-disable arrow-body-style */
export const GET_PRODUCT_GROUP_DICT = 'GET_PRODUCT_GROUP_DICT';
export const GET_CATEGORY_DICT = 'GET_CATEGORY_DICT';
export const GET_EVENTS_DICT = 'GET_EVENTS_DICT';
export const GET_PUSH_ACTION_DICT = 'GET_PUSH_ACTION_DICT';
export const GET_PERIODS_DICT = 'GET_PERIODS_DICT';
export const GET_PHONE_TYPE_DICT = 'GET_PHONE_TYPE_DICT';
export const GET_MESSAGE_GROUP_DICT = 'GET_MESSAGE_GROUP_DICT';
export const GET_RESPONSE_CODES_DICT = 'GET_RESPONSE_CODES_DICT';
export const GET_CONTENT_PARAMS_DICT = 'GET_CONTENT_PARAMS_DICT';
export const GET_ACTIONS_PARAMS_DICT = 'GET_ACTIONS_PARAMS_DICT';
export const UPDATE_ACTPARAMS_VISIBLE = 'UPDATE_ACTPARAMS_VISIBLE';
export const GET_UNUSED_EVENTS_DICT = 'GET_UNUSED_EVENTS_DICT';
export const GET_ACTION_TYPE_DICT = 'GET_ACTION_TYPE_DICT';
export const GET_EMPLOYEE_DICT = 'GET_EMPLOYEE_DICT';
export const GET_PERS_LEVEL_DICT = 'GET_PERS_LEVEL_DICT';
export const GET_SQUADS_DICT = 'GET_SQUADS_DICT';

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

export const getPersLevelDict = (results) => (dispatch) => {
  const persleveldict = results.reduce((obj, option) => {
    obj[option.index] = option
    return obj
  }, {});

  dispatch({
    type: GET_PERS_LEVEL_DICT,
    persleveldict
  });
};

export const getSquadsDict = (results) => (dispatch) => {
  const squadsdict = results.reduce((obj, option) => {
    obj[option.index] = option
    return obj
  }, {});

  dispatch({
    type: GET_SQUADS_DICT,
    squadsdict
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

export const getEmployeeDict = (results) => (dispatch) => {
  const employeedict = results.reduce((obj, option) => {
    obj[option.index] = option
    return obj
  }, {});

  dispatch({
    type: GET_EMPLOYEE_DICT,
    employeedict
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

export const getUnusedEventsDict = (results) => (dispatch) => {
    const uneventsdict = results.reduce((obj, option) => {
      obj[option.index] = option
      return obj
    }, {});
  
    dispatch({
      type: GET_UNUSED_EVENTS_DICT,
      uneventsdict
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

  export const getResponseCodesDict = (results) => (dispatch) => {
    const rescodesdict = results.reduce((obj, option) => {
      obj[option.index] = option
      return obj
    }, {});
  
    dispatch({
      type: GET_RESPONSE_CODES_DICT,
      rescodesdict
    });
  };

  export const getContentParamsDict = (results) => (dispatch) => {
    const conpardict = results.reduce((obj, option) => {
      obj[option.index] = option
      return obj
    }, {});
  
    dispatch({
      type: GET_CONTENT_PARAMS_DICT,
      conpardict
    });
  };

  export const getActionsParamsDict = (results) => (dispatch) => {
    const actpardict = results.reduce((obj, option) => {
      obj[option.index] = option
      return obj
    }, {});
  
    dispatch({
      type: GET_ACTIONS_PARAMS_DICT,
      actpardict
    });
  };

export const updateActparamsVisible = (paramId, paramStatus) => {
  return {
    type: UPDATE_ACTPARAMS_VISIBLE,
    paramId, paramStatus
  };
};

export const getActionTypeDict = (results) => (dispatch) => {
  const actiontypedict = results.reduce((obj, option) => {
    obj[option.index] = option
    return obj
  }, {});

  dispatch({
    type: GET_ACTION_TYPE_DICT,
    actiontypedict
  });
};
