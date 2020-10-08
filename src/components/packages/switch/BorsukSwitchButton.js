/* eslint-disable import/no-extraneous-dependencies */
import { css } from '@lion/core';
import { LionSwitchButton } from '@lion/switch';

import {
  white,
  black6,
  black15,
  black59,
  sky,
  sky60,
  leaf,
  leaf30,
} from '../../../styles/values/color.js';

const thumbSize = css`20px`;

export class BorsukSwitchButton extends LionSwitchButton {
  static get styles() {
    return [
      super.styles,
      css`
        :host {
          height: 40px;
        }
        .btn {
          position: relative;
          top: 10px;
          height: 20px;
          background: transparent;
        }

        .switch-button__track {
          position: relative;
          top: 2px;
          background: ${black6};
          border: 1px solid ${black59};
          height: 16px;
          padding: 2px 0;
          border-radius: 10px;
          box-sizing: border-box;
          transition: border-color 300ms cubic-bezier(0.4, 0, 0.2, 1),
            background 300ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .switch-button__thumb {
          background: ${white};
          border: 1px solid ${black59};
          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12),
            0 1px 5px 0 rgba(0, 0, 0, 0.2);
          width: ${thumbSize};
          height: ${thumbSize};
          left: 0px;
          border-radius: 10px;
          box-sizing: border-box;

          transition: border-color 300ms cubic-bezier(0.4, 0, 0.2, 1),
            box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1), left 300ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        :host(:focus) .btn {
          outline: none;
        }

        :host(:focus) .switch-button__thumb {
          border: 1px solid ${sky};
          box-shadow: 0 0 8px ${sky60};
        }

        :host(:hover) .btn {
          background: transparent;
        }

        :host(:active) .btn,
        :host([active]) .btn {
          background: transparent;
        }

        :host([checked]) .switch-button__track {
          border: 1px solid ${leaf};
          background: ${leaf};
        }

        :host([checked]) .switch-button__thumb {
          right: auto;
          left: calc(100% - ${thumbSize});
        }

        :host([disabled]) .switch-button__track {
          border: 1px solid ${black15};
          background: ${black6};
        }

        :host([disabled][checked]) .switch-button__track {
          border: 1px solid ${leaf30};
          background: ${leaf30};
        }

        :host([disabled]) .switch-button__thumb {
          border: 1px solid ${black15};
          box-shadow: none;
        }

        :host(:focus:not([disabled])) .switch-button__thumb {
          outline: 0;
        }
      `,
    ];
  }
}
