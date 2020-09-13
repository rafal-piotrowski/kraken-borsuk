/* eslint-disable import/no-extraneous-dependencies */

import { css } from '@lion/core';
import { white, black80, black59, black34, black6, indigo } from '../../../styles/values/color.js';
import { tooltipComponentStyle } from '../../../styles/components/tooltip.js';
import { focusRingMixin } from '../../../styles/mixins/focus-ring.js';
import { font16Mixin, font16BoldMixin } from '../../../styles/mixins/typography.js';
 
export const BorsukCalendarStyle = css`
  ${tooltipComponentStyle}
 
  :host {
    display: block;
    min-width: 288px;
    max-width: 424px;
    min-height: 388px;
    padding-right: 4px;
    padding-left: 4px;
  }
 
  .calendar {
    display: block;
  }
 
  .calendar__navigation {
    border-bottom: none;
    margin-top: 8px;
    padding: 0;
  }
 
  .calendar__navigation__month,
  .calendar__navigation__year {
    display: flex;
    align-items: center;
    justify-content: start;
    /* padding-bottom: 18px; 24 - 6 (ing-button bottom) */
  }
 
  .calendar__navigation-heading {
    ${font16BoldMixin()};
    color: ${black80};
    display: flex;
    justify-content: space-between;
    margin: 0 4px;
  }
 
  .calendar__grid {
    width: 100%;
    border: none;
    border-spacing: 0;
    border-collapse: collapse;
  }
 
  .calendar__grid tr[role='row'] {
    border-radius: 4px;
    border-bottom: 2px solid white;
  }
 
  .calendar__weekday-header {
    height: 40px;
    ${font16BoldMixin()};
    color: ${black80};
  }
 
  .calendar__day-cell {
    width: 40px;
    /* padding: 0; */
  }
 
  .calendar__day-cell[current-month] {
    background-clip: padding-box;
    background-color: ${black6};
  }
 
  .calendar__day-cell[current-month][first-day],
  .calendar__day-cell[current-month][start-of-first-full-week] {
    border-top-left-radius: 4px;
  }
 
  .calendar__day-cell[current-month][end-of-first-week] {
    border-top-right-radius: 4px;
  }
 
  .calendar__day-cell[current-month][start-of-last-week] {
    border-bottom-left-radius: 4px;
  }
 
  .calendar__day-cell[current-month][end-of-last-full-week],
  .calendar__day-cell[current-month][last-day] {
    border-bottom-right-radius: 4px;
  }
 
  .calendar__day-button[previous-month],
  .calendar__day-button[next-month] {
    color: ${black80};
  }
 
  .calendar__day-button {
    ${font16BoldMixin()};
    display: block;
    width: 40px;
    height: 40px;
    background-color: transparent;
    color: ${black80};
    border-radius: 4px;
    margin: auto;
    padding: 0;
  }
 
  .calendar__day-button[today] {
    text-decoration: none;
  }
 
  .calendar__day-button .calendar__day-button__text {
    pointer-events: none;
  }
 
  .calendar__day-button[today] .calendar__day-button__text {
    display: inline-block;
    min-width: 24px;
    text-decoration: none;
    border: 1px solid ${black80};
    border-radius: 50%;
    padding: 4px;
  }
 
  .calendar__day-button:hover {
    border: transparent;
  }
 
  .calendar__day-button:focus {
    outline: none;
    ${focusRingMixin()};
  }
 
  .calendar__day-button::-moz-focus-inner {
    border: 0;
  }
 
  .calendar__day-button[disabled] {
    ${font16Mixin()};
    background-color: transparent;
    color: ${black59};
  }
 
  .calendar__day-button[disabled][today] {
    background-color: transparent;
    border: 1px solid ${black34};
  }
 
  .calendar__day-button[selected] {
    background-color: ${indigo};
    color: ${white};
  }
 
  .calendar__day-button[selected][today] .calendar__day-button__text {
    border-color: ${white};
  }
 
  /* IE11 fix to prevent clicks */
  button[disabled] {
    pointer-events: none;
  }
`;
