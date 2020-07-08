/* eslint-disable no-unused-vars */

import { LitElement, html, css } from 'lit-element';

export const BorsukColorsToastStyle = css`
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

    #addColorToast {
        /* top: 25% !important;
        left: 40% !important; */
        max-height: 330px !important;

        --paper-dialog-background-color: var(--ing-8percent-black-color);
        --paper-dialog-color: var(--ing-black-color);
    }

    .quillToastColorBody {
        height: 320px;
    }

    .titleNav {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
    }

    .filterHeader {
        padding: 10px 10px 0 0;
    }

    .formGrid7 {
        grid-template-columns: repeat(7, 1fr);
    }

    .formGrid {
        display: grid;
        grid-gap: 5px;
    }

    .framedQuill {
        border: 1px solid var(--ing-light-grey-color);
        padding: 1px;
    }

    .singleQuill {
        width: 50px;
        height: 25px;
    }

    .formSpanGrid1 {
        grid-column: span 1 / auto;
    }

    .quillToastButtons {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 20px 0;
    }
`
