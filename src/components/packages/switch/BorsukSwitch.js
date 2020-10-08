/* eslint-disable import/no-extraneous-dependencies */
import { css, html, ScopedElementsMixin } from '@lion/core';
import { LionSwitch } from '@lion/switch';
import { IngFieldMixin } from '../../mixins/field-mixin/IngFieldMixin.js';
import { DeprecatedChoiceIsPrefilledMixin } from '../../mixins/legacy-mixins/DeprecatedChoiceIsPrefilledMixin.js';
import { BorsukSwitchButton } from './BorsukSwitchButton.js';

/**
 * #  web component
 *
 * @customElement ing-switch
 * @extends LionSwitch
 */
export class BorsukSwitch extends ScopedElementsMixin(
  DeprecatedChoiceIsPrefilledMixin(IngFieldMixin(LionSwitch)),
) {
  static get scopedElements() {
    return {
      ...super.scopedElements,
      'borsuk-switch-button': BorsukSwitchButton,
    };
  }

  get slots() {
    return {
      ...super.slots,
      input: () => document.createElement(this.constructor.getScopedTagName('ing-switch-button')),
    };
  }

  static get styles() {
    return [
      ...super.styles,
      css`
        :host {
          display: flex;
          flex-direction: row;
          min-width: 288px;
        }

        .form-field__group-one {
          flex: 1;
        }

        .input-group__container {
          box-shadow: none;
          display: block;
        }

        .input-group__container {
          background: transparent;
        }

        .input-group__container > .input-group__input:last-child ::slotted(.form-control) {
          display: block;
          border: 0;
          border-radius: 0;
          padding: 0 0 0 12px;
          box-shadow: none;
          width: 48px;
          top: -8px;
        }

        :host([focused]) .input-group__container > .input-group__input ::slotted(.form-control) {
          outline: none;
          box-shadow: none;
          border: 0;
        }

        :host([layout^='wide-']) .input-group__container > .input-group__input {
          width: 36px;
        }

        :host([layout^='wide-']) .form-field__group-one {
          padding-top: 0;
        }

        :host([layout^='wide-'])
          .input-group__container
          > .input-group__input:last-child
          ::slotted(.form-control) {
          padding: 0;
        }
      `,
    ];
  }

  _groupOneTemplate() {
    if (this.layout === 'wide-right' || this.layout === 'wide-left') {
      return html`${this._labelTemplate()} ${this._helpTextTemplate()}`;
    }
    return html`${this._labelTemplate()} ${this._helpTextTemplate()} ${this._feedbackTemplate()}`;
  }

  _groupTwoTemplate() {
    if (this.layout === 'wide-right' || this.layout === 'wide-left') {
      return html`${this._inputGroupTemplate()} ${this._feedbackTemplate()}`;
    }
    return html`${this._inputGroupTemplate()}`;
  }
}
