import { css } from 'lit-element';

export const BorsukMenuStyle = css`

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

    .inputGrid {
        display: grid;
        justify-items: center;
        align-items: center;
    }

    .formSpanGrid12 {
        grid-column: span 12 / auto;
    }

    .formSpanGrid6 {
        grid-column: span 6 / auto;
    }

    .menuOption {
        min-height: 200px;
        box-shadow: var(--paper-material-elevation-2_-_box-shadow);
        border-radius: 5px 5px 5px 5px;
        background-color: white;
    }
    :host {
        --shadow-elevation-4dp_-_box-shadow:  0 4px 5px 0 rgba(0, 0, 0, 0.14),
                0 1px 10px 0 rgba(0, 0, 0, 0.12),
                0 2px 4px -1px rgba(0, 0, 0, 0.4);

        --paper-material-elevation-2_-_box-shadow:  var(--shadow-elevation-4dp_-_box-shadow);

    }

    #navbarApp {
        width: 100%;
    }

    #menuLayout {
        margin-top: 100px;
        padding-left: 50px;
        padding-right: 50px;
    }

    #mainMenuContainer { 
        height: auto;
        background-image: url('/src/img/borsuk-background-70.jpg');
        background-repeat: no-repeat;
        background-position: center center;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
        background-attachment: fixed;
    }

    @media (max-width: 991px) {
        .formSpanGrid6 { grid-column: span 12 / auto; }
    }

    @media (min-width: 1280px) {
        #mainMenuContainer { 
            min-height: 600px;
        }
    }

    @media (min-width: 1440px) {
        #mainMenuContainer { 
            min-height: 768px;
        }
    }

    @media (min-width: 1600px) {
        #mainMenuContainer { 
            min-height: 900px;
        }
    }

    @media (min-width: 1920px) {
        #mainMenuContainer { 
            min-height: 1080px;
        }
    }

    @media (min-width: 2560px) {
        #mainMenuContainer { 
            min-height: 1340px;
        }
    }

    #footLayout {
        min-height: 50px;
    }
    
    .my-ghost-class {
        background-color: rgb(27, 105, 141);
    }
      
    .my-chosen-class {
        background-color: rgb(0,0,0, .5);
        /* color: white; */
    }

    .my-chosen-class .infoGrid p {
        color: white;
    }
      
    .my-drag-class {
        /* background-color: rgb(141, 101, 27); */
        opacity: 0;
    }

    /*************** main menu option ****************/

    .optionContainer {
        display: grid;
        width: 90%;
        grid-template-columns: repeat(12, 1fr);
        grid-template-rows: repeat(auto-fit, 1fr);
    }
    .headContainer {
        align-self: start;
        min-height: 50px;
    }
    .bodyContainer {
        align-self: end;
        padding-bottom: 10px;
        /* min-height: 200px;*/
    }
    .optionHeader {
        grid-column: 1 / span 9;
        grid-row: 1;
        height: 70px;
        justify-self: start;
        align-self: start;
    }
    .buttonHeader {
        grid-column: span 3 / 13;
        height: 70px;
        /* margin-top: 20px; */
        padding: 10px 0 0 10px;
        justify-self: start;
        align-self: start;
    }
    .box {
        grid-column: 1 / span 9;
        align-self: end;
        /* border-top: 1px lightgrey solid; */
        /* min-height: 50px; */
        padding: 10px 0 0 10px;
    }
    .buttonBox {
        grid-column: span 3 / 13;
        align-self: end;
        /* border-top: 1px lightgrey solid; */
        /* min-height: 50px;*/
        padding: 10px 0 0 10px;
    }
    .optionFooter {
        grid-column: 1;
        grid-row: span 1 / auto;
        height: 10px;
    }

    .formGrid12 {
        grid-template-columns: repeat(12, 1fr);
    }

    .mainOptionsGrid {
        display: grid;
        gap: 25px;
    }

    .list-group {
        /* display: flex; */
        flex-direction: column;
        /* padding-left: 0; */
        margin-bottom: 0;
    }

    .inputFrame {
        padding: 20px 5px;
    }

`; 