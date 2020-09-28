/* eslint-disable no-unused-vars */

import { LitElement, html, css } from 'lit-element';

export const BorsukSelectStyle = css`

        /************************
        {block} .form-field
         ********************/
        .input-group__container > .input-group__input ::slotted(.form-control) {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath style='fill: %23333333;' d='M0 4l7.292 7.69c.195.207.452.31.708.31a.972.972 0 0 0 .708-.31L16 4H0z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-color: white;
          background-position: right 16px top 8px;
          background-size: 16px 22px;
          padding: 8px 44px 8px 12px;
        }

        .input-group__container > .input-group__input ::slotted(.form-control)::-ms-expand {
          display: none; /* hide the default arrow in ie10 and ie11 */
        }

        :host([disabled]) .input-group__container > .input-group__input ::slotted(.form-control) {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath style='fill: %23adadad;' d='M0 4l7.292 7.69c.195.207.452.31.708.31a.972.972 0 0 0 .708-.31L16 4H0z'/%3E%3C/svg%3E");
        }
`;
