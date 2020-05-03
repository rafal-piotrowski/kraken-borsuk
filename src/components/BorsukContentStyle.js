/* eslint-disable no-unused-vars */

import { LitElement, html, css } from 'lit-element';

export const BorsukContentStyle = css`

    #contentTabsForm {
        margin: 5px;
        padding: 5px 20px;
        border-radius: 5px;
    }

    .flex-subcontent {
        display: flex;
        flex-direction: row;
        height: 100%;
        /* margin-top: 60px; */
    }

    .flex-margin {
        width: 15px;
    }

    .flex-midsubcontent {
        left: 0px;
        flex: 1;
    }

   
    .page {
          display: none;
        }

    .page[active] {
        display: block;
    }
`;
