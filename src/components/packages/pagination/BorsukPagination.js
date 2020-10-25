/* eslint-disable import/no-extraneous-dependencies */
import { css, html, LitElement, ScopedElementsMixin } from '@lion/core';
import { LocalizeMixin } from '@lion/localize';
import { IngIcon } from '../icon/ing-icon.js';
import { focusRingMixin } from '../../../styles/mixins/focus-ring.js';
import { font16Mixin, font19BoldMixin } from '../../../styles/mixins/typography.js';
import { black15, orange } from '../../../styles/values/color.js';

export const installMediaQueryWatcher = (mediaQuery, callback) => {
  const watchmedia = window.matchMedia(mediaQuery);

  window.addEventListener('resize', () => {
    callback(watchmedia.matches);
  });
  callback(watchmedia.matches);
};

export class BorsukPagination extends ScopedElementsMixin(LocalizeMixin(LitElement)) {
  static get scopedElements() {
    return {
      'ing-icon': IngIcon,
    };
  }

  static get properties() {
    return {
      current: {
        type: Number,
        reflect: true,
      },
      count: {
        type: Number,
        reflect: true,
      },
      _isMobile: {
        type: Boolean,
      },
    };
  }

  static get localizeNamespaces() {
    return [
      {
        'ing-pagination': locale => {
            switch (locale) {
                case 'de-DE':
                    return import('./translations/de-DE.js');
                case 'de':
                    return import('./translations/de.js');
                case 'en-GB':
                    return import('./translations/en-GB.js');
                case 'en-US':
                    return import('./translations/en-GB.js');
                case 'en-PH':
                case 'en':
                    return import('./translations/en.js');
                case 'pl-PL':
                    return import('./translations/pl-PL.js');
                case 'pl':
                    return import('./translations/pl.js');
                default:
                    return import(`./translations/${locale}.js`);
                }
        },
      },
      ...super.localizeNamespaces,
    ];
  }

  set current(value) {
    if (value !== this.current) {
      const oldValue = this.current;
      this.__current = value;
      this.dispatchEvent(new Event('current-changed'));
      this.requestUpdate('current', oldValue);
    }
  }

  get current() {
    return this.__current;
  }

  constructor() {
    super();
    this.__visiblePages = 5;
    this.current = 1;
    this.count = 0;
    this._mediaQuery = '(max-width:600px)';
  }

  firstUpdated() {
    installMediaQueryWatcher(this._mediaQuery, matches => {
      this._isMobile = matches;
    });
  }

  _fire(page) {
    if (page !== this.current) {
      this.current = page;
    }
  }

  _calculateNavList() {
    // If there are more pages then desired visible we have to recalculate
    // Else we can just return the same list every time.
    if (this.count > this.__visiblePages && this.current >= 5) {
      const list = Array(this.__visiblePages);
      list.push(1);
      list.push('...');
      if (this.current < this.count) {
        return list.concat([this.current - 1, this.current, this.current + 1]);
      }
      return list.concat([this.current - 2, this.current - 1, this.current]);
    }
    return Array(Math.min(this.__visiblePages, this.count))
      .fill()
      .map((_, idx) => 1 + idx);
  }

  _calculateLargeNavList() {
    const start = 1;
    const finish = this.count;
    // If there are more pages then we want to display we have to redo the list each time
    // Else we can just return the same list every time.
    if (this.count > this.__visiblePages) {
      // Calculate left side of current page and right side
      const pos3 = this.current - 1;
      const pos4 = this.current;
      const pos5 = this.current + 1;
      //  if pos 3 is lower than 4 we have a predefined list of elements
      if (pos4 <= 4) {
        const list = Array(this.__visiblePages)
          .fill()
          .map((_, idx) => start + idx);
        list.push('...');
        list.push(this.count);
        return list;
      }
      //  if we are close to the end of the list with the current page then we have again a predefined list

      if (finish - pos4 <= 3) {
        const list = [];
        list.push(1);
        list.push('...');
        const listRemaining = Array(this.__visiblePages)
          .fill()
          .map((_, idx) => this.count - this.__visiblePages + 1 + idx);
        return list.concat(listRemaining);
      }

      return [start, '...', pos3, pos4, pos5, '...', finish];
    }
    return Array(finish - start + 1)
      .fill()
      .map((_, idx) => start + idx);
  }

  render() {
    return html`
        <nav role="navigation" aria-label="${this.msgLit('ing-pagination:label')}">
            <ul>
            ${this.current > 1
                ? html`
                    <li>
                    <button
                        class="prevNext"
                        aria-label="${this.msgLit('ing-pagination:previous')}"
                        @click=${() => this._fire(this.current - 1)}
                    >
                        <ing-icon class="arrow" icon-id="borsuk:filledin-arrows:arrowLeft"></ing-icon>
                    </button>
                    </li>
                `
                : html`
                    <li>
                    <button class="prevNext" disabled>
                        <ing-icon
                        class="arrowInactive"
                        icon-id="borsuk:filledin-arrows:arrowLeft"
                        ></ing-icon>
                    </button>
                    </li>
                `}
            ${this._isMobile === true
                ? this._calculateNavList().map(page =>
                    page === '...'
                    ? html` <li><span class="dotts">${page}</span></li> `
                    : html`
                        <li>
                            <button
                            aria-label="${this.msgLit('ing-pagination:page')}"
                            aria-current=${page === this.current}
                            @click=${() => this._fire(page)}
                            >
                            ${page}
                            </button>
                        </li>
                        `,
                )
                : this._calculateLargeNavList().map(page =>
                    page === '...'
                    ? html` <li><span class="dotts">${page}</span></li> `
                    : html`
                        <li>
                            <button
                            aria-label="${this.msgLit('ing-pagination:page')}"
                            aria-current=${page === this.current}
                            @click=${() => this._fire(page)}
                            >
                            ${page}
                            </button>
                        </li>
                        `,
                )}
            ${this.current < this.count
                ? html`
                    <li>
                    <button
                        class="prevNext"
                        aria-label="${this.msgLit('ing-pagination:next')}"
                        @click=${() => this._fire(this.current + 1)}
                    >
                        <ing-icon class="arrow" icon-id="borsuk:filledin-arrows:arrowRight"></ing-icon>
                    </button>
                    </li>
                `
                : html`
                    <li>
                    <button class="prevNext" disabled>
                        <ing-icon
                        class="arrowInactive"
                        icon-id="borsuk:filledin-arrows:arrowRight"
                        ></ing-icon>
                    </button>
                    </li>
                `}
            </ul>
        </nav>    
    `;
  }

  static get styles() {
    return css`
      :host {
        cursor: default;
      }
      ul {
        list-style: none;
        padding: 0;
        text-align: center;
        ${font16Mixin()};
      }
      li {
        display: inline-block;
      }

      button {
        border: none;
        margin: 0;
        padding: 0;
        width: auto;
        overflow: visible;

        background: transparent;

        /* inherit font & color from ancestor */
        color: inherit;
        font: inherit;

        /* Normalize \`line-height\`. Cannot be changed from \`normal\` in Firefox 4+. */
        line-height: normal;

        /* Corrects font smoothing for webkit */
        -webkit-font-smoothing: inherit;
        -moz-osx-font-smoothing: inherit;

        /* Corrects inability to style clickable \`input\` types in iOS */
        -webkit-appearance: none;

        outline: none;
      }

      button {
        height: 32px;
        width: 32px;
        display: block;

        color: #000;
        text-decoration: none;
        border-radius: 50%;
        transition: background 0.2s ease-out;
      }

      .dotts {
        display: inline-block;
        text-align: center;
        line-height: 32px;
        width: 32px;
        color: #000;
        text-decoration: none;
        border-radius: 50%;
      }

      button:focus {
        background: ${black15};
        ${focusRingMixin({ borderRadius: css`50%` })};
      }

      button[aria-current='true'],
      button[aria-current='true']:hover {
        background: ${orange};
        color: white;
      }

      button[aria-current='true'] {
        ${font19BoldMixin()};
      }

      button:hover {
        background: ${black15};
      }

      .prevNext {
        height: 32px;
        width: 32px;
      }

      .arrow {
        padding-top: 0.2em;
        fill: ${orange};
      }

      .arrowInactive {
        padding-top: 0.2em;
        fill: grey;
      }
    `;
  }
}
