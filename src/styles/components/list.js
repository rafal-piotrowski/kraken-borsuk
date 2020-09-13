/* eslint-disable import/no-extraneous-dependencies */
import { css, unsafeCSS } from '@lion/core';
import { orange, black15, black54, black80 } from '../values/color.js';
import { spacer20 } from '../values/spacing.js';
import { linkComponentStyle } from './link.js';
import { font19Mixin, font16Mixin, font14Mixin } from '../mixins/typography.js';
 
const calculateSpec = spec => ({
  listLeft: css`
    ${unsafeCSS(spec.bulletBefore + spec.bulletSize + spec.bulletAfter)}px
  `,
  itemLeft: css`-${unsafeCSS(spec.bulletSize + spec.bulletAfter)}px`,
  bulletSize: css`
    ${unsafeCSS(spec.bulletSize)}px
  `,
  bulletTop: css`
    ${unsafeCSS(spec.lineHeight / 2 - spec.bulletSize / 2)}px
  `,
  bulletColor: spec.bulletColor,
  gapAboveOnce: css`
    ${unsafeCSS(spec.gapAboveOnce)}px
  `,
  gapBelowEach: css`
    ${unsafeCSS(spec.gapBelowEach)}px
  `,
});
 
const size16Spec = {
  bulletBefore: 24,
  bulletSize: 5,
  bulletAfter: 16,
  lineHeight: 24,
  gapAboveOnce: 0,
  gapBelowEach: 8,
  bulletColor: orange,
};
const size16NestedSpec = {
  ...size16Spec,
  bulletBefore: 0,
  bulletColor: black54,
  gapAboveOnce: 12,
};
const size19Spec = {
  ...size16Spec,
  bulletSize: 6,
  lineHeight: 28,
};
const size14Spec = {
  ...size16Spec,
  bulletSize: 4,
  lineHeight: 20,
};
 
const size16 = calculateSpec(size16Spec);
const size16Nested = calculateSpec(size16NestedSpec);
const size19 = calculateSpec(size19Spec);
const size19Nested = calculateSpec({
  ...size16NestedSpec,
  ...size19Spec,
  gapAboveOnce: 16,
  gapBelowEach: 16,
});
const size14 = calculateSpec(size14Spec);
const size14Nested = calculateSpec({
  ...size16NestedSpec,
  ...size14Spec,
  gapAboveOnce: 16,
  gapBelowEach: 16,
});
 
const listSizeGenerator = ({ selector, size, sizeNested, fontSizeMixin }) => css`
  ${selector} {
    padding-left: ${size.listLeft};
  }
 
  ${selector.cssText.indexOf('--') === -1 ? css`` : selector} .list__item {
    ${fontSizeMixin()}
    margin-bottom: ${size.gapBelowEach};
  }
 
  ${selector.cssText.indexOf('--') === -1 ? css`` : selector} .list__item::before {
    width: ${size.bulletSize};
    height: ${size.bulletSize};
    margin-top: ${size.bulletTop};
    margin-left: ${size.itemLeft};
  }
 
  ${selector.cssText.indexOf('--') === -1 ? css`` : selector} .list--nested {
    margin-top: ${sizeNested.gapAboveOnce};
  }
`;
 
export const listComponentStyle = css`
  ${linkComponentStyle}
  /**
   * Default size
   */
  ${listSizeGenerator({
    selector: css`.list`,
    size: size16,
    sizeNested: size16Nested,
    fontSizeMixin: font16Mixin,
  })}
 
  /**
   * 14px size
   */
  ${listSizeGenerator({
    selector: css`.list--font14`,
    size: size14,
    sizeNested: size14Nested,
    fontSizeMixin: font14Mixin,
  })}
 
  /**
   * 19px size
   */
  ${listSizeGenerator({
    selector: css`.list--font19`,
    size: size19,
    sizeNested: size19Nested,
    fontSizeMixin: font19Mixin,
  })}
 
  .list {
    box-sizing: content-box;
    display: block;
    float: none;
    list-style: none;
  }
 
  .list__item {
    display: list-item;
  }
 
  .list--nested {
    padding-left: ${size16Nested.listLeft};
  }
 
  .list--bullet > .list__item::before {
    display: block;
    content: " ";
    position: absolute;
    background: ${size16.bulletColor};
  }
 
  .list--bullet.list--nested > .list__item::before {
    background: ${size16Nested.bulletColor};
  }
 
  .list--ordered {
    counter-reset: list__item;
  }
 
  .list--ordered > .list__item {
    list-style: none;
    counter-increment: list__item;
  }
 
  .list--ordered > .list__item::before {
    display: inline-block;
    width: ${spacer20};
    content: counter(list__item)".";
    color: ${black80};
    font-weight: bold;
    text-align: right;
    margin-top: 0;
    margin-right: 10px;
    margin-left: -30px;
  }
 
  .list--link {
    padding-left: 20px;
  }
 
  .list--link > .list__item > ing-link {
    --link-color: ${black80};
    --link-color--hover: ${black15};
  }
 
  .list--link.list--font14 > .list__item > ing-link {
    --link-icon-margin-right: 4px;
  }
 
  .list--link.list--font19 > .list__item > ing-link {
    --link-icon-size: 20px;
  }
`;
