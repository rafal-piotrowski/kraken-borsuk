/* eslint-disable import/no-extraneous-dependencies */
import { dedupeMixin } from '@lion/core';
 
export const ArrowNavigationMixin = dedupeMixin(
  superclass =>
    // eslint-disable-next-line no-shadow
    class ArrowNavigationMixin extends superclass {
      connectedCallback() {
        super.connectedCallback();
        this._addArrowNavigationSupport();
      }
 
      disconnectedCallback() {
        this.removeEventListener('keydown', this._keyNavigationEvent);
      }
 
      _addArrowNavigationSupport() {
        this._keyNavigationEvent = this.addEventListener('keydown', event => {
          // eslint-disable-next-line default-case
          switch (event.key) {
            case 'ArrowRight':
            case 'ArrowUp':
              this._moveForward(event);
              break;
            case 'ArrowLeft':
            case 'ArrowDown':
              this._moveBackward(event);
              break;
          }
        });
      }
 
      _snapshot() {
        const currentFocus = this.querySelector('[focused]');
        const siblings = this.querySelectorAll(`${currentFocus.tagName}:not([disabled])`);
        const currentPosition = Array.from(siblings).findIndex(node => node.focused);
        return { siblings, currentPosition };
      }
 
      _moveForward(event) {
        event.stopPropagation();
        const { siblings, currentPosition } = this._snapshot();
 
        if (siblings.item(currentPosition + 1)) {
          siblings.item(currentPosition + 1).focus();
        } else {
          siblings.item(0).focus();
        }
      }
 
      _moveBackward(event) {
        event.stopPropagation();
        const { siblings, currentPosition } = this._snapshot();
 
        if (siblings.item(currentPosition - 1)) {
          siblings.item(currentPosition - 1).focus();
        } else {
          siblings.item(siblings.length - 1).focus();
        }
      }
    },
);
