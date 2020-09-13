/* eslint-disable import/no-extraneous-dependencies */
import { dedupeMixin } from '@lion/core';
 
export const DeprecatedFormatMixin = dedupeMixin(
  superclass =>
    // eslint-disable-next-line
    class DeprecatedFormatMixin extends superclass {
      _requestUpdate(name, oldVal) {
        super._requestUpdate(name, oldVal);
        if (name === 'serializedValue' && this.serializedValue !== oldVal) {
          this._onSerializedValueChanged();
        }
        if (name === 'formattedValue' && this.formattedValue !== oldVal) {
          this._onFormattedValueChanged();
        }
      }
 
      _onFormattedValueChanged() {
        this.dispatchEvent(
          new CustomEvent('formatted-value-changed', {
            bubbles: true,
            composed: true,
          }),
        );
      }
 
      _onSerializedValueChanged() {
        this.dispatchEvent(
          new CustomEvent('serialized-value-changed', {
            bubbles: true,
            composed: true,
          }),
        );
      }
    },
);
