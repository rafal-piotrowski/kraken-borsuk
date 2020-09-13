/* eslint-disable import/no-extraneous-dependencies */
import { css } from '@lion/core';
import { spacer8, spacer2 } from '../values/spacing.js';
import { white, black34, black15, sky, black80 } from '../values/color.js';
import { lineHeight24 } from '../values/typography.js';
 
export const radioCheckboxComponentStyle = css`
  :host {
    display: flex;
    position: relative;
    align-items: flex-start;
    margin: ${spacer8} 0;
 }

  .choice-field__graphic-container {
   position: relative;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    border: 1px solid var(--graphic-border-color, ${black34});
    pointer-events: none;
    background-color: ${white};
    margin-top: ${spacer2};
    margin-right: ${spacer8};
    box-shadow: inset 0 2px 2px ${black15};
  }
 
  :host([focused]) .choice-field__graphic-container {
    outline: none;
    border: 1px solid ${sky};
    box-shadow: inset 0 2px 2px ${black15}, 0 0 8px ${sky};
  }
 
  :host(.state-disabled) {
    pointer-events: none;
  }
 
  :host(.state-disabled) .choice-field__graphic-container {
    outline: none;
    border: 1px solid ${black15};
    color: ${black34};
    box-shadow: none;
  }
 
  :host(.state-disabled) ::slotted(label) {
    color: ${black34};
  }
 
  ::slotted(.form-control) {
    /**
     * Make the whole background clickable (since we can't wrap the input in a label: it needs
     * to be a slot="label" and be able to contain html)
     */
    position: absolute;
    opacity: 0;
    width: 100%;
    height: 100%;
    box-sizing: content-box;
    margin: 0;
    cursor: pointer;
    top: 0px;
  }
 
  :host .choice-field__label {
    line-height: ${lineHeight24};
    color: ${black80};
  }
`;
