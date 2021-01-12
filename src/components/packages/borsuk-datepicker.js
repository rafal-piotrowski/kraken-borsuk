/* eslint-disable import/no-extraneous-dependencies */

// import { BorsukDatepicker } from './datepicker/BorsukDatepicker.js';
import { LionInputDatepicker } from '@lion/input-datepicker';
import { IngFieldMixin } from '../mixins/field-mixin/IngFieldMixin.js';

class BorsukDatepicker extends IngFieldMixin(LionInputDatepicker) {}
customElements.define('borsuk-datepicker', BorsukDatepicker);
