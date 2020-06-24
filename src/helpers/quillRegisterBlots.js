/* eslint-disable no-undef */
/* eslint-disable prefer-const */

let Inline = Quill.import('blots/inline');

class UlineBlot extends Inline {
    static create(value) {
        const node = super.create(value);
        node.setAttribute('style', (value) ? 'text-decoration: underline' : 'text-decoration: none');
        return node;
    }

    static formats(node) {
        return node.getAttribute('style');
    }
}

UlineBlot.blotName = 'boruline';
UlineBlot.tagName = 'span';

Quill.register(UlineBlot);
