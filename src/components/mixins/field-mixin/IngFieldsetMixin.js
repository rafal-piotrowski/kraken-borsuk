/* eslint-disable import/no-extraneous-dependencies */
import { css, dedupeMixin } from '@lion/core';
import { DisplayOptionalMixin } from './DisplayOptionalMixin.js';
import { FieldLayoutMixin } from './FieldLayoutMixin.js';
import { font14Mixin, font16Mixin } from '../../../styles/mixins/typography.js';
import { black15, black34, black59, black80 } from '../../../styles/values/color.js';
import { spacer8 } from '../../../styles/values/spacing.js';
 
export const IngFieldsetMixin = dedupeMixin(
  superclass =>
    class extends DisplayOptionalMixin(FieldLayoutMixin(superclass)) {
      // eslint-disable-line no-unused-vars, max-len
      static get styles() {
        return [
          super.styles,
          css`
            /*************************
            {block} .form-field
             ********************/
 
            :host {
              display: block;
            }
 
            /*********************************
            {element} .form-field__label  */
 
            .form-field__label {
              display: block;
            }
 
            .form-field__label ::slotted(*) {
              color: ${black80};
              ${font16Mixin()};
            }
 
            /**************************************
            {element} .form-field__help-text  */
 
            .form-field__help-text ::slotted(*) {
              display: block;
              color: ${black59};
              ${font14Mixin()};
              margin-bottom: ${spacer8};
            }
 
            :host([disabled]) .form-field__help-text ::slotted(*) {
              color: ${black34};
              border-color: ${black15};
            }
 
            /************************
            {block} .input-group
             ********************/
 
            .input-group {
              display: column;
            }
 
            /************************
            {element} .ing-validation-feedback
             ********************/
 
            ::slotted([slot='feedback']) {
              padding-top: 0;
            }
          `,
        ];
      }
 
      updated(changedProps) {
        super.updated(changedProps);
        if (changedProps.has('layout')) {
          this._setValueForAllFormElements('layout', this.layout);
        }
      }
 
      // *******************************************************************************************
      // FEATURE: layout
      // *******************************************************************************************
 
      addFormElement(child) {
        super.addFormElement(child);
        // eslint-disable-next-line no-param-reassign
        child.layout = this.layout;
        this.setLayout = this.layout; // To preserve the initial value set from FieldLayoutMixin to be used by ResponsiveLayoutMixin
      }
    },
);
