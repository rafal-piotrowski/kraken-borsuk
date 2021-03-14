/* eslint-disable no-undef */
/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */

import { LitElement, html, css } from 'lit-element';
import { render, nothing } from 'lit-html';
// import '@polymer/paper-button/paper-button';
import { RichIconStyle } from './rich-icon-style.js';

const isPromise = action => typeof action === 'object' && Promise.resolve(action) === action;

export class RichIcon extends LitElement {
    static get styles() {
        return [RichIconStyle];
    }

    static get properties() {
        return {
          svg: {
            type: Object,
          },

          role: {
            type: String,
            attribute: 'role',
            reflect: true,
          },
    
          ariaLabel: {
            type: String,
            attribute: 'aria-label',
            reflect: true,
          },
        };
    }

    set svg(svg) {
        this.__svg = svg;
        if (svg === undefined || svg === null) {
          render(nothing, this);
        } else if (isPromise(svg)) {
            render(nothing, this);
            svg.then(resolvedSvg => {
                if (svg === this.__svg) {
                    render(this.constructor.unwrapSvg(resolvedSvg), this);
                }
            });
        }  else {
                render(this.constructor.unwrapSvg(svg), this);
        }
    }

    get svg() {
        return this.__svg;
    }

    constructor() {
        super();
        this.role = 'img';
    }

    update(changedProperties) {
        super.update(changedProperties);
    }

    connectedCallback() {
        super.connectedCallback();
    }

    static unwrapSvg(wrappedSvgObject) {
        const svgObject = wrappedSvgObject && wrappedSvgObject.default ? wrappedSvgObject.default : wrappedSvgObject;
        return typeof svgObject === 'function' ? svgObject(html) : svgObject;
    }

    _renderBefore() {
        return html`
        `;
    }

    render() {
        return html`
            <slot></slot>
        `;
    }

    _renderAfter() {
        return html`
        `;
    }
}

customElements.define('rich-icon', RichIcon);
