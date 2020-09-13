/* eslint-disable import/no-extraneous-dependencies */
import { css } from '@lion/core';
import { indigo, indigo15, fuchsia, fuchsia15 } from '../values/color.js';
import { focusRingMixin } from '../mixins/focus-ring.js';
 
export const linkComponentStyle = css`
  .link {
    text-decoration: none;
    border-bottom: 1px solid ${indigo};
    color: ${indigo};
  }
 
  .link:visited {
    color: ${fuchsia};
    border-bottom-color: ${fuchsia};
  }
 
  .link:focus,
  .link:visited:focus {
    ${focusRingMixin()}
    outline: none;
    border-bottom-color: transparent;
  }
 
  .link:hover {
    background-color: ${indigo15};
  }
 
  .link:visited:hover {
    background-color: ${fuchsia15};
  }
 
  .link:active {
    color: ${indigo};
    border-bottom-color: transparent;
    background-color: transparent;
  }
 
  .link:visited:active {
    color: ${fuchsia};
    border-bottom-color: transparent;
    background-color: transparent;
  }
`;
