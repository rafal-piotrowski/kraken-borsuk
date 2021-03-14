import { LitElement, html, css } from 'lit-element';
import './src/redux-first-form.js';
import './src/redux-second-form.js';
import './src/redux-third-form.js';

import '@polymer/paper-card';
import '@vaadin/vaadin-tabs';
import { Router } from '@vaadin/router';
import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js';

class ReduxDemo extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          /* display: block; */

          display: flex;
          flex-direction: column;
          font-family: sans-serif;
        }

        h2 {
          font-size: 20px;
          color: #217FF9;
        }

        h1 {
          margin-top: 0px;
          color: #217FF9;
        }

        h2 {
          font-size: 20px;
          color: #2c3e50;
        }

        h2:hover::after { 
          color: #9B35FA;
          content: " #";
        }

        #header {
          display: flex;
        }

        a {
          text-decoration: none;
        }

        a:visited {
          color: #217FF9;
        }

        #header h1 { flex: 1; }
        #header svg { margin: 8px 0 8px 0; }
        .github {transform: scale(1.2, 1.2);}
        .logo {
          margin-top: -3px;
          margin-right: 8px;
        }

        .nav { margin-bottom: 20px; }
        .footer { text-align: center; color: #a8a8a8;}


        paper-card { 
          border-radius: 5px;
          flex: 1; 
          padding: 12px;
          margin: 0 0 32px 0;
        }

        .demo > *:not(h2):not(a) {
          display: block;
          border: 1px solid	#e2e2e2;
          border-radius: 5px;
          padding: 8px;
          margin: 8px 0;
          line-height: 32px;
        }

      `,
    ];
  }

  static get properties() {
    return {
      activeTab: { type: String },
      tabs: { type: Array },
      smallScreen: { type: Boolean }
    }
  }

  constructor(){
    super();
    this.activeTab = location.pathname === '/' ? 'render' : location.pathname.replace('/', '');
    this.tabs = ['first', 'second', 'third'];

    installMediaQueryWatcher(`(min-width: 600px)`, (matches) => {
      this.smallScreen = !matches;
    });
  }

  firstUpdated() {
    const router = new Router(this.shadowRoot.getElementById('outlet'));
    router.setRoutes([
      {path: '/',     component: 'redux-first-form'},
      {path: '/first',  component: 'redux-first-form'},
      {path: '/second',  component: 'redux-second-form'},
      {path: '/third',  component: 'redux-third-form'},
      {path: '(.*)', redirect: '/', action: () => {
        this.activeTab = 'first';
        }
      }
    ]);
  }

  switchRoute(route) {
    this.activeTab = route;
    Router.go(`/${route}`); 
  }

  render() {
    return html`
      <div id="header">
        <h1>${this.capitalize(this.activeTab)} Redux demos</h1>
      </div>

      <vaadin-tabs class="${this.smallScreen ? 'nav' : ''}" orientation="${this.smallScreen ? 'vertical' : 'horizontal'}" selected=${this.tabs.indexOf(this.activeTab)} theme="${this.smallScreen ? '' : 'centered'}">
        <vaadin-tab @click=${() => this.switchRoute('first')}>formatka #1</vaadin-tab>
        <vaadin-tab @click=${() => this.switchRoute('second')}>formatka #2</vaadin-tab>
        <vaadin-tab @click=${() => this.switchRoute('third')}>formatka #3</vaadin-tab>
      </vaadin-tabs>

      
        <paper-card>
            <div class="demo">
                <div id="outlet">
                </div>
            </div>
        </paper-card>
      
    `;
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

customElements.define('redux-demo', ReduxDemo);
