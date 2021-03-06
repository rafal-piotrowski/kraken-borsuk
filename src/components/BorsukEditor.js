/* eslint-disable no-shadow */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-lonely-if */
/* eslint-disable eqeqeq */
/* eslint-disable dot-notation */
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
import { render, nothing } from 'lit-html';
import { BorsukEditorStyle } from './BorsukEditorStyle.js';
// import { BorsukEditorIngStyle } from './BorsukEditorIngStyle.js';
import { borsukTypographyBold, borsukTypographyItalic, borsukTypographyUnderline, borsukTypographyColor,
        borsukTypographyUndo, borsukTypographyRedo, borsukTypographyAlignLeft, borsukTypographyAlignRight,
        borsukTypographyAlignCenter, borsukTypographyAlignJustify, borsukTypographyListOrdered, borsukTypographyListBullet,
        borsukFormatParagraph, borsukFormatHeader, borsukFormatDiv, borsukSourceHtml,
        borsukEmbedAttachment, borsukEmbedImage, borsukEmbedParam, borsukNonBreakingSpace } from '../icons/icons.js';

import  { actions } from '../properties/actions.js';
import { titles } from '../properties/titles.js';

import './packages/borsuk-button.js';
import './packages/borsuk-icon.js';
import './collections/borsuk-form-buttons.js';
import './collections/borsuk-colors-toast.js';
import './collections/borsuk-header-toast.js';
import './collections/borsuk-link-toast.js';
import './collections/borsuk-param-toast.js';
import './collections/borsuk-dialog.js';
import '../helpers/quillRegisterBlots.js';

// import 'html2json';

import { tooltips } from '../properties/tooltips.js';

// konektor służący podłączaniu się do store-a
import { connect } from 'pwa-helpers/connect-mixin.js';

// podłączenie do Redux store.
import { store } from '../redux/store.js';

// podłączenie reducer-a.
import customevents, { actionClickSelector, actionParamSelector } from '../redux/reducers/customevents.js';
import { getActivePage, getActiveSlot, getActiveChannelTabs, ceChannelSlotsReselector } from '../redux/reducers/cesuboffer.js';

// const navTypographyTamplete = (typoButtons) => html`${typoButtons.map(i => html`<borsuk-form-buttons .valuesButton="${i}"></borsuk-form-buttons>`)}`;

export class BorsukEditor extends connect(store)(LitElement) {
    static get styles() {
        return [BorsukEditorStyle,
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

                <div id="sidebar-controls" class="flexbuttons">
                    <div id="editor-format">${this.navFormatTamplete}</div>
                    <div id="editor-embed">${this.navEmbedTamplete}</div>
                    <div id="editor-source">${this.navSourceTamplete}</div>
                </div>

                <div id="inputTitle"><span>Treść wiadomości:</span></div>
                <div id="inputError"><span>Uzupełnij treść wiadomości:</span></div>
                <div id="editorWrapper" class="ing-new-theme">
                    <div class="messages-container">
                        <div id="editor" class="msg_content">
                        </div>
                    </div>
                </div>
            </div>

            <borsuk-colors-toast id="colorsToast" @ev-confirm-color-chosen=${this.confirmColor}></borsuk-colors-toast>
            <borsuk-header-toast id="headerToast" @ev-confirm-header-chosen=${this.confirmHeader}></borsuk-header-toast>
            <borsuk-link-toast id="linkToast" @ev-confirm-link-chosen=${this.confirmLink}></borsuk-link-toast>
            <borsuk-param-toast id="paramToast" @ev-confirm-param-chosen=${this.confirmParam}></borsuk-param-toast>
            <borsuk-dialog  id="dialogWindow" 
                            @confirm-dialog-fired=${this.confirmModal} 
                            @cancel-dialog-fired=${this.cancelModal}>
            </borsuk-dialog>
        `;
    }

    get navHistoryTamplete() {
        return html`${this.histButtons ? html`${this.histButtons.map(i => html`<borsuk-form-buttons .valuesButton="${i}"></borsuk-form-buttons>`)}` : nothing }`;
    }

    get navTypographyTamplete() {
        return html`${this.typoButtons ? html`${this.typoButtons.map(i => html`<borsuk-form-buttons .valuesButton="${i}"></borsuk-form-buttons>`)}` : nothing }`;
    }

    get navAlignTamplete() {
        return html`${this.alignButtons ? html`${this.alignButtons.map(i => html`<borsuk-form-buttons .valuesButton="${i}"></borsuk-form-buttons>`)}` : nothing }`;
    }

    get navListTamplete() {
        return html`${this.listButtons ? html`${this.listButtons.map(i => html`<borsuk-form-buttons .valuesButton="${i}"></borsuk-form-buttons>`)}` : nothing }`;
    }

    get navFormatTamplete() {
        return html`${this.formatButtons ? html`${this.formatButtons.map(i => html`<borsuk-form-buttons .valuesButton="${i}"></borsuk-form-buttons>`)}` : nothing }`;
    }

    get navEmbedTamplete() {
        return html`${this.embedButtons ? html`${this.embedButtons.map(i => html`<borsuk-form-buttons .valuesButton="${i}"></borsuk-form-buttons>`)}` : nothing }`;
    }

    get navSourceTamplete() {
        return html`${this.sourceButtons ? html`${this.sourceButtons.map(i => html`<borsuk-form-buttons .valuesButton="${i}"></borsuk-form-buttons>`)}` : nothing }`;
    }

    get dialogWindow() {
        return this.shadowRoot.getElementById("dialogWindow");
    }

    firstUpdated() {
        this.initEditor();
    }

    updated(changedProps) {
        if (changedProps.has('_page') || changedProps.has('_subpage')) {
            let htmlEditor = this.shadowRoot.querySelector('.ql-html-editor');
            if (htmlEditor) { this.editor.container.removeChild(htmlEditor) }
        }
    }

    initEditor() {
        let container = this.shadowRoot.querySelector("#editor");
        this.editor = new Quill(container);

        this.editor.on('editor-change', (eventName, ...args) => {
            if (eventName === 'text-change') {
                this.textChanged();
                // console.log('text change');
            } else if (eventName === 'selection-change') {
                // console.log('selection change');
                // this.selectionChange();
            }
        });
    }

    stateChanged(state) {

        this._page = getActivePage(state);
        this._slot = getActiveSlot(state);

        if (this._slot === 'S02') {
            if (this._subpage !== Object.values(getActiveChannelTabs(state)).filter(key => key.parentPageId === this._page)[0].tabPageId) {
                    this._subpage = Object.values(getActiveChannelTabs(state)).filter(key => key.parentPageId === this._page)[0].tabPageId;
                    this._subslot = Object.values(getActiveChannelTabs(state)).filter(key => key.parentPageId === this._page)[0].tabSlotId;
                if (this._subslot === 'S13' || this._subslot === 'S11') {
                    if (this.channelDetails !== ceChannelSlotsReselector(state)) { 
                        this.channelDetails = ceChannelSlotsReselector(state);
                        setTimeout(() => {
                            this.loadContentMessages(Object.values(this.channelDetails)[0].content, (this._subslot === 'S13') ? true : false);
                        }, (!this.editor) ? 1000 : 0);
                    }
                }
            }
        }

        if (this._htmlflg !== state.cesuboffer.htmlflg) { this._htmlflg = state.cesuboffer.htmlflg }

        if (this.clickAction !== actionClickSelector(state)) {
            this.clickAction = actionClickSelector(state);
        
            if (this.clickAction === actions.get('textBoldAction')) { this.boldAction(); }
            if (this.clickAction === actions.get('textItalicAction')) { this.italicAction(); }
            if (this.clickAction === actions.get('textUnderlineAction')) { this.underlineAction(); }
            if (this.clickAction === actions.get('textColorAction')) { this.colorAction(); }
            if (this.clickAction === actions.get('textUndoAction')) { this.undoAction(); }
            if (this.clickAction === actions.get('textRedoAction')) { this.redoAction(); }
            if (this.clickAction === actions.get('textAlignLeftAction')) { this.alignLeftAction(); }
            if (this.clickAction === actions.get('textAlignRightAction')) { this.alignRightAction(); }
            if (this.clickAction === actions.get('textAlignCenterAction')) { this.alignCenterAction(); }
            if (this.clickAction === actions.get('textAlignJustifyAction')) { this.alignJustifyAction(); }
            if (this.clickAction === actions.get('textListOrderedAction')) { this.listOrderedAction(); }
            if (this.clickAction === actions.get('textListBulletAction')) { this.listBulletAction(); }

            if (this.clickAction === actions.get('formatParagraphAction')) { this.paragraphAction(); }
            if (this.clickAction === actions.get('formatHeaderAction')) { this.headerAction(); }
            if (this.clickAction === actions.get('formatDivAction')) { this.divAction(); }
            if (this.clickAction === actions.get('embedAttachmentAction')) { this.linkAction(); }
            if (this.clickAction === actions.get('embedImageAction')) { this.newAction(); }
            if (this.clickAction === actions.get('embedParamAction')) { this.paramAction(); }
            if (this.clickAction === actions.get('nonBreakingSpaceAction')) { this.nbspAction(); }
            if (this.clickAction === actions.get('sourceHtmlAction')) { this.htmlAction(); }
        }
    }

    newAction() {
        console.log('... in progress');
    }

    textChanged() {
        this.changedText = (this._subslot === 'S13') ? JSON.stringify(html2json(this.editor.root.innerHTML)) : this.editor.getText().trimEnd();
        this.dispatchEvent(new CustomEvent('ev-confirm-text-change', { detail: { textChanged: this.changedText } }));
    }

    selectionChange() {

        // Dla potomnych:
        // W tym miejscu ma być renderowanie przycisków edytora w zależności od stylu zaznaczonego tekstu
        // (np. jeżeli tekst jest pogrubiony to przerenderuj przycisk bold z kolorem oznaczającym wciśnięty przycisk)

        // Propozycja implementacji:
        // Komponent rodzica wywołujący borsuk-editor przy firstUpdate zasila store definicją buttonów dla danego slotu (inna dla messages i push)
        // selectionChange aktualizuje store, przełączenie taba kanalowego (lub event blur na edytorze) zeruje wartości

        let format = this.editor.getFormat(this.editor.getSelection().index,this.editor.getSelection().length); 
        if (format.bold === true) { 
            // this.typoButtons[0].buttonPressed = true; 
            // this.typoButtons[0].buttonActive = false;
            // (this.selectionChangeFlg) ? this.selectionChangeFlg = false : this.selectionChangeFlg = true;
            // this.requestUpdate('navTypographyTamplete', this.typoButtons);
            // render(navTypographyTamplete(this.typoButtons), document.body);
        } else { 
            // this.typoButtons[0].buttonPressed = false; 
            // this.typoButtons[0].buttonActive = true;
            // (this.selectionChangeFlg) ? this.selectionChangeFlg = false : this.selectionChangeFlg = true;
        }

        // if (format.italic === true) { this.typoButtons[1].buttonPressed = true } else { this.typoButtons[1].buttonPressed = false }
        // if (format.boruline === 'text-decoration: underline') { this.typoButtons[2].buttonPressed = true } else { this.typoButtons[2].buttonPressed = false }
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

    colorAction() {
        this.shadowRoot.getElementById("colorsToast").openToast();
    }

    confirmColor(event) {
        this.editor.format('color', event.detail.chosenColor);
    }

    headerAction() {
        this.shadowRoot.getElementById("headerToast").openToast();
    }

    confirmHeader(event) {
        let range = this.editor.getSelection();
        console.log(range);
        if (range) { (event.detail.chosenHeader) ? this.editor.format('header', event.detail.chosenHeader) : this.editor.removeFormat(range.index,1); }
    }

    divAction() {
        let range = this.editor.getSelection();
        if (range) { this.editor.format('bordiv', true); }
    }

    paragraphAction() {
        let range = this.editor.getSelection();

        if (range) {
            let selectionFormat = this.editor.getFormat(range.index,1);
            if (selectionFormat.bordiv === true || selectionFormat.header > 0) {
                this.editor.removeFormat(range.index,0);
            }
        }
    }

    linkAction() {
        let range = this.editor.getSelection();
        let attribs = {};

        if (range) {
            let [leaf, offset] = this.editor.getLeaf(range.index);
            if (leaf) {
                attribs["linkText"] = leaf.text;
                let selection = this.editor.getContents(range.index - offset, leaf.domNode.length);
                if (selection.ops[0].attributes) {
                    if (selection.ops[0].attributes.borlink) {
                        attribs["selection"] = selection;
                    }
                }
            }

            let customSelection = this.editor.getContents(range.index, range.length);
            if (customSelection.ops.length > 1) {
                this.dialogWindow.openDialog('A', "Zaznaczono zbyt duży zakres danych");
            } else {
                if (customSelection.ops.length == 1) {
                    attribs["selectionLinkText"] = (customSelection.ops[0].insert) ? this.editor.getText(range.index, range.length) : '';
                }
                this.shadowRoot.getElementById("linkToast").openToast(attribs);
            }
        }

    }

    confirmLink(event) {
        let range = this.editor.getSelection(true);

        if (range) {
            let selection = this.editor.getContents(range.index, range.length);
            let [leaf, offset] = this.editor.getLeaf(range.index);

            if (selection.ops.length === 0) {
                this.editor.deleteText(range.index - offset, leaf.domNode.length);
                this.editor.insertText(range.index - offset, event.detail.chosenLinkContent.text, {
                    'borlink': event.detail.chosenLinkAttribs
                }, Quill.sources.USER);
            } else {
                this.editor.deleteText(range.index, range.length);
                this.editor.insertText(range.index, event.detail.chosenLinkContent.text, {
                    'borlink': event.detail.chosenLinkAttribs
                }, Quill.sources.USER);
            }
        } else {
            this.editor.insertText(range.index, event.detail.chosenLinkContent.text, {
                'borlink': event.detail.chosenLinkAttribs
            }, Quill.sources.USER);
        }
    }

    paramAction() {
        let range = this.editor.getSelection();
        this.shadowRoot.getElementById("paramToast").openToast(range.index);
    }

    confirmParam(event) {
        let parameter = '[(${'+event.detail.chosenParam.name+'})]';

        this.editor.setSelection(event.detail.position, 0);
        this.editor.insertText(event.detail.position, parameter);
        this.editor.setSelection(event.detail.position + parameter.length, Quill.sources.SILENT);
    }

    nbspAction() {
        // &nbsp - twarda spacja
        this.quillSpecialSign('\xA0');
    }

    quillSpecialSign(value) {
        let range = this.editor.getSelection();
        console.log(range);
        this.editor.insertText(range.index, value);
        this.editor.setSelection(range.index + 1, Quill.sources.SILENT);
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

    handleKeypress(event) {
        if (event.keyCode === 32 && event.ctrlKey && event.shiftKey) {
            this.nbspAction();
        }
    }

    loadContentMessages(content, jsonFlg) {
        if (jsonFlg) {
            this.editor.root.innerHTML = json2html(JSON.parse(content));
        } else {
            this.editor.root.innerHTML = content;
        }
    }

    htmlAction() {
        // this.editorContent = JSON.stringify(html2json(this.editor.root.innerHTML));
        // console.log(this.editorContent);
        // console.log('-----------------------------------------');
        // console.log(this.editor.root.innerHTML);
        let htmlEditor = this.shadowRoot.querySelector('.ql-html-editor');
        if (htmlEditor){
                // this.editor.root.innerHTML = htmlEditor.value.replace(/\n/g, "");
            this.editor.root.innerHTML = htmlEditor.value;
            this.editor.container.removeChild(htmlEditor);
        } else {
            let options = {
                "indent":"auto",
                "indent-spaces":2,
                "wrap":80,
                "markup":true,
                "output-xml":false,
                "numeric-entities":true,
                "quote-marks":true,
                "quote-nbsp":false,
                "show-body-only":true,
                "quote-ampersand":false,
                "break-before-br":true,
                "uppercase-tags":false,
                "uppercase-attributes":false,
                "drop-font-tags":true,
                "tidy-mark":false
            }
            let htmlEditor = document.createElement("textarea");

            // ponizej flaga dezaktywacji dla backendu
            // if (!this.userAllowed) { 
            if (!this._htmlflg) { htmlEditor.setAttribute("readonly",""); }
            htmlEditor.setAttribute("style", "resize: none");
            // }
            htmlEditor.className = 'ql-editor ql-html-editor';
            
            // htmlEditor.innerHTML = tidy_html5(this.editor.root.innerHTML, options).replace(/\n\n/g, "\n");
            htmlEditor.innerHTML = this.editor.root.innerHTML;
            // htmlEditor.innerHTML = this.editor.root.innerHTML;
            this.editor.container.appendChild(htmlEditor);
        }
    }

    // natomiast ponizej przyklad wysylka tresci z edytora na backend
    // metoda powinna byc w validateVersion
    // this.editorContent = JSON.stringify(html2json(this.editor.root.innerHTML));

    static get properties() {
        return {
            selectionChangeFlg: { type: Boolean },
            _page: { type: String },
            _subpage: { type: String },
            _slot: { type: String },
            _tabSlotId: { type: String },
            channelDetails: { type: Object },
            clickAction: { type: String },
            _htmlflg: { type: Boolean }
        };
    }

    connectedCallback() {
        super.connectedCallback();
        document.addEventListener('keydown', this.keypressListener);
    }

    disconnectedCallback() {
        document.removeEventListener('keydown', this.keypressListener);
        super.disconnectedCallback();
    }

    constructor() {
        super();
        this.keypressListener = this.handleKeypress.bind(this);
        this.channelDetails = {};
        this.contextRoot = '';
        this.selectionChangeFlg = false;
        this.clickAction = '';
        this._htmlflg = false;
    }

    getLength() {
        return this.editor.getLength();
    }

    getText() {
        return this.editor.getText();
    }

    getContents() {
        return this.editor.getContents();
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
