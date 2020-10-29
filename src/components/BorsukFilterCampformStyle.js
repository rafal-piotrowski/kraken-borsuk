/* eslint-disable no-unused-vars */

import { LitElement, html, css } from 'lit-element';

export const BorsukFilterCampformStyle = css`
    
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

    *:focus {
        outline: none;
    }

    #contentTabsForm h2 {
        color: blue;
    }

    .formGrid12 {
        grid-template-columns: repeat(12, 1fr);
    }

    .formGrid6 {
        grid-template-columns: repeat(3, 1fr);
    }

    .formGrid3 {
        grid-template-columns: repeat(6, 1fr);
    }

    .formGrid {
        display: grid;
        grid-gap: 1px;
    }

    .inputGrid {
        display: grid;
        justify-items: center;
        align-items: center;
        height: 50px;
        padding: 5px 10px;
    }

    .formSpanGrid12 {
        grid-column: span 12 / auto;
    }

    .formSpanGrid11 {
        grid-column: span 11 / auto;
    }

    .formSpanGrid1 {
        grid-column: span 1 / auto;
    }

    .formSpanGrid6 {
        grid-column: span 6 / auto;
    }

    .formSpanGrid3 {
        grid-column: span 3 / auto;
    }

    .inputFormSize90 {
        width: 100%;
    }

    .inputFormSize90 #container {
        margin: 0 15px;
    }

    .titleNav {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
    }

    .titleNav h4 {
        padding: 10px 5px;
        margin: 0;
    }

    .filterHeader {
        padding: 0 10px;
    }

    paper-input-container {
        padding: 0 !important;
    }

    .checkboxContener {
        /* display: flex; */
        justify-content: center;
        padding-top: 35px;
        padding-left: 20px;
    }

    .checkboxElement {
        margin-right: 20px;
    }

    .statusElement {
        color: var(--ing-light-grey-color);
    }

    .titleCheckbox {
        display: block;
        font-size: 0.8em;
    }

    .formFilter {
        padding: 15px 25px 25px 25px;
        background-color: #f8f8f8;
        border-bottom: 1px solid var(--ing-15percent-black-color);
    }

    .resultFilter {
        padding: 15px 25px 25px 25px;
    }

    .titleBody {
        text-align: left;
    }

    .titleBody table {
        width: 100%;
    }

    .titleBody td {
        height: 20px;
    }

    .titleBody th {
        color: var(--ing-sky-color);
        height: 30px;
        /* border-bottom: 1px solid var(--ing-15percent-black-color); */
    }

    .flexbuttons {
        display: flex;
        /* justify-content: center;
        align-items: center; */
        justify-content: space-between;
        align-items: flex-end;
        /* margin: 10px; */
    }

    .flexbuttons borsuk-button {
        margin: 0 5px;
    }

`;
