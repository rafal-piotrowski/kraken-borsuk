/* eslint-disable no-unused-vars */

import { LitElement, html, css } from 'lit-element';

export const BorsukSubofferFormStyle = css`
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

    .flexWindows {
        display: flex;
        justify-content: space-between;
    }
`;
