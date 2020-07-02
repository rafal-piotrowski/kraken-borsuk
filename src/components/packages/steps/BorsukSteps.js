import { css, html, LitElement } from 'lit-element';

export class BorsukSteps extends LitElement {
  static get properties() {
    /**
     * Fired when a transition between steps happens.
     *
     * @event transition
     */

    return {
      /**
       * Storage for data gathered across different steps.
       * Data is passed into each step condition function as a first argument.
       */
      data: {
        type: Object,
      },
      /**
       * Number of the current entered step.
       */
      current: {
        type: Number,
      },
      error: { type: Boolean },
      inprogress: { type: Boolean }
    };
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('current')) {
      this._onCurrentChanged(
        { current: this.current },
        { current: changedProperties.get('current') },
      );
    }
  }

  constructor() {
    super();
    this.data = {};
    this._internalCurrentSync = true; // necessary for preventing side effects on initialization
    this.current = 0;
    this.error = false;
    this.inprogress = false;
  }

  static get styles() {
    return [
      css`
        :host {
          display: block;
        }
        :host([hidden]) {
          display: none;
        }
      `,
    ];
  }

  render() {
    return html`
      <slot name="indicator"></slot>
      <slot></slot>
    `;
  }

  firstUpdated() {
    super.firstUpdated();
    this._max = this.steps.length - 1;

    let hasInitial = false;
    this.steps.forEach((step, i) => {
      if (step.initialStep && i !== 0) {
        this.current = i;
        hasInitial = true;
      }
    });
    if (!hasInitial && this.steps[0]) {
      this.steps[0].enter();
    }
  }

  next() {
    this._goTo(this.current + 1, this.current);
  }

  previous() {
    this._goTo(this.current - 1, this.current);
  }

  get steps() {
    const defaultSlot = this.shadowRoot.querySelector('slot:not([name])');
    return defaultSlot.assignedNodes().filter(node => node.nodeType === Node.ELEMENT_NODE);
  }

  _goTo(newCurrent, oldCurrent, errorFlg, inprogressFlg) {
    this.error = errorFlg;
    this.inprogress = inprogressFlg;

    const stepsIndicator = this.querySelector('borsuk-steps-indicator');
    stepsIndicator.error = this.error;
    stepsIndicator.inprogress = this.inprogress;

    if (newCurrent < 0 || newCurrent > this._max) {
      throw new Error(`There is no step at index ${newCurrent}.`);
    }

    const nextStep = this.steps[newCurrent];
    const back = newCurrent < oldCurrent;

    if (nextStep.passesCondition(this.data)) {
      if (back && nextStep.forwardOnly) {
        this._goTo(newCurrent - 1, oldCurrent);
      } else {
        this._changeStep(newCurrent, oldCurrent);
      }
    } else {
      nextStep.skip();
      if (back) {
        this._goTo(newCurrent - 1, oldCurrent);
      } else {
        this._goTo(newCurrent + 1, oldCurrent);
      }
    }
  }

  _changeStep(newCurrent, oldCurrent) {
    const oldStepElement = this.steps[oldCurrent];
    const newStepElement = this.steps[newCurrent];
    const fromStep = { number: oldCurrent, element: oldStepElement };
    const toStep = { number: newCurrent, element: newStepElement };

    oldStepElement.leave();

    if (this.current !== newCurrent) {
      this._internalCurrentSync = true;
      this.current = newCurrent;
    }

    newStepElement.enter();

    this._dispatchTransitionEvent(fromStep, toStep);
  }

  _dispatchTransitionEvent(fromStep, toStep) {
    this.dispatchEvent(
      new CustomEvent('transition', {
        bubbles: true,
        composed: true,
        detail: { fromStep, toStep },
      }),
    );
  }

  _onCurrentChanged(newValues, oldValues) {
    if (this._internalCurrentSync) {
      this._internalCurrentSync = false;
    } else {
      this._goTo(newValues.current, oldValues.current);
    }

    const stepsIndicator = this.querySelector('borsuk-steps-indicator');
    if (!stepsIndicator) {
      return;
    }
    stepsIndicator.current = this.current;
    stepsIndicator.error = this.error;
    stepsIndicator.inprogress = this.inprogress;
  }
}
