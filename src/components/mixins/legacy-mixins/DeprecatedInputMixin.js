/* eslint-disable import/no-extraneous-dependencies */

import { dedupeMixin } from '@lion/core';
 
export const DeprecatedInputMixin = dedupeMixin(
  superclass =>
    // eslint-disable-next-line
    class DeprecatedInputMixin extends superclass {
      static get properties() {
        return {
          step: {
            type: Number,
            reflect: true,
          },
        };
      }
 
      constructor() {
        super();
        /**
         * Only application to type="number" & type="range"
         *
         * @deprecated
         */
        this.step = undefined;
      }
 
      updated(changedProps) {
        super.updated(changedProps);
        if (changedProps.has('step')) {
          this._inputNode.step = this.step;
        }
      }
    },
);
