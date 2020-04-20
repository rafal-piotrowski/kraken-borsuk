/* eslint-disable no-unused-vars */

import { LitElement, html, css } from 'lit-element';

export const BorsukDialogStyle = css`
    :host {
    }

    .subofferModalWindow {
        width: 550px;
        height: 285px;
        border-radius: 5px;
        border-color: var(--ing-orange-color);
        background-color: white;
        color: var(--ing-black-color);
        font-size: 20px;
    }

    .modalFlex {
        margin: 0;
        padding: 24px;
    }

    .modalFlex p {
        height: fit-content;
        line-height: normal;
    }

    p {
        margin: 0;
    }

    .modalFlex .flexbuttons {
        bottom: 0;
        margin: 10px 0;
    }

    .flexbuttons {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modalGrid {
        height: 75%;
    }

    .inputGrid {
        display: grid;
        justify-items: center;
        align-items: center;
    }

    .formGrid12 {
        grid-template-columns: repeat(12, 1fr);
    }

    .formGrid {
        grid-gap: 5px;
    }

    .borsukFace {
        width: 88px;
        height: 88px;
        margin: 0 auto;
    }

    .formSpanGrid2 {
        grid-column: span 2 / auto;
    }

    .borsukInfo {
        padding-left: 40px;
        text-align: left;
    }

    .formSpanGrid10 {
        grid-column: span 10 / auto;
    }

    .toggleForChannels {
        --paper-toggle-button-checked-bar-color:  var(--ing-leaf-color);
        --paper-toggle-button-checked-button-color:  var(--ing-leaf-color);
        --paper-toggle-button-checked-ink-color: var(--ing-leaf-color);
    }

    .inputsNoDisplay {
        display: none;
    }

    .inputsDisplay {
        display: block;
    }

    .borsukIcon {
        width: 90%;
        height: 90%;
    }

    .borsukAlertIcon {
        color: var(--ing-minus-color);
    }

    .borsukInfoIcon {
        color: var(--ing-leaf-color);
    }

    .borsukConfirmIcon {
        color: var(--ing-sky-color);
    }

    .borsukFace {
        width: 88px;
        height: 88px;
        margin: 0 auto;
    }

    .modalGrid {
        height: 75%;
    }

    .borsukInfo {
        padding-left: 40px;
        text-align: left
    }

    .infoToast {
        --paper-toast-background-color: var(--ing-leaf-color);
        --paper-toast-color: white;
    }

    .alertToast {
        --paper-toast-background-color: var(--ing-minus-color);
        --paper-toast-color: white;
    }

    .modalBox {
        width: 400px;
        height: 100px;
        overflow: auto;
        margin: 10px 0;
    }

    .fontScale160 { font-size: 1.6rem; }
    .fontScale150 { font-size: 1.5rem; }
    .fontScale140 { font-size: 1.4rem; }
    .fontScale130 { font-size: 1.3rem; }
    .fontScale120 { font-size: 1.2rem; }
    .fontScale110 { font-size: 1.1rem; }
    .fontScale100 { font-size: 1rem; }
    .fontScale90 { font-size: .9rem; }
    .fontScale80 { font-size: .8rem; }
    .fontScale70 { font-size: .7rem; }

    .btn-novisible {
        /* visibility: hidden; */
        display: none;
    }

    #modalInfo {
        font-size: 1rem !important;
    }
`;
