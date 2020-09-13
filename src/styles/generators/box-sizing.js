/* eslint-disable import/no-extraneous-dependencies */
import { css } from '@lion/core';
 
/**
* Generator to drop box-sizing: border-box; into a selector,
* also include selector in ::before and ::after pseudo elements.
*
* Change from `box-sizing: content-box` so that `width` is not affected by `padding` or `border`.
* Usually this is applied to the * selector but in web components we must add it for each element
* so we do not affect other components with the general * selector
*
* @example
* borderBoxSizingGenerator(css`button`);
* // Results in css:
* // button,
* // button::before,
* // button::after {
* //  box-sizing: border-box;
* // }
*
* @param {string} selector css selector
* @returns {string} styles
*/
export const borderBoxSizingGenerator = selector => css`
  ${selector},
  ${selector}::before,
  ${selector}::after {
    box-sizing: border-box;
  }
`;
