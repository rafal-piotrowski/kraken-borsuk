/* eslint-disable no-unused-vars */

import { LitElement, html, css } from 'lit-element';

export const BorsukLinkToastStyle = css`
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

    #addLinkToast {
        /* top: 25% !important;
        left: 40% !important; */
        max-height: 600px !important;

        --paper-dialog-background-color: var(--ing-8percent-black-color);
        --paper-dialog-color: var(--ing-black-color);
    }

    .quillToastLinkBody {
        width: 800px;
        height: 580px;
    }

    .titleNav {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
    }

    .filterHeader {
        padding: 0;
    }

    .navbar-form {
        width: auto;
        border: 0;
        margin-left: 0;
        margin-right: 0;
        padding-top: 0;
        padding-bottom: 0;
        box-shadow: none;

        margin-top: 8px;
        margin-bottom: 8px;
    }

    .formGrid12 {
        grid-template-columns: repeat(12, 1fr);
    }

    .formGrid {
        display: grid;
        grid-gap: 5px;
    }

    .formSpanGrid6 {
        grid-column: span 6 / auto;
    }

    .inputFrame {
        padding: 20px 5px;
    }

    .inputGrid {
        display: grid;
        justify-items: center;
        align-items: center;
    }

    .linkBorder {
        border: 1px solid var(--ing-15percent-black-color);
    }

    .linkBottomShadow {
        box-shadow: 0px 5px 5px -5px var(--ing-15percent-black-color);
    }

    .linkFrame {
        padding-top: 20px;
    }

    .formSpanGrid12 {
        grid-column: span 12 / auto;
    }

    .formSpanGrid8 {
        grid-column: span 8 / auto;
    }

    .formSpanGrid4 {
        grid-column: span 4 / auto;
    }

    paper-input {
        display: inline-block;
    }

    .quillToastButtons {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 30px 0;
    }

    .inputFormSize90 {
        width: 90%;
    }

    borsuk-button {
        margin: 0 5px;
    }

    .displayNone {
        display: none;
    }

    .toolbar-list {
        /* display: none; */
    }

    .toolbar-list > a {
        display: inline-block;
        color: var(--ing-black-color);
        text-decoration: none;
        line-height: 30px;
        padding: 4px 24px;
    }

    .toolbar-list > a[selected] {
        color: var(--ing-fuchsia-color);
        border-bottom: 4px solid var(--ing-fuchsia-color);
    }

    main {
        display: block;
    }

    .main-toast-content {
        padding-top: 64px;
        min-height: 375px;
        border-bottom: 1px solid var(--ing-fuchsia-color);
        box-shadow: 0px 5px 5px -5px var(--ing-fuchsia-color);
    }

    .toastpage {
        display: none;
    }

    .toastpage[active] {
        display: grid;
    }

    /* .btn-borsuk {
        font-size: 1.4rem !important;
        line-height: 3.8rem !important;
        height: 4rem !important;
    } */

`
