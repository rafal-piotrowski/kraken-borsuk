/* eslint-disable no-unused-vars */

import { LitElement, html, css } from 'lit-element';

export const BorsukCampFormStyle = css`
    .inputFrame {
        padding: 20px 5px;
    }

    .formGrid2 {
        grid-template-columns: repeat(2, 1fr);
    }

    .formGrid {
        display: grid;
        grid-gap: 5px;
    }

    .gridButtons {
        display: grid;
        justify-items: center;
        align-items: center;
    }

    .formGrid6 {
        grid-template-columns: repeat(6, 1fr);
    }

    .rightProgressBar {
        display: grid;
        justify-items: left;
        align-items: left;
        /* padding: 10px; */
    }

    .formSpanGrid1 {
        grid-column: span 1 / auto;
    }

    :host([unsaved]) #contentForSuboffer {
        padding: 5px;
        border: 1px solid rgba(255,0,0,0.5);
        border-radius: 5px;
        box-shadow: 0px 0px 5px 1px rgba(255,0,0,0.5);
    }

    #pagePaginator {
        position: fixed;
        left: 50%;
        bottom: 0;
        /* width: 100%; */
        background-color: rgba(255,255,255,0.9);
        border-radius: 10px;
        padding: 0 10px;
        /* color: white; */
        text-align: center;
    }

    .footer {
        padding-bottom: 50px;
    }
    
`;
