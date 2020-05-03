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
import { BorsukTabsStyle } from './BorsukTabsStyle.js';
import '@polymer/paper-tabs/paper-tabs';
import '@polymer/paper-tabs/paper-tab';
import '@polymer/paper-tooltip/paper-tooltip';
import '@polymer/iron-icons/iron-icons';
import '@polymer/iron-icon/iron-icon';
import '../../packages/borsuk-button.js';

import { closeTabAction } from '../../../properties/tabsProperties.js';

// konektor służący podłączaniu się do store-a
import { connect } from 'pwa-helpers/connect-mixin.js';
import { installRouter } from 'pwa-helpers/router.js';

// podłączenie do Redux store.
import { store } from '../../../redux/store.js';

// załadowanie kreatorów akcji.
import { navigate, setCeClickAction } from '../../../redux/actions/cesuboffer.js';

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
              <a href="/${i.tabPageId}?${i.tabSlotId}">
                <paper-tab page="${i.tabPageId}" ?selected="${this._page === i.tabPageId}">
                  <div class="tabsWrapper">
                    <div id="tabNav" class="tabsNav">
                      <div><iron-icon icon="info"></iron-icon></div>
                      <div id="tabName" class="tabName">
                        ${i.tabTitle}
                      </div>
                      <div>
                        ${i.tabClose ? html`
                          <borsuk-button smicon id="tabClose" @click="${this.closeTabClick}" data-page-id="${i.tabPageId}">
                              <iron-icon icon="close"></iron-icon>
                          </borsuk-button>
                          <paper-tooltip id="tabCloseTooltip" for="tabClose">Zamknij</paper-tooltip>
                          ` : html``}
                      </div>
                    </div>
                  </div>
                </paper-tab>
              </a>                            
            `;
        })}

      </paper-tabs>
    `;
  }

  firstUpdated() {
    installRouter((location) => store.dispatch(navigate(location.pathname, location.search)));
  }

  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      // console.log(`${propName} changed. oldValue: ${oldValue}`);
      if (propName == 'tabsList') {
        // console.log(this.tabsList);
        // console.log('slot is: '+this._slot);
        // console.log('page is: '+this._page);
      }
    });
  }

  closeTabClick(event) {
    store.dispatch(setCeClickAction(closeTabAction));
  }

  static get properties() {
    return {
      _slot: { type: String },
      _page: { type: String },
      tabsList: { type: Object }
    }
  }

  stateChanged(state) {
    this._page = state.cesuboffer.page;
    this._slot = state.cesuboffer.slot;
  }

}
