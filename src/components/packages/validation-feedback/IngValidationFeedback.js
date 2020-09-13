/* eslint-disable import/no-extraneous-dependencies */

import { css, html, ScopedElementsMixin } from '@lion/core';
import { LionValidationFeedback } from '@lion/form-core';
import { IngIcon } from '../icon/ing-icon.js';
import { screenReaderOnlyMixin } from '../../../styles/mixins/screen-reader.js';
import { font16Mixin } from '../../../styles/mixins/typography.js';
import { black80 } from '../../../styles/values/color.js';
 
export class IngValidationFeedback extends ScopedElementsMixin(LionValidationFeedback) {
  static get scopedElements() {
    return {
      ...super.scopedElements,
      'ing-icon': IngIcon,
    };
  }
 
  static get properties() {
    return {
      feedbackData: { type: Object },
    };
  }
 
  static get styles() {
    return [
      super.styles || [],
      css`
        :host {
          display: block;
          margin-top: 4px;
        }
 
        :host([hidden]) {
          display: none;
        }
 
        .container {
          display: flex;
        }
 
        .icon {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
          margin-top: 2px;
        }
 
        .text {
          flex-grow: 1;
          ${font16Mixin()};
          color: ${black80};
          padding-left: 8px;
        }
 
        .visually-hidden {
          ${screenReaderOnlyMixin()}
        }
      `,
    ];
  }
 
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('aria-live', 'polite');
  }
 
  // eslint-disable-next-line class-methods-use-this
  __capitalize(s) {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
 
  // eslint-disable-next-line class-methods-use-this
  _messageTemplate({ message, type }) {
    return html`
      <div id="container" class="container">
        ${message
          ? html`
              <ing-icon
                id="icon"
                class="icon"
                icon-id="borsuk:filledin-notification:notification${type === 'info'
                  ? 'Information'
                  : this.__capitalize(type)}"
              ></ing-icon>
              <span id="text" class="text"> ${message} </span>
            `
          : html``}
      </div>
    `;
  }
}
