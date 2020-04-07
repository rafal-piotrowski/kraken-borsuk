/* eslint-disable no-unused-vars */

import { LitElement, html, css } from 'lit-element';

export const BorsukContentStyle = css`

    blockquote {
        margin: 0 !important;
    }

    #contentTabsForm {
        margin: 25px;
        padding: 5px 20px;
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.14) 0px 1px 4px 0px;
    }

    .welcomeBox {
        width: 225px;
        height: 134px;
    }   

    .f1_container {
        z-index: 1;
        perspective: 1000;
    }

    .f1_card {
        width: 100%;
        height: 100%;
        transform-style: preserve-3d;
        transition: all 0.5s linear;
    }

    .f1_container:hover .f1_card {
        transform: rotateY(180deg);
    }

    .face {
        position: absolute;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
    }

    .face.back {
        transform: rotateY(180deg);
        box-sizing: border-box;
        padding: 10px;
        color: var(--ing-black-color);
        text-align: center;
        background-color: rgba(255,255,255);
        border: 1px grey solid;
        border-radius: 5px 5px 5px 5px;
        -moz-border-radius: 5px 5px 5px 5px;
        -webkit-border-radius: 5px 5px 5px 5px;
    }

    .welcomeIcon {
        padding: 15px;
        color: var(--ing-orange-color);
    }

    .welcomeBigIcon {
        padding: 15px;
        width: 100px;
        height: 100px;
        color: var(--ing-leaf-color);
    }

    @media (max-width: 1290px) {
        .welcomeContainer {
            width: 700px;
            background: url('../img/newBadgerSkin900.jpg') no-repeat left center;
        }
    }
    @media (max-width: 1150px) {
        .welcomeContainer {
            width: 550px;
            background: url('../img/newBadgerSkin900.jpg') no-repeat left center;
        }
    }

    .welcomeContainer {
        display: grid;
        justify-content: center;
        justify-items: center;
        align-items: center;
        align-content: center;
    }

    .formGridNoGap {
        display: grid;
        width: 900px;
        height: 538px;
        grid-template-columns: repeat(8, 1fr);
        grid-template-rows: repeat(8, 1fr);
    }

    .centerFace {
        display: grid;
        justify-content: center;
        justify-items: center;
        align-items: center;
        align-content: center;
    }

    .centerFrame {
        padding: 20px 0;
    }

    #A { grid-column: 1 / span 8; grid-row: 7 / span 2; background-color: rgba(79,129,189,0.6); }
    #B { grid-column: 1 / span 3; grid-row: 1 / span 3; z-index: 10; background-color: rgba(128,100,162,0.6); }
    #C { grid-column: 2 / span 7; grid-row: 1 / span 2; background-color: rgba(247,150,70,0.6); }
    #D { grid-column: span 3 / 9; grid-row: span 2 / 8; background-color: rgba(155,187,89,0.6); }
    #E { grid-column: 3 / span 4; grid-row: 2 / span 6; z-index: 5; background-color: rgba(192,80,77,0.6); }

    .textareaParallax {
        padding: 25px;
        font-size: 1.5rem;
    }

`;
