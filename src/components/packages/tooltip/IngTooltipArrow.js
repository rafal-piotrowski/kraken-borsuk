/* eslint-disable import/no-extraneous-dependencies */

import { css, html } from '@lion/core';
import { LionTooltip } from '@lion/tooltip';
import { black54 } from '../../../styles/style.js';
 
export class IngTooltipArrow extends LionTooltip {
  static get styles() {
    return [
      super.styles,
      css`
        :host {
          --tooltip-arrow-width: 16px;
          --tooltip-arrow-height: 8px;
          fill: ${black54};
        }
      `,
    ];
  }
 
  render() {
    return html`
      <svg viewBox="0 0 16 8">
        <path
          d="M16,0 L10.0166133,7.01721836 C8.90530216,8.32531955 7.09884797,8.32694781 5.98407499,7.0218636 C5.98248447,7.01884255 5.98090672,7.01584578 5.97934072,7.01287286 L0,0"
        ></path>
      </svg>
    `;
  }
}
