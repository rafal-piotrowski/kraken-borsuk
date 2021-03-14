/* eslint-disable no-unused-vars */

import { LitElement, html, css } from 'lit-element';

export const RichIconStyle = css`
    :host {
        box-sizing: border-box;
        display: inline-block;
        width: 3.4em;
        height: 3.4em;
        /* width: 32px;
        height: 32px; */
        fill: #ff6200;
    }

    :host([leaf]) {
        fill: #349651;
    }

    :host([noactive]) {
        fill: #d9d9d9;
    }

    :host([pressed]) {
        fill: #349651;
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
