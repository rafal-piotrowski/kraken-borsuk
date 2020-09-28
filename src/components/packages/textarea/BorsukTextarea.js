/* eslint-disable import/no-extraneous-dependencies */
import { css } from '@lion/core';
import { LionTextarea } from '@lion/textarea';
import { IngFieldMixin } from '../../mixins/field-mixin/IngFieldMixin.js';

/**
 * #  webcomponent
 *
 * @customElement ing-textarea
 * @extends LionTextarea
 */
export class BorsukTextarea extends IngFieldMixin(LionTextarea) {
  static get styles() {
    return [
      super.styles,
      css`
        /**********************************
        {element} .input-group__input  */

        .input-group__input {
          max-width: 100%;
        }

        /*************************
        {block} .form-control
         *********************/

        .input-group__container > .input-group__input ::slotted(.form-control) {
          min-height: 40px;
          overflow: auto;
          resize: none;
          height: auto;
        }
      `,
    ];
  }
}
