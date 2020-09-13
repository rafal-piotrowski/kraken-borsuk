/* eslint-disable import/no-extraneous-dependencies */

import { css } from '@lion/core';
import {
  orange,
  indigo,
  indigo15,
  sky,
  sky30,
  sky60,
  black15,
  black34,
  black54,
  black80,
  white,
} from '../../../styles/values/color.js';
import {
  font19BoldMixin,
  font16BoldMixin,
  font14BoldMixin,
  font12BoldMixin,
} from '../../../styles/mixins/typography.js';
import { focusRingMixin, focusRingInvertedMixin } from '../../../styles/mixins/focus-ring.js';
 
export const buttonStyle = css`
  :host {
    display: inline-block;
    background-color: transparent;
    outline: 0;
  }
 
  :host([font16]) {
    padding-top: 2px;
    padding-bottom: 2px;
  }
 
  :host([font14]) {
    padding-top: 4px;
    padding-bottom: 4px;
  }
 
  :host([font12]) {
    padding-top: 6px;
    padding-bottom: 6px;
  }
 
  :host([elevated]) .btn {
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.12), 0 6px 6px 0 rgba(0, 0, 0, 0.24);
  }
 
  .btn ::slotted(button) {
    position: absolute;
    visibility: hidden;
  }
 
  .click-area {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: -1px -1px;
    padding: 0;
  }
 
  :host([font16]) .click-area {
    margin-top: -3px;
    margin-bottom: -3px;
  }
 
  :host([font14]) .click-area {
    margin-top: -5px;
    margin-bottom: -5px;
  }
 
  :host([font12]) .click-area {
    margin-top: -7px;
    margin-bottom: -7px;
  }
 
  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
 
    ${font19BoldMixin()};
 
    border: 1px solid ${orange};
    border-radius: 8px;
    padding: 6px 15px 8px 15px;
 
    background-color: ${orange};
    color: ${white};
 
    position: relative;
  }
 
  :host([font16]) .btn {
    ${font16BoldMixin()};
    padding: 4px 11px 6px 11px;
  }
 
  :host([font14]) .btn {
    ${font14BoldMixin()};
    padding: 5px 9px;
  }
 
  :host([font12]) .btn {
    ${font12BoldMixin()};
    padding: 5px 7px;
  }
 
  :host([text][icon-only]) .btn ::slotted(*),
  .btn ::slotted([slot='icon-before']),
  .btn ::slotted([slot='icon-after']) {
    width: 24px;
    height: 24px;
  }
 
  :host([text][icon-only]) .btn {
    padding: 9px;
  }
 
  :host([text][icon-only]:hover) .btn {
    box-shadow: none;
  }
 
  .btn ::slotted([slot='icon-before']),
  .btn ::slotted([slot='icon-after']) {
    fill: ${white};
  }
 
  .btn ::slotted([slot='icon-before']) {
    margin-right: 8px;
  }
 
  .btn ::slotted([slot='icon-after']) {
    margin-left: 8px;
  }
 
  :host([text][icon-only][icon20]) .btn ::slotted(*),
  :host([font16]) .btn ::slotted([slot='icon-before']),
  :host([font16]) .btn ::slotted([slot='icon-after']) {
    width: 20px;
    height: 20px;
  }
 
  :host([text][icon-only][icon20]) .btn {
    padding: 7px;
  }
 
  :host([text][icon-only][icon20]) .click-area {
    margin: -3px;
  }
 
  :host([text][icon-only][icon16]) .btn ::slotted(*),
  :host([font14]) .btn ::slotted([slot='icon-before']),
  :host([font14]) .btn ::slotted([slot='icon-after']) {
    width: 16px;
    height: 16px;
  }
 
  :host([text][icon-only][icon16]) .btn {
    padding: 7px;
  }
 
  :host([text][icon-only][icon16]) .click-area {
    margin: -5px;
  }
 
  :host([indigo]) .btn {
    background-color: ${indigo};
    border-color: ${indigo};
  }
 
  :host([sky]) .btn {
    background-color: ${sky};
    border-color: ${sky};
  }
 
  :host([grey]) .btn {
    background-color: ${black15};
    border-color: ${black15};
    color: ${black80};
  }
 
  :host([inverted]) .btn {
    background-color: ${white};
    border-color: ${white};
    color: ${black80};
  }
 
  :host([inverted]) .btn ::slotted([slot='icon-before']),
  :host([inverted]) .btn ::slotted([slot='icon-after']) {
    fill: ${black80};
  }
 
  :host([grey]) .btn ::slotted([slot='icon-before']),
  :host([grey]) .btn ::slotted([slot='icon-after']) {
    fill: ${black80};
  }
 
  :host(:hover) .btn {
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.12), 0 8px 8px 0 rgba(0, 0, 0, 0.24);
  }
 
  :host([elevated]:focus) .btn {
    box-shadow: 0 0 8px #9fcaea, 0 0 0 1px #559bd1, 0 0 6px 0 rgba(0, 0, 0, 0.12),
      0 6px 6px 0 rgba(0, 0, 0, 0.24);
  }
 
  :host([elevated]:focus:hover) .btn,
  :host([elevated]:focus:active) .btn,
  :host([elevated]:focus[active]) .btn {
    box-shadow: 0 0 8px #9fcaea, 0 0 0 1px #559bd1, 0 0 12px 0 rgba(0, 0, 0, 0.12),
      0 12px 12px 0 rgba(0, 0, 0, 0.24);
  }
 
  :host([elevated]:hover) .btn,
  :host([elevated]:active) .btn,
  :host([elevated][active]) .btn {
    box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.12), 0 12px 12px 0 rgba(0, 0, 0, 0.24);
  }
 
  :host(:active:not([inverted])) .btn,
  :host([active]:not([inverted])) .btn {
    opacity: 0.8; /* should be color variant so text color stays the same */
  }
 
  :host([inverted]:active) .btn,
  :host([inverted][active]) .btn {
    background-color: ${black15};
    border-color: ${black15};
  }
 
  :host(:focus) .btn {
    ${focusRingMixin()};
    border-color: ${sky};
    border-radius: 8px;
  }
 
  :host(:hover:focus) .btn,
  :host(:active:focus) .btn,
  :host([active]:focus) .btn {
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.12), 0 8px 8px 0 rgba(0, 0, 0, 0.24), 0 0 8px ${sky60},
      0 0 0 1px ${sky};
  }
 
  :host([inverted]:focus) .btn {
    ${focusRingInvertedMixin()};
    border-color: ${sky30};
    border-radius: 8px;
  }
 
  :host([inverted]:hover:focus) .btn,
  :host([inverted]:active:focus) .btn,
  :host([inverted][active]:focus) .btn {
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.12), 0 8px 8px 0 rgba(0, 0, 0, 0.24), 0 0 8px ${sky30},
      0 0 0 1px ${sky30};
  }
 
  :host([text]) .btn {
    background-color: transparent;
    border-color: transparent;
    color: ${indigo};
  }
 
  :host([text]) .btn ::slotted([slot='icon-before']),
  :host([text]) .btn ::slotted([slot='icon-after']) {
    fill: ${indigo};
  }
 
  :host([text][grey]) .btn {
    color: ${black80};
  }
 
  :host([text][grey]) .btn ::slotted([slot='icon-before']),
  :host([text][grey]) .btn ::slotted([slot='icon-after']) {
    fill: ${black80};
  }
 
  :host([text][inverted]) .btn {
    background-color: transparent;
    border-color: transparent;
    color: ${white};
  }
 
  :host([text][inverted]) .btn ::slotted([slot='icon-before']),
  :host([text][inverted]) .btn ::slotted([slot='icon-after']) {
    fill: ${white};
  }
 
  :host([text]:hover) .btn {
    box-shadow: none;
    border-color: ${indigo};
  }
 
  :host([text][grey]:hover) .btn {
    border-color: ${black80};
  }
 
  :host([text][inverted]:hover) .btn {
    border-color: ${white};
  }
 
  :host([text]:active) .btn,
  :host([text][active]) .btn {
    opacity: 1;
    background-color: ${indigo15};
    border-color: ${indigo};
  }
 
  :host([text][grey]:active) .btn,
  :host([text][grey][active]) .btn {
    background-color: ${black15};
    border-color: ${black80};
  }
 
  :host([text][inverted]:active) .btn,
  :host([text][inverted][active]) .btn {
    opacity: 0.8;
    background-color: rgba(255, 255, 255, 0.2);
    border-color: ${white};
  }
 
  :host([text]:hover:focus) .btn,
  :host([text]:active:focus) .btn,
  :host([text][active]:focus) .btn {
    ${focusRingMixin()};
    border-color: ${sky};
    border-radius: 8px;
  }
 
  :host([text][inverted]:focus) .btn,
  :host([text][inverted]:hover:focus) .btn,
  :host([text][inverted]:active:focus) .btn,
  :host([text][inverted][active]:focus) .btn {
    ${focusRingInvertedMixin()};
    border-color: ${sky30};
    border-radius: 8px;
  }
 
  :host([outline]) .btn {
    background-color: transparent;
    color: ${orange};
  }
 
  :host([outline]) .btn ::slotted([slot='icon-before']),
  :host([outline]) .btn ::slotted([slot='icon-after']) {
    fill: ${orange};
  }
 
  :host([outline][indigo]) .btn {
    color: ${indigo};
  }
 
  :host([outline][indigo]) .btn ::slotted([slot='icon-before']),
  :host([outline][indigo]) .btn ::slotted([slot='icon-after']) {
    fill: ${indigo};
  }
 
  :host([outline][sky]) .btn {
    color: ${sky};
  }
 
  :host([outline][sky]) .btn ::slotted([slot='icon-before']),
  :host([outline][sky]) .btn ::slotted([slot='icon-after']) {
    fill: ${sky};
  }
 
  :host([outline][grey]) .btn {
    color: ${black54};
  }
 
  :host([outline][grey]) .btn ::slotted([slot='icon-before']),
  :host([outline][grey]) .btn ::slotted([slot='icon-after']) {
    fill: ${black54};
  }
 
  :host([outline][inverted]) .btn {
    color: ${white};
  }
 
  :host([outline][inverted]) .btn ::slotted([slot='icon-before']),
  :host([outline][inverted]) .btn ::slotted([slot='icon-after']) {
    fill: ${white};
  }
 
  :host([outline]:hover) .btn {
    box-shadow: none;
    background-color: ${orange};
    color: ${white};
  }
 
  :host([outline]:hover) .btn ::slotted([slot='icon-before']),
  :host([outline]:hover) .btn ::slotted([slot='icon-after']) {
    fill: ${white};
  }
 
  :host([outline][indigo]:hover) .btn {
    background-color: ${indigo};
  }
 
  :host([outline][sky]:hover) .btn {
    background-color: ${sky};
  }
 
  :host([outline][grey]:hover) .btn {
    background-color: ${black15};
    color: ${black80};
  }
 
  :host([outline][grey]:hover) .btn ::slotted([slot='icon-before']),
  :host([outline][grey]:hover) .btn ::slotted([slot='icon-after']) {
    fill: ${black80};
  }
 
  :host([outline][inverted]:hover) .btn {
    background-color: ${white};
    color: ${orange};
    border-color: ${white};
  }
 
  :host([outline][inverted]:hover) .btn ::slotted([slot='icon-before']),
  :host([outline][inverted]:hover) .btn ::slotted([slot='icon-after']) {
    fill: ${orange};
  }
 
  :host([outline][indigo][inverted]:hover) .btn {
    color: ${indigo};
  }
 
  :host([outline][indigo][inverted]:hover) .btn ::slotted([slot='icon-before']),
  :host([outline][indigo][inverted]:hover) .btn ::slotted([slot='icon-after']) {
    fill: ${indigo};
  }
 
  :host([outline][sky][inverted]:hover) .btn {
    color: ${sky};
  }
 
  :host([outline][sky][inverted]:hover) .btn ::slotted([slot='icon-before']),
  :host([outline][sky][inverted]:hover) .btn ::slotted([slot='icon-after']) {
    fill: ${sky};
  }
 
  :host([outline]:active) .btn,
  :host([outline][active]) .btn {
    background-color: ${orange};
    color: ${white};
    border-color: ${orange};
  }
 
  :host([outline]:active) .btn ::slotted([slot='icon-before']),
  :host([outline]:active) .btn ::slotted([slot='icon-after']),
  :host([outline][active]) .btn ::slotted([slot='icon-before']),
  :host([outline][active]) .btn ::slotted([slot='icon-after']) {
    fill: ${white};
  }
 
  :host([outline][indigo]:active) .btn,
  :host([outline][indigo][active]) .btn {
    background-color: ${indigo};
    border-color: ${indigo};
  }
 
  :host([outline][sky]:active) .btn,
  :host([outline][sky][active]) .btn {
    background-color: ${sky};
    border-color: ${sky};
  }
 
  :host([outline][grey]:active) .btn,
  :host([outline][grey][active]) .btn {
    background-color: ${black15};
    color: ${black80};
    border-color: ${black15};
  }
 
  :host([outline][grey]:active) .btn ::slotted([slot='icon-before']),
  :host([outline][grey]:active) .btn ::slotted([slot='icon-after']),
  :host([outline][grey][active]) .btn ::slotted([slot='icon-before']),
  :host([outline][grey][active]) .btn ::slotted([slot='icon-after']) {
    fill: ${black80};
  }
 
  :host([outline][inverted]:active) .btn,
  :host([outline][inverted][active]) .btn {
    opacity: 0.8;
    background-color: ${white};
    color: ${orange};
    border-color: ${white};
  }
 
  :host([outline][inverted]:active) .btn ::slotted([slot='icon-before']),
  :host([outline][inverted]:active) .btn ::slotted([slot='icon-after']),
  :host([outline][inverted][active]) .btn ::slotted([slot='icon-before']),
  :host([outline][inverted][active]) .btn ::slotted([slot='icon-after']) {
    fill: ${orange};
  }
 
  :host([outline][indigo][inverted]:active) .btn,
  :host([outline][indigo][inverted][active]) .btn {
    color: ${indigo};
  }
 
  :host([outline][indigo][inverted]:active) .btn ::slotted([slot='icon-before']),
  :host([outline][indigo][inverted]:active) .btn ::slotted([slot='icon-after']),
  :host([outline][indigo][inverted][active]) .btn ::slotted([slot='icon-before']),
  :host([outline][indigo][inverted][active]) .btn ::slotted([slot='icon-after']) {
    fill: ${indigo};
  }
 
  :host([outline][sky][inverted]:active) .btn,
  :host([outline][sky][inverted][active]) .btn {
    color: ${sky};
  }
 
  :host([outline][sky][inverted]:active) .btn ::slotted([slot='icon-before']),
  :host([outline][sky][inverted]:active) .btn ::slotted([slot='icon-after']),
  :host([outline][sky][inverted][active]) .btn ::slotted([slot='icon-before']),
  :host([outline][sky][inverted][active]) .btn ::slotted([slot='icon-after']) {
    fill: ${sky};
  }
 
  :host([outline]:hover:focus) .btn,
  :host([outline]:active:focus) .btn,
  :host([outline][active]:focus) .btn {
    ${focusRingMixin()};
    border-color: ${sky};
    border-radius: 8px;
  }
 
  :host([outline][inverted]:focus) .btn,
  :host([outline][inverted]:hover:focus) .btn,
  :host([outline][inverted]:active:focus) .btn,
  :host([outline][inverted][active]:focus) .btn {
    ${focusRingInvertedMixin()};
    border-color: ${sky30};
    border-radius: 8px;
  }
 
  :host([text][icon-only]) .btn {
    background-color: transparent;
    border-color: transparent;
    fill: ${orange};
  }
 
  :host([text][icon-only][grey]) .btn {
    fill: ${black54};
  }
 
  :host([text][icon-only][inverted]) .btn {
    fill: ${white};
  }
 
  :host([text][icon-only]:hover) .btn {
    border-color: ${orange};
    fill: ${orange};
  }
 
  :host([text][icon-only][grey]:hover) .btn {
    border-color: ${black54};
    fill: ${black54};
  }
 
  :host([text][icon-only][inverted]:hover) .btn {
    border-color: ${white};
    fill: ${white};
  }
 
  :host([text][icon-only]:active) .btn,
  :host([text][icon-only][active]) .btn {
    box-shadow: none;
    background-color: rgba(255, 98, 0, 0.15);
    border-color: ${orange};
    fill: ${orange};
  }
 
  :host([text][icon-only][grey]:active) .btn,
  :host([text][icon-only][grey][active]) .btn {
    opacity: 1;
    background-color: ${black15};
    border-color: ${black54};
    fill: ${black54};
  }
 
  :host([text][icon-only][inverted]:active) .btn,
  :host([text][icon-only][inverted][active]) .btn {
    box-shadow: none;
    background-color: rgba(255, 255, 255, 0.4);
    border-color: ${white};
    fill: ${white};
  }
 
  :host([text][icon-only]:hover:focus) .btn,
  :host([text][icon-only]:active:focus) .btn,
  :host([text][icon-only][active]:focus) .btn {
    ${focusRingMixin()};
    border-color: ${sky};
    border-radius: 8px;
  }
 
  :host([text][icon-only][inverted]:focus) .btn,
  :host([text][icon-only][inverted]:hover:focus) .btn,
  :host([text][icon-only][inverted]:active:focus) .btn,
  :host([text][icon-only][inverted][active]:focus) .btn {
    ${focusRingInvertedMixin()};
    border-color: ${sky30};
    border-radius: 8px;
  }
 
  :host([disabled]) {
    pointer-events: none;
  }
 
  :host([disabled]) .btn {
    background-color: transparent;
  }
 
  :host([disabled]:not([inverted])) .btn {
    color: ${black15};
    border-color: ${black34};
  }
 
  :host([disabled][inverted]) .btn {
    color: rgba(255, 255, 255, 0.4);
    border-color: rgba(255, 255, 255, 0.4);
  }
 
  :host([disabled][icon-only]:not([inverted])) .btn,
  :host([disabled]:not([inverted])) .btn ::slotted([slot='icon-before']),
  :host([disabled]:not([inverted])) .btn ::slotted([slot='icon-after']) {
    fill: ${black15};
  }
 
  :host([disabled][icon-only][inverted]) .btn,
  :host([disabled][inverted]) .btn ::slotted([slot='icon-before']),
  :host([disabled][inverted]) .btn ::slotted([slot='icon-after']) {
    fill: rgba(255, 255, 255, 0.4);
  }
 
  :host([text][disabled]) .btn {
    border-color: transparent;
  }
`;
