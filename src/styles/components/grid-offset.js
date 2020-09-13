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
import { columns } from '../values/grid.js';
import { breakpoints } from '../values/breakpoints.js';
import {
  mediaBreakpointUpGenerator,
  mediaBreakpointInfixNameGenerator,
} from '../generators/breakpoints.js';
import { loopColumnsMixin } from '../mixins/grid.js';
 
/* eslint-disable indent */
 
export const gridOffsetComponentStyle = unsafeCSS(`
  ${Array.from(breakpoints)
    .map(([bp]) => {
      const infix = mediaBreakpointInfixNameGenerator({ bp, breakpoints });
      return mediaBreakpointUpGenerator({
        name: bp,
        breakpoints,
        contentFn: () => `
      ${loopColumnsMixin({
        start: 0,
        end: columns - 1,
        contentFn: colNr => `
        .offset${infix}-${colNr} {
          margin-left: ${colNr === 0 ? 0 : (colNr / columns) * 100}%
        }
        `,
      })}
    `,
      });
    })
    .join('')}
`);
