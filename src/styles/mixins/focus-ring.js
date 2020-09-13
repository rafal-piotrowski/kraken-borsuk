/* eslint-disable import/no-extraneous-dependencies */
import { css } from '@lion/core';
import { sky60, sky, sky30 } from '../values/color.js';
 
export const focusRingMixin = ({ borderRadius = css`4px` } = {}) => css`
  border-radius: ${borderRadius};
  box-shadow: 0 0 8px ${sky60}, 0 0 0 1px ${sky};
`;
 
export const focusRingInvertedMixin = ({ borderRadius = css`4px` } = {}) => css`
  border-radius: ${borderRadius};
  box-shadow: 0 0 8px ${sky30}, 0 0 0 1px ${sky30};
`;
