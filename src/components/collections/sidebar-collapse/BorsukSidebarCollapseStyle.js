/* eslint-disable no-unused-vars */

import { LitElement, html, css } from 'lit-element';

export const BorsukSidebarCollapseStyle = css`

    *:focus {
        outline: none;
    }

    .card {
        width: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        min-width: 0px;
        overflow-wrap: break-word;
        background-clip: border-box;
        border-width: 0px;
        border-style: initial;
        border-color: initial;
        border-image: initial;
        border-radius: 6px;
        color: rgb(51, 51, 51);
    }

    .card .card-header {
        border-bottom: none;
        background: transparent;
        z-index: 3 !important;
        padding: 0.5rem 1.25rem;
        margin-bottom: 0px;
    }

/* ********************************************** */

    #notrigger {
        width: 100%;
    }

    #trigger {
        padding: 10px 15px;
        cursor: pointer;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        text-align: left;
    }

    .card-header .mb-1 {
        box-shadow: rgba(0, 0, 0, 0.14) 0px 4px 20px 0px, rgb(168, 168, 168) 0px 7px 10px -5px;
        font-family: INGMeWeb, Arial, sans-serif;
        font-weight: 300;
        color: white;
        font-size: 1.0625rem;
        /* background-color: #ff6200; */
        background-color: #525199;
        padding: 10px;
        border-radius: 3px;
        border-width: initial;
        border-style: none;
        border-color: initial;
        border-image: initial;
    }

    .subcard-header .mb-1 {
        font-family: INGMeWeb, Arial, sans-serif;
        font-size: 0.95rem;
        color: #333;
        background-color: rgba(96, 166, 218, 0.3);
        vertical-align: middle;
        border-radius: 5px;
        border-width: initial;
        border-style: none;
        border-color: initial;
        border-image: initial;
    }

    .mb-1 {
        margin-bottom: 0.25rem !important;
    }

    .titleNav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 25px;
    }

    iron-collapse {
        box-shadow: none !important;
    }

`;
