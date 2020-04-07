/* eslint-disable no-lonely-if */
/* eslint-disable no-var */
/* eslint-disable prefer-template */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */

import { LitElement, html, css } from 'lit-element';
import { BorsukSidebarCollapseStyle } from './BorsukSidebarCollapseStyle.js';
import '@polymer/paper-tooltip/paper-tooltip';
import '@polymer/iron-icons/iron-icons';
import '@polymer/iron-icon/iron-icon';
import '@polymer/iron-collapse/iron-collapse';

export class BorsukSidebarCollapse extends LitElement {
    static get styles() {
        return [BorsukSidebarCollapseStyle];
    }

    render() {
        return html`
            <div class="card card-collapse">
                <div class="${this._getCardHeaderClass()}">
                    <button id="notrigger" class="${this._getCardButtonClass()}" @click="${this.toggle}" aria-expanded="${this.opened}" aria-controls="collapse">

                        <div class="titleNav">
                            <div>${this._getTitle()}</div>
                            <div id="collapseIcon">
                                ${this.top? html`
                                    ${this.opened? html`
                                        <!-- <iron-icon class="btn-icon-collapse" icon="borsuk:borsuk-chevron-up"></iron-icon> -->
                                        <iron-icon class="btn-icon-collapse" icon="arrow-drop-up"></iron-icon>
                                    ` : html`
                                        <!-- <iron-icon class="btn-icon-collapse" icon="borsuk:borsuk-chevron-down"></iron-icon> -->
                                        <iron-icon class="btn-icon-collapse" icon="arrow-drop-down"></iron-icon>
                                    `}
                                ` : html`
                                    <paper-tooltip id="notrigger_tooltip" for="notrigger" animation_delay="500" animation-entry="scale-up-animation" animation-exit="scale-down-animation">
                                        ${this.title}
                                    </paper-tooltip>
                                `}
                            </div>
                        </div>
                        
                    </button>
                </div>
                <iron-collapse id="collapse" .opened="${this.opened}" .horizontal="${this.horizontal}" .no-animation="${this.noAnimation}" tabindex="0">
                    <slot></slot>
                </iron-collapse>
            </div>
        `;
    }

    static get properties() {
        return {
            horizontal: { type: Boolean },
            opened: {
                type: Boolean,
                reflectToAttribute: true,
            },
            noAnimation: { type: Boolean },
            top: {
                type: Boolean,
                value: false,
                reflectToAttribute: true
            },
            bottom: {
               type: Boolean,
                value: false,
                reflectToAttribute: true
            }
        };
    }

    constructor() {
        super();
    }


    toggle() {
        var collapseStuff = this.shadowRoot.querySelector('#collapse');
        collapseStuff.toggle();
    }
 
    _getTitle() {
        return (this.title.length > 23) ? (this.title.substr(0,23) + '...') : this.title;
    }
 
    _getCardHeaderClass() {
        return this.top ? 'card-header header-flex' : 'subcard-header header-flex';
    }
 
    _getCardButtonClass() {
        return this.bottom ? 'mb-2' : 'mb-1';
    }
 
    _getClass(top) {
        return top ? "btn-icon-top" : "btn-icon-bottom";
    }
 
    _getIcon(opened) {
    //   return opened ? "borsuk:borsuk-chevron-up" : "borsuk:borsuk-chevron-down";
      return opened ? "arrow-drop-up" : "arrow-drop-down";
    }
 
    _getText(opened, top) {
      //   if (top) {
      //       return opened ? this.resolveUrl('../icons/chevron-up-white.svg') : this.resolveUrl('../icons/chevron-down-white.svg');
      //   } else {
      //       return opened ? this.resolveUrl('../icons/chevron-up-18p-black.svg') : this.resolveUrl('../icons/chevron-down-18p-black.svg');
      //   }
 
      var collapseIcon = this.shadowRoot.querySelector('#collapseIcon');
      var chevronIcon = window.document.createElement('iron-icon');
      chevronIcon.setAttribute("class", "collapse-icon");
 
      if (top) {
          if (opened) {
            //   chevronIcon.setAttribute("icon", "borsuk:borsuk-chevron-down");
              chevronIcon.setAttribute("icon", "arrow-drop-down");
          } else {
            //   chevronIcon.setAttribute("icon", "borsuk:borsuk-chevron-up");
              chevronIcon.setAttribute("icon", "arrow-drop-up");
          }
      } else {
          if (opened) {
            //   chevronIcon.setAttribute("icon", "borsuk:borsuk-chevron-down");
              chevronIcon.setAttribute("icon", "arrow-drop-down");
          } else {
            //   chevronIcon.setAttribute("icon", "borsuk:borsuk-chevron-up");
              chevronIcon.setAttribute("icon", "arrow-drop-up");
          }
      }
 
      collapseIcon.appendChild(chevronIcon);
          // html`<iron-icon class="collapse-icon" src\$="[[importPath]]/src/icons/chevron-up-white.svg"></iron-icon>`
          //                 : html`<iron-icon class="collapse-icon" src\$="[[importPath]]/src/icons/chevron-down-white.svg"></iron-icon>`)
          //             : ((opened) ? html`<iron-icon class="collapse-icon" src\$="[[importPath]]/src//icons/chevron-up-18p-black.svg"></iron-icon>`
          //                 : html`<iron-icon class="collapse-icon" src\$="[[importPath]]/src//icons/chevron-down-18p-black.svg"></iron-icon>`)
    }

}
