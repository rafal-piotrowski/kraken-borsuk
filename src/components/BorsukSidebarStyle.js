/* eslint-disable no-unused-vars */

import { LitElement, html, css } from 'lit-element';

export const BorsukSidebarStyle = css`

    .null-place {
        margin-top: 12px;
    }

    .null-place-bottom {
        margin: 30px 0px;
    }

    .sidebarFilter {
        display: flex;
        justify-content: center;
        --paper-font-subhead: {
            @apply --paper-font-common-base;
            font-size: 18px !important;
            font-weight: 400 !important;
            line-height: 26px !important;
        }
    }

    .sidebarFilter .br-input {
        width: 70%;
        padding-left: 10px;
    }

    paper-input {
        display: inline-block;
    }

    .content {
        box-shadow: none;
        padding: 0px 25px 20px;
    }

    .flexbuttons {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 10px;
    }

    .overflowEllipsis {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

`;
