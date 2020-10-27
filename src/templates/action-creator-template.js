/* eslint-disable arrow-body-style */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import { html } from 'lit-element';
import { Required } from '@lion/form-core';

class IsRequired extends Required {
    static getMessage({ fieldName }) {
        return `Pole ${fieldName} jest wymagane.`;
    }
}

export const actionCreatorTemplate = (name) => {
    return html`
        <borsuk-input
            class="input90"
            label="Zgłaszający akcję"
            readonly
            .modelValue=${name}
            .validators=${[new IsRequired()]}>
                <div slot="help-text">imię i nazwisko zgłaszającego akcję</div>
                <div slot="before" style="color: red;">*</div>
        </borsuk-input>
    `;
}
