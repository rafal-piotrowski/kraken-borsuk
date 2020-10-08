/* eslint-disable no-unused-vars */

import { LitElement, html, css } from 'lit-element';

export const BorsukNavbarStyle = css`

    .navbar {
        /* position: relative; */
        display: flex;
        /* flex-wrap: wrap; */
        align-items: center;
        /* justify-content: space-between; */
        /* padding: 0.5rem 1rem; */

        border: 0;
        border-radius: 3px;
        /* padding: 0.625rem 0; */
        height: auto !important;
        color: #555;
        /* background-color: #fff !important; */
        /* box-shadow: 0 4px 18px 0px rgba(0, 0, 0, 0.12), 0 7px 10px -5px rgba(0, 0, 0, 0.15); */

        /* margin-right: 17px;
        padding: 0; */

        margin: 0 !important;
        padding: 0 !important;
    }

    .navbar-expand-lg {
        flex-flow: row nowrap;
        justify-content: flex-start;
    }

    .navbar.navbar-transparent {
        background-color: transparent !important;
        box-shadow: none;
    }

    .navbar-fixed {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        /* padding-top: var(--borsuk-navbar-padding-top); */
        /* max-height: var(--borsuk-navbar-max-height); */
        z-index: 4;
    }

    .navbar-oper {
        padding-left: var(--borsuk-sidebar-width);
        background: linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,1) 51%, rgba(255,255,255,1) 86%, rgba(255,255,255,0) 100%);
    }

    .navbar-gradient {
        /* margin-left: 0; */
        background: rgba(255,255,255,.7);
        background: -moz-linear-gradient(top, rgba(255,255,255,.5) 0%, rgba(255,255,255,.5) 50%, rgba(255,255,255,.5) 51%, rgba(255,255,255,.4) 71%, rgba(255,255,255,0) 100%);
        background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(255,255,255,.5)), color-stop(50%, rgba(255,255,255,.5)), color-stop(51%, rgba(255,255,255,.5)), color-stop(71%, rgba(255,255,255,.4)), color-stop(100%, rgba(255,255,255,0)));
        background: -webkit-linear-gradient(top, rgba(255,255,255,.5) 0%, rgba(255,255,255,.5) 50%, rgba(255,255,255,.5) 51%, rgba(255,255,255,.4) 71%, rgba(255,255,255,0) 100%);
        background: -o-linear-gradient(top, rgba(255,255,255,.5) 0%, rgba(255,255,255,.5) 50%, rgba(255,255,255,.5) 51%, rgba(255,255,255,.4) 71%, rgba(255,255,255,0) 100%);
        background: -ms-linear-gradient(top, rgba(255,255,255,.5) 0%, rgba(255,255,255,.5) 50%, rgba(255,255,255,.5) 51%, rgba(255,255,255,.4) 71%, rgba(255,255,255,0) 100%);
        background: linear-gradient(to bottom, rgba(255,255,255,.5) 0%, rgba(255,255,255,.5) 50%, rgba(255,255,255,.5) 51%, rgba(255,255,255,.4) 86%, rgba(255,255,255,0) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#ffffff', GradientType=0 );
    }

    .navGrid {
        display: grid;
        justify-items: center;
        align-items: center;
    }

    .mainOptionNav {
        width: 100%;
    }

    .mainOptionsGrid {
        display: grid;
        /* grid-gap: 25px; */
    }

    .formGrid12 {
        grid-template-columns: repeat(12, 1fr);
    }

    .formSpanGrid3 {
        grid-column: span 3 / auto;
    }

    .formSpanGrid6 {
        grid-column: span 6 / auto;
    }

    /* .navIconButton {
        background-color: white;
        color: var(--ing-orange-color);
    } */
    
    .navbar-brand {
        display: inline-block;
        white-space: nowrap;
        /* padding-left: 25px; */
    }

    .navbar .navbar-brand {
        position: relative;
        color: inherit;
        height: auto;
        font-size: 1.125rem;
        line-height: 30px;
        font-weight: 300;
        padding: 1rem;
    }

    .logo {
        display: flex;
        flex-direction: row;
        vertical-align: middle !important;
        padding: 10px 0;
        margin: 0;
    }

    .logo .img {
        height: 70px;
        padding-left: 15px;
    }

    .logo img {
        height: 70px;
        padding-left: 15px;
    }

    .inputGrid {
        display: grid;
        justify-items: center;
        align-items: center;
    }

    .buttonsGrid {
        justify-items: center;
        align-items: center;
    }

    .inputFrame {
        padding: 20px 5px;
    }

    .container-fluid {
        flex-wrap: nowrap;
        padding-right: 0px;
        padding-left: 0px;
        margin-right: 0px;
        margin-left: 0px;
    }

    .flex-navbar {
        display: flex;
        flex-direction: row;
        max-width: 100%;
        height: 80px;
        flex: 1;
    }

    .logo {
        display: flex;
        flex-direction: row;
        vertical-align: middle !important;
        margin: 0px;
    }

    .flex-navbar .logo {
        /* padding: 14px 20px 12px; */
    }

    .navbar-brand-oper {
        padding-left: 25px;
        display: inline-block;
        padding-top: 0.3125rem;
        font-size: 1.25rem;
        line-height: inherit;
        white-space: nowrap;
    }

    #filterLayout {
        padding-right: 25px;
    }

    .flexpaper {
        display: flex;
        justify-content: right;
    }

    .buttonsOper {
        padding-top: 10px;
    }

    .sidewrpbtn {
        padding: 20px 0 0 20px;
    }

    #invokericon {
        fill: #ff6200;
    }
`;
