/* eslint-disable no-unused-vars */

import { LitElement, html, css } from 'lit-element';

export const BorsukPreloaderStyle = css`
    :host {
    }

    .loadingList {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: auto;
        grid-template-areas:
                "listheader listheader listheader"
                ". listcircle ."
                "listtext listtext listtext"
                "listfooter listfooter listfooter";
        height: 80vh;
    }

    .loadingList .listCircle {
        grid-area: listcircle;
        justify-self: center;
        align-self: center;
    }

    .loadingList .listCircle paper-spinner {
        width:50px;
        height:50px;
    }

    .loadingList .listText {
        grid-area: listtext;
        justify-self: stretch;
        align-self: start;
        text-align: center;
    }

    .loadingList .listText h4 {
        color: grey;
    }

`;
