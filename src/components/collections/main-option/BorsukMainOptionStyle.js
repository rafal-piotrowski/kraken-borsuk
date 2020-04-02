/* eslint-disable no-unused-vars */

import { LitElement, html, css } from 'lit-element';

export const BorsukMainOptionStyle = css`
    div[disabled] {
        pointer-events: none;
        opacity: 0.3;
    }

    :host slot {
        color: lightgrey;
    }

    .headContainer {
        align-self: start;
        min-height: 50px;
    }

    .optionContainer {
        display: grid;
        width: 90%;
        grid-template-columns: repeat(12, 1fr);
    }

    .optionHeader {
        height: 70px;
        justify-self: start;
        align-self: start;
        grid-column: 1 / span 9;
        grid-row: 1 / auto;
    }

    .optionHeader h3 {
        font-size: 20px;
        margin-top: 20px;
        margin-bottom: 10px;
        font-weight: normal;
    }

    .buttonHeader {
        height: 70px;
        justify-self: start;
        align-self: start;
        grid-column: span 3 / 13;
        padding: 10px 0px 0px 10px;
    }

    .bodyContainer {
        align-self: end;
        padding-bottom: 10px;
    }

    .box {
        align-self: end;
        grid-column: 1 /span 9;
        padding: 10px 0px 0px 10px;
    }

    .buttonBox {
        align-self: end;
        grid-column: span 3 / 13;
        padding: 10px 0px 0px 10px;
    }

`;
