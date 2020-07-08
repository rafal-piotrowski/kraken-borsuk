/* eslint-disable no-unused-vars */

import { LitElement, html, css } from 'lit-element';

export const BorsukMessageInputFormStyle = css`
    :root {
        --ing-orange-color: #ff6200;
        --ing-orange-brighter: #E8800C;
        --ing-orange-brightest: #FFA90D;
        --ing-orange-darker: #E8400C;
        --ing-orange-darkest: #FF230D;

        --ing-very-light-grey-color: #bdbdbd;
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
        --ing-sky-brighter: #5DD7F0;
        --ing-sky-brightest: #5AE6D8;
        --ing-sky-darker: #5D8AF0;
        --ing-sky-darkest: #5A5FE6;

        --ing-indigo-color: #525199;

        --borsuk-sidebar-width: 325px;
        --borsuk-navbar-max-height: 50px;
        --borsuk-navbar-padding-top: 10px;

        font-family: INGMeWeb, Arial, sans-serif;

        --paper-tab-ink: #5AE6D8 !important;
        --paper-yellow-a100: #5AE6D8 !important;
    }

    .formGrid {
        display: grid;
        grid-gap: 5px;
    }

    .formGrid12 { grid-template-columns: repeat(12, 1fr); }
    .formGrid11 { grid-template-columns: repeat(11, 1fr); }
    .formGrid10 { grid-template-columns: repeat(10, 1fr); }
    .formGrid9 { grid-template-columns: repeat(9, 1fr); }
    .formGrid8 { grid-template-columns: repeat(8, 1fr); }
    .formGrid7 { grid-template-columns: repeat(7, 1fr); }
    .formGrid6 { grid-template-columns: repeat(6, 1fr); }
    .formGrid5 { grid-template-columns: repeat(5, 1fr); }
    .formGrid4 { grid-template-columns: repeat(4, 1fr); }
    .formGrid3 { grid-template-columns: repeat(3, 1fr); }
    .formGrid2 { grid-template-columns: repeat(2, 1fr); }
    .formGrid1 { grid-template-columns: repeat(1, 1fr); }

    .formSpanGrid12 { grid-column: span 12 / auto; }
    .formSpanGrid11 { grid-column: span 11 / auto; }
    .formSpanGrid10 { grid-column: span 10 / auto; }
    .formSpanGrid9 { grid-column: span 9 / auto; }
    .formSpanGrid8 { grid-column: span 8 / auto; }
    .formSpanGrid7 { grid-column: span 7 / auto; }
    .formSpanGrid6 { grid-column: span 6 / auto; }
    .formSpanGrid5 { grid-column: span 5 / auto; }
    .formSpanGrid4 { grid-column: span 4 / auto; }
    .formSpanGrid3 { grid-column: span 3 / auto; }
    .formSpanGrid2 { grid-column: span 2 / auto; }
    .formSpanGrid1 { grid-column: span 1 / auto; }

    .inputFormSize100 { width: 100%; }
    .inputFormSize90 { width: 90%; }
    .inputFormSize80 { width: 80%; }
    .inputFormSize70 { width: 70%; }
    .inputFormSize60 { width: 60%; }
    .inputFormSize50 { width: 50%; }
    .inputFormSize40 { width: 40%; }
    .inputFormSize30 { width: 30%; }
    .inputFormSize20 { width: 20%; }
    .inputFormSize10 { width: 10%; }

    .inputGrid {
        display: grid;
        justify-items: center;
        align-items: center;
    }

    .inputFrame {
        padding: 20px 5px;
    }

    .formBorder {
        border: 1px solid var(--ing-8percent-black-color);
        border-radius: 5px 5px 5px 5px;
        -moz-border-radius: 5px 5px 5px 5px;
        -webkit-border-radius: 5px 5px 5px 5px;
    }

    .formBorder:hover {
        background: var(--ing-8percent-black-color);
    }

    .formMessageBorder {
        border: 1px solid var(--ing-8percent-black-color);
    }

    .errorBorder {
        border: 1px solid var(--ing-minus-color);
        border-radius: 5px 5px 5px 5px;
        -moz-border-radius: 5px 5px 5px 5px;
        -webkit-border-radius: 5px 5px 5px 5px;
    }

    .formBottomShadow {
        /* border-bottom: 1px solid var(--ing-8percent-black-color);  */
        -webkit-box-shadow: 0px 5px 5px -5px var(--ing-8percent-black-color);
        -moz-box-shadow: 0px 5px 5px -5px var(--ing-8percent-black-color);
        box-shadow: 0px 5px 5px -5px var(--ing-8percent-black-color);
    }

    .errorBottomShadow {
        /* border-bottom: 1px solid var(--ing-8percent-black-color);  */
        -webkit-box-shadow: 0px 5px 5px -5px var(--ing-minus-color);
        -moz-box-shadow: 0px 5px 5px -5px var(--ing-minus-color);
        box-shadow: 0px 5px 5px -5px var(--ing-minus-color);
    }

    #errorOutput {
        color: var(--ing-minus-color);
        font-weight: bold;
    }

    paper-item {
        background-color: transparent;
        color: black;
        font-weight: normal;
        text-decoration: none;
        font-size: .8125rem;
        border-radius: 0.125rem;
        margin: 0.2rem 0.3125rem;
        transition: all 150ms linear;
        min-width: 7rem;
        overflow: hidden;
        line-height: 1.428571;
        text-overflow: ellipsis;
        word-wrap: break-word;

        position: relative;
        width: auto;
        display: flex;
        flex-flow: nowrap;
        align-items: center;
    }

    paper-item:hover, paper-item:active {
        opacity: 1;
        background: var(--ing-sky-color);
        color: white;
        box-shadow: 0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(96, 166, 218, 0.4);
    }

    .editor-component {
        width: 100%;
    }
`;
