/* eslint-disable no-unused-vars */

import { LitElement, html, css } from 'lit-element';

export const RichButtonStyle = css`
    :host {
        /* width: 100%; */
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: INGMeWeb, Arial, sans-serif;
        line-height: 28px;
        border: 1px solid var(--ing-orange-color);
        border-radius: 8px;
        color: var(--ing-white-color);
        font-weight: bold;
        background-color: var(--ing-orange-color);
        position: relative;
        cursor: pointer;
    }

    :host paper-button {
        text-transform: none;
    }

    :host([indigo]) {
        width: 100%;
        color: var(--ing-white-color);
        background-color: var(--ing-indigo-color);
        border: 1px solid var(--ing-indigo-color);
    }

    :host([wide]) {
        width: 100%;
    }

    :host([wide]) paper-button {
        padding: 6px 16px 8px 16px;
    }
    
    :host([narrow]) paper-button {
        padding: 0 !important;
    }

    :host([white]) {
        color: var(--ing-orange-color);
        background-color: var(--ing-white-color);
        border: 1px solid var(--ing-orange-color);
    }

    :host([gap]) {
        margin: 0 5px;
    }

    :host([icon]) {
        background-color: white;
        color: var(--ing-orange-color);
        position: relative;
        display: inline-block;
        width: 35px !important;
        height: 35px !important;
        border: none;
        border-radius: 50%;
        border-radius: 50%;
        overflow: hidden;
        transition: box-shadow 0.2s cubic-bezier(0.7, 0, 0.2, 1);
        transition-delay: 0.2s;
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
        margin: 10px;
    }

    :host([disable]) {
        color: var(--ing-15percent-black-color) !important;
    }

    :host([icon]):active {
        box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2);
        transition-delay: 0s;
    }

    :host([icongrey]) {
        color: grey;
    }

    :host([icon]) paper-button {
        margin: 5px 0 5px 7px;
        padding: 0;
        min-width: 5px;
    }

    :host([reverse]) {
        color: white;
        background-color: var(--ing-orange-color);
    }

    ::slotted(iron-icon) {
        width: 20px;
    }

    :host([smicon]) {
        background-color: transparent;
        color: white;
        position: relative;
        display: inline-block;
        width: 35px !important;
        height: 35px !important;
        border: none;
        /* border-radius: 50%;
        border-radius: 50%; */
        overflow: hidden;
        /* transition: box-shadow 0.2s cubic-bezier(0.7, 0, 0.2, 1);
        transition-delay: 0.2s;
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26); */
        /* margin: 10px; */
    }

    :host([smicon]):active {
        box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2);
        transition-delay: 0s;
    }

    :host([smicon]) paper-button {
        margin: 5px 0 5px 5px;
        padding: 0;
        min-width: 5px;
    }

/* kolor ma być ustawiony w borsuk-icon, jako fill: lightgrey */

    :host([noanime]) {
        fill: var(--ing-15percent-black-color) !important;
        display: inline-block;
        width: 48px !important;
        height: 48px !important;
        border-radius: 50%;
        position: relative;
    }

    :host([animate]) {
        color: orange;
        display: inline-block;
        width: 48px !important;
        height: 48px !important;
        border-radius: 50%;
        position: relative;
    }

    :host([animate]):after {
        position: absolute;
        width: 80% !important;
        height: 80% !important;
        border-radius: 50%;
        content: '';
        -webkit-box-sizing: content-box;
        -moz-box-sizing: content-box;
        box-sizing: content-box;

        top: -6px;
        left: -6px;
        padding: 8px;
        z-index: -1;
        opacity: 0;

        -webkit-transform: rotate(-90deg);
        -moz-transform: rotate(-90deg);
        -ms-transform: rotate(-90deg);
        transform: rotate(-90deg);
        -webkit-transition: opacity 0.2s, -webkit-transform 0.2s;
        -moz-transition: opacity 0.2s, -moz-transform 0.2s;
        transition: opacity 0.2s, transform 0.2s;

        box-shadow: 2px 2px orange;
    }

    :host([animate]):hover:after {
        opacity: 1;
        -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        transform: rotate(0deg);
    }
`;
