import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { middleware as unsplashMiddleware } from './unsplash';
import rootReducer from './reducers';

function createDevelopmentStore(reducer, initialState) {
  const logger = require('redux-logger')({
    collapsed: true
  });

  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(
      thunk,
      unsplashMiddleware,
      logger
    )
  );
  
  return store;
}

function createProductionStore(reducer, initialState) {
  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(
      thunk,
      unsplashMiddleware
    )
  );
  
  return store;
}

export function createServerStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      thunk,
      unsplashMiddleware
    )
  );
}

export default function(initialState) {
  if (process.env.NODE_ENV !== 'production') {
    return createDevelopmentStore(rootReducer, initialState);
  } else {
    return createProductionStore(rootReducer, initialState);
  }
}