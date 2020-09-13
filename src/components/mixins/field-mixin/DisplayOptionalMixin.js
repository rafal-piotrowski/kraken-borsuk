/* eslint-disable import/no-extraneous-dependencies */

import { css, dedupeMixin, html } from '@lion/core';
import { black54 } from '../../../styles/style.js';
import { LocalizeMixin, localize } from '../../../helpers/localize/localize.js';
 
export const DisplayOptionalMixin = dedupeMixin(
  superclass =>
    // eslint-disable-next-line no-shadow
    class DisplayOptionalMixin extends LocalizeMixin(superclass) {
      static get properties() {
        return {
          /**
           * When true, it will display the text '(optional)' next to the label.
           * Should usually be set when an input doesn't have a Required validator applied.
           * However, in some cases (think of an infix for an address) the optional label
           * can be omitted
           */
          displayOptional: {
            type: Boolean,
            reflect: true,
            attribute: 'display-optional',
          },
        };
      }
 
      get slots() {
        return {
          ...super.slots,
          '_label-optional': () => {
            if (this.displayOptional) {
              const node = document.createElement('span');
              node.classList.add('form-field__label-optional');
              this.addToAriaLabelledBy(node, { idPrefix: 'label-optional' });
              return node;
            }
            return undefined;
          },
        };
      }
 
      static get styles() {
        return [
          ...super.styles,
          css`
            .form-field__label ::slotted(.form-field__label-optional) {
              color: ${black54};
            }
          `,
        ];
      }
 
      static get localizeNamespaces() {
        return [
          {
            'ing-field': locale => {
              switch (locale) {
                case 'de-DE':
                  return import('./translations/de-DE.js');
                case 'de':
                  return import('./translations/de.js');
                case 'en-GB':
                  return import('./translations/en-GB.js');
                case 'en-US':
                  return import('./translations/en-GB.js');
                case 'en-PH':
                case 'en':
                  return import('./translations/en.js');
                case 'pl-PL':
                  return import('./translations/pl-PL.js');
                case 'pl':
                  return import('./translations/pl.js');
                default:
                  return import(`./translations/${locale}.js`);
              }
            },
          },
          ...super.localizeNamespaces,
        ];
      }
 
      // eslint-disable-next-line class-methods-use-this
      labelTemplate() {
        return html`
          <div class="form-field__label">
            <slot name="label"></slot>
            <slot name="_label-optional"></slot>
          </div>
        `;
      }
 
      firstUpdated(c) {
        super.firstUpdated(c);
        if (this.displayOptional) {
          this.__getDirectSlotChild('_label-optional').textContent = `(${localize.msg(
            'ing-field:optional',
          )})`;
        }
      }
    },
);
