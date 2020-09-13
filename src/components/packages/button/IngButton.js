/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */

import { LionButton } from '@lion/button';
import { html } from '@lion/core';
import { buttonStyle } from './buttonStyle.js';
 
export class IngButton extends LionButton {
  static get styles() {
    return [buttonStyle];
  }
 
  // eslint-disable-next-line class-methods-use-this
  _renderBefore() {
    return html`
      <slot name="icon-before"></slot>
    `;
  }
 
  // eslint-disable-next-line class-methods-use-this
  _renderAfter() {
    return html`
      <slot name="icon-after"></slot>
    `;
  }
 
  __clickDelegationHandler(...args) {
    if (window.Polymer && window.Polymer.Gestures && window.Polymer.Gestures.resetMouseCanceller) {
      try {
        // this is a workaround for this bug of Polymer < 2.8.0
// https://github.com/ing-bank/lion/issues/19
        window.Polymer.Gestures.resetMouseCanceller();
      } catch (e) {
        /* if Polymer changes the interface, do nothing */
      }
    }
    super.__clickDelegationHandler(...args);
  }
}
