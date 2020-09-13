/**
* Media of at least the minimum breakpoint width. No query for the smallest breakpoint.
* @param {Object} options - options param.
* @param {Map} options.name breakpoint name (600, 720 etc.)
* @param {Map} options.breakpoints map that holds breakpoint sizes
* @param {Function} options.contentFn css output function with column number as input
* @returns {String} unique outcome of contentFn
*/
// eslint-disable-next-line no-shadow
export const mediaBreakpointUpGenerator = ({ name, breakpoints, contentFn }) => {
    const min = breakpoints.get(name) || null;
    return min
      ? `
      @media (min-width: ${min}px) {
        ${contentFn()}
      }`
      : contentFn();
  };
  
  /**
  * Media of at least the minimum breakpoints, preventing similar content from being outputted twice.
  * @param {Object} options - options param.
  * @param {Map} options.dedupableMap map holding potentially double values, breakpoint names as keys
  * @param {Map} options.breakpoints map that holds breakpoint sizes
  * @param {Function} options.contentFn css output function with column number as input
  * @returns {String} deduped outcome of contentFn
  */
  // eslint-disable-next-line no-shadow
  
  export const mediaBreakpointsUpDedupeGenerator = ({ dedupableMap, breakpoints, contentFn }) => {
    const handled = new Set();
    return Array.from(dedupableMap)
      .map(([bp]) => {
        if (!handled.has(dedupableMap.get(bp))) {
          handled.add(dedupableMap.get(bp));
          return mediaBreakpointUpGenerator({
            name: bp,
            breakpoints,
            contentFn: () => contentFn(bp),
          });
        }
        return '';
      })
      .join('');
  };
  
  /* TODO: Remove this helper once deprecated breakpoints are removed. Can simply use a one-liner then. */
  /**
  * Helper function that returns the proper infix name for a breakpoint
  * @param {String} bp - breakpoint
  * @param {Map} breakpoints - list of existing breakpoints
  * @param {Object} excludeRegex - excludes renaming for [xxs, xs, s, m, l, xl, xxl, xxxl]
  * @returns {String} infix
  */
  
  export const mediaBreakpointInfixNameGenerator = ({ bp, breakpoints, excludeRegex = /[sml]/ }) => {
    let bpName = `\\@${bp}`;
    if (excludeRegex.test(bp)) {
      bpName = bp;
    }
    return breakpoints.get(bp) ? `-${bpName}` : '';
  };
