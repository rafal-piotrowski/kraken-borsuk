/* eslint-disable prefer-template */
/* eslint-disable no-undef */
/* eslint-disable lit/no-invalid-html */
/* eslint-disable no-useless-constructor */
/* eslint-disable spaced-comment */
/* eslint-disable no-lone-blocks */
/* eslint-disable babel/no-unused-expressions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/order */
/* eslint-disable lit/binding-positions */
/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */

import { LitElement, html, css } from 'lit-element';
import { render } from 'lit-html';
import { styleMap } from 'lit-html/directives/style-map';
import { BorsukColorsToastStyle } from './BorsukColorsToastStyle.js';

import '@polymer/paper-toast';
import '@polymer/paper-dialog';
import '@polymer/paper-button';
import '@polymer/paper-input/paper-input';
import '../../packages/borsuk-button.js';

import { events } from '../../../properties/events.js';
import { titles } from '../../../properties/titles.js';

// konektor do store-a
import { connect } from 'pwa-helpers/connect-mixin.js';

// podłączenie do Redux store.
import { store } from '../../../redux/store.js';

export class BorsukColorsToast extends connect(store)(LitElement) {

    static get styles() {
        return [BorsukColorsToastStyle];
    }

    firstUpdated() {
        super.firstUpdated();
    }

    render() {
        return html`
            <paper-dialog id="addColorToast" duration="0" text="">
                <div class="searchToastBody quillToastColorBody">
                    <div class="titleNav">
                        <div class="filterHeader"><h4>Wybierz kolor czcionki</h4></div>
                    </div>
                    <hr/>
                    <div class="details-cell formGrid formGrid7">

                        ${this.colorDetails.map(cdetail => html`
                            <div class="framedQuill">
                                <div style=${styleMap({background: cdetail.colorHex})} id="${cdetail.colorName}" class="formSpanGrid1 singleQuill" @click=${() => this.setChosenColor(cdetail.colorHex)}></div>
                                <paper-tooltip  id="${cdetail.colorName}Tooltip" for="${cdetail.colorName}"><p>${cdetail.colorDesc}</p><p>${cdetail.colorHex}</p></paper-tooltip>
                            </div>
                        `)}

                        <div class="formSpanGrid7 quillSeparator"></div>

                    </div>

                    <div class="quillToastButtons">
                        <borsuk-button white @click=${this.quitColorToast} class="btn btn-warning">Anuluj</borsuk-button>
                    </div>
                </div>
            </paper-dialog>`;
    }

    stateChanged(state) {
        // this._page = state.cesuboffer.page;
        // this._slot = state.cesuboffer.slot;
    }

    openToast() {
        this.shadowRoot.getElementById("addColorToast").open();
    }

    quitColorToast() {
        this.shadowRoot.getElementById("addColorToast").toggle();
    }

    setChosenColor(colorHex) {
        this.quitColorToast();
        this.dispatchEvent(new CustomEvent('ev-confirm-color-chosen', { detail: { chosenColor: colorHex } }));
    }

    static get properties() {
        return {
            colorDetails: { type: Array }
        }
    }

    constructor() {
        super();
        this.colorDetails =  [{
            colorId: 1,
            colorType: 'podstawowy',
            colorName: 'quillOrangeColor',
            colorDesc: 'podstawowy Orange',
            colorSpec: '--ing-orange-color',
            colorHex: '#FF6200',
            colorRgb: '255,98,0',
            colorCmyk: '0,70,100,0',
        }, {
            colorId: 2,
            colorType: 'podstawowy',
            colorName: 'quillWhiteColor',
            colorDesc: 'podstawowy White',
            colorSpec: '--ing-white-color',
            colorHex: '#FFFFFF',
            colorRgb: '255,255,255',
            colorCmyk: '0,0,0,0',
        }, {
            colorId: 3,
            colorType: 'podstawowy',
            colorName: 'quill8pBlackColor',
            colorDesc: 'podstawowy 8% Black',
            colorSpec: '--ing-8percent-black-color',
            colorHex: '#F0F0F0',
            colorRgb: '240,240,240',
            colorCmyk: '0,0,0,8',
        }, {
            colorId: 4,
            colorType: 'podstawowy',
            colorName: 'quill15pBlackColor',
            colorDesc: 'podstawowy 15% Black',
            colorSpec: '--ing-15percent-black-color',
            colorHex: '#D9D9D9',
            colorRgb: '217,217,217',
            colorCmyk: '0,0,0,15',
        }, {
            colorId: 5,
            colorType: 'podstawowy',
            colorName: 'quillLightGreyColor',
            colorDesc: 'podstawowy Light Grey',
            colorSpec: '--ing-light-grey-color',
            colorHex: '#A8A8A8',
            colorRgb: '168,168,168',
            colorCmyk: '0,0,0,40',
        }, {
            colorId: 6,
            colorType: 'podstawowy',
            colorName: 'quillMidGreyColor',
            colorDesc: 'podstawowy Mid Grey',
            colorSpec: '--ing-mid-grey-color',
            colorHex: '#767676',
            colorRgb: '118,118,118',
            colorCmyk: '0,0,0,60',
        }, {
            colorId: 7,
            colorType: 'podstawowy',
            colorName: 'quillBlackColor',
            colorDesc: 'podstawowy Black',
            colorSpec: '--ing-black-color',
            colorHex: '#333333',
            colorRgb: '51,51,51',
            colorCmyk: '0,0,0,80',
        }, {
            colorId: 8,
            colorType: 'dodatkowy',
            colorName: 'quillMinusColor',
            colorDesc: 'dodatkowy Minus',
            colorSpec: '--ing-minus-color',
            colorHex: '#FF0000',
            colorRgb: '255,0,0',
            colorCmyk: '0,100,100,0',
        }, {
            colorId: 9,
            colorType: 'dodatkowy',
            colorName: 'quillLeafColor',
            colorDesc: 'dodatkowy Leaf',
            colorSpec: '--ing-leaf-color',
            colorHex: '#349651',
            colorRgb: '52,150,81',
            colorCmyk: '90,0,100,25',
        }, {
            colorId: 10,
            colorType: 'dodatkowy',
            colorName: 'quillLimeColor',
            colorDesc: 'dodatkowy Lime',
            colorSpec: '--ing-lime-color',
            colorHex: '#D0D93C',
            colorRgb: '208,217,60',
            colorCmyk: '25,0,100,0',
        }, {
            colorId: 11,
            colorType: 'dodatkowy',
            colorName: 'quillFuchsiaColor',
            colorDesc: 'dodatkowy Fuchsia',
            colorSpec: '--ing-fuchsia-color',
            colorHex: '#AB0066',
            colorRgb: '171,0,102',
            colorCmyk: '0,100,10,20',
        }, {
            colorId: 12,
            colorType: 'dodatkowy',
            colorName: 'quillSkyColor',
            colorDesc: 'dodatkowy Sky',
            colorSpec: '--ing-sky-color',
            colorHex: '#60A6DA',
            colorRgb: '96,166,218',
            colorCmyk: '70,0,0,0',
        }, {
            colorId: 13,
            colorType: 'dodatkowy',
            colorName: 'quillIndigoColor',
            colorDesc: 'dodatkowy Indigo',
            colorSpec: '--ing-indigo-color',
            colorHex: '#525199',
            colorRgb: '82,81,153',
            colorCmyk: '90,80,0,0',
        }, {
            colorId: 14,
            colorType: 'dodatkowy',
            colorName: 'quillF1Color',
            colorDesc: 'Dom i rachunki',
            colorSpec: '--ing-f1-color',
            colorHex: '#4B53AF',
            colorRgb: '75,83,175',
            colorCmyk: '80,74,0,0',
        }, {
            colorId: 15,
            colorType: 'dodatkowy',
            colorName: 'quillF2Color',
            colorDesc: 'Odzież i obuwie',
            colorSpec: '--ing-f2-color',
            colorHex: '#21C7ED',
            colorRgb: '33,199,237',
            colorCmyk: '68,0,13,0',
        }, {
            colorId: 16,
            colorType: 'dodatkowy',
            colorName: 'quillF3Color',
            colorDesc: 'Finanse',
            colorSpec: '--ing-f3-color',
            colorHex: '#008E91',
            colorRgb: '0,142,145',
            colorCmyk: '83,0,40,11',
        }, {
            colorId: 17,
            colorType: 'dodatkowy',
            colorName: 'quillF4Color',
            colorDesc: 'Podróże i rozrywka',
            colorSpec: '--ing-f4-color',
            colorHex: '#E07710',
            colorRgb: '224,119,16',
            colorCmyk: '0,62,95,0',
        }, {
            colorId: 18,
            colorType: 'dodatkowy',
            colorName: 'quillF5Color',
            colorDesc: 'Edukacja',
            colorSpec: '--ing-f5-color',
            colorHex: '#F74F80',
            colorRgb: '247,79,128',
            colorCmyk: '0,83,16,0',
        }, {
           colorId: 19,
            colorType: 'dodatkowy',
            colorName: 'quillF6Color',
            colorDesc: 'Samochód i transport',
            colorSpec: '--ing-f6-color',
            colorHex: '#5FC634',
            colorRgb: '95,198,52',
            colorCmyk: '77,0,100,0',
        }, {
            colorId: 20,
            colorType: 'dodatkowy',
            colorName: 'quillF7Color',
            colorDesc: 'Wydatki podstawowe',
            colorSpec: '--ing-f7-color',
            colorHex: '#009FEF',
            colorRgb: '0,159,239',
            colorCmyk: '85,21,0,0',
        }, {
            colorId: 21,
            colorType: 'dodatkowy',
            colorName: 'quillF8Color',
            colorDesc: 'Gotówka',
            colorSpec: '--ing-f8-color',
            colorHex: '#FFA81D',
            colorRgb: '255,168,29',
            colorCmyk: '0,22,100,2',
        }, {
            colorId: 22,
            colorType: 'dodatkowy',
            colorName: 'quillF9Color',
            colorDesc: 'Zdrowie i uroda',
            colorSpec: '--ing-f9-color',
            colorHex: '#9D64B5',
            colorRgb: '157,100,181',
            colorCmyk: '47,72,0,0',
        }, {
            colorId: 23,
            colorType: 'dodatkowy',
            colorName: 'quillF10Color',
            colorDesc: 'Pozostałe',
            colorSpec: '--ing-f10-color',
            colorHex: '#BC1D5E',
            colorRgb: '188,29,94',
            colorCmyk: '0,100,50,0',
        }, {
            colorId: 24,
            colorType: 'kontrastowy',
            colorName: 'quillOliveContrast',
            colorDesc: 'kontrastowy Olive',
            colorSpec: '--ing-olive-contrast',
            colorHex: '#808000',
            colorRgb: '128,128,0',
            colorCmyk: '',
        }, {
            colorId: 25,
            colorType: 'kontrastowy',
            colorName: 'quillBlackContrast',
            colorDesc: 'kontrastowy Black',
            colorSpec: '--ing-black-contrast',
            colorHex: '#000000',
            colorRgb: '0,0,0',
            colorCmyk: '',
        }, {
            colorId: 26,
            colorType: 'kontrastowy',
            colorName: 'quillYellowContrast',
            colorDesc: 'kontrastowy Yellow',
            colorSpec: '--ing-yellow-contrast',
            colorHex: '#FFFF00',
            colorRgb: '255,255,0',
            colorCmyk: '',
        }]
    }
}
