import { breakpoints } from './breakpoints.js';
 
export const containerMaxWidths = new Map();
const containerMaxWidth = 1232;
 
/**
* @deprecated since version 1.11.0
*/
export const gutterXxs = 16;
export const gutterXs = 16;
export const gutterS = 16;
export const gutterM = 16;
export const gutterL = 24;
export const gutterXl = 24;
export const gutterXxl = 24;
export const gutterXxxl = 24;
 
export const gutterWidths = new Map();
gutterWidths.set('xxs', gutterXxs);
gutterWidths.set('xs', gutterXs);
gutterWidths.set('s', gutterS);
gutterWidths.set('m', gutterM);
gutterWidths.set('l', gutterL);
gutterWidths.set('xl', gutterXl);
gutterWidths.set('xxl', gutterXxl);
gutterWidths.set('xxxl', gutterXxxl);
 
containerMaxWidths.set('xs', breakpoints.get('xs') - gutterWidths.get('xs') * 2);
containerMaxWidths.set('s', breakpoints.get('s') - gutterWidths.get('s') * 2);
containerMaxWidths.set('m', breakpoints.get('m') - gutterWidths.get('m') * 2);
containerMaxWidths.set('l', breakpoints.get('l') - gutterWidths.get('l') * 2);
containerMaxWidths.set('xl', containerMaxWidth);
containerMaxWidths.set('xxl', containerMaxWidth);
containerMaxWidths.set('xxxl', containerMaxWidth);
 
/**
* Use these instead!
*/
export const gutter0 = 16;
export const gutter600 = 16;
export const gutter720 = 24;
export const gutter840 = 24;
export const gutter1280 = 24;
 
gutterWidths.set('0', gutter0);
gutterWidths.set('600', gutter600);
gutterWidths.set('720', gutter720);
gutterWidths.set('840', gutter840);
gutterWidths.set('1280', gutter1280);
 
containerMaxWidths.set('600', breakpoints.get('600') - gutterWidths.get('600') * 2);
containerMaxWidths.set('720', breakpoints.get('720') - gutterWidths.get('720') * 2);
containerMaxWidths.set('840', breakpoints.get('840') - gutterWidths.get('840') * 2);
containerMaxWidths.set('1280', breakpoints.get('1280') - gutterWidths.get('1280') * 2);
 
export const columns = 12;
