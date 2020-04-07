/* eslint-disable no-unused-vars */

import { LitElement, html, css } from 'lit-element';

export const BorsukAlertStyle = css`

    /* powielone z login-app */

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
        padding: 15px;
        margin: 0px 15px;
        color: white;
    }

    .card .card-header-warning {
        background: linear-gradient(60deg, #ff6200, #fb8c00);
    }

    .card .card-footer {
        display: flex;
        align-items: center;
        background-color: transparent;
        border: 0;
        font-size: 0.875rem;
    }


    .flex {
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -ms-flex-direction: row;
        -webkit-flex-direction: row;
        flex-direction: row;

        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
    }
 
    .container {
        /* min-width: 992px !important; */
        width: 100%;
        padding-right: 15px;
        padding-left: 15px;
        margin-right: auto;
        margin-left: auto;
        height: 100vh;
    }
 
    .flexmargin {
        -ms-flex: 1 1 0.000000001px;
        -webkit-flex: 1;
        flex: 1;
        -webkit-flex-basis: 0.000000001px;
        flex-basis: 0.000000001px;
    }     
 
    .flexcenter {
        width: 500px;
        max-height: 400px;
        margin: 5px;
    }
 
   .flexcenter .card {
        margin: 0px;
        padding: 0px;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
        background: #ffffff;
    }

    .flexformcenter {
        width: 100%;
        height: 90%;
        margin-top: 15px;
    }

`;
