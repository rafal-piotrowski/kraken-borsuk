/**
* Tooling for helping create sanitized media queries
*/
 
const getScreenSize = (bpName, breakpointsMap) =>
  breakpointsMap ? breakpointsMap.get(bpName) : '';
const logicalConcat = item => item && ` and ${item}`;
const addConstraints = (...constraints) =>
  constraints.reduce((acc, cur) => (acc && cur && acc + logicalConcat(cur)) || cur || acc, '');
 
const validateInvertedQuery = ({ invert, mediaType }) => {
  if (invert && !mediaType) {
    throw new Error('Inverting a Media query needs a media Type');
  }
};
 
const validateBreakpoints = ({ from, until, breakpoints }) => {
  if (
    (from && !getScreenSize(from, breakpoints)) ||
    (until && !getScreenSize(until, breakpoints))
  ) {
    throw new Error('Breakpoint not found');
  }
};
 
const validateMandatoryAttr = ({ breakpoints, contentFn }) => {
  if (!breakpoints || !contentFn) {
    throw new Error('Mandatory attributes not found');
  }
};
 
const validate = (params, ...rules) => rules.forEach(fn => fn(params));
 
/**
* @param options {Object} media query options
* @param options.invert {Boolean} default to false.
*        If true it will invert query's meaning, by applying the 'not' operator
* @param options.from {String} From this breakpoint (inclusive) (min-width)
* @param options.until {String} until that breakpoint (exclusive) (max-width)
* @param options.customDirective {String} custom directive like 'orientation: landscape' to be
* included
* @param options.mediaType {String} media to be affected ie: screen , print, etc
* @param options.breakpoints {Map} an object Map containing name size, key values.
* @param options.contentFn {Function}  properties to been apply inside a media query
*/
export const mediaQueryGenerator = ({
  breakpoints,
  invert = false,
  from = '',
  until = '',
  customDirective = '',
  mediaType = null,
  contentFn,
} = {}) => {
  validate(
    {
      breakpoints,
      invert,
      from,
      until,
      mediaType,
      contentFn,
    },
    validateInvertedQuery,
    validateBreakpoints,
    validateMandatoryAttr,
  );
 
  const invertedQuery = (invert && mediaType && 'not ') || '';
  const media = `@media ${invertedQuery}`;
  const maxWidth = until && `(max-width: ${getScreenSize(until, breakpoints)}px)`;
  const minWidth = from && `(min-width: ${getScreenSize(from, breakpoints)}px)`;
  const constraints = addConstraints(mediaType, minWidth, maxWidth, customDirective);
 
  return `${media}${constraints}{${contentFn()}}`;
};
