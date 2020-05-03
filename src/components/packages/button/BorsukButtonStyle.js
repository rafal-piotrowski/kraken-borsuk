/* eslint-disable no-unused-vars */

import { LitElement, html, css } from 'lit-element';

export const BorsukButtonStyle = css`
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

    :host([indigo]) {
        width: 100%;
        color: var(--ing-white-color);
        background-color: var(--ing-indigo-color);
        border: 1px solid var(--ing-indigo-color);
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

    :host([icon]):active {
        box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2);
        transition-delay: 0s;
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
        border-radius: 50%;
        border-radius: 50%;
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
        margin: 5px 0 5px 10px;
        padding: 0;
        min-width: 5px;
    }
`;
