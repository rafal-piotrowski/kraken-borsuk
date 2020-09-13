/* eslint-disable import/no-extraneous-dependencies */

import { css } from '@lion/core';
 
export const wideLayoutStyle = css`
  :host([layout^='wide-']) {
    display: flex;
    justify-content: center;
  }
 
  :host([layout^='wide-']) .form-field__group-one {
    width: 288px;
    flex: none;
    padding-top: 8px;
    margin-right: 12px;
  }
 
  :host([layout='wide-right']) .form-field__group-one {
    text-align: right;
  }
 
  :host([layout='wide-left']) .form-field__group-one {
    text-align: left;
  }
 
  :host([layout^='wide-']) .form-field__group-two {
    flex: auto;
    margin-left: 12px;
  }
`;
