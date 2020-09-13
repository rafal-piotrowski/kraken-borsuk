/* eslint-disable import/no-extraneous-dependencies */

import { classMap, html, ScopedElementsMixin } from '@lion/core';
import { LocalizeMixin } from '@lion/localize';
import { arrowLeft, menuClose } from '../../../icons/ing-icons/icons.js';
import { IngButton } from '../button/IngButton.js';
import { IngIcon } from '../icon/ing-icon.js';
import { IngTooltip } from '../tooltip/IngTooltip.js';
import { IngDialogFrameSimple } from './IngDialogFrameSimple.js';
 
const validTopBarSizes = ['font19', 'font24'];
 
export class IngDialogFrame extends ScopedElementsMixin(LocalizeMixin(IngDialogFrameSimple)) {
  static get scopedElements() {
    return {
      ...super.scopedElements,
      'ing-button': IngButton,
      'ing-icon': IngIcon,
      'ing-tooltip': IngTooltip,
    };
  }

  static get properties() {
    return {
      ...super.properties,
      /* Whether a close button should be displayed. */
      hasCloseButton: {
        type: Boolean,
        attribute: 'has-close-button',
      },
      /* Whether a back button should be displayed. */
      hasBackButton: {
        type: Boolean,
        attribute: 'has-back-button',
      },
      /* Whether a header should be displayed. */
      _hasHeader: {
        type: Boolean,
      },
      _hasHeaderAfter: {
        type: Boolean,
        attribute: 'has-header-after',
        reflect: true,
      },
      /* Whether a footer should be displayed. */
      _hasFooter: {
        type: Boolean,
      },
      /* Background-color top bar. */
      topBarColor: {
        type: String,
        attribute: 'top-bar-color',
        reflect: true,
      },
      /* Size of top bar. */
      topBarSize: {
        type: String, // font19 || font24
        attribute: 'top-bar-size',
        reflect: true,
      },
      /** Currently only used by account-select */
      _topBarBorderBottom: {
        type: Boolean,
        attribute: '_top-bar-border-bottom',
        reflect: true,
      },
    };
  }
 
  static get localizeNamespaces() {
    return [
      {
        'ing-dialog-frame': locale => {
          // This verbose and explicit notation is unfortunately required for Polymer build, that
          // doesn't handle dynamic strings as imports
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
 
  render() {
    return html`
      <div class="dialog-frame__wrapper">
        <div class="dialog-frame" role="document">
          ${this._headerTemplate()}
 
          <div class="dialog-frame__content">
            ${this._contentTemplate()}
          </div>
 
          ${this._footerTemplate()}
        </div>
      </div>
    `;
  }
 
  set topBarSize(value) {
    if (validTopBarSizes.includes(value)) {
      this.__topBarSize = value;
      this.requestUpdate();
    } else {
      throw new Error("Please provide a valid top bar size, valid values are 'font19' & 'font24'.");
    }
  }
 
  get topBarSize() {
    return this.__topBarSize;
  }
 
  connectedCallback() {
    super.connectedCallback();
    this._hasHeader = !!this.querySelector('[slot=header]');
    this._hasHeaderAfter = !!this.querySelector('[slot=header-after]');
    this._hasFooter = !!this.querySelector('[slot=footer]');
 
    if (!this.getAttribute('role')) {
      this.setAttribute('role', 'dialog');
    }
    if (!this.getAttribute('aria-modal')) {
      this.setAttribute('aria-modal', 'true');
    }
 
    if (!this.getAttribute('aria-labelledby') && this._hasHeader) {
      this.setAttribute('aria-labelledby', this.id || `headerLabel-${this._uniqueID}`);
    }
    if (!this.getAttribute('aria-describedby')) {
      this.setAttribute('aria-describedby', `dialogContent-${this._uniqueID}`);
    }
  }
 
  firstUpdated() {
    super.firstUpdated();
    // For a11y, to link to aria-describedby on host element
    const headerSlot = this.shadowRoot.querySelector('slot[name="header"]');
    if (headerSlot) {
      headerSlot.addEventListener('slotchange', () => {
        const lightSlot = this.querySelector('[slot="header"]');
        lightSlot.id = lightSlot.id || `headerLabel-${this._uniqueID}`;
      });
    }
 
    // TODO: A better approach would be the other way around (add classes in the extension layer)
    this._frameNode.classList.remove('dialog-frame--simple');
  }
 
  _headerTemplate() {
    const contentClass = classMap({
      'dialog-frame__header-content': true,
      'dialog-frame__header-content--no-buttons': !this.hasBackButton && !this.hasCloseButton,
    });
    return !this._hasHeader
      ? html``
      : html`
          <div class="dialog-frame__header-container">
            <div class="dialog-frame__header" id="header">
              ${this.hasBackButton
                ? this._backButtonTemplate()
                : this._headerButtonPlaceholderTemplate()}
              <h1 class="${contentClass}"><slot name="header"></slot></h1>
              ${this.hasCloseButton
                ? this._closeButtonTemplate()
                : this._headerButtonPlaceholderTemplate()}
            </div>
          </div>
        `;
  }

  _headerAfterTemplate() {
    return !this._hasHeaderAfter ? html`` : html`<slot name="header-after"></slot>`;
  }
 
  _footerTemplate() {
    return !this._hasFooter
      ? html``
      : html`
          <div class="dialog-frame__footer">
            <slot name="footer"></slot>
          </div>
        `;
  }
 
  _headerButtonPlaceholderTemplate() {
    // only use placeholder if at least one of 2 buttons is displayed
    if (this.hasBackButton || this.hasCloseButton) {
      return html`
        <div class="dialog-frame__header-button-placeholder"></div>
      `;
    }
    // or if no buttons are displayed then styles will work as expected without placeholders
    // and give more space to the header title
    return html``;
  }
 
  _backButtonTemplate() {
    return html`
      <div class="dialog-frame__header-button-container dialog-frame__header-button-container-back">
        <ing-tooltip .popperConfig=${{ placement: 'bottom' }}>
          <ing-button
            slot="invoker"
            text
            icon-only
            ?icon20=${this.__topBarSize === 'font19'}
            ?inverted=${this.topBarColor !== 'white'}
            class="dialog-frame__header-button"
            aria-label="${this.msgLit('ing-dialog-frame:button_back')}"
            @click="${() => this.dispatchEvent(new Event('back'))}"
          >
            <ing-icon class="dialog-frame__header-button-icon" .svg=${arrowLeft}></ing-icon>
          </ing-button>
          <div slot="content" class="tooltip">${this.msgLit('ing-dialog-frame:button_back')}</div>
        </ing-tooltip>
      </div>
    `;
  }
 
  _closeButtonTemplate() {
    return html`
     <div
        class="dialog-frame__header-button-container  dialog-frame__header-button-container-close"
      >
        <ing-tooltip .popperConfig=${{ placement: 'bottom' }}>
          <ing-button
            slot="invoker"
            text
            icon-only
            ?icon20=${this.__topBarSize === 'font19'}
            ?inverted=${this.topBarColor !== 'white'}
            class="dialog-frame__header-button"
            aria-label="${this.msgLit('ing-dialog-frame:button_close')}"
            @click="${() => this.dispatchEvent(new Event('close-overlay'))}"
          >
            <ing-icon class="dialog-frame__header-button-icon" .svg=${menuClose}
              icon-id="borsuk:outline-characters:cross"></ing-icon>
          </ing-button>
          <div slot="content" class="tooltip">${this.msgLit('ing-dialog-frame:button_close')}</div>
        </ing-tooltip>
      </div>
    `;
  }
}
