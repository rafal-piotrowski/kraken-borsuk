/* eslint-disable no-unused-vars */

import { LitElement, html, css } from 'lit-element';

export const RichFormButtonsStyle = css`

    :host {
        /* width: 35px !important;
        height: 35px !important; */
    }

    #naviButton {
        position: relative;
        display: inline-block;
        width: 35px !important;
        height: 35px !important;
        border-radius: 50%;
    }
        /* border-radius: 50%;
        overflow: hidden;
        transition: box-shadow 0.2s cubic-bezier(0.7, 0, 0.2, 1);
        transition-delay: 0.2s;
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
        margin: 10px;
    } */

    .fab.noing {
        color: #000;
        background-color: #fff;
    }

    .fab.blue {
        background-color: #4285f4;
    }

    .fab.green {
        background-color: #0f9d58;
    }

    .fab.ing {
        color: #fff;
        background-color: var(--ing-orange-color);
    }

    .fab:active {
        box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2);
        transition-delay: 0s;
    }

    .fab > iron-icon {
        --iron-icon-fill-color: #fff;
    }
`;
