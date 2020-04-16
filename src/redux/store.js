/* eslint-disable import/no-extraneous-dependencies */

import {
    createStore,
    compose,
    applyMiddleware,
    combineReducers
  } from 'redux';
import thunk from 'redux-thunk';
import { lazyReducerEnhancer } from 'pwa-helpers/lazy-reducer-enhancer.js';

// Sets up a Chrome extension for time travel debugging.
// See https://github.com/zalmoxisus/redux-devtools-extension for more information.
const devCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    state => state,
    devCompose(lazyReducerEnhancer(combineReducers), applyMiddleware(thunk))
  );
