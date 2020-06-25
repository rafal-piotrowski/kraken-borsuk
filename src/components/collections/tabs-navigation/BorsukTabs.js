/* eslint-disable object-shorthand */
/* eslint-disable prefer-const */
/* eslint-disable prefer-object-spread */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
/* eslint-disable prefer-template */
/* eslint-disable eqeqeq */
/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-return-assign */
/* eslint-disable import/order */
/* eslint-disable lit/binding-positions */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import { LitElement, html, css } from 'lit-element';
import { nothing } from 'lit-html';
import { BorsukTabsStyle } from './BorsukTabsStyle.js';
import '@polymer/paper-tabs/paper-tabs';
import '@polymer/paper-tabs/paper-tab';
import '@polymer/paper-tooltip/paper-tooltip';
import '@polymer/iron-icons/iron-icons';
import '@polymer/iron-icon/iron-icon';
import '@polymer/paper-badge/paper-badge';
import '../../packages/borsuk-button.js';

import { closeTabAction, changeTabAction } from '../../../properties/actions.js';

// konektor służący podłączaniu się do store-a
import { connect } from 'pwa-helpers/connect-mixin.js';
import { installRouter } from 'pwa-helpers/router.js';

// podłączenie do Redux store.
import { store } from '../../../redux/store.js';

// załadowanie kreatorów akcji.
// import { navigate } from '../../../redux/actions/cesuboffer.js';
import { setClickAction } from '../../../redux/actions/customevents.js';

export class BorsukTabs extends connect(store)(LitElement) {
  static get styles() {
      return [BorsukTabsStyle];
  }

  render() {
      return html`
        <div class="container-fluid">
          <div id="tabsForm" class="card card-nav-tabs text-center">
            <div id="headerTabsForm" class="card-header card-header-warning">
              ${this.tabsHeaderTemplate}
            </div>

            <div id="contentTabsForm" class="card-body flex">
                <div class="flexthinmargin"></div>
                <div class="flexformcenter">
                    <slot></slot>
                </div>
                <div class="flexthinmargin"></div>
            </div>
          </div>
        </div>
     `;
  }

  get tabsHeaderTemplate() {
    return html`
      <paper-tabs id="contentTabs" selected="${this.selected}" attr-for-selected="page" scrollable="" no-bar="">

        ${Object.keys(this.tabsList).map((key) => {
            const i = this.tabsList[key];
            return html`
                <paper-tab page="${i.tabPageId}" ?selected="${this.activePage === i.tabPageId}" @tap="${(event) => { this.changeTabClick(event, i.tabPageId, i.tabSlotId) } }">
                  <div class="tabsWrapper">
                    <div id="tabNav" class="tabsNav">

                      ${this.badgeStatus ? html`
                        ${i.channelActive ? html`<paper-badge label="A" class="activeInfoBadge"></paper-badge>` : nothing}
                      ` : nothing}

                      <div id="tabName" class="tabName">
                        ${i.tabTitle}
                        <p class="subTitleTab">${i.tabSubtitle}</p>
                      </div>
                      <div>
                        ${i.tabClose ? html`
                          <borsuk-button smicon id="tabClose_${i.tabPageId}" @click="${(event) => { this.closeTabClick(event, i.tabPageId) } }" data-action="closing">
                              <iron-icon icon="close" data-action="closing"></iron-icon>
                          </borsuk-button>
                          <paper-tooltip id="tabCloseTooltip_${i.tabPageId}" for="tabClose_${i.tabPageId}">Zamknij</paper-tooltip>
                          ` : html``}
                      </div>
                    </div>
                  </div>
                </paper-tab>
            `;
        })}

      </paper-tabs>
    `;
  }

  firstUpdated() {
    // installRouter((location) => store.dispatch(navigate(location.pathname, location.search)));
  }

  updated(changedProperties) {
    // console.log('##################### BorsukTabs (updated) - activePage is:');
    // console.log(this.activePage);

    changedProperties.forEach((oldValue, propName) => {
      // console.log('------------- TABS changed params -----------------');
      // console.log(`${propName} changed. oldValue: `);
      // console.log(oldValue);
      if (propName == 'tabsList') {
        // console.log(this.tabsList);
        // console.log('slot is: '+this._slot);
        // console.log('page is: '+this._page);
      }
    });
  }

  closeTabClick(event, page) {
    if (event.target.getAttribute('data-action') === 'closing') {
      let eventParams = Object.assign({pageId: page});
      setTimeout(() => {
        store.dispatch(setClickAction(closeTabAction, eventParams));
      }, 200);
    }
  }

  changeTabClick(event, page, slot) {
    if ((event.target.getAttribute('data-action') != 'closing') && (page != this._page)) {
      let eventParams = Object.assign({pageId: page});
      setTimeout(() => {
        store.dispatch(setClickAction(changeTabAction, eventParams));
      }, 200);

      this.dispatchEvent(new CustomEvent('change-tab', {detail: {pageId: page, slotId: slot}}));
    }
  }

  static get properties() {
    return {
      _slot: { type: String },
      _page: { type: String },
      tabsList: { type: Object }
    }
  }

  stateChanged(state) {
  }

}
