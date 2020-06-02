/* eslint-disable prefer-object-spread */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-const */
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
import { BorsukVersionFormStyle } from './BorsukVersionFormStyle.js';
import { borsukAddSuboffer, borsukAddVersion, borsukApprove, borsukCopySuboffer, borsukCopyVersion, 
    borsukPublishTest, borsukPublishProd, borsukPublic, borsukChevronDown, borsukChevronUp,
    borsukRemoveSuboffer, borsukRemoveVersion, borsukSaveSuboffer, borsukSaveVersion } from '../icons/icons.js';
import { saveSubofferAction, removeSubofferAction, copySubofferAction, 
    addVersionAction, publishTestAction, publishProdAction, validateVersionAction,
    saveVersionAction, removeVersionAction, copyVersionAction, approveVersionAction } from '../properties/actions.js';

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
import { cesubofferPageReselector } from '../redux/reducers/cesuboffer.js';

export class BorsukVersionForm extends connect(store)(LitElement) {
    static get styles() {
        return [BorsukVersionFormStyle];
    }

    render() {
        return html`
            <div id="contentForSuboffer">
                ${until(this.versionFormContent, html`<borsuk-preloader></borsuk-preloader>`)}
            </div>  
        `;
    }

    get versionFormTemplate() {
        return html`
            <div class="formGrid formGrid2 inputFrame">
                <div class="gridButtons formGrid6">
                    ${this.navigationTamplete}
                </div>

                <div class="rightProgressBar formSpanGrid1">
                    <span id="progress-value" class="progressBarValue">opublikowana na produkcji</span>
                    <!-- {{sdetail.sdStatusLabel}} -->
                    <vaadin-progress-bar id="progress-bar-custom-bounds" min="0" max="5" value="4"></vaadin-progress-bar>
                    <!-- {{sdetail.sdStatusId}} -->
                </div>
            </div>
            <borsuk-version-input-form id="versionInputForm"
                                        .versionDetails="${JSON.stringify(this.versionDetails)}">
            </borsuk-version-input-form>
        `;
    }

    get navigationTamplete() {
        return html`${this.formButtons.map(i => html`<borsuk-form-buttons .valuesButton="${i}" .subofferId="${this._page}"></borsuk-form-buttons>`)}`;
    }

    static get properties() {
        return {
            active: { type: Boolean },
            _page: { type: String },
            _slot: { type: String },
            versionFormContent: { type: String },
            formButtons: { type: Array },
        };
    }

    constructor() {
        super();

        this.formButtons = [{
            buttonId: validateVersionAction,
            buttonTooltip: 'Zapisz wersję',
            buttonIcon: borsukSaveVersion,
            buttonActive: true,
            buttonList: [{
            }],
        },{
            buttonId: removeVersionAction,
            buttonTooltip: 'Usuń wersję',
            buttonIcon: borsukRemoveVersion,
            buttonActive: true,
            buttonList: [{
            }],
        },{
            buttonId: copyVersionAction,
            buttonTooltip: 'Kopiuj wersję',
            buttonIcon: borsukCopyVersion,
            buttonActive: true,
            buttonList: [{
            }],
        },{
            buttonId: approveVersionAction,
            buttonTooltip: 'Zaakceptuj wersję',
            buttonIcon: borsukApprove,
            buttonActive: true,
            buttonList: [{
            }],
        }];
    }

    firstUpdated() {
        this.versionFormContent = new Promise((resolve) => {
            setTimeout(() => resolve(this.versionFormTemplate), 2000);
        });
    }

    shouldUpdate() {
        return this.active;
    }

    stateChanged(state) {
        if (actionClickSelector(state) === validateVersionAction) { this.validateVersion(state, this._page); }
        this._page = state.cesuboffer.page;
        this._slot = state.cesuboffer.slot;
    }

    validateVersion(state, param) {
        // IF validation OK
        let formInfo = [];
        for(let i = 0; i < Object.keys(cesubofferPageReselector(state)).length; i++){
            formInfo.push({ versionName: cesubofferPageReselector(state)[i].versionName, 
                            pushAndSms: cesubofferPageReselector(state)[i].pushAndSms
                        });
        }
        
        if (!param) {
            this.formElements = Object.assign({formValues: formInfo});
        } else {
            this.formElements = Object.assign({pageId: param}, {formValues: formInfo});
        }
        store.dispatch(setClickAction(saveVersionAction, this.formElements));
    }

}
