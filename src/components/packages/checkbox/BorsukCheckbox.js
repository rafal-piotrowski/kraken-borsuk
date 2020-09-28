/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import { LionCheckbox } from '@lion/checkbox-group';
import { css, html } from '@lion/core';
import { radioCheckboxComponentStyle } from '../../../styles/components/radio-checkbox.js';
import { black34, orange } from '../../../styles/values/color.js';
// import { DeprecatedChoiceIsPrefilledMixin } from '../../mixins/legacy-mixins/DeprecatedChoiceIsPrefilledMixin.js';

// export class BorsukCheckbox extends DeprecatedChoiceIsPrefilledMixin(LionCheckbox) {
export class BorsukCheckbox extends LionCheckbox {
  static get styles() {
    return [
      super.styles || [],
      css`
        /* ${radioCheckboxComponentStyle} */

        /* .choice-field__graphic-container {
         border-radius: 4px;
        }

        :host([disabled]) .checkbox-graphic .checkbox-graphic__path {
          stroke: ${black34};
        }

        .checkbox-graphic {
          visibility: hidden;
          width: 70%;
          height: 70%;
        }

        :host([checked]) .checkbox-graphic {
          visibility: inherit;
        }

        .checkbox-graphic__path {
          stroke: ${orange};
          stroke-width: 4px;
        } */
      `,
    ];
  }

  // render() {
  //   return html`
  //     <slot name="input"></slot>
  //     <div class="choice-field__graphic-container">${this._choiceGraphicTemplate()}</div>
  //     <div class="choice-field__label">
  //       <slot name="label"></slot>
  //     </div>
  //   `;
  // }
 
  // eslint-disable-next-line class-methods-use-this
  // _choiceGraphicTemplate() {
  //   return html`
  //     <svg class="checkbox-graphic" focusable="false" viewBox="0 0 24 24">
  //       <path
  //         class="checkbox-graphic__path"
  //         fill="none"
  //         d="M1.73,12.91 8.1,19.28 22.79,4.59"
  //       ></path>
  //     </svg>
  //   `;
  // }
}