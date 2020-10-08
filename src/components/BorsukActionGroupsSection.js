/* eslint-disable no-plusplus */
/* eslint-disable no-else-return */
/* eslint-disable prefer-template */
/* eslint-disable consistent-return */
/* eslint-disable lit/no-useless-template-literals */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import { LitElement, html, css } from 'lit-element';
import { BorsukActionGroupsSectionStyle } from './BorsukActionGroupsSectionStyle.js';
import './collections/borsuk-tabs.js';

// konektor służący podłączaniu się do store-a
import { connect } from 'pwa-helpers/connect-mixin.js';

// podłączenie do Redux store.
import { store } from '../redux/store.js';

// załadowanie kreatorów akcji.
import { switchannel } from '../redux/actions/campform.js';
import { setClickAction } from '../redux/actions/customevents.js';

// podłączenie reducer-a.
import customevents, { actionClickSelector, actionParamSelector } from '../redux/reducers/customevents.js';
import { cesubofferPageReselector, ceChannelTabsSelector, getActivePage, getActiveSlot, getActiveChannelTabs } from '../redux/reducers/campform.js';

export class BorsukActionGroupsSection extends connect(store)(LitElement) {
    static get styles() {
        return [BorsukActionGroupsSectionStyle];
    }

    render() {
        return html`
            <borsuk-tabs equaltabs .tabsList="${this.ceChannelTabsList}" .activePage="${this._subpage}" @change-tab=${this.changeTab}>
                <borsuk-group-pattern-form id="groupPatternForm" class="subpage" ?active="${this._subslot === 'S30'}" .page=${this._subpage}></borsuk-group-pattern-form>
                <borsuk-group-input-form id="groupInputForm" class="subpage" ?active="${this._subslot === 'S31'}" .page=${this._subpage}></borsuk-group-input-form>
                <borsuk-page404 class="subpage" ?active="${this._subslot === 'S404'}" .page=${this._subpage}></borsuk-page404>
            </borsuk-tabs>
        `;
    }

    static get properties() {
        return {
            active: { type: Boolean },
            _page: { type: String },
            _subpage: { type: String },
            _slot: { type: String },
            _subslot: { type: String },
            versionFormContent: { type: String },
            formButtons: { type: Array },
            ceChannelTabsList: { type: Array },
            isFormPush: { type: Boolean },
            isFormSms: { type: Boolean },
            isFormMessage: { type: Boolean }
        };
      }
    
    constructor() {
        super();
        this.ceChannelTabsList = [];
        this.isFormPush = false;
        this.isFormSms = false;
        this.isFormMessage = false;
    }

    firstUpdated() {
    }

    updated(changedProps) {
        if (changedProps.has('_page')) {
            setTimeout(() => {
                store.dispatch(switchannel('0', this._subpage, this._subslot));
              }, 1000);
        }

        if (changedProps.has('_page') || changedProps.has('_subpage')) {
            customElements.whenDefined('borsuk-push-input-form').then(() => { this.isFormPush = true });
            customElements.whenDefined('borsuk-sms-input-form').then(() => { this.isFormSms = true });
            customElements.whenDefined('borsuk-message-input-form').then(() => { this.isFormMessage = true });
        }
    }

    changeTab(event) {

        if (this._subpage !== event.detail.pageId) {
            store.dispatch(switchannel(this._subpage, event.detail.pageId, event.detail.slotId));
        }
    }

    validateForms(page) {

        if (page === this._page) {
            let pushValidFlg = true;
            let smsValidFlg = true;
            let messageValidFlg = true;

            for (let i=0; i < this.ceChannelTabsList.length; i++) {
                if (this.ceChannelTabsList[i].channelActive === true) {
                    if (this.ceChannelTabsList[i].tabSlotId === "S11") {
                        pushValidFlg = (this.isFormPush) ? this.shadowRoot.getElementById("pushInputForm").validateForm(page) : true;
                    } else if (this.ceChannelTabsList[i].tabSlotId === "S12") {
                        smsValidFlg = (this.isFormSms) ? this.shadowRoot.getElementById("smsInputForm").validateForm(page) : true;
                    } else if (this.ceChannelTabsList[i].tabSlotId === "S13") {
                        messageValidFlg = (this.isFormMessage) ? this.shadowRoot.getElementById("messageInputForm").validateForm(page) : true;
                    }
                }
            }

            // return (pushValidFlg === true && smsValidFlg === true && messageValidFlg === true) ? true : false;

            if (pushValidFlg === true && smsValidFlg === true && messageValidFlg === true) {
                return true;
            } else {
                return false;
            }
        }
    }
                
    clearValidateStatus() {
        if (this.isFormPush) { this.shadowRoot.getElementById("pushInputForm").clearValidateStatus() }
        if (this.isFormSms) { this.shadowRoot.getElementById("pushInputForm").clearValidateStatus() }
        if (this.isFormMessage) { this.shadowRoot.getElementById("pushInputForm").clearValidateStatus() }
    }
    
    stateChanged(state) {
        this._page = getActivePage(state);
        this._slot = getActiveSlot(state);

        this.ceChannelTabsList = Object.values(ceChannelTabsSelector(state)).filter(key => key.parentPageId === this._page); 

        if (this._slot === 'S21' || this._slot === 'S22') {
            this._subpage = Object.values(getActiveChannelTabs(state)).filter(key => key.parentPageId === this._page)[0].tabPageId;
            this._subslot = Object.values(getActiveChannelTabs(state)).filter(key => key.parentPageId === this._page)[0].tabSlotId;
        }
    }
}