/* eslint-disable import/no-extraneous-dependencies */
import { dedupeMixin } from '@lion/core';
 
const validLayouts = ['default', 'wide-right'];
const validLayoutsString = validLayouts.join(', ');
 
export const FieldLayoutMixin = dedupeMixin(
  superclass =>
    // eslint-disable-next-line no-shadow
    class FieldLayoutMixin extends superclass {
      static get properties() {
        return {
          layout: {
            type: String,
            reflect: true,
          },
        };
      }
 
      constructor() {
        super();
        /**
         * allows to modify the layout of a field
         * possible values are
         * - default
         * - wide-right
         */
        this.layout = 'default';
      }
 
      set layout(newVal) {
        const oldVal = this.__layout;
        if (validLayouts.indexOf(newVal) === -1) {
          throw new Error(
            `Given Layout "${newVal}" is invalid. Valid values are ${validLayoutsString}.`,
          );
        }
        this.__layout = newVal;
        this.requestUpdate('layout', oldVal);
      }
 
      get layout() {
        return this.__layout;
      }
    },
);
