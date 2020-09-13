/* eslint-disable import/no-extraneous-dependencies */

import { html, LitElement } from '@lion/core';
import { ingDialogFrameComponentStyle } from './ing-dialog-frame-style.js';
// import '../ing-icon.js';
 
import { ScrollMixin } from './ScrollMixin.js';
 
export class IngDialogFrameSimple extends ScrollMixin(LitElement) {
  static get properties() {
    return {
      noPadding: {
        type: Boolean,
        attribute: 'no-padding',
        reflect: true,
      },
      hasScrollBorders: {
        type: Boolean,
        attribute: 'has-scroll-borders',
        reflect: true,
      },
    };
  }
 
  static get styles() {
    return [super.styles || [], ingDialogFrameComponentStyle];
  }
 
  constructor() {
    super();
    this.hasScrollBorders = false;
    this._uniqueID = Math.random().toString(36).substr(2, 10);
  }
 
  // eslint-disable-next-line class-methods-use-this
  _contentTemplate() {
    return html`
      <slot name="content"></slot>
    `;
  }
 
  render() {
    return html`
      <div class="dialog-frame__wrapper">
        <div class="dialog-frame dialog-frame--simple">
          <div class="dialog-frame__content">
            ${this._contentTemplate()}
          </div>
        </div>
      </div>
    `;
  }
 
  get _frameNode() {
    return this.shadowRoot.querySelector('.dialog-frame');
  }
 
  connectedCallback() {
    super.connectedCallback();
    if (!this.getAttribute('role')) {
      this.setAttribute('role', 'dialog');
    }
    if (!this.getAttribute('aria-modal')) {
      this.setAttribute('aria-modal', 'true');
    }
    if (!this.getAttribute('aria-describedby')) {
      this.setAttribute('aria-describedby', `dialogContent-${this._uniqueID}`);
    }
  }
 
  firstUpdated() {
    super.firstUpdated();
    // For a11y, to link to aria-describedby on host element
    const contentSlot = this.shadowRoot.querySelector('slot[name="content"]');
    if (contentSlot) {
      contentSlot.addEventListener('slotchange', () => {
        const lightSlot = this.querySelector('[slot="content"]');
        lightSlot.id = `dialogContent-${this._uniqueID}`;
      });
    }
    // scroll target setup
    this.scrollTarget = this.shadowRoot.querySelector('.dialog-frame__content');
    this.addEventListener('scroll-start', this.__scrollHandler);
  }
 
  __scrollHandler() {
    this.hasScrollBorders = true;
    this.removeEventListener('scroll-start', this.__scrollHandler);
  }
}
