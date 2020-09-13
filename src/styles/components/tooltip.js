/* eslint-disable import/no-extraneous-dependencies */
import { css } from '@lion/core';
import { black54, white } from '../values/color.js';
import { fontSize14 } from '../values/typography.js';
 
export const tooltipComponentStyle = css`
 .tooltip {
    display: block;
    font-size: ${fontSize14};
    color: ${white};
    background-color: ${black54};
    border-radius: 4px;
    padding: 2px 8px;
  }
`;
