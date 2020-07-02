/* eslint-disable no-else-return */
/* eslint-disable lit/no-invalid-html */
/* eslint-disable class-methods-use-this, no-underscore-dangle */
 
import { html, css, LitElement } from 'lit-element';
import { BorsukStepsIndicatorStyle } from './BorsukStepsIndicatorStyle.js';
import { borsukCheckmark } from '../../../icons/icons.js';
import '../../packages/borsuk-icon.js';

export class BorsukStepsIndicator extends LitElement {

  static get properties() {
    return {
      current: {
        type: String,
      },
      error: { type: Boolean },
      inprogress: { type: Boolean }
    };
  }
 
  constructor() {
    super();
    this.stepperId = `${this.localName}-${Math.random()
      .toString(36)
      .substr(2, 10)}`;
  }
 
  getStepClass(index, current) {
    if (index === undefined || current === undefined) {
      throw new Error('Both index and current values should be provided');
    }
    if (index < current) {
      return 'step__icon step__icon--visited';
    }
    if (index === current) {
      if (this.error === true) {
        return 'step__icon step__icon--error';
      } else if (this.inprogress === true) {
          return 'step__icon step__icon--inprogress';
        } else {
          return 'step__icon step__icon--current';
      }
    }
    if (index > current) {
      return 'step__icon';
    }
    return '';
  }
 
  isCurrentStep(index, current) {
    return index === current;
  }
 
  render() {
    return html`
      <ol class="steps" aria-labelledby="${this.stepperId}">
        ${this.parentNode.steps.map(
          (elem, index) =>
            html`
              <li
                class=${this.isCurrentStep(index, this.parentNode.current)
                  ? 'step step--current'
                  : 'step'}
                aria-current=${this.isCurrentStep(index, this.parentNode.current) ? 'step' : false}
              >
                ${index === 0
                  ? ''
                  : html`
                      <div class="step__separator"></div>
                    `}
                <div class="step__body">
                  <div class=${this.getStepClass(index, this.parentNode.current)}>
                    ${index < this.parentNode.current
                      ? html`
                          <borsuk-icon
                            .svg=${borsukCheckmark}
                            class="step__checkmark"
                            aria-label='borsuk-steps-indicator:completedStep'
                          /></borsuk-icon>
                        `
                      : html`
                          <div class="step__number">${index + 1}</div>
                        `}
                  </div>
                  <div
                    class="step__label ${this.isCurrentStep(index, this.parentNode.current)
                      ? 'step__label--current'
                      : ''}"
                  >
                    <div
                      class="${this.isCurrentStep(index, this.parentNode.current)
                        ? 'step__progress'
                        : 'step__progress--hide'}"
                      id="${this.stepperId}"
                    >
                    </div>
                    ${elem.label}
                  </div>
                </div>
              </li>
            `,
        )}
      </ol>
      <slot></slot>
    `;
  }

  static get styles() {
    return [
      css`
        ${BorsukStepsIndicatorStyle}
        :host {
          display: inline-block;
        }
      `,
    ];
  }
}
