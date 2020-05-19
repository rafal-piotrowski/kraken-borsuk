/* eslint-disable import/newline-after-import */
/* eslint-disable import/order */
/* eslint-disable import/no-useless-path-segments */
/* eslint-disable import/no-extraneous-dependencies */

// import cesuboffer from '../redux/reducers/cesuboffer.js';

import {
    createStore,
    compose,
    applyMiddleware,
    combineReducers
  } from 'redux';
import thunk from 'redux-thunk';
import { lazyReducerEnhancer } from 'pwa-helpers/lazy-reducer-enhancer.js';
import { loadState, saveState } from './localstorage.js';

// Sets up a Chrome extension for time travel debugging.
// See https://github.com/zalmoxisus/redux-devtools-extension for more information.
const devCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    state => state,
    loadState(),
    devCompose(lazyReducerEnhancer(combineReducers), applyMiddleware(thunk))
  );

store.subscribe(() => {
  saveState(store.getState());
});

// store.addReducers({
//     cesuboffer
// });
