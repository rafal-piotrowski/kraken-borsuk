/* eslint-disable max-classes-per-file */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-global-assign */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-useless-constructor */
/* eslint-disable prefer-template */
/* eslint-disable prefer-const */
/* eslint-disable prefer-object-spread */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable arrow-body-style */
/* eslint-disable array-callback-return */
/* eslint-disable import/order */
/* eslint-disable babel/no-unused-expressions */
/* eslint-disable lit/binding-positions */
/* eslint-disable lit/no-useless-template-literals */
/* eslint-disable lit/no-legacy-template-syntax */
/* eslint-disable no-undef */
/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */

import { LitElement, html, css } from 'lit-element';
import { BorsukEditorStyle } from './BorsukEditorStyle.js';
import { borsukTypographyBold, borsukTypographyItalic, borsukTypographyUnderline, borsukTypographyColor,
        borsukTypographyUndo, borsukTypographyRedo, borsukTypographyAlignLeft, borsukTypographyAlignRight,
        borsukTypographyAlignCenter, borsukTypographyAlignJustify, borsukTypographyListOrdered, borsukTypographyListBullet } from '../icons/icons.js';

import  { actions } from '../properties/actions.js';

import './packages/borsuk-button.js';
import './packages/borsuk-icon.js';
import './collections/borsuk-form-buttons.js';
import '../helpers/quillRegisterBlots.js';

import { tooltips } from '../properties/tooltips.js';

// konektor służący podłączaniu się do store-a
import { connect } from 'pwa-helpers/connect-mixin.js';

// podłączenie do Redux store.
import { store } from '../redux/store.js';

// podłączenie reducer-a.
import customevents, { actionClickSelector, actionParamSelector } from '../redux/reducers/customevents.js';

export class BorsukEditor extends connect(store)(LitElement) {
    static get styles() {
        return [BorsukEditorStyle];
    }

    render() {

        return html`
            <link rel='stylesheet' href='http://cdn.quilljs.com/1.3.6/quill.snow.css'>
            <!-- <link rel='stylesheet' href='https://cdn.quilljs.com/1.0.0-beta.4/quill.css'> -->
     
            <div id="tooltip-controls" class="flexbuttons">
                <div id="editor-history">${this.navHistoryTamplete}</div>
                <div id="editor-typography">${this.navTypographyTamplete}</div>
                <div id="editor-align">${this.navAlignTamplete}</div>
                <div id="editor-list">${this.navListTamplete}</div>
            </div>

            <div id="inputTitle" class="inputTitle"><span>Treść wiadomości</span></div>
            <div id="editorWrapper" class="ing-new-theme">
                <div class="messages-container">
                    <div id="editor" class="msg_content">
                    </div>
                </div>
            </div>
        `;
    }

    get navHistoryTamplete() {
        return html`${this.histButtons.map(i => html`<borsuk-form-buttons .valuesButton="${i}"></borsuk-form-buttons>`)}`;
    }

    get navTypographyTamplete() {
        return html`${this.typoButtons.map(i => html`<borsuk-form-buttons .valuesButton="${i}"></borsuk-form-buttons>`)}`;
    }

    get navAlignTamplete() {
        return html`${this.alignButtons.map(i => html`<borsuk-form-buttons .valuesButton="${i}"></borsuk-form-buttons>`)}`;
    }

    get navListTamplete() {
        return html`${this.listButtons.map(i => html`<borsuk-form-buttons .valuesButton="${i}"></borsuk-form-buttons>`)}`;
    }

    static get properties() {
        return {
            typoButtons: { type: Array },
            histButtons: { type: Array },
            listButtons: { type: Array },
            alignButtons: { type: Array },
        };
    }

    constructor() {
        super();
        this.contextRoot = '';

        this.histButtons = [{
                buttonId: actions.get('textUndoAction'),  // definicja z actions
                buttonTooltip: 'Cofnij',
                buttonIcon: borsukTypographyUndo,
                buttonActive: true
            },{
                buttonId: actions.get('textRedoAction'),
                buttonTooltip: 'Ponów',
                buttonIcon: borsukTypographyRedo,
                buttonActive: true
            }];

            this.typoButtons = [{
                buttonId: actions.get('textBoldAction'),
                buttonTooltip: 'Pogrubione',
                buttonIcon: borsukTypographyBold,
                buttonActive: true
            },{
                buttonId: actions.get('textItalicAction'),
                buttonTooltip: 'Kursywa',
                buttonIcon: borsukTypographyItalic,
                buttonActive: true
            },{
                buttonId: actions.get('textUnderlineAction'),
                buttonTooltip: 'Podkreślenie',
                buttonIcon: borsukTypographyUnderline,
                buttonActive: true
            },{
                buttonId: actions.get('textColorAction'),
                buttonTooltip: 'Zmień kolor',
                buttonIcon: borsukTypographyColor,
                buttonActive: false
            }];

            this.alignButtons = [{
                buttonId: actions.get('textAlignLeftAction'),
                buttonTooltip: 'Do lewej',
                buttonIcon: borsukTypographyAlignLeft,
                buttonActive: true
            },{
                buttonId: actions.get('textAlignRightAction'),
                buttonTooltip: 'Do prawej',
                buttonIcon: borsukTypographyAlignRight,
                buttonActive: true
            },{
                buttonId: actions.get('textAlignCenterAction'),
                buttonTooltip: 'Wyśrodkuj',
                buttonIcon: borsukTypographyAlignCenter,
                buttonActive: true
            },{
                buttonId: actions.get('textAlignJustifyAction'),
                buttonTooltip: 'Wyjustuj',
                buttonIcon: borsukTypographyAlignJustify,
                buttonActive: true
            }];

            this.listButtons = [{
                buttonId: actions.get('textListOrderedAction'),
                buttonTooltip: 'Numerowanie',
                buttonIcon: borsukTypographyListOrdered,
                buttonActive: true
            },{
                buttonId: actions.get('textListBulletAction'),
                buttonTooltip: 'Lista',
                buttonIcon: borsukTypographyListBullet,
                buttonActive: true
            }];

    }

    firstUpdated() {
            this.initEditor();
    }

    initEditor(){
        let container = this.shadowRoot.querySelector("#editor");
        this.editor = new Quill(container);

        // this.editor.on('editor-change', (eventName, ...args) => {
        //     console.log('i am in ON event');
        //     console.log(this.editor.getSelection());
        //     console.log(this.editor.selection);
        //     if (eventName === 'text-change') {
        //         console.log('text change');
        //       } else if (eventName === 'selection-change') {
        //         console.log('selection change');
        //       }
        //           });
    }

    stateChanged(state) {
        if (actionClickSelector(state) === actions.get('textBoldAction')) { this.boldAction(); }
        if (actionClickSelector(state) === actions.get('textItalicAction')) { this.italicAction(); }
        if (actionClickSelector(state) === actions.get('textUnderlineAction')) { this.underlineAction(); }
        if (actionClickSelector(state) === actions.get('textColorAction')) { this.colorAction(); }
        if (actionClickSelector(state) === actions.get('textUndoAction')) { this.undoAction(); }
        if (actionClickSelector(state) === actions.get('textRedoAction')) { this.redoAction(); }
        if (actionClickSelector(state) === actions.get('textAlignLeftAction')) { this.alignLeftAction(); }
        if (actionClickSelector(state) === actions.get('textAlignRightAction')) { this.alignRightAction(); }
        if (actionClickSelector(state) === actions.get('textAlignCenterAction')) { this.alignCenterAction(); }
        if (actionClickSelector(state) === actions.get('textAlignJustifyAction')) { this.alignJustifyAction(); }
        if (actionClickSelector(state) === actions.get('textListOrderedAction')) { this.listOrderedAction(); }
        if (actionClickSelector(state) === actions.get('textListBulletAction')) { this.listBulletAction(); }

        // this._page = getActivePage(state);
        // this._slot = getActiveSlot(state);
    }

    boldAction() {
        let range = this.editor.getSelection();
        if (range) {
            let bolded = this.editor.getFormat(range.index,1).bold;
            this.editor.format('bold',(bolded) ? false : true);
        }
    }

    italicAction() {
        let range = this.editor.getSelection();
        if (range) {
            let italed = this.editor.getFormat(range.index,1).italic;
            this.editor.format('italic',(italed) ? false : true);
        }
    }

    underlineAction() {
        let range = this.editor.getSelection();
        if (range.length) {
            let selection = this.editor.getContents(range.index, range.length);
            this.editor.format('boruline', true);

            if (selection.ops[0].attributes) {
                if (selection.ops[0].attributes.boruline) {
                    this.editor.format('boruline', false);
                }
            }
        }
    }

    undoAction() {
        this.editor.history.undo();
    }

    redoAction() {
        this.editor.history.redo();
    }

    alignLeftAction() {
        this.editor.format('align', '');
    }

    alignRightAction() {
        this.editor.format('align', 'right');
    }

    alignCenterAction() {
        this.editor.format('align', 'center');
    }

    alignJustifyAction() {
        this.editor.format('align', 'justify');
    }

    listOrderedAction() {
        let range = this.editor.getSelection();
        if (range) {
            let ordered = this.editor.getFormat(range.index,1).list;
            this.editor.format('list', (ordered === 'ordered') ? '' : 'ordered');
        }
    }

    listBulletAction() {
        let range = this.editor.getSelection();
        if (range) {
            let bullet = this.editor.getFormat(range.index,1).list;
            this.editor.format('list', (bullet === 'bullet') ? '' : 'bullet');
        }
    }

    // createRenderRoot() { 
        // this.attachShadow({mode: "open"});
    //     return this; 
    // }
    /**
     * Render template without shadow DOM. Note that shadow DOM features like
     * encapsulated CSS and slots are unavailable.
     */
    //     return this;
    // }
}
