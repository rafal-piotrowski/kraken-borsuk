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
export const GET_ACTION_CHARACTER = 'GET_ACTION_CHARACTER';
export const GET_ACTION_MAJOR_TYPE = 'GET_ACTION_MAJOR_TYPE';
export const GET_ACTION_MINOR_TYPE = 'GET_ACTION_MINOR_TYPE';
export const GET_USER_ACCOUNTS = 'GET_USER_ACCOUNTS';
export const GET_GENERAL_PERSONALIZATION = 'GET_GENERAL_PERSONALIZATION';
export const GET_SQUADS_DICT = 'GET_SQUADS_DICT';
export const GET_CAMPAIGN_PRODUCT_GROUPS = 'GET_CAMPAIGN_PRODUCT_GROUPS';
export const GET_OBLIGATORY_CONDITIONS = 'GET_OBLIGATORY_CONDITIONS';
export const GET_COMMON_CONDITIONS = 'GET_COMMON_CONDITIONS';
export const GET_PARAMETERS = 'GET_PARAMETERS';
export const GET_GROUP_TYPES = 'GET_GROUP_TYPES';
export const GET_CHANNEL_CYCLE_TYPES = 'GET_CHANNEL_CYCLE_TYPES';
export const GET_PRODUCT_RELATIONS = 'GET_PRODUCT_RELATIONS';
export const GET_PRODUCT_CATEGORIES = 'GET_PRODUCT_CATEGORIES';
export const GET_DEBIT_CARD_BIN_CODES = 'GET_DEBIT_CARD_BIN_CODES';
export const GET_CREDIT_CARD_BIN_CODES = 'GET_CREDIT_CARD_BIN_CODES';
export const GET_CHANNEL_TYPES = 'GET_CHANNEL_TYPES';
export const GET_DELIVERY_METHODS = 'GET_DELIVERY_METHODS';

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

export const getGeneralPersonalization = (results) => (dispatch) => {
  const persleveldict = results.reduce((obj, option) => {
    obj[option.index] = option
    return obj
  }, {});

  dispatch({
    type: GET_GENERAL_PERSONALIZATION,
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

export const getUserAccounts = (results) => (dispatch) => {
  const employeedict = results.reduce((obj, option) => {
    obj[option.index] = option
    return obj
  }, {});

  dispatch({
    type: GET_USER_ACCOUNTS,
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

export const getActionCharacter = (results) => (dispatch) => {
  const actioncharacter = results.reduce((obj, option) => {
    obj[option.index] = option
    return obj
  }, {});

  dispatch({
    type: GET_ACTION_CHARACTER,
    actioncharacter
  });
};

export const getActionMajorType = (results) => (dispatch) => {
  const actionmajortype = results.reduce((obj, option) => {
    obj[option.index] = option
    return obj
  }, {});

  dispatch({
    type: GET_ACTION_MAJOR_TYPE,
    actionmajortype
  });
};

export const getActionMinorType = (results) => (dispatch) => {
  const actionminortype = results.reduce((obj, option) => {
    obj[option.index] = option
    return obj
  }, {});

  dispatch({
    type: GET_ACTION_MINOR_TYPE,
    actionminortype
  });
};

export const getCampaignProductGroups = (results) => (dispatch) => {
  const camprdgrps = results.reduce((obj, option) => {
    obj[option.index] = option
    return obj
  }, {});

  dispatch({
    type: GET_CAMPAIGN_PRODUCT_GROUPS,
    camprdgrps
  });
};

export const getObligatoryConditions = (results) => (dispatch) => {
  const obligocndts = results.reduce((obj, option) => {
    obj[option.index] = option
    return obj
  }, {});

  dispatch({
    type: GET_OBLIGATORY_CONDITIONS,
    obligocndts
  });
};

export const getCommonConditions = (results) => (dispatch) => {
  const commoncndts = results.reduce((obj, option) => {
    obj[option.index] = option
    return obj
  }, {});

  dispatch({
    type: GET_COMMON_CONDITIONS,
    commoncndts
  });
};

export const getParameters = (results) => (dispatch) => {
  const parameters = results.reduce((obj, option) => {
    obj[option.index] = option
    return obj
  }, {});

  dispatch({
    type: GET_PARAMETERS,
    parameters
  });
};

export const getGroupTypes = (results) => (dispatch) => {
  const grouptypes = results.reduce((obj, option) => {
    obj[option.index] = option
    return obj
  }, {});

  dispatch({
    type: GET_GROUP_TYPES,
    grouptypes
  });
};

export const getChannelCycleTypes = (results) => (dispatch) => {
  const chncycletypes = results.reduce((obj, option) => {
    obj[option.index] = option
    return obj
  }, {});

  dispatch({
    type: GET_CHANNEL_CYCLE_TYPES,
    chncycletypes
  });
};

export const getProductRelations = (results) => (dispatch) => {
  const prdrelations = results.reduce((obj, option) => {
    obj[option.index] = option
    return obj
  }, {});

  dispatch({
    type: GET_PRODUCT_RELATIONS,
    prdrelations
  });
};

export const getProductCategories = (results) => (dispatch) => {
  const prdcategories = results.reduce((obj, option) => {
    obj[option.index] = option
    return obj
  }, {});

  dispatch({
    type: GET_PRODUCT_CATEGORIES,
    prdcategories
  });
};

export const getDebitCardBinCodes = (results) => (dispatch) => {
  const debitbins = results.reduce((obj, option) => {
    obj[option.index] = option
    return obj
  }, {});

  dispatch({
    type: GET_DEBIT_CARD_BIN_CODES,
    debitbins
  });
};

export const getCreditCardBinCodes = (results) => (dispatch) => {
  const creditbins = results.reduce((obj, option) => {
    obj[option.index] = option
    return obj
  }, {});

  dispatch({
    type: GET_CREDIT_CARD_BIN_CODES,
    creditbins
  });
};

export const getChannelTypes = (results) => (dispatch) => {
  const channeltypes = results.reduce((obj, option) => {
    obj[option.index] = option
    return obj
  }, {});

  dispatch({
    type: GET_CHANNEL_TYPES,
    channeltypes
  });
};

export const getDeliveryMethods = (results) => (dispatch) => {
  const deliverymethods = results.reduce((obj, option) => {
    obj[option.index] = option
    return obj
  }, {});

  dispatch({
    type: GET_DELIVERY_METHODS,
    deliverymethods
  });
};
