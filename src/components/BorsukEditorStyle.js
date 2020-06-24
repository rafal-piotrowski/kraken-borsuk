/* eslint-disable no-unused-vars */

import { LitElement, html, css } from 'lit-element';

export const BorsukEditorStyle = css`
    .editorWrapper {
        width: 100%;
        min-height: 200px;
    }

    .ing-new-theme .messages-container {
        background-color: #fff;
        padding-bottom: 2rem;
    }

    #editor-container {
        display: block;
        min-height: 200px;
        width: 100%;
        margin: 0 auto;
        border-top: 1px solid lightgrey;
    }

    .flexbuttons {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 10px;
    }

    #editor-typography, #editor-history, #editor-align {
        padding: 0 25px;
        border-right: 1px solid lightgrey;
    }

    #editor-list {
        padding: 0 25px;
    }
`;
