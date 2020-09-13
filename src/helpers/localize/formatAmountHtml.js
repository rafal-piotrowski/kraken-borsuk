/* eslint-disable import/no-extraneous-dependencies */
import { directive, NodePart, isPrimitive } from '@lion/core';
import { formatNumberToParts, getFractionDigits } from '@lion/localize';
 
const decimalStyles = 'font-size:0.75em;vertical-align:text-top;line-height:1.5;';
 
/**
* Formats an amount so it displays the fractal value smaller and elevated
*
* @example
* formatAmountHtmlString(1999.9)
* // depending on locale
* // => EUR 1.999,<span style="font-size:0.75em;vertical-align:text-top;line-height:1.5;">90</span>
*
* @param {Number} value Amount to format
* @param {Object} formatOptions Intl Options
* @returns {String} Formatted amount as string with html
*/

export function formatAmountHtmlString(value, formatOptions) {
  const options = {
    style: 'currency',
    currency: 'EUR',
    currencyDisplay: 'code',
    ...formatOptions,
  };
  if (typeof options.minimumFractionDigits === 'undefined') {
    options.minimumFractionDigits = getFractionDigits(options.currency);
  }
  if (typeof options.maximumFractionDigits === 'undefined') {
    options.maximumFractionDigits = getFractionDigits(options.currency);
  }
 
  const parts = formatNumberToParts(value, options);
  let result = '';
  parts.forEach(part => {
    switch (part.type) {
      case 'fraction':
        result += `<span style="${decimalStyles}">${part.value}</span>`;
        break;
      case 'currency':
        result += `<span class="ing-amount--currency">${part.value}</span>`;
        break;
      default:
        result += part.value;
    }
  });
 
  return result;
}
 
const previousValues = new WeakMap();
 
/**
* Makes formatAmountString usable within lit-html. Implemenation based on unsafeHTML.
*
* @see {formatAmountHtmlString}
* @param {Number} value Amount to format
* @param {Object} formatOptions Intl Options
* @returns {import('lit-html').TemplateResult} Formatted amount to be used in lit-html
*/

export const formatAmountHtml = directive((value, formatOptions) => part => {
  if (!(part instanceof NodePart)) {
    throw new Error('formatAmountHtml can only be used in text bindings');
  }
 
  const previousValue = previousValues.get(part);
  if (
    previousValue !== undefined &&
    isPrimitive(value) &&
    value === previousValue.value &&
    part.value === previousValue.fragment
  ) {
    // don't do any work if the value did not change
    return;
  }
 
  const template = document.createElement('template');
  template.innerHTML = formatAmountHtmlString(value, formatOptions);
 
  const fragment = document.importNode(template.content, true);
  part.setValue(fragment);
  previousValues.set(part, { value, fragment });
});
