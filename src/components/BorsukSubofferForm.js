/* eslint-disable prefer-object-spread */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-const */
/* eslint-disable no-else-return */
/* eslint-disable babel/no-unused-expressions */
/* eslint-disable arrow-body-style */
/* eslint-disable getter-return */
/* eslint-disable import/named */
/* eslint-disable lit/no-legacy-template-syntax */
/* eslint-disable import/order */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-undef */
/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */

import { LitElement, html, css } from 'lit-element';
import { until } from 'lit-html/directives/until';
import { BorsukSubofferFormStyle } from './BorsukSubofferFormStyle.js';
import { borsukAddSuboffer, borsukAddVersion, borsukApprove, borsukCopySuboffer, borsukCopyVersion, 
    borsukPublishTest, borsukPublishProd, borsukPublic, borsukChevronDown, borsukChevronUp,
    borsukRemoveSuboffer, borsukRemoveVersion, borsukSaveSuboffer, borsukSaveVersion } from '../icons/icons.js';
import { saveSubofferAction, validateSubofferAction, removeSubofferAction, copySubofferAction, 
    addVersionAction, publishTestAction, publishProdAction } from '../properties/actions.js';

import '@vaadin/vaadin-progress-bar/vaadin-progress-bar';
import './collections/borsuk-form-buttons.js';
import './collections/borsuk-preloader.js'

// konektor służący podłączaniu się do store-a
import { connect } from 'pwa-helpers/connect-mixin.js';

// podłączenie do Redux store.
import { store } from '../redux/store.js';

// załadowanie kreatorów akcji.
import { setClickAction } from '../redux/actions/customevents.js';

import customevents, { actionClickSelector, actionParamSelector } from '../redux/reducers/customevents.js';
import { cesubofferPageReselector, getActivePage, getActiveSlot } from '../redux/reducers/cesuboffer.js';

export class BorsukSubofferForm extends connect(store)(LitElement) {
    static get styles() {
        return [BorsukSubofferFormStyle];
    }

    render() {
        return html`
            <div id="contentForSuboffer">
                ${until(this.subofferFormContent, html`<borsuk-preloader></borsuk-preloader>`)}
            </div>  
        `;
    }

    get subofferFormTemplate() {
        return html`
            <div class="formGrid formGrid2 inputFrame">
                <div class="gridButtons formGrid6">
                    ${this.navigationTamplete}
                </div>

                <div class="rightProgressBar formSpanGrid1">
                    <span id="progress-value" class="progressBarValue">trwa publikacja na TEST</span>
                    <!-- {{sdetail.sdStatusLabel}} -->
                    <vaadin-progress-bar id="progress-bar-custom-bounds" min="0" max="5" value="4" indeterminate></vaadin-progress-bar>
                    <!-- {{sdetail.sdStatusId}} -->
                </div>
            </div>
            <borsuk-suboffer-input-form id="subofferInputForm"></borsuk-suboffer-input-form>
        `;
    }

    get navigationTamplete() {
        return html`${this.formButtons.map(i => html`<borsuk-form-buttons .valuesButton="${i}"></borsuk-form-buttons>`)}`;
    }

    static get properties() {
        return {
            active: { type: Boolean },
            _page: { type: String },
            _slot: { type: String },
            subofferFormContent: { type: String },
            formButtons: { type: Array },
            productGroupDict: { type: Array },
        };
    }

    constructor() {
        super();

        this.formButtons = [{
            buttonId: validateSubofferAction,
            buttonTooltip: 'Zapisz subofertę',
            buttonIcon: borsukSaveSuboffer,
            buttonActive: true,
            buttonList: [{
            }],
        },{
            buttonId: removeSubofferAction,
            buttonTooltip: 'Usuń subofertę',
            buttonIcon: borsukRemoveSuboffer,
            buttonActive: true,
            buttonList: [{
            }],
        },{
            buttonId: copySubofferAction,
            buttonTooltip: 'Kopiuj subofertę',
            buttonIcon: borsukCopySuboffer,
            buttonActive: true,
            buttonList: [{
            }],
        },{
            buttonId: addVersionAction,
            buttonTooltip: 'Dodaj wersję',
            buttonIcon: borsukAddVersion,
            buttonActive: true,
            buttonList: [{
            }],
        },{
            buttonId: publishTestAction,
            buttonTooltip: 'Publikuj na teście',
            buttonIcon: borsukPublishTest,
            buttonActive: true,
            buttonList: [{
            }],
        },{
            buttonId: publishProdAction,
            buttonTooltip: 'Publikuj na produkcji',
            buttonIcon: borsukPublishProd,
            buttonActive: true,
            buttonList: [{
            }],
        }];
    }

    firstUpdated() {
        this.subofferFormContent = new Promise((resolve) => {
            setTimeout(() => resolve(this.subofferFormTemplate), 2000);
        });
    }

    shouldUpdate() {
        return this.active;
    }

    stateChanged(state) {
        if (actionClickSelector(state) === validateSubofferAction) { this.validateSuboffer(state, this._page); }
        this._page = getActivePage(state);
        this._slot = getActiveSlot(state);
    }

    validateSuboffer(state, param) {
        // IF validation OK

        console.log('******************* walidacje ***************');
        console.log(cesubofferPageReselector(state));
        let formInfo = [];
        for(let i = 0; i < Object.keys(cesubofferPageReselector(state)).length; i++){
            formInfo.push({ subofferName: cesubofferPageReselector(state)[i].subofferName, 
                            groupId: cesubofferPageReselector(state)[i].groupId,
                            categoryId: cesubofferPageReselector(state)[i].categoryId,
                            eventId: cesubofferPageReselector(state)[i].eventId
                        });
        }
        
        if (!param) {
            this.formElements = Object.assign({formValues: formInfo});
        } else {
            this.formElements = Object.assign({pageId: param}, {formValues: formInfo});
        }
        store.dispatch(setClickAction(saveSubofferAction, this.formElements));
    }

}
