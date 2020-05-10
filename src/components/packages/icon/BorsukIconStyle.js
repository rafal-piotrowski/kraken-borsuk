/* eslint-disable no-unused-vars */

import { LitElement, html, css } from 'lit-element';

export const BorsukIconStyle = css`
    :host {
        box-sizing: border-box;
        display: inline-block;
        width: 3.4em;
        height: 3.4em;
        /* width: 32px;
        height: 32px; */
        fill: #ff6200;
    }

    :host:first-child {
        margin-left: 0;
    }

    :host:last-child {
        margin-right: 0;
    }

    ::slotted(svg) {
        display: block;
        width: 100%;
        height: 100%;
    }
`;
