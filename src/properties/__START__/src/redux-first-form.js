import { LitElement, html, css } from 'lit-element';
import './components/rich-editor.js';

class ReduxFirstForm extends LitElement {
    render() {
        return html`
            <h2>formatka #1</h2>
            <rich-editor id="editor" .page=${this.page} @ev-confirm-text-change=${this.editorTextChanged}></rich-editor>
        `;
    }

    editorTextChanged(event) {
        console.log(event.detail.textChanged);
    }

    static get properties() {
        return {
            page: { type: Number },
            formContent: { type: Object }
        }
    }

    constructor() {
        super();
        this.page = 1;
    }

    get editor() {
        return this.shadowRoot.getElementById("editor");
    }
}

customElements.define('redux-first-form', ReduxFirstForm);
