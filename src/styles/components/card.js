/* eslint-disable import/no-extraneous-dependencies */
import { css, unsafeCSS } from '@lion/core';
import { white } from '../values/color.js';
import { spacer4, spacer16, spacer24 } from '../values/spacing.js';
import { breakpoint720 } from '../values/breakpoints.js';
import { elevation2Mixin } from '../mixins/elevation.js';
 
export const cardComponentStyle = css`
  .card {
    ${elevation2Mixin()}
    display: flex;
    flex-direction: column;
    background-color: ${white};
    border-radius: 0;
    margin-bottom: ${spacer16};
  }
 
  .card__img-bg {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: inherit;
  }
 
  .card--img-bottom .card__img-bg,
  .card--img-top .card__img-bg {
    min-height: 120px;
  }
 
  .card--img-left .card__img-bg,
  .card--img-right .card__img-bg {
    min-width: 50%;
  }
 
  .card__content {
    padding: ${spacer16};
  }
 
  .card--img-left,
  .card--img-right {
    flex-direction: row;
  }
 
  @media (min-width: 480px) {
    .card {
      border-radius: ${spacer4};
    }
 
    .card--img-top .card__img-bg {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
 
    .card--img-bottom .card__img-bg {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
 
    .card--img-left .card__img-bg {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
 
    .card--img-right .card__img-bg {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
 
  @media (min-width: ${unsafeCSS(breakpoint720)}px) {
    .card__content {
      padding: ${spacer24};
    }
  }
`;
