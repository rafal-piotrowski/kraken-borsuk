/**
* Helper function that creates array of increasing numbers between start and end values
* @param {Object} options - options param.
* @param {Number} options.start start number in array
* @param {Number} options.end end number in array
* @returns {Array} array of integers from start to end values
*/
const createNumArray = (start = 0, end) => {
    const result = [];
    for (let i = start; i <= end; i += 1) {
      result.push(i);
    }
    return result;
  };
  
  /**
  * Loops over column numbers from start to end value, end exectutes a content function
  * with the column number as input
  * @param {Number} start start number in loop
  * @param {Number} end end number in loop
  * @param {Function} contentFn css output function with column number as input
  * @return {String} css result outputted by contentFn
  */
  
  export const loopColumnsMixin = ({ start = 0, end, contentFn }) =>
    createNumArray(start, end)
      .map(colNr => contentFn(colNr))
      .join('');
