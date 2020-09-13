/* eslint-disable import/no-extraneous-dependencies */

import { dedupeMixin } from '@lion/core';
import { Unparseable } from '@lion/form-core';
 
export const DeprecatedIsPrefilledMixin = dedupeMixin(
  superclass =>
    // eslint-disable-next-line no-shadow
    class DeprecatedIsPrefilledMixin extends superclass {
      /**
       * @deprecated Please use _isEmpty instead (the inverse result of that method)
       * @param {*} modelValue
       */
      static _isPrefilled(modelValue) {
        let value = modelValue;
        if (modelValue instanceof Unparseable) {
          value = modelValue.viewValue;
        }
        // Checks for empty platform types: Objects, Arrays, Dates
        if (typeof value === 'object' && value !== null && !(value instanceof Date)) {
          return !!Object.keys(value).length;
        }
 
        // Checks for empty platform types: Numbers, Booleans
        const isNumberValue = typeof value === 'number' && (value === 0 || Number.isNaN(value));
        const isBooleanValue = typeof value === 'boolean' && value === false;
 
        return !!value || isNumberValue || isBooleanValue;
      }
    },
);
