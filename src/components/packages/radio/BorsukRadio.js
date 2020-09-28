/* eslint-disable import/no-extraneous-dependencies */
import { css, html } from '@lion/core';
import { LionRadio } from '@lion/radio-group';
import { radioCheckboxComponentStyle } from '../../../styles/components/radio-checkbox.js';
import { black34 } from '../../../styles/values/color.js';
import { DeprecatedChoiceIsPrefilledMixin } from '../../mixins/legacy-mixins/DeprecatedChoiceIsPrefilledMixin.js';

// export class BorsukRadio extends DeprecatedChoiceIsPrefilledMixin(LionRadio) {
export class BorsukRadio extends LionRadio {
  static get styles() {
    return [
      super.styles || [],
    //   css`
    //     ${radioCheckboxComponentStyle}

    //     .choice-field__graphic-container {
    //       border-radius: 50%;
    //     }

    //     :host([disabled]) .radio-graphic .dot {
    //       fill: ${black34};
    //     }

    //     .radio-graphic {
    //       visibility: hidden;
    //       width: 16px;
    //       height: 16px;
    //     }

    //     :host([checked]) .radio-graphic {
    //       visibility: inherit;
    //     }

    //     ::slotted(.form-control) {
    //       /* For Safari, see: https://gitlab.ing.net/TheGuideComponents/ing-web/issues/263 */
    //       border-radius: 0;
    //     }
    //   `,
    ];
  }

//   render() {
//     return html`
//       <slot name="input"></slot>
//       <div class="choice-field__graphic-container">${this._choiceGraphicTemplate()}</div>
//       <div class="choice-field__label">
//         <slot name="label"></slot>
//       </div>
//     `;
//   }

  // eslint-disable-next-line class-methods-use-this
//   _choiceGraphicTemplate() {
//     return html`
//       <svg class="radio-graphic" focusable="false" viewBox="0 0 64 64">
//         <circle class="dot" fill="#ff6200" cx="32" cy="32" r="18"></circle>
//       </svg>
//     `;
//   }
}
