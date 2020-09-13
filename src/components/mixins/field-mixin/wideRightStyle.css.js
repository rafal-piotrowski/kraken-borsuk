/* eslint-disable import/no-extraneous-dependencies */

import { css } from '@lion/core';
 
export const wideRightStyle = css`
  :host([layout='wide-right']) {
    display: flex;
    justify-content: center;
  }
 
  :host([layout='wide-right']) .form-field__group-one {
    flex: 1 1 50%;
    text-align: right;
    padding-top: 8px;
    margin-right: 12px;
  }
 
  :host([layout='wide-right']) .form-field__group-two {
    flex: 1 1 50%;
    margin-left: 12px;
  }
`;
