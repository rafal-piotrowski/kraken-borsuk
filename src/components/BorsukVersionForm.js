/* eslint-disable arrow-body-style */
/* eslint-disable no-else-return */
/* eslint-disable consistent-return */
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
import { render } from 'lit-html';
import { BorsukVersionFormStyle } from './BorsukVersionFormStyle.js';
import { borsukAddSuboffer, borsukAddVersion, borsukApprove, borsukCopySuboffer, borsukCopyVersion, 
    borsukPublishTest, borsukPublishProd, borsukPublic, borsukChevronDown, borsukChevronUp,
    borsukRemoveSuboffer, borsukRemoveVersion, borsukSaveSuboffer, borsukSaveVersion } from '../icons/icons.js';
import { saveSubofferAction, removeSubofferAction, copySubofferAction, 
    addVersionAction, publishTestAction, publishProdAction, validateVersionAction,
    saveVersionAction, removeVersionAction, copyVersionAction, approveVersionAction } from '../properties/actions.js';

// import '@vaadin/vaadin-progress-bar/vaadin-progress-bar';
import './collections/borsuk-form-buttons.js';
import './collections/borsuk-preloader.js'
import './collections/borsuk-tabs.js';
import './borsuk-channels-section.js';
import './collections/borsuk-version-status.js';
import './collections/borsuk-dialog.js';

import { titles } from '../properties/titles.js';

// konektor służący podłączaniu się do store-a
import { connect } from 'pwa-helpers/connect-mixin.js';

// podłączenie do Redux store.
import { store } from '../redux/store.js';

// załadowanie kreatorów akcji.
import { switchannel } from '../redux/actions/cesuboffer.js';
import { setClickAction } from '../redux/actions/customevents.js';

// podłączenie reducer-a.
import customevents, { actionClickSelector, actionParamSelector } from '../redux/reducers/customevents.js';
import { cesubofferPageReselector, ceChannelsSlotReselector, ceChannelsPageReselector, ceChnActParamsReselector, 
        getActivePage, getActiveSlot, getActiveChannelTabs, ceBtnsFlagsReselector } from '../redux/reducers/cesuboffer.js';

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
            ${this.headerTemplate}
            ${this.formInputTemplate}
            ${this.channelsTemplate}
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
                <borsuk-version-status></borsuk-version-status>
            </div>
        `;
    }

    get formInputTemplate() {
        return html`<borsuk-version-input-form id="versionInputForm"></borsuk-version-input-form>`;
    }

    get channelsTemplate() {
        return html`
            <div class="flexWindows">
                <div class="container-fluid">
                    <div id="tabsVerForm" class="card card-nav-tabs text-center">
                        <div id="headerTabsVerForm" class="card-header card-header-warning">
                            <borsuk-channels-section id="channelsForms"></borsuk-channels-section>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    static get properties() {
        return {
            active: { type: Boolean },
            _page: { type: String },
            _slot: { type: String },
            versionFormContent: { type: String },
            formButtons: { type: Array },
            buttonsFlags: { type: Array },
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

    updated(changedProps) {
        if (changedProps.has('_page')) {
            this.shadowRoot.getElementById("channelsForms").clearValidateStatus();
        }
    }

    stateChanged(state) {
        if (actionClickSelector(state) === validateVersionAction) { this.validateVersion(state, this._page); }
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

    validateVersion(state, page) {
        const validateVersionStatus = this.shadowRoot.getElementById("versionInputForm").validateForm(page);
        const validateChannelsStatus = this.shadowRoot.getElementById("channelsForms").validateForms(page);
        if (validateVersionStatus && validateChannelsStatus) {
            this.saveVersion(state, page);
        } else {
            this.shadowRoot.getElementById('dialogWindow').openDialog('A',"", titles.get('errorFormLabel'), "");
        }
    }

    saveVersion(state, param) {
        
        let formInfo = [];
        let pushInfo = [];
        let smsInfo = [];
        let messageInfo = [];
        let actionsParamInfo =[];
        let pushActiveFlg = false;
        let smsActiveFlg = false;
        let messageActiveFlg = false;

        for(let i = 0; i < Object.keys(cesubofferPageReselector(state)).length; i++){
            formInfo.push({ versionName: cesubofferPageReselector(state)[i].versionName, 
                            pushAndSms: cesubofferPageReselector(state)[i].pushAndSms
                        });
        }

        for(let i = 0; i < Object.keys(ceChnActParamsReselector(state)).length; i++){
            actionsParamInfo.push({
                paramName: ceChnActParamsReselector(state)[i].paramName,
                paramValue: ceChnActParamsReselector(state)[i].paramValue
            });
        }

        for(let i = 0; i < Object.keys(ceChannelsPageReselector(state)).length; i++){
            if (ceChannelsPageReselector(state)[i].tabSlotId === 'S11') { pushActiveFlg = ceChannelsPageReselector(state)[i].channelActive }
            if (ceChannelsPageReselector(state)[i].tabSlotId === 'S12') { smsActiveFlg = ceChannelsPageReselector(state)[i].channelActive }
            if (ceChannelsPageReselector(state)[i].tabSlotId === 'S13') { messageActiveFlg = ceChannelsPageReselector(state)[i].channelActive }
        }

        for(let i = 0; i < Object.keys(ceChannelsSlotReselector(state)).length; i++){
            if (ceChannelsSlotReselector(state)[i].tabSlotId === 'S11') {
                if (pushActiveFlg) {
                    pushInfo.push({ channelActive: pushActiveFlg,
                                    content: ceChannelsSlotReselector(state)[i].content, 
                                    inLink: ceChannelsSlotReselector(state)[i].inLink,
                                    outLink: ceChannelsSlotReselector(state)[i].outLink,
                                    sendFrom: ceChannelsSlotReselector(state)[i].sendFrom,
                                    sendTo: ceChannelsSlotReselector(state)[i].sendTo,
                                    sendPeriodId: ceChannelsSlotReselector(state)[i].sendPeriodId,
                                    actionParams: actionsParamInfo
                                });
                } else { pushInfo.push({ channelActive: pushActiveFlg }); }
            } else if (ceChannelsSlotReselector(state)[i].tabSlotId === 'S12') {
                if (smsActiveFlg) {
                    smsInfo.push({ channelActive: smsActiveFlg,
                                    content: ceChannelsSlotReselector(state)[i].content, 
                                    phoneTypeId: ceChannelsSlotReselector(state)[i].phoneTypeId,
                                    sendFrom: ceChannelsSlotReselector(state)[i].sendFrom,
                                    sendTo: ceChannelsSlotReselector(state)[i].sendTo,
                                    sendPeriodId: ceChannelsSlotReselector(state)[i].sendPeriodId
                    });
                } else { smsInfo.push({ channelActive: smsActiveFlg }); }
            } else if (ceChannelsSlotReselector(state)[i].tabSlotId === 'S13') {
                if (messageActiveFlg) {
                    messageInfo.push({ channelActive: messageActiveFlg,
                                    content: ceChannelsSlotReselector(state)[i].content, 
                                    eventId: ceChannelsSlotReselector(state)[i].eventId,
                                    expire: ceChannelsSlotReselector(state)[i].expire,
                                    groupId: ceChannelsSlotReselector(state)[i].groupId,
                                    title: ceChannelsSlotReselector(state)[i].title
                    });
                } else { messageInfo.push({ channelActive: messageActiveFlg }); }
            }
        }
        
        if (!param) {
            this.formElements = Object.assign({formValues: formInfo});
        } else {
            this.formElements = Object.assign({pageId: param}, {formValues: formInfo}, {pushValues: pushInfo}, {smsValues: smsInfo}, {messageValues: messageInfo});
        }
        store.dispatch(setClickAction(saveVersionAction, this.formElements));
    }

    confirmModal() {}

    cancelModal() {}

}
