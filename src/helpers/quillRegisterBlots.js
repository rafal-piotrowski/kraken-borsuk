/* eslint-disable no-plusplus */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable prefer-const */

let Inline = Quill.import('blots/inline');
let Block = Quill.import('blots/block');

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

class DivBlot extends Block {
    static create() {
        let node = super.create();
        return node;
    }
}

class LinkBlot extends Inline {
    static create(value) {
        const node = super.create(value);

        for (let i = 0; i < Object.keys(value).length; i++) {
            node.setAttribute(Object.keys(value)[i], Object.values(value)[i]);
        }
        return node;
    }

    static formats(node) {
        let formats = {};
        let attribs = ['class', 'data-ext-action', 'data-int-action', 'data-off-action', 'data-inb-res', 'title', 'target', 'data-int-actparams'];

        for (let i = 0; i < attribs.length; i++) {
            if (node.hasAttribute(attribs[i])) { formats[attribs[i]] = node.getAttribute(attribs[i]); }
        }

        return formats;
    }
}

UlineBlot.blotName = 'boruline';
UlineBlot.tagName = 'span';
DivBlot.blotName = 'bordiv';
DivBlot.tagName = 'div';
LinkBlot.blotName = 'borlink';
LinkBlot.tagName = 'A';

Quill.register(UlineBlot);
Quill.register(DivBlot);
Quill.register(LinkBlot);
