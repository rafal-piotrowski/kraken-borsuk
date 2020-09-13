/* eslint-disable import/no-extraneous-dependencies */

import { dedupeMixin } from '@lion/core';
 
export const ScrollMixin = dedupeMixin(
  base =>
    class extends base {
      static get properties() {
        return {
          scrollTarget: { type: Object },
          scrolling: { type: Boolean, reflect: true },
          scrolledToBottom: { type: Boolean, reflect: true, attribute: 'scrolled-to-bottom' },
          scrollTimeout: { type: Number },
          __scrollTimeoutID: { type: Number },
        };
      }
 
      constructor() {
        super();

        this.scrolling = false;
        this.scrolledToBottom = false;
        this.scrollTimeout = 100;
        this.__handleTargetScroll = this.__handleTargetScroll.bind(this);
      }
 
      set scrollTarget(newTarget) {
        const oldTarget = this.__scrollTarget;
        if (oldTarget) {
          oldTarget.removeEventListener('scroll', this.__handleTargetScroll);
        }
        this.__scrollTarget = newTarget;
        newTarget.addEventListener('scroll', this.__handleTargetScroll);
        this.requestUpdate('scrollTarget', oldTarget);
      }
 
      get scrollTarget() {
        return this.__scrollTarget;
      }
 
      __handleTargetScroll() {
        this.scrolledToBottom =
          this.scrollTarget.scrollTop + this.scrollTarget.offsetHeight >=
          this.scrollTarget.scrollHeight;
        if (!this.scrolling) {
          this.scrolling = true;
          this.dispatchEvent(new Event('scroll-start'));
        }
        if (this.__scrollTimeoutID) {
          window.clearTimeout(this.__scrollTimeoutID);
        }
        this.__scrollTimeoutID = window.setTimeout(() => {
          this.scrolling = false;
          this.dispatchEvent(new Event('scroll-finish'));
        }, this.scrollTimeout);
        this.dispatchEvent(new Event('scroll-progress'));
      }
    },
);
