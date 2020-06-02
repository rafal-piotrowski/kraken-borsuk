/* eslint-disable prefer-const */
/* eslint-disable no-else-return */
const STORAGE = '__BORSUK_STORAGE__';

export const saveState = (state) => {
    let stringifiedState = JSON.stringify(state);
    localStorage.setItem(STORAGE, stringifiedState);
}

export const loadState = () => {
    let json = localStorage.getItem(STORAGE) || '{}';
    let state = JSON.parse(json);
  
    if (state) {
      return state;
    } else {
      return undefined;  // To use the defaults in the reducers
    }
}
  