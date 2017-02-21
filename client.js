import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';

import { createRoutes } from './src/routes';
import createStore from './src/store';

const store = window.store = createStore(window.state);

ReactDOM.render(
  <Provider store={store}>
    <Router routes={createRoutes(store)} history={browserHistory} />
  </Provider>,
  document.getElementById('app-mount')
);