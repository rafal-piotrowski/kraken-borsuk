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
    addVersionAction, publishTestAction, publishProdAction, approveSubofferAction } from '../properties/actions.js';

import './collections/borsuk-form-buttons.js';
import './collections/borsuk-preloader.js'
import './collections/borsuk-suboffer-status.js';
import './collections/borsuk-versions-list.js';
import './collections/borsuk-publications-list.js';
import './collections/borsuk-dialog.js';

import { titles } from '../properties/titles.js';

// konektor służący podłączaniu się do store-a
import { connect } from 'pwa-helpers/connect-mixin.js';

// podłączenie do Redux store.
import { store } from '../redux/store.js';

// załadowanie kreatorów akcji.
import { setClickAction } from '../redux/actions/customevents.js';

import customevents, { actionClickSelector, actionParamSelector } from '../redux/reducers/customevents.js';
import { cesubofferPageReselector, getActivePage, getActiveSlot, ceBtnsFlagsReselector } from '../redux/reducers/cesuboffer.js';

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
            ${this.headerTemplate}
            ${this.formInputTemplate}
            ${this.versionsListTemplate}
            ${this.publicationsListTemplate}
            <borsuk-dialog  id="dialogWindow" 
                            @confirm-dialog-fired=${this.confirmModal} 
                            @cancel-dialog-fired=${this.cancelModal}>
            </borsuk-dialog>
        `;
    }

    get headerTemplate() {
        return html`
            <div class="formGrid formGrid2 inputFrame">
                ${this.navigationTamplete}
                ${this.statusTemplate}
            </div>
        `;
    }

    get navigationTamplete() {
        return html`
            <div class="gridButtons formGrid6">
                ${this.formButtons.map(i => html`<borsuk-form-buttons .valuesButton="${i}"></borsuk-form-buttons>`)}
            </div>
        `;
    }

    get statusTemplate() {
        return html`
            <div class="rightProgressBar formSpanGrid1">
                <borsuk-suboffer-status></borsuk-suboffer-status>
            </div>
        `;
    }

    get formInputTemplate() {
        return html`<borsuk-suboffer-input-form id="subofferInputForm"></borsuk-suboffer-input-form>`;
    }

    get versionsListTemplate() {
        return html`<borsuk-versions-list id="scheduleWindows" class="flexWindows"></borsuk-versions-list>`;
    }

    get publicationsListTemplate() {
        return html`<borsuk-publications-list id="publicationWindows" class="flexWindows"></borsuk-publications-list>`;
    }

    static get properties() {
        return {
            active: { type: Boolean },
            _page: { type: String },
            _slot: { type: String },
            subofferFormContent: { type: String },
            formButtons: { type: Array },
            buttonsFlags: { type: Array },
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
        if (this.buttonsFlags !== ceBtnsFlagsReselector(state)) { 
            this.buttonsFlags = ceBtnsFlagsReselector(state); 

            // ustawienia aktywnosci przyciskow
            for (let i=0; i < this.formButtons.length; i++) {
                this.formButtons[i].buttonActive = 
                    (Object.values(this.buttonsFlags).filter(button => button.buttonId === this.formButtons[i].buttonId).length > 0) ?
                    Object.values(this.buttonsFlags).filter(button => button.buttonId === this.formButtons[i].buttonId)[0].buttonFlg : true;
            }
        }

        this._page = getActivePage(state);
        this._slot = getActiveSlot(state);
    }

    validateSuboffer(state, page) {
        const validateStatus = this.shadowRoot.getElementById("subofferInputForm").validateForm(page);
        if (validateStatus) {
            this.saveSuboffer(state, page);
        } else {
            this.shadowRoot.getElementById('dialogWindow').openDialog('A',"", titles.get('errorFormLabel'), "");
        }
    }

    saveSuboffer(state, param) {
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

    confirmModal() {}
    
    cancelModal() {}

}
