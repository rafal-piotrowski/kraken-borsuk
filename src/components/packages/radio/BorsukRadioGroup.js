/* eslint-disable import/no-extraneous-dependencies */
import { css, ScopedElementsMixin } from '@lion/core';
import { LionRadioGroup } from '@lion/radio-group';
import { wideLayoutStyle } from '../../mixins/field-mixin/wideLayoutStyle.css.js';
import { IngFieldsetMixin } from '../../mixins/field-mixin/IngFieldsetMixin.js';
import { red } from '../../../styles/values/color.js';
import { spacer12 } from '../../../styles/values/spacing.js';
import { IngValidationFeedback } from '../validation-feedback/IngValidationFeedback.js';
import { DeprecatedIsPrefilledMixin } from '../../mixins/legacy-mixins/DeprecatedIsPrefilledMixin.js';

/**
 * # <ing-radio-group> webcomponent
 *
 * @customElement ing-radio-group
 * @extends LionRadioGroup
 */
export class BorsukRadioGroup extends ScopedElementsMixin(
  DeprecatedIsPrefilledMixin(IngFieldsetMixin(LionRadioGroup)),
) {
  static get scopedElements() {
    return {
      ...super.scopedElements,
      'ing-validation-feedback': IngValidationFeedback,
    };
  }

  get slots() {
    return Object.assign(super.slots, {
      feedback: () =>
        document.createElement(this.constructor.getScopedTagName('ing-validation-feedback')),
    });
  }

  static get styles() {
    return [
      super.styles,
      wideLayoutStyle,
      css`
        :host {
          display: block;
          margin-bottom: ${spacer12};
        }

        :host([shows-feedback-for='error']:not([focused])) {
          --graphic-border-color: ${red};
        }
      `,
    ];
  }
}
