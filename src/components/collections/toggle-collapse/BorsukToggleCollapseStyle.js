/* eslint-disable no-unused-vars */

import { LitElement, html, css } from 'lit-element';

export const BorsukToggleCollapseStyle = css`

    :host {
        font-family: INGMeWeb, Arial, sans-serif;

        --paper-input-container-color: var(--ing-15percent-black-color);
        --paper-input-container-focus-color: var(--ing-sky-color);

        --ing-orange-color: #ff6200;
        --ing-white-color: #ffffff;
        --ing-8percent-black-color: #f0f0f0;
        --ing-15percent-black-color: #d9d9d9;
        --ing-light-grey-color: #a8a8a8;
        --ing-mid-grey-color: #767676;
        --ing-black-color: #333333;

        --ing-minus-color: #ff0000;
        --ing-leaf-color: #349651;
        --ing-lime-color: #d0d93c;
        --ing-fuchsia-color: #ab0066;
        --ing-sky-color: #60a6da;
        --ing-indigo-color: #525199;

        --ing-f1-color: #4b53af;
        --ing-f2-color: #21c7ed;
        --ing-f3-color: #008e91;
        --ing-f4-color: #e07710;
        --ing-f5-color: #f74f80;
        --ing-f6-color: #5fc634;
        --ing-f7-color: #009fef;
        --ing-f8-color: #ffa81d;
        --ing-f9-color: #9d64b5;
        --ing-f10-color: #bc1d5e;

        --ing-olive-contrast: #808000;
        --ing-black-contrast: #000000;
        --ing-yellow-contrast: #ffff00;

        --my-elem-visibility: visible;
        --width-errfix: 500px;
        --height-errfix: 150px;

        --borsuk-sidebar-width: 325px;
        --borsuk-navbar-max-height: 60px;
        --borsuk-navbar-padding-top: 10px;
    }

    *:focus {
        outline: none;
    }

    .toggleForChannels {
        paper-toggle-button-checked-bar-color: var(--ing-leaf-color) !important;
        paper-toggle-button-checked-button-color: var(--ing-leaf-color) !important;
        paper-toggle-button-checked-ink-color: var(--ing-leaf-color) !important;
    }

    .formFilter {
        padding: 15px 25px 25px 25px;
        /* background-color: #f8f8f8; */
        /* border-bottom: 1px solid var(--ing-15percent-black-color); */
    }

    .titleNav {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        padding: 0px 0px 25px 0;
    }

    .titleNav h4 {
        padding: 10px 5px;
        margin: 0;
    }

    .filterHeader {
        padding: 0 10px;
    }

`;
