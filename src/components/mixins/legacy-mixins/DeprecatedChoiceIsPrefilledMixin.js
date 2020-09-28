/* eslint-disable import/no-extraneous-dependencies */
import { dedupeMixin } from '@lion/core';

export const DeprecatedChoiceIsPrefilledMixin = dedupeMixin(
  superclass =>
    // eslint-disable-next-line
    class DeprecatedChoiceIsPrefilledMixin extends superclass {
      /**
       * @deprecated Please use _isEmpty instead (the inverse result of that method)
       * @override
       * Override DeprecatedIsPrefilledMixin
       * 'prefilled' should be false when modelValue is { checked: false }, which would return
       * true in original method (since non-empty objects are considered prefilled by default).
       * @param {*} modelValue
       */
      static _isPrefilled(modelValue) {
        return modelValue.checked;
      }
    },
);
