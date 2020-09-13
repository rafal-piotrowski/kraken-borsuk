/* eslint-disable import/no-extraneous-dependencies */
import { css } from '@lion/core';
import { fontSize16 } from '../values/typography.js';
 
export const buttonUnstyledComponentStyle = css`
  .button-unstyled {
    font: inherit;
    font-size: ${fontSize16};
    margin: 0;
    border: 0;
    outline: 0;
    padding: 0;
    color: inherit;
    background-color: transparent;
    text-align: left;
    white-space: normal;
    overflow: visible;
 
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -webkit-tap-highlight-color: transparent;
  }
 
  /* prevents press effect on IE */
  .button-unstyled > * {
    position: relative;
  }
 
  .button-unstyled:active {
    background: none;
    outline: none;
    padding: 0;
  }
 
  .button-unstyled::-moz-focus-inner {
    border: 0;
  }
`;
