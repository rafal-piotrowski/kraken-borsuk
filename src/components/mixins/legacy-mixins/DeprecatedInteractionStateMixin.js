/* eslint-disable import/no-extraneous-dependencies */
import { dedupeMixin } from '@lion/core';
 
export const DeprecatedInteractionStateMixin = dedupeMixin(
  superclass =>
    // eslint-disable-next-line
    class DeprecatedInteractionStateMixin extends superclass {
      updated(changedProperties) {
        super.updated(changedProperties);
        // classes are added only for backward compatibility - they are deprecated
        if (changedProperties.has('touched')) {
          this.classList[this.touched ? 'add' : 'remove']('state-touched');
        }
        if (changedProperties.has('dirty')) {
          this.classList[this.dirty ? 'add' : 'remove']('state-dirty');
        }
      }
 
      /**
       * @deprecated
       */
      get leaveEvent() {
        return this._leaveEvent;
      }
 
      /**
       * @deprecated
       */
      set leaveEvent(eventName) {
        this._leaveEvent = eventName;
      }
    },
);
