/* eslint-disable import/no-extraneous-dependencies */
import { css } from '@lion/core';
 
export const screenReaderOnlyMixin = () => css`
  position: absolute;
  top: 0;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(100%);
  clip: rect(1px, 1px, 1px, 1px);
  white-space: nowrap;
  border: 0;
  margin: 0;
  padding: 0;
`;
