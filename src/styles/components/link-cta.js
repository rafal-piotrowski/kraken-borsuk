/* eslint-disable import/no-extraneous-dependencies */
import { css } from '@lion/core';
import { font19BoldMixin, font24BoldMixin } from '../mixins/typography.js';
import { indigo, orange, sky, white } from '../values/color.js';
import { spacer2 } from '../values/spacing.js';
 
export const linkCTAComponentStyle = css`
  .link-cta {
    text-decoration: none;
    ${font19BoldMixin()};
    border: 1px solid transparent;
    line-height: 32px;
  }
 
  .link-cta span {
    border-bottom: 2px solid;
    padding: ${spacer2} 0;
    transition: padding-bottom 0.1s ease-in-out;
    line-height: 24px;
    display: inline-block;
  }
 
  .link-cta--font24 {
    ${font24BoldMixin()};
  }
 
  .link-cta--orange {
    color: ${orange};
  }
  .link-cta--indigo {
    color: ${indigo};
  }
  .link-cta--white {
    color: ${white};
  }
  .link-cta--orange span {
    border-color: ${orange};
  }
  .link-cta--indigo span {
    border-color: ${indigo};
  }
  .link-cta--white span {
    border-color: ${white};
  }
 
  .link-cta:hover span {
    padding-bottom: 0;
  }
 
  .link-cta:active span {
    border-bottom: 0;
  }
 
  /* Not using focusRingMixin because this one has different color and shadow settings */
  .link-cta:focus {
    border: 1px solid ${sky};
    box-shadow: 0 0 8px 0 ${sky};
    outline: none;
  }
 
  .link-cta--white:focus {
    border: 1px solid ${white};
    box-shadow: 0 0 8px 0 ${white};
  }
`;
