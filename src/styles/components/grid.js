/* eslint-disable import/no-extraneous-dependencies */
/**
The MIT License (MIT)
 
Copyright (c) 2011-2018 Twitter, Inc.
Copyright (c) 2011-2018 The Bootstrap Authors
 
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
 
The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.
 
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
import { unsafeCSS } from '@lion/core';
import { containerMaxWidths, gutterWidths, columns } from '../values/grid.js';
import { breakpoints } from '../values/breakpoints.js';
import { borderBoxSizingGenerator } from '../generators/box-sizing.js';
import {
  mediaBreakpointUpGenerator,
  mediaBreakpointsUpDedupeGenerator,
  mediaBreakpointInfixNameGenerator,
} from '../generators/breakpoints.js';
import { loopColumnsMixin } from '../mixins/grid.js';
 
const infixCache = []; // Temp variable for filtering duplicate entries during deprecation phase
 
/** eslint-disable indent */
export const gridComponentStyle = unsafeCSS(`
  ${['.container', '.container-fluid', '.row', '.col', '[class^="col-"]']
    .map(selector => borderBoxSizingGenerator(unsafeCSS(selector)).cssText)
    .join('')}
 
  .container {
    width: 100%;
    margin-right: auto;
    margin-left: auto;
  }
 
  ${mediaBreakpointsUpDedupeGenerator({
    dedupableMap: gutterWidths,
    breakpoints,
    contentFn: bp => `
  .container {
    padding-right: ${gutterWidths.get(bp)}px;
    padding-left: ${gutterWidths.get(bp)}px;
  }`,
  })}
 
  ${Array.from(containerMaxWidths)
    .map(([bp]) =>
      mediaBreakpointUpGenerator({
        name: bp,
        breakpoints,
        contentFn: () => `
  .container {
    max-width: ${containerMaxWidths.get(bp)}px;
  }`,
      }),
    )
    .join('')}
 
  .container-fluid {
    width: 100%;
    margin-right: auto;
    margin-left: auto;
  }
 
  ${mediaBreakpointsUpDedupeGenerator({
    dedupableMap: gutterWidths,
    breakpoints,
    contentFn: bp => `
  .container-fluid {
    padding-right: ${gutterWidths.get(bp)}px;
    padding-left: ${gutterWidths.get(bp)}px;
  }`,
  })}
 
  .row {
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
  }
 
  ${mediaBreakpointsUpDedupeGenerator({
    dedupableMap: gutterWidths,
    breakpoints,
    contentFn: bp => `
  .row {
    margin-right: -${gutterWidths.get(bp) / 2}px;
    margin-left: -${gutterWidths.get(bp) / 2}px;
  }`,
  })}
 
  .no-gutters {
    margin-right: 0;
    margin-left: 0;
  }
 
  .no-gutters > .col, .no-gutters > [class^="col-"] {
    padding-right: 0;
    padding-left: 0;
  }
 
  .col, [class^="col-"] {
    position: relative;
    width: 100%;
    min-height: 1px;
  }
 
  ${mediaBreakpointsUpDedupeGenerator({
    dedupableMap: gutterWidths,
    breakpoints,
    contentFn: bp => `
  .col, [class^="col-"] {
    padding-right: ${gutterWidths.get(bp) / 2}px;
    padding-left: ${gutterWidths.get(bp) / 2}px
  }`,
  })}
 
  ${Array.from(breakpoints)
    .map(([bp]) => {
      const infix = mediaBreakpointInfixNameGenerator({ bp, breakpoints });
      if (infixCache.includes(infix)) {
        return ''; // filters out duplicates. TODO: delete once deprecated breakpoints are removed.
      }
      infixCache.push(infix);
 
      return mediaBreakpointUpGenerator({
        name: bp,
        breakpoints,
        contentFn: () => `
      .col${infix} {
        -ms-flex-preferred-size: 0;
        flex-basis: 0;
        -ms-flex-positive: 1;
        flex-grow: 1;
        max-width: 100%;
      }
 
      .col${infix}-auto {
        -ms-flex: 0 0 auto;
        flex: 0 0 auto;
        width: auto;
        max-width: none;
      }
 
      ${loopColumnsMixin({
        start: 1,
        end: columns,
        contentFn: colNr => `
        .col${infix}-${colNr} {
          -ms-flex: 0 0 ${(colNr / columns) * 100}%;
          flex: 0 0 ${(colNr / columns) * 100}%;
          max-width: ${(colNr / columns) * 100}%;
        }
        `,
      })}
 
    `,
      });
    })
    .join('')}
`);
