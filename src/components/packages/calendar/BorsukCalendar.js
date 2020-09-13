/* eslint-disable import/no-extraneous-dependencies */

import { LionCalendar } from '@lion/calendar';
import { html, ScopedElementsMixin } from '@lion/core';
import { IngButton } from '../button/IngButton.js';
import { IngIcon } from '../icon/ing-icon.js';
import { IngTooltip } from '../tooltip/IngTooltip.js';
import { BorsukCalendarStyle } from './BorsukCalendarStyle.js';
 
export class BorsukCalendar extends ScopedElementsMixin(LionCalendar) {
  static get scopedElements() {
    return {
      ...super.scopedElements,
      'ing-tooltip': IngTooltip,
      'ing-button': IngButton,
      'ing-icon': IngIcon,
    };
  }
 
  constructor() {
    super();
    this.firstDayOfWeek = 1;
  }
 
  static get styles() {
    return [super.styles || [], BorsukCalendarStyle];
  }
 
  __renderPreviousButton(type, previousMonth, previousYear) {
    const { disabled, month } = this.__getPreviousDisabled(type, previousMonth, previousYear);
    const previousButtonTitle = this.__getNavigationLabel('previous', type, month, previousYear);
    function clickDateDelegation() {
      if (type === 'FullYear') {
        this.goToPreviousYear();
      } else {
        this.goToPreviousMonth();
      }
    }
 
    return html`
      <ing-tooltip .popperConfig=${{ placement: 'bottom' }}>
        <ing-button
          slot="invoker"
          text
          icon-only
          icon20
          class="calendar__previous-button"
          @click=${clickDateDelegation}
          ?disabled=${disabled}
          aria-label="${previousButtonTitle}"
        >
          <ing-icon icon-id="borsuk:filledin-arrows:arrowLeft"> ${this.calendarHeading} </ing-icon>
        </ing-button>
        <div slot="content" class="tooltip">${previousButtonTitle}</div>
      </ing-tooltip>
    `;
  }
 
  __renderNextButton(type, nextMonth, nextYear) {
    const { disabled, month } = this.__getNextDisabled(type, nextMonth, nextYear);
    const nextButtonTitle = this.__getNavigationLabel('next', type, month, nextYear);
    function clickDateDelegation() {
      if (type === 'FullYear') {
        this.goToNextYear();
      } else {
        this.goToNextMonth();
      }
    }
 
    return html`
      <ing-tooltip .popperConfig=${{ placement: 'bottom' }}>
        <ing-button
          slot="invoker"
          text
          icon-only
          icon20
          class="calendar__next-button"
          @click=${clickDateDelegation}
          ?disabled=${disabled}
          aria-label="${nextButtonTitle}"
        >
          <ing-icon icon-id="borsuk:filledin-arrows:arrowRight"> ${this.calendarHeading} </ing-icon>
        </ing-button>
        <div slot="content" class="tooltip">${nextButtonTitle}</div>
      </ing-tooltip>
    `;
  }
}
