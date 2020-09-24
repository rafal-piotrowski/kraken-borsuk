/* eslint-disable no-unused-vars */

import { LitElement, html, css } from 'lit-element';

export const BorsukVersionsListStyle = css`

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

        /* --paper-font-subhead: {
            @apply --paper-font-common-base;

            font-size: 22px !important;
            font-weight: 400 !important;
            line-height: 30px !important;
        } */

        font-family: INGMeWeb, Arial, sans-serif;

        --paper-tab-ink: #5AE6D8 !important;
        --paper-yellow-a100: #5AE6D8 !important;
    }

/****************** SCROLLBAR ********************/
 
    #outerscroller ::-webkit-scrollbar {
        position: absolute !important;
        width: 7px !important;
        height: 7px !important;
        z-index: 1 !important;
        overflow: auto !important;
    }

    /* Track */
    #outerscroller ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px #eaeaeA !important;
        border-radius: 10px !important;
    }

    /* Handle */
    #outerscroller ::-webkit-scrollbar-thumb {
        background: #b1adac !important;
        border-radius: 10px !important;
    }

    /* Handle on hover */
    #outerscroller ::-webkit-scrollbar-thumb:hover {
        background: #807E7D !important;
    }

/**********************************************/

    .chevronIcon {
        width: 2.2rem;
        height: 2.2rem;
        fill: var(--ing-mid-grey-color);
    }

    vaadin-grid {
        font: 500 13px "Open Sans", sans-serif;
        /* color: rgb(148, 154, 171); */
        color: var(--ing-mid-grey-color);
        --divider-color: rgb(223, 232, 239);
        --vaadin-grid-body-row-hover-cell {
            background-color: rgb(235,238,246);
        }
      }

    .btn-icon-leaf {
        fill: var(--ing-leaf-color);
    }

    .closeStatusIcon { fill: var(--ing-minus-color);}
    .doneStatusIcon { fill: var(--ing-leaf-color);}
    .doneAllStatusIcon { fill: var(--ing-sky-color);}

    [part~="header-cell"] {
        border-bottom: 1px solid var(--ing-15percent-black-color) !important;
        color: var(--ing-black-color);
    }

    [part~="footer-cell"] {
    border-top: 1px solid var(--ing-15percent-black-color) !important;
    color: var(--ing-black-color);
    }

    [part~="row"]:hover > [part~="body-cell"] {
    background-color: var(--ing-8percent-black-color);
    }

    [part~="cell"] ::slotted(vaadin-grid-cell-content) {
        display: block;
        width: 100%;
        box-sizing: border-box;
        overflow: hidden;
        text-overflow: clip;
    }

    #addScheduleToast {
        --paper-toast-background-color: var(--ing-8percent-black-color);
        --paper-toast-color: var(--ing-black-color);
        /* margin-left: calc(var(--borsuk-sidebar-width) + 25px); */
        top: 25% !important;
        left: 40% !important;
        max-width: 550px !important;
        max-height: 415px !important;
        /* margin-bottom: 25vh; */
    }

    .searchToastBody {
        width: 500px;
        min-height: 250px;
    }

    .version-grid-details {
        display: flex;
        justify-content: space-around;
        align-items: center;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14);
        font-size: 20px;
    }

    .tg  {
        border-collapse: collapse;
        border-spacing: 0;
        width: 100%;
    }
    .tg td {
        font-family:Arial, sans-serif;
        font-size: .7rem;
        padding: 5px 5px;
        border-style: solid;
        border-width: 0px;
        overflow: hidden;
        word-break: normal;
        border-color: white;
        background: #fafafa;
        color:#444;
    }
    .tg th {
        font-family: Arial, sans-serif;
        font-size: .7rem;
        font-weight: normal;
        padding: 10px 5px;
        border-style: solid;
        border-width: 0px;
        overflow: hidden;
        word-break: normal;
        border-bottom-width: 2px;
        border-color: white;
        background: #f6f6f6;
    }
    .tg .tg-cly0, .tg .tg-cly1, .tg .tg-cly2 {
        vertical-align: middle;
    }
    .tg .tg-cly0 {
        border-right-width: 2px;
    }
    .tg .tg-cly1 {
        border-left-width: 2px;
        border-right-width: 2px;
    }
    .tg .tg-cly2 {
        border-left-width: 2px;
    }

    .containerVersions {
        margin-top: 20px;
        padding: 0 !important;
        width: 100%;
    }

    .container-fluid .card {
        box-shadow: rgba(0, 0, 0, 0.14) 0px 1px 4px 0px;
        margin-bottom: 30px;
        margin-top: 30px;
    }

    .text-center {
        text-align: center !important;
    }

    .card .card-header {
        background: linear-gradient(60deg, #525199, #525199) !important;
        box-shadow: 0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(96, 166, 218, 0.4) !important;
        border-radius: 5px;
    }

    #versionsList .card .card-header {
        padding: 15px;
    }



    .container-fluid {
        padding-right: 0px;
        padding-left: 0px;
        margin-right: 0px;
        margin-left: 0px;
        /* width: 98%; */
    }

    .card {
        /* width: 100%; */
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
        padding: 0.9375rem 0;
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
        padding: 7px 5px;
        margin: 0px 15px;
        color: white;
    }

    .card .card-header-warning {
        background: linear-gradient(60deg, #525199, #525199);
        box-shadow: 0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(96, 166, 218, 0.4);
    }

    .card .card-footer {
        display: flex;
        align-items: center;
        background-color: transparent;
        border: 0;
        font-size: 0.875rem;
    }

    .flexbuttons {
        bottom: 0;
        margin: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .btn {
        margin: 0 5px;
    }
`;
