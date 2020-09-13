/* eslint-disable import/no-extraneous-dependencies */
import { css } from '@lion/core';
 
export const linkUnstyledComponentStyle = css`
  a.link-unstyled,
  a.link-unstyled:visited,
  a.link-unstyled:hover,
  a.link-unstyled:visited:hover,
  a.link-unstyled:active,
  a.link-unstyled:visited:active {
    border: 0;
    color: inherit;
    outline: none;
    box-shadow: none;
    background-color: inherit;
    text-decoration: none;
  }
`;
