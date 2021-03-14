/* eslint-disable no-unused-vars */

import { LitElement, html, css } from 'lit-element';

export const RichEditorStyle = css`
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

    .editorWrapper {
        width: 100%;
        min-height: 200px;
    }

    .ing-new-theme .messages-container {
        background-color: #fff;
        padding-bottom: 2rem;
    }

    #editor {
        display: block;
        min-height: 200px;
        width: 100%;
        margin: 0 auto;
        border-top: 1px solid var(--ing-8percent-black-color);
        font-family: INGMeWeb, Arial, sans-serif;
        font-size: 16px;
    }

    .flexbuttons {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 10px;
    }

    #editor-typography, #editor-history, #editor-align, #editor-format, #editor-embed {
        padding: 0 25px;
        border-right: 1px solid var(--ing-15percent-black-color);
    }

    #editor-list, #editor-source {
        padding: 0 25px;
    }

    #sidebar-controls {
        padding-bottom: 15px;
    }

    .editor-container {
        width: 100%;
    }

    #inputTitle {
        display: block;
        padding-bottom: 15px;
        color: var(--ing-black-color);
        font-weight: normal;
    }

    #inputError {
        display: none;
    }

    :host([error]) #inputError {
        display: block;
        padding-bottom: 15px;
        color: var(--ing-minus-color);
        font-weight: bold;
        border-bottom: 1px solid var(--ing-minus-color);
    }

    :host([error]) #inputTitle {
        display: none;
    }

    #editor .ql-html-editor {
        position: absolute;
        background: var(--ing-black-color);
        color: var(--ing-8percent-black-color);
        top: 0;
        left: 0;
        bottom: 0;
        width: 100%;
        border: 0;
        padding: 12px;
        box-sizing: border-box;
    }
`;
