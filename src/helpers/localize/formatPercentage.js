/* eslint-disable import/no-extraneous-dependencies */
import { formatNumber, localize } from '@lion/localize';
 
/**
* Gets the locale to use
*
* @param {string} locale Locale to override browser locale
* @returns {string}
*/
function getLocale(locale) {
  if (locale) {
    return locale;
  }
  if (localize && localize.locale) {
    return localize.locale;
  }
  return 'en-GB';
}
 
/**
* Formats a percentage based on locale. It uses formatNumber for the formatting.
*
* @param {number} number Number to be formatted
* @param {Object} options Intl options are available extended by roundMode
* @returns {*} Formatted number
*/

export function formatPercentage(number, options) {
  const locale = getLocale(options && options.locale);
  const minimumFractionDigits =
    options && !(options.minimumFractionDigits === undefined) ? options.minimumFractionDigits : 2;
  const maximumFractionDigits =
    options && !(options.maximumFractionDigits === undefined) ? options.maximumFractionDigits : 18;
 
  return formatNumber(Number(number / 100), {
    locale,
    style: 'percent',
    minimumFractionDigits,
    maximumFractionDigits,
  });
}
