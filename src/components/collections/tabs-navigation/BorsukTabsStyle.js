/* eslint-disable no-unused-vars */

import { LitElement, html, css } from 'lit-element';

export const BorsukTabsStyle = css`

    @font-face {
        font-family: 'INGMeWeb';
        src: url('/src/fonts/INGMeWeb-Regular.eot'); /* IE9 */
        src: url('/src/fonts/INGMeWeb-Regular.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
        url('/src/fonts/INGMeWeb-Regular.woff') format('woff'); /* Modern Browsers */
        font-weight: normal;
        font-style: normal;
    }

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

/* do wyrypania */
    .toolbar-list {
        display: block;
    }

    .toolbar-list > a {
        display: inline-block;
        color: white;
        line-height: 30px;
        text-decoration: none;
        padding: 4px 24px;
    }

    .toolbar-list > a[selected] {
        color: #E91E63;
    }
/******************/

    paper-tabs {
        font-family: INGMeWeb, Arial, sans-serif;
        color: #fff;
        height: 61px;
    }

    a {
        color: white;
        text-decoration: none;
    }

    paper-tab iron-icon {
        margin-right: 8px;
    }

    paper-tab {
        max-width: 300px;
        border-bottom: 2px solid var(--ing-sky-color);
        border-right: 1px solid var(--ing-sky-color);
        border-radius: 5px;
        /* box-shadow: 6px 0px 7px 2px rgba(255, 162, 0, 0.5); */
        margin: 7px 10px 7px 0;
        height: 75%;
    }

    paper-tab[selected] {
        background: var(--ing-sky-color);
    }

    .container-fluid {
        padding-right: 0px;
        padding-left: 0px;
        margin-right: 0px;
        margin-left: 0px;
        width: 98%;
    }

    .container-fluid .card {
        box-shadow: rgba(0, 0, 0, 0.14) 0px 1px 4px 0px;
    }

    .card {
        width: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        min-width: 0px;
        word-wrap: break-word;
        background-clip: border-box;
        border: 1px solid var(--ing-white-color);
        border-radius: 0.25rem;
    }

    .card-nav-tabs {
        margin-top: 45px;
    }

    .card-nav-tabs .card-header {
        margin-top: -30px !important;
    }

    .text-center {
        text-align: center !important;
    }

    .card .card-body {
        padding: 0.9375rem 20px;
        position: relative;
    }

    .card .card-body,
    .card .card-footer {
        padding: 0.9375rem 1.875rem;
    }

    .card .card-body+.card-footer {
        padding-top: 0rem;
        border: 0;
        border-radius: 6px;
    }

    .card .card-body+.card-footer,
    .card .card-footer {
        padding: 0;
        padding-top: 10px;
        margin: 0 15px 10px;
        border-radius: 0;
        justify-content: space-between;
        align-items: center;
    }

    .card .card-header {
        border-bottom: none;
        background: transparent;
        z-index: 3 !important;
        border-radius: 5px;
        position: relative;
        padding: 7px 5px;
        margin: 0px 15px;
        color: white;
    }

    .card .card-header-warning {
        background: linear-gradient(60deg, #525199, #525199);
        box-shadow: 0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(96, 166, 218, 0.4);
    }

    .card .card-footer {
        display: flex;
        align-items: center;
        background-color: transparent;
        border: 0;
        font-size: 0.875rem;
    }


    .formGridNoGap {
        display: grid;
        width: 900px;
        height: 538px;
        grid-template-columns: repeat(8, 1fr);
        grid-template-rows: repeat(8, 1fr);
    }

    .centerFace {
        display: grid;
        justify-content: center;
        justify-items: center;
        align-items: center;
        align-content: center;
    }

    .centerFrame {
        padding: 20px 0;
    }

    .textareaParallax {
        padding: 25px;
        font-size: 1.5rem;
    }

    .tabsWrapper {
        flex: auto;
        padding: 0 2px;
    }

    .tabsNav {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    paper-tab iron-icon {
        margin-right: 8px;
    }

    .tabName {
        display: block;
        text-align: center;
        padding-right: 5px;
    }

    .subTitleTab {
        font-size: 12px;
        font-style: italic;
        margin: 0;
        padding-top: 4px;
        color: #5ae6d8;
    }

    paper-tab[selected] .subTitleTab {
        color: var(--ing-indigo-color);
    }

`;
