/* eslint-disable import/no-extraneous-dependencies */
import { localize as lionLocalize } from '@lion/localize';
/** @deprecated should throw an error instead of warning */
lionLocalize.__handleLanguageOnly = value => {
  // eslint-disable-next-line no-console
  console.warn(`
    Locale was set to ${value}.
    Language only locales are deprecated, please use the full language locale e.g. 'en-GB' instead of 'en'.
See https://github.com/ing-bank/lion/issues/187 for more information.
  `);
};
export { lionLocalize as localize };
 
export { setLocalize } from '@lion/localize';
export { LocalizeMixin } from '@lion/localize';
 
export {
  formatNumber,
  formatNumberToParts,
  getFractionDigits,
  getGroupSeparator,
  getDecimalSeparator,
} from '@lion/localize';
 
export { formatDate, parseDate, getDateFormatBasedOnLocale } from '@lion/localize';
export { formatAmountHtml, formatAmountHtmlString } from './formatAmountHtml.js';
export { formatPercentage } from './formatPercentage.js';
export { getMonthNames, getWeekdayNames } from '@lion/localize';
