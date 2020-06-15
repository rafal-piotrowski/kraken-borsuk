/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import { LitElement, html, css } from 'lit-element';
import { BorsukChannelsSectionStyle } from './BorsukChannelsSectionStyle.js';
import './collections/borsuk-tabs.js';

// konektor służący podłączaniu się do store-a
import { connect } from 'pwa-helpers/connect-mixin.js';

// podłączenie do Redux store.
import { store } from '../redux/store.js';

// załadowanie kreatorów akcji.
import { switchannel } from '../redux/actions/cesuboffer.js';
import { setClickAction } from '../redux/actions/customevents.js';

// podłączenie reducer-a.
import customevents, { actionClickSelector, actionParamSelector } from '../redux/reducers/customevents.js';
import { cesubofferPageReselector, ceChannelTabsSelector, getActivePage, getActiveSlot, getActiveChannelTabs } from '../redux/reducers/cesuboffer.js';

export class BorsukChannelsSection extends connect(store)(LitElement) {
    static get styles() {
        return [BorsukChannelsSectionStyle];
    }

    render() {
        return html`
            <borsuk-tabs equaltabs .tabsList="${this.ceChannelTabsList}" .activePage="${this._subpage}" @change-tab=${this.changeTab}>
                <borsuk-push-input-form class="subpage" ?active="${this._subslot === 'S11'}" .page=${this._subpage}></borsuk-push-input-form>
                <borsuk-sms-input-form class="subpage" ?active="${this._subslot === 'S12'}" .page=${this._subpage}></borsuk-sms-input-form>
                <borsuk-message-input-form class="subpage" ?active="${this._subslot === 'S13'}" .page=${this._subpage}></borsuk-message-input-form>
                <borsuk-page404 class="subpage" ?active="${this._subslot === 'S404'}" .page=${this._subpage}></borsuk-page404>
            </borsuk-tabs>
        `;
    }

    static get properties() {
        return {
            active: { type: Boolean },
            _page: { type: String },
            _slot: { type: String },
            _subslot: { type: String },
            versionFormContent: { type: String },
            formButtons: { type: Array },
            ceChannelTabsList: { type: Array },
            _subpage: { type: String },
        };
      }
    
    constructor() {
        super();
        this.ceChannelTabsList = [];
    }

    firstUpdated() {
    }

    updated(changedProps) {
        if (changedProps.has('_page')) {
            setTimeout(() => {
                store.dispatch(switchannel('0', this._subpage, this._subslot));
              }, 1000);
        }
    }

    changeTab(event) {
        if (this._subpage !== event.detail.pageId) {
            store.dispatch(switchannel(this._subpage, event.detail.pageId, event.detail.slotId));
        }
    }

    stateChanged(state) {
        this._page = getActivePage(state);
        this._slot = getActiveSlot(state);

        this.ceChannelTabsList = Object.values(ceChannelTabsSelector(state)).filter(key => key.parentPageId === this._page); 

        if (this._slot === 'S02') {
            this._subpage = Object.values(getActiveChannelTabs(state)).filter(key => key.parentPageId === this._page)[0].tabPageId;
            this._subslot = Object.values(getActiveChannelTabs(state)).filter(key => key.parentPageId === this._page)[0].tabSlotId;
        }
    }
}