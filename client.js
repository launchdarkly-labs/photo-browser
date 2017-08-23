import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import mapValues from 'lodash/mapValues';

import LDClient from 'ldclient-js';

import { createRoutes } from './src/routes';
import createStore from './src/store';
import { updateFlags } from './src/actions';

const store = window.store = createStore(window.state.store);

const ldClient = LDClient.initialize(process.env.LAUNCHDARKLY_CLIENTSIDE_ID, { key: process.env.EXAMPLE_USER_KEY }, {
  bootstrap: window.state.flags
});

ldClient.on('change', (flags) => {
  store.dispatch(updateFlags(
    mapValues(flags, f => f.current)
  ));
});

ldClient.on('ready', () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router routes={createRoutes(store)} history={browserHistory} />
    </Provider>,
    document.getElementById('app-mount')
  );
});