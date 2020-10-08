/* eslint-disable import/no-extraneous-dependencies */
import { LionCheckbox } from '@lion/checkbox-group';
import { css, html, nothing, ScopedElementsMixin } from '@lion/core';
import { IngIcon } from '../icon/ing-icon.js';
import { chipComponentStyle } from '../../../styles/components/chip.js';
import { DeprecatedChoiceIsPrefilledMixin } from '../../mixins/legacy-mixins/DeprecatedChoiceIsPrefilledMixin.js';
 
export class BorsukChipFilter extends ScopedElementsMixin(DeprecatedChoiceIsPrefilledMixin(LionCheckbox)) {
  static get scopedElements() {
    return {
      ...super.scopedElements,
      'ing-icon': IngIcon,
    };
  }
 
  static get styles() {
    return [
      css`
        ${chipComponentStyle}
      `,
    ];
  }
 
  constructor() {
    super();
    this.hasIcon = false;
    this.addEventListener('click', this._delegateClickEvent);
  }
 
  /**
   * Make the whole chip area clickable by delegating 'click' event to underlying input
   */
  _delegateClickEvent(e) {
    if (e.target === this) {
      this.querySelector('input').click();
    }
  }
 
  render() {
    return html`
      <slot name="input"></slot>
      ${this.checked
        ? html`<ing-icon class="icon" icon-id="ing:filledin-feedback:checkMark"></ing-icon>`
        : nothing}
      <slot name="label"></slot>
    `;
  }
}
