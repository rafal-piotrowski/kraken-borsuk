/* eslint-disable import/no-extraneous-dependencies */

import { LionTooltip } from '@lion/tooltip';
import './ing-tooltip-arrow.js';
 
// TODO: CSS Transitions. Can only do this properly when OverlayController is clean from shadow outlet in lightDOM
// And also the overlay mixin needs to use "transitionHide" and "transitionShow" methods so display:none doesn't mess up the transitions
/**
* # <ing-tooltip> webcomponent
*
* @customElement ing-tooltip
* @extends LionTooltip
*/
export class IngTooltip extends LionTooltip {
  static get properties() {
    return {
      /**
       * @deprecated since ing-web version 1.12.0, use popperConfig object instead!
       * This includes getter and setter
       */
      position: {
        type: String,
      },
    };
  }
 
  connectedCallback() {
    if (super.connectedCallback) {
      super.connectedCallback();
    }
 
    const arrowElement = document.createElement('ing-tooltip-arrow');
    arrowElement.setAttribute('slot', 'arrow');
    this.appendChild(arrowElement);
  }
 
  /**
   * Backwards compatibility to support the old position API.
   * Getter, setter and converter can be removed once position prop is removed
   */
  get position() {
    return this.__oldPosition;
  }
 
  set position(value) {
    this.__oldPosition = value;
    // Necessary to allow this._controller to be set by LionPopup
    window.requestAnimationFrame(() => {
      this.config = this.__convertPosToPopperConfig(value);
    });
    // eslint-disable-next-line no-console
    console.warn(
      'This positioning API has been deprecated. Please check the documentation for ing-tooltip for more information!',
    );
  }
 
  __convertPosToPopperConfig(pos) {
    const args = pos.split(' ');
 
    let popperPlacement = args[0];
    if (args[1] === 'right') {
      popperPlacement += '-start';
    } else if (args[1] === 'left') {
      popperPlacement += '-end';
    }
 
    return {
      ...this.config,
      popperConfig: { placement: popperPlacement },
    };
  }
 
  _showMouse() {
    if (!this._keyActive) {
      this._mouseActive = true;
      setTimeout(() => {
        if (this._mouseActive) {
          this.opened = true;
        }
      }, 1000);
    }
  }
 
  _hideMouse() {
    if (!this._keyActive) {
      this._mouseActive = false;
      setTimeout(() => {
        if (!this._mouseActive) {
          this.opened = false;
        }
      }, 1500);
    }
  }
}
