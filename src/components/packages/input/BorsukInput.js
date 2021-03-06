/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */

import { LitElement, html, css } from 'lit-element';
import { LionInput } from '@lion/input';
import { IngFieldMixin } from '../../mixins/field-mixin/IngFieldMixin.js';
import { BorsukInputStyle } from './BorsukInputStyle.js';

// export class BorsukButton extends customElements.get('paper-button') {
export class BorsukInput extends IngFieldMixin(LionInput) {
    static get styles() {
        return [
            super.styles,
            BorsukInputStyle];
    }
}
