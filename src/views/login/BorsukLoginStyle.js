import { css } from 'lit-element';

export const BorsukLoginStyle = css`

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
    }

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

    .login-wrapper {
        display: flex;
        height: 100vh;
        background-image: url('/src/img/borsuk-wide2b.jpg');
        background-repeat: no-repeat;
        background-position: top center;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
        background-attachment: fixed; 
    }
 
    .errfix {
        visibility: var(--my-elem-visibility);
        position: fixed;
        bottom: 0;
        left: calc(50% - (var(--width-errfix)/2));
        width: var(--width-errfix);
        height: var(--height-errfix);
        z-index: 0;
        text-align: right;
        color: var(--ing-8percent-black-color);
        text-shadow: 1px 1px 0px var(--ing-minus-color);
        font-size: .875rem;
        box-sizing: border-box;
    }
 
    .errfix iron-icon {
        margin: 0 238px;
    }
 
    .error__text {
        padding-top: 10px;
        text-align: center;
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
        min-width: 992px !important;
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
 
    #form {
        margin-bottom: 30px;
        padding: 0 50px;
    }
 
`; 