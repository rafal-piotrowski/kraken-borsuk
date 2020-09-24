/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
/* eslint-disable no-lone-blocks */
/* eslint-disable prefer-template */
/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */
/* eslint-disable prefer-const */
/* eslint-disable lit/no-legacy-template-syntax */
/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */

import { LitElement, html, css } from 'lit-element';
import { BorsukDialogStyle } from './BorsukDialogStyle.js';
import '@polymer/paper-dialog/paper-dialog';
import '@polymer/paper-toast/paper-toast';
import '@polymer/iron-icons/iron-icons';
import '@polymer/iron-icon/iron-icon';
import '../../packages/borsuk-button.js';

export class BorsukDialog extends LitElement {
    static get styles() {
        return [BorsukDialogStyle];
    }

    render() {
        return html`
            <paper-dialog class="subofferModalWindow" id="infoDialog" modal>
                <div class="modalFlex">
                    <div class="modalGrid inputGrid formGrid formGrid12">
                        <div class="borsukFace formSpanGrid2">
                            <iron-icon id="dialogIcon"></iron-icon>
                        </div>
                        <div class="borsukInfo formSpanGrid10">
                            <div id="modalInfo">
                                <p id="dialogText1">${this.textDialog1}</p>
                                <div class="modalBox" id="dialogText2">
                                    ${this.textDialog2}
                                </div>
                                <p id="dialogText3">${this.textDialog3}</p>
                            </div>
                        </div>
                    </div>
                    <div class="flexbuttons">
                        <borsuk-button gap id="dialogOkButton" class="btn-modal" @click=${this.confirmDialog} dialog-confirm autofocus>OK</borsuk-button>
                        <borsuk-button white gap id="dialogCancelButton" @click=${this.cancelDialog} dialog-confirm autofocus>Anuluj</borsuk-button>
                    </div>
                </div>
            </paper-dialog>

            <paper-toast id="infoToast"></paper-toast>
        `;
    }

    get dialogText2() {
        return this.shadowRoot.getElementById("dialogText2");
    }

    firstUpdated() {
        console.log('______________________ WOW _____________________');
    }

    openToast(mode, text, jsonToken) {
        let infoToast = this.shadowRoot.getElementById('infoToast');
        if (jsonToken) {
            let jsonTokenToParse = JSON.parse(jsonToken);
           this.toastToken = jsonTokenToParse.tokenKey;
        }
        infoToast.removeAttribute("class");
        infoToast.removeAttribute("text");

        infoToast.setAttribute("class", (mode == 'I') ? "infoToast" : ((mode == 'A') ? "alertToast" : "defaultToast"));
        infoToast.setAttribute("text", text);
        infoToast.open();
    }

    openDialog(mode, textLine1, textLine2, textLine3, jsonToken, scale) {
        let dialogIcon = this.shadowRoot.querySelector('#dialogIcon');
        let dialogCancelButton = this.shadowRoot.querySelector('#dialogCancelButton');
        let modalInfo = this.shadowRoot.querySelector('#modalInfo');
        let dialogText1 = this.shadowRoot.querySelector('#dialogText1');
        let dialogText2 = this.shadowRoot.querySelector('#dialogText2');
        let dialogText3 = this.shadowRoot.querySelector('#dialogText3');

        if (jsonToken) {
            let jsonTokenToParse = JSON.parse(jsonToken);
            this.dialogToken = jsonTokenToParse.tokenKey;
        }

        console.log('_____________________ przyleciał mode: '+mode);

        dialogIcon.setAttribute("class", (mode == 'A') ? 'borsukIcon borsukAlertIcon' : ((mode == 'C') ? 'borsukIcon borsukConfirmIcon' : 'borsukIcon borsukInfoIcon'));
        dialogIcon.setAttribute("icon", "info-outline");

        if (scale) {
            switch (scale) {
                case '1': { modalInfo.setAttribute("class", "fontScale70"); } break;
                case '2': { modalInfo.setAttribute("class", "fontScale80"); } break;
                case '3': { modalInfo.setAttribute("class", "fontScale90"); } break;
                case '4': { modalInfo.setAttribute("class", "fontScale100"); } break;
                case '5': { modalInfo.setAttribute("class", "fontScale110"); } break;
                case '6': { modalInfo.setAttribute("class", "fontScale120"); } break;
                case '7': { modalInfo.setAttribute("class", "fontScale130"); } break;
                case '8': { modalInfo.setAttribute("class", "fontScale140"); } break;
                case '9': { modalInfo.setAttribute("class", "fontScale150"); } break;
                case '10': { modalInfo.setAttribute("class", "fontScale160"); } break;
                default: { modalInfo.removeAttribute("class"); }
            }
        }

        this.textDialog1 = textLine1;
        // this.textDialog2 = textLine2;
        if (textLine2) { this.dialogText2.innerHTML = json2html(JSON.parse(textLine2)); }
        this.textDialog3 = textLine3;

        dialogCancelButton.setAttribute("class", (mode == 'C') ? 'btn btn-warning btn-modal' : 'btn btn-warning btn-modal btn-novisible');

        this.shadowRoot.getElementById('infoDialog').open();
    }

    confirmDialog(event) {
        this.tokenKey = (this.dialogToken) ? this.dialogToken : '';
        this.tokenStatus = true;

        this.tokenValues = JSON.stringify({
            tokenKey: this.tokenKey,
            tokenStatus: this.tokenStatus
        });

        // event.details = {
        //     tokenValues: this.tokenValues
        // }

        this.dispatchEvent(new CustomEvent('confirm-dialog-fired', { detail: { tokenValues: this.tokenValues } }));
    }

    cancelDialog(event) {
        this.tokenKey = (this.dialogToken) ? this.dialogToken : '';
        this.tokenStatus = false;

        this.tokenValues = JSON.stringify({
            tokenKey: this.tokenKey,
            tokenStatus: this.tokenStatus
        });

        // event.details = {
        //     tokenValues: this.tokenValues
        // }

        this.dispatchEvent(new CustomEvent('cancel-dialog-fired', { detail: { tokenValues: this.tokenValues } }));
    }

    static get properties() {
        return {
            prop1: {
                type: String,
                value: 'content-modal'
            },
            information: {
                type: String,
                reflectToAttribute: true,
            },
            textDialog1: {
                type: String,
                reflectToAttribute: true,
                value: ""
            },
            textDialog2: {
                type: String,
                reflectToAttribute: true,
                value: ""
            },
            textDialog3: {
                type: String,
                reflectToAttribute: true,
                value: ""
            },
            toastToken: {
                type: String,
                reflectToAttribute: true,
                value: ""
            },
            dialogToken: {
                type: String,
                reflectToAttribute: true,
                value: ""
            }
        };
    }
}
