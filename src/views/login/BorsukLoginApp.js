/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
/* eslint-disable lit/no-legacy-template-syntax */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */

import { LitElement, html, css } from 'lit-element';
import { installRouter } from 'pwa-helpers/router.js';
// import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js';
import { Router } from '@vaadin/router';
import { BorsukLoginStyle } from './BorsukLoginStyle.js';
import '../../components/packages/borsuk-button.js';
import '@polymer/paper-input/paper-input';
import '@polymer/iron-form/iron-form';

import { titles } from '../../properties/titles.js';

export class BorsukLoginApp extends LitElement {
  static get properties() {
    return {
      error: { type: Boolean },
      heading: { type: String },
      version: { type: String },
      buildTime: { type: String },
      loginErrorMsg: { type: String },
      passErrorMsg: { type: String }
    };
  }

  constructor() {
    super();
    this.keypressListener = this.handleKeypress.bind(this);
    this.error = false;
    this.heading = titles.get('headingLoginLabel');
    this.version = titles.get('versionLoginLabel');
    this.buildTime = titles.get('buildLoginLabel');
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('keypress', this.keypressListener);
  }

  disconnectedCallback() {
    document.removeEventListener('keypress', this.keypressListener);
    super.disconnectedCallback();
  }

  static get styles() {
    return [
      BorsukLoginStyle,
      css`
    `];
  }

  get username() {
    return this.shadowRoot.getElementById('username');
  }

  get password() {
    return this.shadowRoot.getElementById('password');
  }

  get form() {
    return this.shadowRoot.getElementById('form');
  }

  handleLoginError(ckey, pass) {
    if (ckey) {
      this.username.invalid = true;
      this.loginErrorMsg = titles.get('invalidLogin');
    }
    if (pass) {
      this.password.invalid = true;
      this.passErrorMsg = titles.get('invalidPassword');
    }
  }

  handleKeypress(event) {
    if (event.keyCode === 13) {
      this.login(event);
    }
  }

  login(event) {
    this.username.validate();
    this.password.validate();
    if (!this.username.invalid && !this.password.invalid) {
      // this.form.submit();
      Router.go(`/menu`);
    } else {
      this.loginErrorMsg = titles.get('emptyLogin');
      this.passErrorMsg = titles.get('emptyPassword');
    }
  }

  firstUpdated() {
    installRouter((location) => this.resolveLocation(location));
    // installMediaQueryWatcher(`(max-width: 600px)`, (matches) => this.resolveMQ(matches));
  }

  resolveLocation(location) {
    if (location.search === "?error=") { this.handleLoginError(true, true) };
  }

  // resolveMQ(matches) {
  //   console.log('______________ media queries ____________');
  //   console.log(matches);
  // }

  render() {
    return html`
      <div class="login-wrapper">
        <div id="main-view" class="container flex">
            <div class="flexmargin"></div>
            <div class="flexcenter">
                <div class="card card-nav-tabs text-center">
                    <div class="card-header card-header-warning card-header-login">
                        ${this.heading}
                    </div>
      
                    <div class="card-body flex">
                        <div class="flexmargin"></div>
                        <div class="flexformcenter">
          
                            <iron-form id="form" allow-redirect>
                                <form method="POST" action="login">
                                    <paper-input
                                        type="text"
                                        id="username"
                                        name="username"
                                        label="Login"
                                        error-message="${this.loginErrorMsg}"
                                        autofocus
                                        required>
                                    </paper-input>

                                    <paper-input
                                        type="password"
                                        id="password"
                                        name="password"
                                        label="Hasło"
                                        error-message="${this.passErrorMsg}"
                                        required>
                                    </paper-input>
                                </form>
                            </iron-form>

                            <borsuk-button indigo @click="${this.login}">${titles.get('buttonLoginLabel')}</borsuk-button>
          
                        </div>
                        <div class="flexmargin"></div>
                    </div>
                    <div class="card-footer text-muted">
                        ${this.version} (build time ${this.buildTime})
                    </div>
                </div>
            </div>
            <div class="flexmargin"></div>
        </div>
    </div>
    `;
  }
}
