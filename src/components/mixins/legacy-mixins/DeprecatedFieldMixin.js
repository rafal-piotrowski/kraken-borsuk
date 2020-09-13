/* eslint-disable import/no-extraneous-dependencies */
import { dedupeMixin } from '@lion/core';
import { DeprecatedDomHelpersMixin } from './DeprecatedDomHelpersMixin.js';
 
export const DeprecatedFieldMixin = dedupeMixin(
  superclass =>
   // eslint-disable-next-line
    class DeprecatedFieldMixin extends DeprecatedDomHelpersMixin(superclass) {
      get inputElement() {
        return this.__getDirectSlotChild('input');
      }
    },
);
