import { css } from 'lit-element';

export const BorsukLinkStyle = css`

    :host {
        --ing-indigo-color: #525199;
        --ing-indigo15-color: #e6e5f0;
        --ing-indigo60-color: #9898c3;
        --ing-sky-color: #60a6da;
        --ing-fuchsia-color: #ab0066;
        --ing-fuchsia15-color: #f3dce9;
        --ing-fuchsia60-color: #cd66a4;
        --ing-orange-color: #ff6200;
        --link-icon-size: 16px;
        --link-icon-margin-right: 8px;
    }

    .link {
        display: inline;
        text-decoration: none;
        border-bottom: none;
    }

    .link:hover {
        background-color: transparent;
    }

    .link__content {
        display: inline;
    }

    .link__text {
        border-bottom: 1px solid var(--ing-indigo-color);
        color: var(--ing-indigo-color);
    }

    .link__icon--after {
        margin-bottom: 4px;
    }

    .link:visited .link__text {
        color: var(--ing-fuchsia-color);
        border-bottom-color: var(--ing-fuchsia-color);
    }

    .link:visited .link__icon--after {
        fill: var(--ing-fuchsia-color);
    }

    .link:focus,
    .link:visited:focus {
        outline: none;
    }

    .link:focus .link__content,
    .link:visited:focus .link__content {
        border-radius: 4px;
    }

    .link:focus .link__text,
    .link:visited:focus .link__text {
        border-bottom-color: transparent;
    }

    .link:hover > .link__content {
        background-color: var(--ing-indigo15-color);
    }

    .link:visited:hover > .link__content {
        background-color: var(--ing-fuchsia15-color);
    }

    .link:active > .link__content {
        background-color: transparent;
    }

    .link:active .link__text,
    .link:active .link__icon--after {
        color: var(--ing-indigo60-color);
        fill: var(--ing-indigo60-color);
        border-bottom-color: transparent;
    }

    .link:visited:active > .link__content {
        background-color: transparent;
    }

    .link:visited:active .link__text,
    .link:visited:active .link__icon--after {
        color: var(--ing-fuchsia15-color);
        fill: var(--ing-fuchsia15-color);
        border-bottom-color: transparent;
    }

    .link__icon--before {
        fill: var(--ing-orange-color);
        border: none;
        width: var(--link-icon-size);
        height: var(--link-icon-size);
        vertical-align: middle;
        margin-right: var(--link-icon-margin-right);
    }

    .link ::slotted([slot='icon-after']),
    .link__icon--after {
        margin-left: 4px;
        border: none;
        vertical-align: middle;
        fill: var(--ing-indigo-color);
    }
 
`; 