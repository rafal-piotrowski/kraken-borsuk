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
import { render } from 'lit-html';
import { BorsukEditorStyle } from './BorsukEditorStyle.js';
// import { BorsukEditorIngStyle } from './BorsukEditorIngStyle.js';
import { borsukTypographyBold, borsukTypographyItalic, borsukTypographyUnderline, borsukTypographyColor,
        borsukTypographyUndo, borsukTypographyRedo, borsukTypographyAlignLeft, borsukTypographyAlignRight,
        borsukTypographyAlignCenter, borsukTypographyAlignJustify, borsukTypographyListOrdered, borsukTypographyListBullet,
        borsukFormatParagraph, borsukFormatHeader, borsukFormatDiv, borsukSourceHtml,
        borsukEmbedAttachment, borsukEmbedImage, borsukEmbedParam, borsukNonBreakingSpace } from '../icons/icons.js';

import  { actions } from '../properties/actions.js';

import './packages/borsuk-button.js';
import './packages/borsuk-icon.js';
import './collections/borsuk-form-buttons.js';
import './collections/borsuk-colors-toast.js';
import './collections/borsuk-header-toast.js';
import './collections/borsuk-link-toast.js';
import './collections/borsuk-param-toast.js';
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

                <div id="inputTitle" class="inputTitle"><span>Treść wiadomości:</span></div>
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

    get navFormatTamplete() {
        return html`${this.formatButtons.map(i => html`<borsuk-form-buttons .valuesButton="${i}"></borsuk-form-buttons>`)}`;
    }

    get navEmbedTamplete() {
        return html`${this.embedButtons.map(i => html`<borsuk-form-buttons .valuesButton="${i}"></borsuk-form-buttons>`)}`;
    }

    get navSourceTamplete() {
        return html`${this.sourceButtons.map(i => html`<borsuk-form-buttons .valuesButton="${i}"></borsuk-form-buttons>`)}`;
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

        if (this._subpage !== Object.values(getActiveChannelTabs(state)).filter(key => key.parentPageId === this._page)[0].tabPageId) {
                this._subpage = Object.values(getActiveChannelTabs(state)).filter(key => key.parentPageId === this._page)[0].tabPageId;
                this._subslot = Object.values(getActiveChannelTabs(state)).filter(key => key.parentPageId === this._page)[0].tabSlotId;
            if (this._subslot === 'S13') {
                if (this.channelDetails !== ceChannelSlotsReselector(state)) { 
                    this.channelDetails = ceChannelSlotsReselector(state);
                    if (!this.editor) {
                        setTimeout(() => {
                            this.loadContentMessages(Object.values(this.channelDetails)[0].content);
                        }, 1000);
                    } 
                    else if (this._subslot === 'S13') {
                        this.loadContentMessages(Object.values(this.channelDetails)[0].content);
                    }
                }
            }
        }

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
        this.changedText = JSON.stringify(html2json(this.editor.root.innerHTML));
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

                        console.log(selection.ops[0].attributes.borlink);

                        attribs["selection"] = selection;

                        // attribs["linkTitle"] = (selection.ops[0].attributes.borlink["title"]) ? selection.ops[0].attributes.borlink["title"] : '';
                        // attribs["toastOutLink"] = (selection.ops[0].attributes.borlink["data-ext-action"]) ? selection.ops[0].attributes.borlink["data-ext-action"] : '';
                        // attribs["toastInLink"] = (selection.ops[0].attributes.borlink["data-off-action"]) ? selection.ops[0].attributes.borlink["data-off-action"] : '';
                        // attribs["actionCode"] = (selection.ops[0].attributes.borlink["data-int-action"] &&
                        //     selection.ops[0].attributes.borlink["data-int-action"] !== 'GO-TO-SHOWDMFILE') ? selection.ops[0].attributes.borlink["data-int-action"] : '';
                        
                        // attribs["toastAttachLink"] = (selection.ops[0].attributes.borlink["data-int-actparams"]) ? selection.ops[0].attributes.borlink["data-int-actparams"] : '';
                        // attribs["responseCode"] = (selection.ops[0].attributes.borlink["data-inb-res"]) ? selection.ops[0].attributes.borlink["data-inb-res"] : '';
                        
                        // attribs["newWindowCheckbox"] = (selection.ops[0].attributes.borlink["target"]) ? true : false;

                        // if (selection.ops[0].attributes.borlink["class"] === "btn btn-primary") {
                        //     attribs["buttonRadioGroup"] = 'primaryButton';
                        // } else {
                        //     if (selection.ops[0].attributes.borlink["class"] === "btn btn-default") {
                        //         attribs["buttonRadioGroup"] = 'standardButton';
                        //     } else {
                        //         if (selection.ops[0].attributes.borlink["class"] == "link") {
                        //             attribs["buttonRadioGroup"] = 'linkButton';
                        //         } else {
                        //             attribs["buttonRadioGroup"] = 'noButton';
                        //         }
                        //     }
                        // }
                        // attribs["linkRadioGroup"] = ((selection.ops[0].attributes.borlink["data-off-action"]) ? 'inLink' :
                        //     ((selection.ops[0].attributes.borlink["data-int-actparams"]) ? 'attachLink' :
                        //         ((selection.ops[0].attributes.borlink["data-int-action"]) ? 'actionLink' : 'outLink')));
                    }

                }
            }

            let customSelection = this.editor.getContents(range.index, range.length);
            if (customSelection.ops.length > 1) {
                dialogWindow.openDialog('A', "Zaznaczono zbyt duży zakres danych","","");
            } else {
                if (customSelection.ops.length == 1) {
                    attribs["selectionLinkText"] = (customSelection.ops[0].insert) ? this.editor.getText(range.index, range.length) : '';
                }

                console.log('Jestem w borsuk-editor i wywoluje openToast, zawartość tablicy attribs:');
                console.log(attribs);
                
                console.log('oraz zawartosc customselection ops');
                console.log(customSelection.ops);
                this.shadowRoot.getElementById("linkToast").openToast(attribs);
            }
        }

    }

    confirmLink(event) {
        let range = this.editor.getSelection(true);
        
        console.log('Jestem w confirmLink, range is:');
        console.log(range);

        if (range) {
            let selection = this.editor.getContents(range.index, range.length);
            let [leaf, offset] = this.editor.getLeaf(range.index);

            console.log('zawartosc selection ops:');
            console.log(selection.ops);

            if (selection.ops.length === 0) {
                this.editor.deleteText(range.index - offset, leaf.domNode.length);
                this.editor.insertText(range.index - offset, event.detail.chosenLink.text, {
                    'borlink': event.detail.chosenLink
                }, Quill.sources.USER);
            } else {
                this.editor.deleteText(range.index, range.length);
                this.editor.insertText(range.index, event.detail.chosenLink.text, {
                    'borlink': event.detail.chosenLink
                }, Quill.sources.USER);
            }
        } else {
            this.editor.insertText(range.index, event.detail.chosenLink.text, {
                'borlink': event.detail.chosenLink
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

    loadContentMessages(jsonData) {
        if (jsonData) {
            this.editor.root.innerHTML = json2html(JSON.parse(jsonData));
        } else {
            this.editor.root.innerHTML = "";
        }
    }

    htmlAction() {
        this.editorContent = JSON.stringify(html2json(this.editor.root.innerHTML));
        console.log(this.editorContent);
    }

    // natomiast ponizej przyklad wysylka tresci z edytora na backend
    // metoda powinna byc w validateVersion
    // this.editorContent = JSON.stringify(html2json(this.editor.root.innerHTML));

    static get properties() {
        return {
            typoButtons: { type: Array },
            histButtons: { type: Array },
            listButtons: { type: Array },
            alignButtons: { type: Array },
            formatButtons: { type: Array },
            embedButtons: { type: Array },
            sourceButtons: { type: Array },
            selectionChangeFlg: { type: Boolean },
            _page: { type: String },
            _slot: { type: String },
            _tabSlotId: { type: String },
            channelDetails: { type: Object },
            clickAction: { type: String }
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

        this.histButtons = [{
                buttonId: actions.get('textUndoAction'),  // definicja z actions
                buttonTooltip: 'Cofnij',
                buttonIcon: borsukTypographyUndo,
                buttonActive: true,
                buttonPressed: false
            },{
                buttonId: actions.get('textRedoAction'),
                buttonTooltip: 'Ponów',
                buttonIcon: borsukTypographyRedo,
                buttonActive: true,
                buttonPressed: false
            }];

            this.typoButtons = [{
                buttonId: actions.get('textBoldAction'),
                buttonTooltip: 'Pogrubione',
                buttonIcon: borsukTypographyBold,
                buttonActive: true,
                buttonPressed: false
            },{
                buttonId: actions.get('textItalicAction'),
                buttonTooltip: 'Kursywa',
                buttonIcon: borsukTypographyItalic,
                buttonActive: true,
                buttonPressed: false
            },{
                buttonId: actions.get('textUnderlineAction'),
                buttonTooltip: 'Podkreślenie',
                buttonIcon: borsukTypographyUnderline,
                buttonActive: true,
                buttonPressed: false
            },{
                buttonId: actions.get('textColorAction'),
                buttonTooltip: 'Zmień kolor',
                buttonIcon: borsukTypographyColor,
                buttonActive: true,
                buttonPressed: false
            }];

            this.alignButtons = [{
                buttonId: actions.get('textAlignLeftAction'),
                buttonTooltip: 'Do lewej',
                buttonIcon: borsukTypographyAlignLeft,
                buttonActive: true,
                buttonPressed: false
            },{
                buttonId: actions.get('textAlignRightAction'),
                buttonTooltip: 'Do prawej',
                buttonIcon: borsukTypographyAlignRight,
                buttonActive: true,
                buttonPressed: false
            },{
                buttonId: actions.get('textAlignCenterAction'),
                buttonTooltip: 'Wyśrodkuj',
                buttonIcon: borsukTypographyAlignCenter,
                buttonActive: true,
                buttonPressed: false
            },{
                buttonId: actions.get('textAlignJustifyAction'),
                buttonTooltip: 'Wyjustuj',
                buttonIcon: borsukTypographyAlignJustify,
                buttonActive: true,
                buttonPressed: false
            }];

            this.listButtons = [{
                buttonId: actions.get('textListOrderedAction'),
                buttonTooltip: 'Numerowanie',
                buttonIcon: borsukTypographyListOrdered,
                buttonActive: true,
                buttonPressed: false
            },{
                buttonId: actions.get('textListBulletAction'),
                buttonTooltip: 'Lista',
                buttonIcon: borsukTypographyListBullet,
                buttonActive: true,
                buttonPressed: false
            }];

            this.formatButtons = [{
                buttonId: actions.get('formatParagraphAction'),
                buttonTooltip: 'Akapit',
                buttonIcon: borsukFormatParagraph,
                buttonActive: true,
                buttonPressed: false
            },{
                buttonId: actions.get('formatHeaderAction'),
                buttonTooltip: 'Nagłówek',
                buttonIcon: borsukFormatHeader,
                buttonActive: true,
                buttonPressed: false
            },{
                buttonId: actions.get('formatDivAction'),
                buttonTooltip: 'Div',
                buttonIcon: borsukFormatDiv,
                buttonActive: true,
                buttonPressed: false
            }];

            this.embedButtons = [{
                buttonId: actions.get('embedAttachmentAction'),
                buttonTooltip: 'Wstaw link',
                buttonIcon: borsukEmbedAttachment,
                buttonActive: true,
                buttonPressed: false
            },{
                buttonId: actions.get('embedImageAction'),
                buttonTooltip: 'Wstaw obrazek',
                buttonIcon: borsukEmbedImage,
                buttonActive: false,
                buttonPressed: false
            },{
                buttonId: actions.get('embedParamAction'),
                buttonTooltip: 'Parametr Inbound',
                buttonIcon: borsukEmbedParam,
                buttonActive: true,
                buttonPressed: false
            }];

            this.sourceButtons = [{
                buttonId: actions.get('nonBreakingSpaceAction'),
                buttonTooltip: 'Twarda spacja (Ctrl+Shift+Space)',
                buttonIcon: borsukNonBreakingSpace,
                buttonActive: true,
                buttonPressed: false
            },{
                buttonId: actions.get('sourceHtmlAction'),
                buttonTooltip: 'Kod źródłowy',
                buttonIcon: borsukSourceHtml,
                buttonActive: false,
                buttonPressed: false
            }];
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
