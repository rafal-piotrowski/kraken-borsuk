/* eslint-disable import/no-extraneous-dependencies */

import { css, dedupeMixin, nothing, ScopedElementsMixin } from '@lion/core';
import { LocalizeMixin } from '@lion/localize';
import { font14Mixin, font16Mixin } from '../../../styles/mixins/typography.js';
import {
  black15,
  black34,
  black59,
  black6,
  black80,
  orange,
  red,
  sky,
  sky60,
  white,
} from '../../../styles/values/color.js';
import { spacer12, spacer4, spacer8 } from '../../../styles/values/spacing.js';
import { IngValidationFeedback } from '../../packages/validation-feedback/IngValidationFeedback.js';
import { DeprecatedIsPrefilledMixin } from '../legacy-mixins/DeprecatedIsPrefilledMixin.js';
import { DisplayOptionalMixin } from './DisplayOptionalMixin.js';
import { FieldLayoutMixin } from './FieldLayoutMixin.js';
import { wideLayoutStyle } from './wideLayoutStyle.css.js';
import { screenReaderOnlyMixin } from '../../../styles/mixins/screen-reader.js';
 
const disabledTextColor = black34;
const disabledBorderColor = black15;
const borderColor = black59;
 
/**
* #IngFieldMixin
*
* @polymerMixin
* @mixinFunction
*/
export const IngFieldMixin = dedupeMixin(
  superclass =>
    // eslint-disable-next-line
    class IngFieldMixin extends ScopedElementsMixin(
      DeprecatedIsPrefilledMixin(DisplayOptionalMixin(FieldLayoutMixin(LocalizeMixin(superclass)))),
    ) {
      static get scopedElements() {
        return {
          ...super.scopedElements,
          'ing-validation-feedback': IngValidationFeedback,
        };
      }
 
      static get properties() {
        return {
          /**
           * When no light dom defined and prop set
           */
          disableHelpText: {
            type: Boolean,
            attribute: 'disable-help-text',
          },
          /**
           * When label is only for Screen reader
           */
          labelSrOnly: {
            type: Boolean,
            attribute: 'label-sr-only',
            reflect: true,
          },
        };
      }
 
      get slots() {
        return {
          ...super.slots,
          feedback: () =>
            document.createElement(this.constructor.getScopedTagName('ing-validation-feedback')),
          'help-text': () => {
            if (!this.disableHelpText) {
              return super.slots['help-text']();
            }
            return null;
          },
        };
      }
 
      static get validationTypes() {
        return ['error', 'info', 'warning', 'success'];
      }
 
      static get styles() {
        return [
          super.styles,
          wideLayoutStyle,
          css`
            /*************************
            {block} .form-field
             ********************/
 
            :host {
              display: block;
              margin-bottom: ${spacer12};
            }
 
            /*********************************
            {element} .form-field__label  */
            .form-field__label {
              display: block;
            }
 
            .form-field__label ::slotted(*) {
              color: ${black80};
              ${font16Mixin()};
              margin-bottom: ${spacer4};
            }
 
            :host([disabled]) .form-field__label ::slotted(*) {
              color: ${disabledTextColor};
              border-color: ${disabledBorderColor};
            }
 
            :host([label-sr-only]) .form-field__label {
              ${screenReaderOnlyMixin()}
            }
 
            /**************************************
            {element} .form-field__help-text  */
 
            .form-field__help-text ::slotted(*) {
              display: block;
              color: ${black59};
              ${font14Mixin()};
              margin-bottom: ${spacer4};
            }
 
            :host([disabled]) .form-field__help-text ::slotted(*) {
              color: ${disabledTextColor};
              border-color: ${disabledBorderColor};
            }
 
            /************************
            {block} .input-group
             ********************/
 
            .input-group {
              display: flex;
              width: var(--ing-input-group-width);
            }
 
            /**************************************
            {element} .input-group__container  */
 
            .input-group__container {
              position: relative;
              display: flex;
              flex-wrap: wrap;
              align-items: stretch;
              width: var(--ing-input-element-width, 100%);
              border-radius: 4px;
              box-shadow: inset 0 2px 2px ${black15};
              background: white;
            }
 
            /**********************************
            {element} .input-group__input  */
 
            .input-group__input {
              display: flex;
              flex: 1;
            }
 
            /*************************
            {block} .form-control
             *********************/
 
            .input-group__container > .input-group__input ::slotted(.form-control) {
              ${font16Mixin()};
              display: block;
              box-sizing: border-box;
              flex: 1 1 auto;
              width: 1%;
              height: 40px;
              border: 1px solid ${borderColor};
              border-radius: 0;
              border-right: none;
              border-left: none;
              color: ${black80};
              background-clip: padding-box;
              background: transparent;
              transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
              padding: ${spacer8} ${spacer12};
            }
 
            .input-group__container > .input-group__input:first-child ::slotted(.form-control) {
              border-top-left-radius: 4px;
              border-bottom-left-radius: 4px;
              border-left: 1px solid ${borderColor};
            }
 
            .input-group__container > .input-group__input:last-child ::slotted(.form-control) {
              border-top-right-radius: 4px;
              border-bottom-right-radius: 4px;
              border-right: 1px solid ${borderColor};
            }
 
            :host([disabled])
              .input-group__container
              > .input-group__input
              ::slotted(.form-control) {
              color: ${disabledTextColor};
              border-color: ${disabledBorderColor};
              background-color: ${white};
            }
 
            :host([disabled]) .input-group__container {
              box-shadow: none;
            }
 
            /*******************************************************************
            {element} .input-group__prefix, {element} .input-group__suffix  */
 
            .input-group__prefix,
            .input-group__suffix {
              display: flex;
            }
 
            .input-group__prefix ::slotted(*),
            .input-group__suffix ::slotted(*) {
              display: flex;
              align-items: center;
              text-align: center;
              line-height: 1.5;
              white-space: nowrap;
              background: transparent;
              border: 1px solid ${borderColor};
              fill: ${orange};
              padding: 6px ${spacer12};
              margin-bottom: 0;
            }
 
            .input-group__container > .input-group__prefix ::slotted(*) {
              border-top-left-radius: 4px;
              border-bottom-left-radius: 4px;
              border-right: none;
              margin-right: -1px;
            }
 
            .input-group__container > .input-group__suffix ::slotted(*) {
              border-top-right-radius: 4px;
              border-bottom-right-radius: 4px;
              border-left: none;
              margin-left: -1px;
            }
 
            .input-group__container > .input-group__prefix ::slotted(button)::-moz-focus-inner,
            .input-group__container > .input-group__suffix ::slotted(button)::-moz-focus-inner {
              border: 0;
            }
 
            :host([disabled]) .input-group__container > .input-group__prefix ::slotted(*),
            :host([disabled]) .input-group__container > .input-group__suffix ::slotted(*) {
              color: ${disabledTextColor};
              fill: ${disabledBorderColor};
              border-color: ${disabledBorderColor};
            }
 
            /*****  {state} :error  *****/
 
            :host([shows-feedback-for~='error'])
              .input-group__container
              > .input-group__input
              > ::slotted(.form-control) {
              border: 1px solid ${red};
            }
 
            /*****  {state} :focus  *****/
 
            .input-group__container > .input-group__prefix ::slotted(*:focus),
            .input-group__container > .input-group__suffix ::slotted(*:focus) {
              outline: none;
              box-shadow: 0 0 8px ${sky60};
              border: 1px solid ${sky};
              border-left: 1px solid ${borderColor};
            }
 
            :host([focused])
              .input-group__container
              > .input-group__input
              ::slotted(.form-control) {
              outline: none;
              box-shadow: 0 0 8px ${sky60};
              border: 1px solid ${sky};
              z-index: 1;
            }
 
            /*****  {state} :read-only  *****/
 
            .input-group__container > .input-group__input > ::slotted(*[readonly]) {
              background-color: ${black6};
              border: 1px solid ${borderColor};
            }
 
            :host([readonly]) .input-group__container > .input-group__prefix ::slotted(*),
            :host([readonly]) .input-group__container > .input-group__suffix ::slotted(*) {
              background-color: ${black6};
              color: ${disabledTextColor};
              fill: ${disabledTextColor};
              border-color: ${borderColor};
            }
 
            /*******************************************************************
            {element} .input-group__before, {element} .input-group__after  */
 
            .input-group__before,
            .input-group__after {
              display: flex;
            }
 
            .input-group__before ::slotted(*),
            .input-group__after ::slotted(*) {
              color: ${black80};
              align-self: center;
              line-height: 1.5;
            }
 
            .input-group__before ::slotted(*) {
              margin-right: ${spacer8};
            }
 
            .input-group__after ::slotted(*) {
              margin-left: ${spacer8};
            }
          `,
        ];
      }
 
      connectedCallback() {
        // eslint-disable-next-line wc/guard-super-call
        super.connectedCallback();
        this.__isUserProvidedLabel = this.label;
      }
 
      _helpTextTemplate(...args) {
        if (this.disableHelpText || !super._helpTextTemplate) {
          return nothing;
        }
        return super._helpTextTemplate.apply(this, args);
      }
    },
);
