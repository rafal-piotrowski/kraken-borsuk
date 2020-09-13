/* eslint-disable import/no-extraneous-dependencies */
import { css } from '@lion/core';
import { black15, black80, orange } from '../values/color.js';
import { spacer8, spacer24 } from '../values/spacing.js';
import { font19BoldMixin, font16BoldMixin, font16Mixin } from '../mixins/typography.js';
import { borderBoxSizingGenerator } from '../generators/box-sizing.js';

export const tableComponentStyle = css`
  ${borderBoxSizingGenerator(css`table`)}
  ${borderBoxSizingGenerator(css`caption`)}
  ${borderBoxSizingGenerator(css`th`)}
  ${borderBoxSizingGenerator(css`td`)}
 
  .table {
    border-collapse: collapse;
    text-align: right;
  }
 
  .table caption {
    ${font19BoldMixin()}
    padding-top: 0;
    padding-bottom: ${spacer24};
    color: ${orange};
    text-align: left;
    caption-side: top;
  }
 
  .table tr {
    border-bottom: 1px solid ${black15};
  }
 
  .table thead > tr {
    border-bottom: 1px solid ${orange};
  }
 
  .table thead > tr > :first-child,
  .table tbody > tr > :first-child,
  .table tfoot > tr > :first-child {
    text-align: left;
  }
 
  .table th {
    ${font16BoldMixin()}
    color: ${black80};
    text-align: inherit;
  }
 
  .table td {
    ${font16Mixin()}
    color: ${black80};
  }
 
  .table th,
  .table td {
    padding: ${spacer8} ${spacer24} ${spacer8} 0;
  }
`;
