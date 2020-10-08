/* eslint-disable import/no-extraneous-dependencies */
import { css } from '@lion/core';
import {
  black15,
  black34,
  black6,
  black80,
  indigo,
  indigo15,
  indigo60,
  sky,
  sky60,
  white,
} from '../values/color.js';
import { spacer12, spacer4 } from '../values/spacing.js';
import { fontSize12, fontSize14 } from '../values/typography.js';

export const chipComponentStyle = css`
  /**
   * Unselected
   */

  /**
   * Initial
   */
  :host {
    display: inline-block;
    position: relative;
    box-sizing: border-box;
    height: 28px;
    background-color: ${white};
    border: 1px solid var(--graphic-border-color, ${black34});
    border-radius: 30px;
    margin-top: 6px;
    padding: ${spacer4} ${spacer12} ${spacer4} ${spacer12};
    line-height: 1;
    cursor: default;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }

  /**
   * Unselected hover
   */
  :host(:hover) {
    background-color: ${black15};
    border: 1px solid ${black34};
    box-shadow: none;
  }

  /**
   * Unselected focus
   */
  :host([focused]) {
    border-color: ${sky};
    box-shadow: 0 0 8px ${sky60}, 0 0 0 1px ${sky};
    outline: none;
  }

  /**
   * Unselected pressed
   */
  :host(:active) {
    background-color: ${black6};
    border: 1px solid ${black34};
    box-shadow: none;
  }

  /**
   * Selected
   */
  :host([checked]) {
    border-color: ${indigo};
    background-color: ${indigo15};
  }

  /**
   * Selected hover
   */
  :host(:hover[checked]) {
    background-color: ${indigo};
    box-shadow: none;
  }

  /**
   * Selected focussed
   */
  :host([focused][checked]) {
    box-shadow: 0 0 8px ${sky60}, 0 0 0 1px ${sky};
    outline: none;
  }

  /**
   * Selected pressed
   */
  :host(:active[checked]) {
    background-color: ${indigo60};
    box-shadow: none;
  }

  /**
   * Disabled
   */
  :host([disabled]) {
    pointer-events: none;
    background-color: transparent;
    border-color: ${black15};
  }

  :host([hidden]) {
    display: none;
  }

  /**
   * Slotted: label and input
   */

  ::slotted(input) {
    position: absolute;
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    overflow: hidden;
    white-space: nowrap;
    height: 1px;
    width: 1px;
  }

  ::slotted([slot='label']) {
    color: ${black80};
    font-size: ${fontSize14};
  }

  :host(:active) ::slotted([slot='label']),
  :host([checked]) ::slotted([slot='label']),
  :host([focused][checked]) ::slotted([slot='label']) {
    color: ${indigo};
  }

  :host(:hover[checked]) ::slotted([slot='label']),
  :host(:active[checked]) ::slotted([slot='label']) {
    color: ${white};
  }

  :host([disabled]) ::slotted([slot='label']) {
    color: ${black34};
  }

  /**
   * Icon
   */

  .icon {
    fill: ${indigo};
    font-size: ${fontSize12};
    margin-right: 4px;
  }

  :host(:hover[checked]) > .icon,
  :host(:active[checked]) > .icon {
    fill: ${white};
  }

  :host([disabled]) > .icon {
    fill: ${black34};
  }
`;
