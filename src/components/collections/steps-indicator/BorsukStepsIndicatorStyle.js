import { css } from 'lit-element';

export const BorsukStepsIndicatorStyle = css`
    :root {
        --ing-orange-color: #ff6200;
        --ing-orange-brighter: #E8800C;
        --ing-orange-brightest: #FFA90D;
        --ing-orange-darker: #E8400C;
        --ing-orange-darkest: #FF230D;

        --ing-very-light-grey-color: #bdbdbd;
        --ing-8percent-black-color: #f0f0f0;
        --ing-15percent-black-color: #d9d9d9;
        --ing-light-grey-color: #a8a8a8;
        --ing-mid-grey-color: #767676;
        --ing-black-color: #333333;
        --ing-minus-color: #ff0000;
        --ing-leaf-color: #349651;
        --ing-lime-color: #d0d93c;
        --ing-fuchsia-color: #ab0066;
        
        --ing-sky-color: #60a6da;
        --ing-sky-brighter: #5DD7F0;
        --ing-sky-brightest: #5AE6D8;
        --ing-sky-darker: #5D8AF0;
        --ing-sky-darkest: #5A5FE6;

        --ing-indigo-color: #525199;

        --borsuk-sidebar-width: 325px;
        --borsuk-navbar-max-height: 50px;
        --borsuk-navbar-padding-top: 10px;

        /* --paper-font-subhead: {
            @apply --paper-font-common-base;

            font-size: 22px !important;
            font-weight: 400 !important;
            line-height: 30px !important;
        } */

        font-family: INGMeWeb, Arial, sans-serif;

    --paper-tab-ink: #5AE6D8 !important;
    --paper-yellow-a100: #5AE6D8 !important;
    }

  .steps {
    display: flex;
    list-style-type: none;
    padding: 0;
  }

  .step {
    display: none;
  }

  .step__checkmark {
    fill: white;
  }

  .step__number {
    padding-left: 0.1em;
  }
 
  .step__body {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .step__icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 2px solid black;
    font-weight: bold;
    color: black;
  }

  .step__icon--current {
    border-color: var(--ing-leaf-color);
    background: var(--ing-leaf-color);
    color: white;
  }

  .step__icon--error {
    border-color: var(--ing-minus-color);
    background: var(--ing-minus-color);
    color: white;
  }

  .step__icon--inprogress {
    border-color: var(--ing-sky-color);
    background: var(--ing-sky-color);
    color: white;
  }

  .step__icon--visited {
    border-color: var(--ing-leaf-color);
    background: var(--ing-leaf-color);
  }

  .step--current {
    display: flex;
    width: unset;
  }

  .step__separator {
    display: none;
  }

  .step__label {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 121px;
    margin-top: 8px;
  }

  .step__label--current {
    font-weight: bold;
    line-height: 20px;
    max-width: unset;
    margin-left: 8px;
    margin-top: 0;
  }

  .step__progress {
    font-size: 14px;
    line-height: 20px;
    display: flex;
  }

 @media (min-width: 840px) {
    .step {
      display: flex;
      flex-direction: row;
      width: 158px;
    }

  .step__body {
    flex-direction: column;
  }

  .step__label {
    line-height: 24px;
  }
 
  .step__label--current {
    margin-top: 8px;
    margin-left: 0;
  }
 
  .step__separator {
    display: block;
    width: 110px;
    margin: 14px -55px 0px;
    border-top: 2px solid black;
  }
 
  .step__icon {
    width: 24px;
    height: 24px;
  }
 
  .step__progress {
    position: absolute;
    top: 0;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(100%);
    clip: rect(1px, 1px, 1px, 1px);
    white-space: nowrap;
    border: 0;
    margin: 0;
    padding: 0;

  }
 
  .step__progress--hide {
    display: none;
  }
}
`;
