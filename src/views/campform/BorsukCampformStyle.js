import { css } from 'lit-element';

export const BorsukCampformStyle = css`

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

/****************** SCROLLBAR ********************/
 
    ::-webkit-scrollbar {
        position: absolute !important;
        width: 7px !important;
        height: 7px !important;
        z-index: 1 !important;
        overflow: auto !important;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px #eaeaeA !important;
        border-radius: 10px !important;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #b1adac !important;
        border-radius: 10px !important;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #807E7D !important;
    }

/**********************************************/

    .flex-stretch-align {
        position: relative;
        top: 0px;
        height: 100vh;
    }

    .flex-leftbar {
        position: fixed;
        top: 0px;
        bottom: 0px;
        left: 0px;
        width: var(--borsuk-sidebar-width);
        box-shadow: rgba(0, 0, 0, 0.56) 0px 6px 10px -2px, rgba(0, 0, 0, 0.12) 0px 4px 10px 0px, rgba(0, 0, 0, 0.2) 0px 4px 5px -5px;
        z-index: 5;
    }

    .sidebar {
        transition-property: top, bottom, width;
        transition-duration: 0.2s, 0.2s, 0.35s;
        transition-timing-function: linear, linear, ease;
        background: url("/src/img/Abstract-background-white-12.jpg") left center no-repeat fixed;
    }

    .stretch-right {
        display: flex;
        flex-direction: column;
        padding-left: var(--borsuk-sidebar-width);
        z-index: 1;
    }

    .sidebar .sidebar-wrapper {
        width: 325px;
        padding-bottom: 0px;
        height: 100vh;
        position: relative;
        z-index: 4;
        overflow: auto;
    }

    .flex-navbar {
        display: flex;
        flex-direction: row;
        max-width: 100%;
        height: 80px;
        -ms-flex: 1 1 0.000000001px;
        -webkit-flex: 1;
        flex: 1;
    }

    .flex-content {
        width: 100%;
        padding-top: calc(var(--borsuk-navbar-max-height) - var(--borsuk-navbar-padding-top) - 10px);
        margin-top: 25px;
        flex: 1;
    }

    /* Obsluga informacji o braku RWD */

    @media (min-width: 991px) {
        .drawer {
            display: none;
        }
    }

    @media (max-width: 991px) {
        .wrapper {
            display: none;
        }

        .drawer {
            display: block;
        }

        .flex {
            /*        @apply --layout-horizontal; */
            display: -ms-flexbox;
            display: -webkit-flex;
            display: flex;
            -ms-flex-direction: row;
            -webkit-flex-direction: row;
            flex-direction: row;

            /*        @apply --layout-center; */
            -ms-flex-align: center;
            -webkit-align-items: center;
            align-items: center;
        }

        .container {
            height: 97vh;
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
            margin: 0px;
            padding: 0px;
        }

        .flexcenter .card {
            margin-bottom: 30px;
            margin-top: 30px;
            box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
        }

        .flexformcenter {
            width: 100%;
            height: 80%;
            margin-top: 25px;
        }
    }

`; 