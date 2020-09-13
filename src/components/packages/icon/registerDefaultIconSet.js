/* eslint-disable object-shorthand */
/* eslint-disable import/no-extraneous-dependencies */

import { icons } from '@lion/icon';
 
function resolveIngIcon(iconset, name) {
  switch (iconset) {
    case 'filledin-functionalities':
        return import('./iconsets/filledin-functionalities.js').then(module => module[name]);
    case 'filledin-arrows':
        return import('./iconsets/filledin-arrows.js').then(module => module[name]);
    case 'filledin-notification':
        return import('./iconsets/filledin-notification.js').then(module => module[name]);
    case 'outline-characters':
      return import('./iconsets/outline-characters.js').then(module => module[name]);
    default:
        throw new Error(`Unknown iconset ${iconset}`);
  }
}
 
let registered = false;
 
export function registerDefaultIconsets() {
  if (registered === true) {
    return;
  }
  icons.addIconResolver('borsuk', resolveIngIcon);
  registered = true;
}

