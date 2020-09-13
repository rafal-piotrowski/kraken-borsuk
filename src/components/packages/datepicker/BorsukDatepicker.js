/* eslint-disable getter-return */
/* eslint-disable consistent-return */
/* eslint-disable import/order */
/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */

import { LionInputDatepicker } from '@lion/input-datepicker';
import { html, ifDefined, ScopedElementsMixin } from '@lion/core';
import { BorsukDatepickerStyle } from './BorsukDatepickerStyle.js';
import { borsukCalendar, borsukPlusSign } from '../../../icons/icons.js';

import { localize } from '../../../helpers/localize/localize.js';
import { BorsukCalendar } from '../calendar/BorsukCalendar.js';
import { IngFieldMixin } from '../../mixins/field-mixin/IngFieldMixin.js';

import { IngIcon } from '../icon/ing-icon.js';
import { BorsukCalendarOverlayFrame } from './borsuk-calendar-overlay-frame.js';

export class BorsukDatepicker extends ScopedElementsMixin(IngFieldMixin(LionInputDatepicker)) {
  static get scopedElements() {
    return {
      ...super.scopedElements,
      'borsuk-calendar-overlay-frame': BorsukCalendarOverlayFrame,
      'ing-icon': IngIcon,
      'borsuk-calendar': BorsukCalendar,
    };
  }

  static get localizeNamespaces() {
    return [
      {
        'ing-input-date': locale => {
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
 
  connectedCallback() {
    // eslint-disable-next-line wc/guard-super-call
    super.connectedCallback();
    const datepickerIconEl = this._overlayInvokerNode.querySelector('.invoker-icon');
    datepickerIconEl.style.width = '24px';
    datepickerIconEl.style.height = '24px';
  }
 
  onLocaleUpdated() {
    super.onLocaleUpdated();
    if (!this.__isUserProvidedLabel) {
      this.label = localize.msg('ing-input-date:label');
    }
  }
 
  // eslint-disable-next-line class-methods-use-this
  _invokerTemplate() {
    return html`
      <button
        type="button"
        id="${this.__invokerId}"
        aria-haspopup="dialog"
        aria-expanded="false"
        aria-label="${this.msgLit('lion-input-datepicker:openDatepickerLabel')}"
        title="${this.msgLit('lion-input-datepicker:openDatepickerLabel')}"
        @click="${this.__openCalendarOverlay}"
      >
        <ing-icon icon-id="borsuk:filledin-functionalities:calendar" class="invoker-icon"></ing-icon>
      </button>
    `;
  }
 
  // eslint-disable-next-line class-methods-use-this
  _overlayTemplate() {
    return html`
      <borsuk-calendar-overlay-frame
        class="calendar__overlay-frame"
        has-close-button
        top-bar-color="white"
      >
        <span slot="header">${this.calendarHeading}</span>
        ${this._calendarTemplate()}
      </borsuk-calendar-overlay-frame>
    `;
  }
 
  // eslint-disable-next-line class-methods-use-this
  _calendarTemplate() {
    return html`
      <borsuk-calendar
        slot="content"
        .selectedDate="${this.constructor.__getSyncDownValue(this.modelValue)}"
        .minDate="${this.__calendarMinDate}"
        .maxDate="${this.__calendarMaxDate}"
        .disableDates="${ifDefined(this.__calendarDisableDates)}"
        @user-selected-date-changed="${this._onCalendarUserSelectedChanged}"
      ></borsuk-calendar>
    `;
  }
 
  get _calendarNode() {
    return this._overlayCtrl.contentNode.querySelector('[slot="content"]');
  }

  get _overlayContentNode() {
    if (this._cachedOverlayContentNode) {
      return this._cachedOverlayContentNode;
    }
    this._cachedOverlayContentNode = this.shadowRoot.querySelector('.calendar__overlay-frame');
    return this._cachedOverlayContentNode;
  }
}
