/* eslint-disable import/no-extraneous-dependencies */

import { css, unsafeCSS } from '@lion/core';
import { tooltipComponentStyle } from '../../../styles/components/tooltip.js';
import { font19BoldMixin, font24BoldMixin } from '../../../styles/mixins/typography.js';
import { breakpoint600 } from '../../../styles/values/breakpoints.js';
import { black15, black80, fuchsia, indigo, orange, sky, white } from '../../../styles/values/color.js';
import { spacer16, spacer32 } from '../../../styles/values/spacing.js';
 
const dialogOuterSpacer = 32;
const dialogBreakpoint = breakpoint600;
const dialogMaxWidth = dialogBreakpoint;
const dialogHeaderHeight = 64;
const dialogHeaderHorizontalSpacer = 16;
const dialogHeaderButtonVerticalSpacer = 20;
const dialogHeaderButtonHorizontalSpacer = dialogHeaderHorizontalSpacer;
const dialogHeaderButtonHeight = dialogHeaderHeight - 2 * dialogHeaderButtonVerticalSpacer;
const dialogHeaderButtonWidth = dialogHeaderButtonHeight;
const dialogHeaderFont19Dimensions = 40;
const dialogHeaderFont19Spacer = 6;
 
export const ingDialogFrameComponentStyle = css`
  ${tooltipComponentStyle}
 
  .dialog-frame {
    position: relative;
    display: flex;
    flex-direction: column;
 
    max-width: ${unsafeCSS(dialogMaxWidth)}px;
    max-height: calc(100vh - 2 * ${unsafeCSS(dialogOuterSpacer)}px);
 
    background-color: ${white};
    border-radius: 4px;
    box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.12), 0 16px 16px 0 rgba(0, 0, 0, 0.24);
    /* For a11y we focus the dialog on opening. This prevents blinking on touch devices. */
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: transparent;
  }
 
  /* wrapper is needed for IE11 */
  .dialog-frame__wrapper {
    display: flex; /* fixes content scroll */
    flex-direction: column; /* prevents max-width issues introduced by this wrapper */
  }
 
  .dialog-frame__header-container {
    border-bottom: 1px solid transparent;
  }
 
  .dialog-frame__header {
    display: flex;
    flex-shrink: 0;
 
    width: 100%;
    min-height: 64px;
 
    border-radius: 4px 4px 0 0;
    background-color: ${orange};
  }
 
  :host([top-bar-color='indigo']) .dialog-frame__header {
    background-color: ${indigo};
  }
 
  :host([top-bar-color='sky']) .dialog-frame__header {
    background-color: ${sky};
  }
 
  :host([top-bar-color='fuchsia']) .dialog-frame__header {
    background-color: ${fuchsia};
  }
 
  :host([top-bar-color='white']) .dialog-frame__header {
    background-color: ${white};
  }
 
  :host([top-bar-color='white'][has-scroll-borders]) .dialog-frame__header-container,
  :host([_has-header-after][has-scroll-borders]) .dialog-frame__header-container,
  :host([_top-bar-border-bottom]) .dialog-frame__header-container {
    border-bottom: 1px solid ${black15};
  }
 
  :host([top-bar-color='white']) .dialog-frame__header-content {
    color: ${black80};
  }
 
  .dialog-frame__header-content {
    ${font24BoldMixin()}
    flex-grow: 1;
    text-align: center;
    margin: ${unsafeCSS(dialogHeaderHorizontalSpacer)}px 0;
    color: ${white};
  }
 
  .dialog-frame__header-button-placeholder {
    width: ${unsafeCSS(dialogHeaderButtonWidth + 2 * dialogHeaderButtonHorizontalSpacer)}px;
    height: ${unsafeCSS(dialogHeaderButtonHeight + 2 * dialogHeaderButtonVerticalSpacer)}px;
  }
 
  .dialog-frame__header-button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${unsafeCSS(dialogHeaderButtonWidth + 2 * dialogHeaderButtonHorizontalSpacer)}px;
    height: ${unsafeCSS(dialogHeaderButtonHeight + 2 * dialogHeaderButtonVerticalSpacer)}px;
  }
 
  .dialog-frame__header-content--no-buttons {
    padding-left: ${unsafeCSS(dialogHeaderHorizontalSpacer)}px;
    padding-right: ${unsafeCSS(dialogHeaderHorizontalSpacer)}px;
  }
 
  /* header font19 */
  :host([top-bar-size='font19']) .dialog-frame__header {
    min-height: ${unsafeCSS(dialogHeaderFont19Dimensions)}px;
  }
 
  :host([top-bar-size='font19']) .dialog-frame__header-content {
    ${font19BoldMixin()}
    margin-top: ${unsafeCSS(dialogHeaderFont19Spacer)}px;
    margin-bottom: ${unsafeCSS(dialogHeaderFont19Spacer)}px;
  }
 
  :host([top-bar-size='font19']) .dialog-frame__header-button-placeholder {
    width: ${unsafeCSS(dialogHeaderFont19Dimensions + dialogHeaderFont19Spacer)}px;
    height: ${unsafeCSS(dialogHeaderFont19Dimensions)}px;
  }
 
  :host([top-bar-size='font19']) .dialog-frame__header-button-container {
    width: ${unsafeCSS(dialogHeaderFont19Dimensions)}px;
    height: ${unsafeCSS(dialogHeaderFont19Dimensions)}px;
  }
 
  :host([top-bar-size='font19']) .dialog-frame__header-button-container-back {
    margin-right: ${unsafeCSS(dialogHeaderFont19Spacer)}px;
  }
 
  :host([top-bar-size='font19']) .dialog-frame__header-button-container-close {
    margin-left: ${unsafeCSS(dialogHeaderFont19Spacer)}px;
  }
 
  .dialog-frame__content {
    /* main is not supported by IE11, so we need to make a block element explicitly */
    display: block;
    height: 100%;
    overflow-y: auto;
    padding: ${spacer16};
  }
 
  :host([no-padding]) .dialog-frame__content,
  :host([no-padding]) .dialog-frame__footer {
    padding: 0;
  }
 
  .dialog-frame__footer {
    position: relative;
    padding: ${spacer16};
    box-sizing: border-box;
    margin-top: auto;
    flex-shrink: 0;
    border-top: 1px solid transparent;
  }
 
  :host([has-scroll-borders]) .dialog-frame__footer {
    border-top: 1px solid ${black15};
  }
 
  :host([scrolled-to-bottom]) .dialog-frame__footer {
    border-top: 1px solid transparent;
  }
 
  @media (max-height: ${unsafeCSS(dialogBreakpoint)}px) {
    .dialog-frame:not(.dialog-frame--simple) {
      max-height: calc(100vh - ${unsafeCSS(2 * dialogOuterSpacer)}px);
    }
  }
 
  @media (max-width: ${unsafeCSS(dialogBreakpoint)}px) {
    :host,
    .dialog-frame__wrapper {
      width: 100%;
      height: 100%;
    }
 
    .dialog-frame:not(.dialog-frame--simple) {
      width: 100%;
      height: 100%;
      max-width: 100%;
      max-height: 100%;
      border-radius: 0;
    }
 
    .dialog-frame:not(.dialog-frame--simple) .dialog-frame__header {
      border-radius: 0;
    }
  }
 
  @media (max-width: ${unsafeCSS(dialogBreakpoint + 2 * dialogOuterSpacer)}px) {
    .dialog-frame.dialog-frame--simple {
      max-width: calc(100% - ${unsafeCSS(2 * dialogOuterSpacer)}px);
      margin: auto;
    }
  }
 
  :host([bottom-sheet]) .dialog-frame {
    height: auto;
    max-height: calc(100% - ${spacer32});
    width: 100vw;
    max-width: none;
    margin-top: auto;
  }
`;
