/* eslint-disable import/no-extraneous-dependencies */
import { css } from '@lion/core';
import {
  fontFamily,
  fontSize36,
  fontSize32,
  fontSize28,
  fontSize24,
  fontSize19,
  fontSize16,
  fontSize14,
  fontSize12,
  lineHeight48,
  lineHeight40,
  lineHeight36,
  lineHeight32,
  lineHeight28,
  lineHeight24,
  lineHeight20,
  lineHeight16,
} from '../values/typography.js';
 
export const fontFamilyMixin = ({ fontFamily: _fontFamily = fontFamily } = {}) => css`
  font-family: ${_fontFamily};
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;
 
const fontMixin = ({
  fontFamily: _fontFamily,
  fontSize: _fontSize = fontSize16,
  lineHeight: _lineHeight = lineHeight36,
  fontWeight: _fontWeight = css`normal`,
} = {}) => css`
  ${fontFamilyMixin({ fontFamily: _fontFamily })}
  font-size: ${_fontSize};
  line-height: ${_lineHeight};
  font-weight: ${_fontWeight};
`;
 
export const font36Mixin = options =>
  fontMixin({
    fontSize: fontSize36,
    lineHeight: lineHeight48,
    ...options,
  });
 
export const font36BoldMixin = options =>
  font36Mixin({
    fontWeight: css`bold`,
    ...options,
  });
 
export const font32Mixin = options =>
  fontMixin({
    fontSize: fontSize32,
    lineHeight: lineHeight40,
    ...options,
  });
 
export const font32BoldMixin = options =>
  font32Mixin({
    fontWeight: css`bold`,
    ...options,
  });
 
export const font28Mixin = options =>
  fontMixin({
    fontSize: fontSize28,
    lineHeight: lineHeight36,
    ...options,
  });
 
export const font28BoldMixin = options =>
  font28Mixin({
    fontWeight: css`bold`,
    ...options,
  });
 
export const font24Mixin = options =>
  fontMixin({
    fontSize: fontSize24,
    lineHeight: lineHeight32,
    ...options,
  });
 
export const font24BoldMixin = options =>
  font24Mixin({
    fontWeight: css`bold`,
    ...options,
  });
 
export const font19Mixin = options =>
  fontMixin({
    fontSize: fontSize19,
    lineHeight: lineHeight28,
    ...options,
  });
 
export const font19BoldMixin = options =>
  font19Mixin({
    fontWeight: css`bold`,
    ...options,
  });
 
export const font16Mixin = options =>
  fontMixin({
    fontSize: fontSize16,
    lineHeight: lineHeight24,
    ...options,
  });
 
export const font16BoldMixin = options =>
  font16Mixin({
    fontWeight: css`bold`,
    ...options,
  });
 
export const font14Mixin = options =>
  fontMixin({
    fontSize: fontSize14,
    lineHeight: lineHeight20,
    ...options,
  });
 
export const font14BoldMixin = options =>
  font14Mixin({
    fontWeight: css`bold`,
    ...options,
  });
 
export const font12Mixin = options =>
  fontMixin({
    fontSize: fontSize12,
    lineHeight: lineHeight16,
    ...options,
  });
 
export const font12BoldMixin = options =>
  font12Mixin({
    fontWeight: css`bold`,
    ...options,
  });
