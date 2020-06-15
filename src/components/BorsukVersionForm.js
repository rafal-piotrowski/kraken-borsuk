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

import '@vaadin/vaadin-progress-bar/vaadin-progress-bar';
import './collections/borsuk-form-buttons.js';
import './collections/borsuk-preloader.js'
import './collections/borsuk-tabs.js';
import './borsuk-channels-section.js';

// konektor służący podłączaniu się do store-a
import { connect } from 'pwa-helpers/connect-mixin.js';

// podłączenie do Redux store.
import { store } from '../redux/store.js';

// załadowanie kreatorów akcji.
import { switchannel } from '../redux/actions/cesuboffer.js';
import { setClickAction } from '../redux/actions/customevents.js';

// podłączenie reducer-a.
import customevents, { actionClickSelector, actionParamSelector } from '../redux/reducers/customevents.js';
import { cesubofferPageReselector, ceChannelsSlotReselector, getActivePage, getActiveSlot, getActiveChannelTabs } from '../redux/reducers/cesuboffer.js';

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
            <borsuk-version-input-form id="versionInputForm"></borsuk-version-input-form>

            <div class="flexWindows">
                <div class="container-fluid">
                    <div id="tabsVerForm" class="card card-nav-tabs text-center">
                        <div id="headerTabsVerForm" class="card-header card-header-warning">
                            <borsuk-channels-section></borsuk-channels-section>
                        </div>
                    </div>
                </div>
            </div>
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

    updated(changedProps) {
        if (changedProps.has('_subpage')) {
            // console.log('##################### BorsukVersionForm (updated) - subpage_has_changed');
        }
    }

    stateChanged(state) {
        if (actionClickSelector(state) === validateVersionAction) { this.validateVersion(state, this._page); }

        this._page = getActivePage(state);
        this._slot = getActiveSlot(state);
    }

    validateVersion(state, param) {
        console.log(cesubofferPageReselector(state));
        console.log(ceChannelsSlotReselector(state));
        // IF validation OK
        let formInfo = [];
        let pushInfo = [];
        let smsInfo = [];
        let messageInfo = [];
        for(let i = 0; i < Object.keys(cesubofferPageReselector(state)).length; i++){
            formInfo.push({ versionName: cesubofferPageReselector(state)[i].versionName, 
                            pushAndSms: cesubofferPageReselector(state)[i].pushAndSms
                        });
        }

        for(let i = 0; i < Object.keys(ceChannelsSlotReselector(state)).length; i++){
            if (ceChannelsSlotReselector(state)[i].tabSlotId === 'S11') {
                pushInfo.push({ content: ceChannelsSlotReselector(state)[i].content, 
                                inLink: ceChannelsSlotReselector(state)[i].inLink,
                                outLink: ceChannelsSlotReselector(state)[i].outLink,
                                sendFrom: ceChannelsSlotReselector(state)[i].sendFrom,
                                sendTo: ceChannelsSlotReselector(state)[i].sendTo,
                                sendPeriodId: ceChannelsSlotReselector(state)[i].sendPeriodId
                            });
            } else if (ceChannelsSlotReselector(state)[i].tabSlotId === 'S12') {
                smsInfo.push({ content: ceChannelsSlotReselector(state)[i].content, 
                                phoneTypeId: ceChannelsSlotReselector(state)[i].phoneTypeId,
                                sendFrom: ceChannelsSlotReselector(state)[i].sendFrom,
                                sendTo: ceChannelsSlotReselector(state)[i].sendTo,
                                sendPeriodId: ceChannelsSlotReselector(state)[i].sendPeriodId
                });
            } else if (ceChannelsSlotReselector(state)[i].tabSlotId === 'S13') {
                messageInfo.push({ content: ceChannelsSlotReselector(state)[i].content, 
                                eventId: ceChannelsSlotReselector(state)[i].eventId,
                                expire: ceChannelsSlotReselector(state)[i].expire,
                                groupId: ceChannelsSlotReselector(state)[i].groupId,
                                title: ceChannelsSlotReselector(state)[i].title
                });
            }
        }
        
        if (!param) {
            this.formElements = Object.assign({formValues: formInfo});
        } else {
            this.formElements = Object.assign({pageId: param}, {formValues: formInfo}, {pushValues: pushInfo}, {smsValues: smsInfo}, {messageValues: messageInfo});
        }
        store.dispatch(setClickAction(saveVersionAction, this.formElements));
    }

}
