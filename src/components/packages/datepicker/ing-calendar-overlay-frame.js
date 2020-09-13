/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */

import { css, unsafeCSS } from '@lion/core';
import { IngDialogFrame } from '../../../helpers/ing-web/packages/dialog/IngDialogFrame.js';
import { breakpoint600 } from '../../../helpers/ing-web/style/values/breakpoints.js';
import { spacer4 } from '../../../helpers/ing-web/style/values/spacing.js';
import { font19BoldMixin } from '../../../helpers/ing-web/style/mixins/typography.js';
 
/**
* Note this is a private web component, not intended to be exported on its own.
*
* @customElement
* @extends {LionCalendarOverlayFrame}
*/
export class IngCalendarOverlayFrame extends IngDialogFrame {
  static get styles() {
    return [
      super.styles,
      css`
        .dialog-frame__container {
          width: 100%;
          max-width: 480px;
          height: 400px;
        }
 
        .dialog-frame__header-content {
          ${font19BoldMixin()}
        }
 
        .dialog-frame__content {
          padding: ${spacer4} 0;
        }
 
        .dialog-frame__content > ::slotted(*) {
          margin: 0 auto;
        }
 
        /**
        /* dialog-frame is fullscreen till max-width: 780px,
        /* the calendar-overlay-frame should be fullscreen till max-width: 600px
         */
        @media (min-width: ${unsafeCSS(breakpoint600)}px) {
          .dialog-frame:not(.dialog-frame--simple) .dialog-frame__wrapper,
          .dialog-frame:not(.dialog-frame--simple) .dialog-frame__wrapper .dialog-frame__container {
            width: 100%;
            height: 400px;
            max-width: 480px;
            max-height: 400px;
            border-radius: 4px;
          }
 
          .dialog-frame:not(.dialog-frame--simple) .dialog-frame__header {
            border-radius: 4px 4px 0 0;
          }
        }
      `,
    ];
  }
}
 
customElements.define('ing-calendar-overlay-frame', IngCalendarOverlayFrame);
