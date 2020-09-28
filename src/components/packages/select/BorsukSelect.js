/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */

import { LitElement, html, css } from 'lit-element';
import { LionSelect } from '@lion/select';
import { IngFieldMixin } from '../../mixins/field-mixin/IngFieldMixin.js';
import { BorsukSelectStyle } from './BorsukSelectStyle.js';

// export class BorsukButton extends customElements.get('paper-button') {
export class BorsukSelect extends IngFieldMixin(LionSelect) {
    static get styles() {
        return [
            super.styles,
            BorsukSelectStyle];
    }
}
