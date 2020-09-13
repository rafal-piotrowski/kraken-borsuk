export const breakpoints = new Map();
 
/**
* @deprecated since version 1.11.0
*/
export const breakpointXxs = 0;
export const breakpointXs = 480;
export const breakpointS = 600;
export const breakpointM = 840;
export const breakpointL = 960;
export const breakpointXl = 1200;
export const breakpointXxl = 1400;
export const breakpointXxxl = 1600;
 
breakpoints.set('xxs', breakpointXxs);
breakpoints.set('xs', breakpointXs);
breakpoints.set('s', breakpointS);
breakpoints.set('m', breakpointM);
breakpoints.set('l', breakpointL);
breakpoints.set('xl', breakpointXl);
breakpoints.set('xxl', breakpointXxl);
breakpoints.set('xxxl', breakpointXxxl);
 
/**
* Use this instead!
*/
export const breakpoint0 = 0;
export const breakpoint600 = 600;
export const breakpoint720 = 720;
export const breakpoint840 = 840;
export const breakpoint1280 = 1280;
 
breakpoints.set('0', breakpoint0);
breakpoints.set('600', breakpoint600);
breakpoints.set('720', breakpoint720);
breakpoints.set('840', breakpoint840);
breakpoints.set('1280', breakpoint1280);
