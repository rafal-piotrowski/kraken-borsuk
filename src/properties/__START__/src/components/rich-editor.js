import { LitElement, html, css } from 'lit-element';
import { render, nothing } from 'lit-html';
import { RichEditorStyle } from './rich-editor-style.js';
import { Quill } from 'quill/quill.js';

import './rich-form-buttons.js';

import { typographyBold, typographyItalic, typographyUnderline, typographyUndo, 
    typographyRedo, typographyAlignLeft, typographyAlignRight, typographyAlignCenter, 
    typographyAlignJustify, typographyListOrdered, typographyListBullet } from '../icons/icons.js';


let Inline = Quill.import('blots/inline');

class UlineBlot extends Inline {
    static create(value) {
        const node = super.create(value);
        node.setAttribute('style', (value) ? 'text-decoration: underline' : 'text-decoration: none');
        return node;
    }

    static formats(node) {
        return node.getAttribute('style');
    }
}

UlineBlot.blotName = 'boruline';
Quill.register(UlineBlot);

export class RichEditor extends LitElement {
    static get styles() {
        return [RichEditorStyle,
        css`
        `];
    }

    render() {
        return html`
            <link rel='stylesheet' href='/src/styles/styles-production-ing.css'>
            <link rel='stylesheet' href='http://cdn.quilljs.com/1.3.6/quill.snow.css'>
            <style>
                .ing-new-theme p {
                    font-size: 1.2em !important;
                }

                .ing-new-theme .link {
                    font-size: 1.2em !important;
                    line-height: 1em !important;
                }

                .ing-new-theme .btn {
                    font-size: 1.2em !important;
                    height: 2.4em !important;
                    line-height: 2.4em !important;
                    margin-top: 0.8em !important;
                    margin-bottom: 0.8em !important;
                    text-transform: none !important;
                    border: 1px solid #FF6200 !important;
                }

                .ing-new-theme .btn:hover {
                    box-shadow: none !important;
                }
            </style>

            <div class="editor-container">
                <div id="tooltip-controls" class="flexbuttons">
                    <div id="editor-history">${this.navHistoryTamplete}</div>
                    <div id="editor-typography">${this.navTypographyTamplete}</div>
                    <div id="editor-align">${this.navAlignTamplete}</div>
                    <div id="editor-list">${this.navListTamplete}</div>
                </div>

                <div id="inputTitle"><span>Treść formatki:</span></div>
                <div id="inputError"><span>Uzupełnij treść formatki:</span></div>
                <div id="editorWrapper" class="ing-new-theme">
                    <div class="messages-container">
                        <div id="editor" class="msg_content">
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    get navHistoryTamplete() {
        return html`${this.histButtons ? html`${this.histButtons.map(i => html`<rich-form-buttons .valuesButton="${i}" @rich-button-click=${(event) => this.richButtonClick(event)}></rich-form-buttons>`)}` : nothing }`;
    }

    get navTypographyTamplete() {
        return html`${this.typoButtons ? html`${this.typoButtons.map(i => html`<rich-form-buttons .valuesButton="${i}" @rich-button-click=${(event) => this.richButtonClick(event)}></rich-form-buttons>`)}` : nothing }`;
    }

    get navAlignTamplete() {
        return html`${this.alignButtons ? html`${this.alignButtons.map(i => html`<rich-form-buttons .valuesButton="${i}" @rich-button-click=${(event) => this.richButtonClick(event)}></rich-form-buttons>`)}` : nothing }`;
    }

    get navListTamplete() {
        return html`${this.listButtons ? html`${this.listButtons.map(i => html`<rich-form-buttons .valuesButton="${i}" @rich-button-click=${(event) => this.richButtonClick(event)}></rich-form-buttons>`)}` : nothing }`;
    }

    static get properties() {
        return {
            histButtons: { type: Array },
            page: { type: Number },
            formContent: { type: Object }
        }
    }

    firstUpdated() {
        this.initEditor();
    }

    initEditor() {
        let container = this.shadowRoot.querySelector("#editor");
        this.editor = new Quill(container);

        this.editor.on('editor-change', (eventName, ...args) => {
            if (eventName === 'text-change') {
                this.textChanged();
            }
        });
    }

    textChanged() {
        this.changedText = JSON.stringify(html2json(this.editor.root.innerHTML));
        console.log(this.changedText);
    }

    updated(changedProps) {
        // changedProps.forEach((oldValue, propName) => {
        //     console.log(`${propName} changed. oldValue: ${oldValue}`);
        //     console.log('pageNo is: '+this.pageNo);
        //   });

        if (changedProps.has('page')) {
            // console.log('___________ zmianil sie page ____________');
            // console.log(this.page);

            // this.loadContentMessages(Object.values(this.formContent).filter(page => page.pageId === this.page)[0].formText, true);
            this.loadContentMessages(this.formContent, true);
        }
    }

    loadContentMessages(content, jsonFlg) {
        if (content) {
            if (jsonFlg) {
                this.editor.root.innerHTML = json2html(JSON.parse(content));
            } else {
                this.editor.root.innerHTML = content;
            }
        }
    }

    richButtonClick(event) {
        console.log(event.detail.buttonId);
        switch(event.detail.buttonId) {
            case 'textUndoAction': this.undoAction(); break;
            case 'textRedoAction': this.redoAction(); break;
            case 'textBoldAction': this.boldAction(); break;
            case 'textItalicAction': this.italicAction(); break;
            case 'textUnderlineAction': this.underlineAction(); break;
            case 'textAlignLeftAction': this.alignLeftAction(); break;
            case 'textAlignRightAction': this.alignRightAction(); break;
            case 'textAlignCenterAction': this.alignCenterAction(); break;
            case 'textAlignJustifyAction': this.alignJustifyAction(); break;
            case 'textListOrderedAction': this.listOrderedAction(); break;
            case 'textListBulletAction': this.listBulletAction(); break;
            default: break;
        }
    }

    boldAction() {
        let range = this.editor.getSelection();
        if (range) {
            let bolded = this.editor.getFormat(range.index,1).bold;
            this.editor.format('bold',(bolded) ? false : true);
        }
        store.dispatch(getUsdCurrency());
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

    constructor() {
        super();

        // this.formContent = 'tu wpisz treść...';
        this.histButtons = [{
            buttonId: 'textUndoAction',
            buttonTooltip: 'Cofnij',
            buttonIcon: typographyUndo,
            buttonActive: true,
            buttonPressed: false
        },{
            buttonId: 'textRedoAction',
            buttonTooltip: 'Ponów',
            buttonIcon: typographyRedo,
            buttonActive: true,
            buttonPressed: false
        }];

        this.typoButtons = [{
            buttonId: 'textBoldAction',
            buttonTooltip: 'Pogrubione',
            buttonIcon: typographyBold,
            buttonActive: true,
            buttonPressed: false
        },{
            buttonId: 'textItalicAction',
            buttonTooltip: 'Kursywa',
            buttonIcon: typographyItalic,
            buttonActive: true,
            buttonPressed: false
        },{
            buttonId: 'textUnderlineAction',
            buttonTooltip: 'Podkreślenie',
            buttonIcon: typographyUnderline,
            buttonActive: true,
            buttonPressed: false
        }];

        this.alignButtons = [{
            buttonId: 'textAlignLeftAction',
            buttonTooltip: 'Do lewej',
            buttonIcon: typographyAlignLeft,
            buttonActive: true,
            buttonPressed: false
        },{
            buttonId: 'textAlignRightAction',
            buttonTooltip: 'Do prawej',
            buttonIcon: typographyAlignRight,
            buttonActive: true,
            buttonPressed: false
        },{
            buttonId: 'textAlignCenterAction',
            buttonTooltip: 'Wyśrodkuj',
            buttonIcon: typographyAlignCenter,
            buttonActive: true,
            buttonPressed: false
        },{
            buttonId: 'textAlignJustifyAction',
            buttonTooltip: 'Wyjustuj',
            buttonIcon: typographyAlignJustify,
            buttonActive: true,
            buttonPressed: false
        }];

        this.listButtons = [{
            buttonId: 'textListOrderedAction',
            buttonTooltip: 'Numerowanie',
            buttonIcon: typographyListOrdered,
            buttonActive: true,
            buttonPressed: false
        },{
            buttonId: 'textListBulletAction',
            buttonTooltip: 'Lista',
            buttonIcon: typographyListBullet,
            buttonActive: true,
            buttonPressed: false
        }];
    }
}

customElements.define('rich-editor', RichEditor);
