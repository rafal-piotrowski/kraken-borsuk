import { LitElement, html, css } from 'lit-element';
import './components/rich-editor.js';

class ReduxThirdForm extends LitElement {
    render() {
        return html`
            <h2>formatka #3</h2>
            <rich-editor .page=${this.page} @ev-confirm-text-change=${this.editorTextChanged}></rich-editor>
        `;
    }

    editorTextChanged(event) {
        console.log(event.detail.textChanged);
    }

    static get properties() {
        return {
            page: { type: Number }
        }
    }

    constructor() {
        super();
        this.page = 3;
    }
}

customElements.define('redux-third-form', ReduxThirdForm);
