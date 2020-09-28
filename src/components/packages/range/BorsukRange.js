/* eslint-disable import/no-extraneous-dependencies */
import { LionInputRange } from '@lion/input-range';
import { css, unsafeCSS } from '@lion/core';
import { spacer2, spacer4, spacer8, spacer12 } from '../../../styles/values/spacing.js';
import { font14Mixin, font16BoldMixin } from '../../../styles/mixins/typography.js';
import { IngFieldMixin } from '../../mixins/field-mixin/IngFieldMixin.js';
import { black15, black34, black59, black80, orange, white, sky } from '../../../styles/values/color.js';

export class BorsukRange extends IngFieldMixin(LionInputRange) {
  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          color: ${black80};
          padding: ${spacer4} 0;
        }

        :host .input-group__container {
          box-shadow: none;
        }

        :host .form-field__help-text ::slotted(*) {
          margin-top: -4px;
        }

        :host .input-range__value {
          ${font16BoldMixin()}
        }

        :host .input-range__unit {
          ${font14Mixin()}
        }

        :host .input-group__input {
          flex-direction: column;
        }

        :host .input-range__limits {
          display: flex;
          justify-content: space-between;
        }

        :host .input-range__value {
          font-weight: bold;
        }

        :host([disabled]) {
          color: ${black34};
        }

        /* for IE11 & EDGE */
        :host .input-group__container > .input-group__input ::slotted(.form-control[type='range']) {
          height: 26px;
          width: 100%;
          border: none;
          box-shadow: none;
          outline: none;
          line-height: 0;
          font-size: 0;
          padding: 0;
        }

        :host
          .input-group__container
          > .input-group__input
          ::slotted(.form-control[type='range'])::-ms-track {
          height: 6px;
          color: transparent;
          border: 1px solid ${orange};
          border-radius: 4px;
          box-shadow: 0;
        }

        :host
          .input-group__container
          > .input-group__input
          ::slotted(.form-control[type='range'])::-ms-fill-lower {
          background-color: ${orange};
          border-radius: ${spacer4};
        }

        :host
          .input-group__container
          > .input-group__input
          ::slotted(.form-control[type='range'])::-ms-fill-upper {
          background-color: ${white};
          border-radius: ${spacer4};
        }

        :host
          .input-group__container
          > .input-group__input
          ::slotted(.form-control[type='range'])::-ms-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: white;
          border: 1px solid ${black59};
          cursor: pointer;
          box-shadow: 0 ${spacer2} ${spacer2} ${black34};
        }

        :host
          .input-group__container
          > .input-group__input
          ::slotted(.form-control[type='range'])::-ms-tooltip {
          display: none;
        }

        :host([focused])
          .input-group__container
          > .input-group__input
          ::slotted(.form-control[type='range'])::-ms-thumb {
          outline: none;
          box-shadow: 0 0 ${spacer8} ${sky};
          border: 1px solid ${sky};
        }

        :host([disabled])
          .input-group__container
          > .input-group__input
          ::slotted(.form-control[type='range'])::-ms-track {
          border-color: ${black15};
        }

        :host([disabled])
          .input-group__container
          > .input-group__input
          ::slotted(.form-control[type='range'])::-ms-fill-lower {
          background-color: ${black15};
        }

        :host([disabled])
          .input-group__container
          > .input-group__input
          ::slotted(.form-control[type='range'])::-ms-thumb {
          border-color: ${black15};
          box-shadow: none;
          cursor: auto;
        }

        .input-group__before ::slotted(*) {
          margin-right: ${spacer12};
        }

        .input-group__after ::slotted(*) {
          margin-left: ${spacer12};
        }
      `,
    ];
  }

  static rangeStyles(scope) {
    return css`
      /* Custom input range styling comes here, be aware that this won't work for polyfilled browsers */
      .${scope} .form-control[type='range'] {
        -webkit-appearance: none;
        width: 100%;
        height: 6px;
        border: 1px solid ${orange};
        border-radius: ${spacer4};
        box-shadow: none;
        outline: none;
        padding: 0;
        margin: ${spacer8} 0;
      }

      .${scope}[disabled] .form-control[type='range'] {
        border-color: ${black15};
      }

      .${scope} .form-control[type='range']::-moz-range-progress {
        border: 1px solid ${orange};
        border-radius: ${spacer4};
      }

      .${scope}[disabled] .form-control[type='range']::-moz-range-progress {
        border-color: ${black15};
      }

      .${scope} .form-control[type='range']::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: white;
        border: 1px solid ${black59};
        cursor: pointer;
        opacity: 1;
        box-shadow: 0 ${spacer2} ${spacer2} ${black34};
      }

      .${scope} .form-control[type='range']::-moz-range-thumb {
        appearance: none;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: white;
        border: 1px solid ${black59};
        cursor: pointer;
        opacity: 1;
        box-shadow: 0 ${spacer2} ${spacer2} ${black34};
      }

      .${scope} .form-control[type='range']:active {
        cursor: grabbing;
      }

      .${scope} .form-control[type='range']:active::-webkit-slider-thumb {
        cursor: grabbing;
      }

      .${scope} .form-control[type='range']:active::-moz-range-thumb {
        cursor: grabbing;
      }

      .${scope}[focused] .form-control[type='range'] {
        outline: none;
      }

      .${scope}[focused] .form-control[type='range']::-webkit-slider-thumb {
        outline: none;
        box-shadow: 0 0 ${spacer8} ${sky};
        border: 1px solid ${sky};
      }

      .${scope}[focused] .form-control[type='range']::-moz-range-thumb {
        outline: none;
        outline-color: red;
        box-shadow: 0 0 ${spacer8} ${sky};
        border: 1px solid ${sky};
      }

      .${scope}[focused] .form-control[type='range']::-webkit-slider-thumb {
        outline: none;
        box-shadow: 0 0 ${spacer8} ${sky};
        border: 1px solid ${sky};
      }

      .${scope}[focused] .form-control[type='range']::-moz-range-thumb {
        outline: none;
        box-shadow: 0 0 ${spacer8} ${sky};
        border: 1px solid ${sky};
      }

      .${scope}[disabled] .form-control[type='range']::-webkit-slider-thumb {
        border-color: ${black15};
        box-shadow: none;
        cursor: auto;
      }

      .${scope}[disabled] .form-control[type='range']::-moz-range-thumb {
        border-color: ${black15};
        box-shadow: none;
        cursor: auto;
      }
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.modelValue = this.modelValue || this.min;
  }

  refreshShadedSide() {
    const valuePercentage = ((this.value - this.min) * 100) / (this.max - this.min);
    this.querySelector('.form-control').style.background = `linear-gradient(to right, ${
      this.disabled ? black15 : orange
    } ${unsafeCSS(valuePercentage)}%, white 0%)`;
  }

  shouldUpdate() {
    if (!this.constructor.__isIE11() && !this.constructor.__isEdge()) {
      this.refreshShadedSide();
    }
    return super.shouldUpdate();
  }

  static __isIE11() {
    const ua = window.navigator.userAgent;
    const result = /Trident/.test(ua);
    return result;
  }

  static __isEdge() {
    const ua = window.navigator.userAgent;
    const result = /Edge/.test(ua);
    return result;
  }
}
