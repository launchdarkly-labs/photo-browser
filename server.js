require('babel-core/register')({
  presets: ['es2015', 'stage-0', 'react']
});

require.extensions['.css'] = () => {
  return;
};

const express = require('express');
const fs = require('fs');
const React = require('react');
const ReactDOM = require('react-dom/server');
const Provider = require('react-redux').Provider;
const match = require('react-router').match;
const RouterContext = require('react-router').RouterContext;

const app = express();
const createServerStore = require('./src/store').createServerStore;
const createRoutes = require('./src/routes').createRoutes;
const HTMLComponent = require('./src/components/HTML').default;
const seedData = require('./seeds/store.test.json');

const actions = require('./src/actions');

const createStore = () => createServerStore();

app.use('/assets', express.static('./dist'));

const prerender = (req, res, store) => {
  const routes = createRoutes();
  
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const app = ReactDOM.renderToString(
        React.createElement(Provider, { store },
          React.createElement(RouterContext, renderProps)
        )
      );

      const html = ReactDOM.renderToStaticMarkup(
        React.createElement(HTMLComponent, {
          markup: app,
          state: 'window.state = ' + JSON.stringify(store.getState()) + ';'
        })
      );

      res.status(200).send(html);
    } else {
      res.status(404).send('Not found')
    }
  });
};

app.get('/', (req, res) => {
  const store = createStore();

  // A better implementation might be to traverse the route components and
  // and invoke an agreed-upon static method that dispatches actions.
  const loadData = Promise.all([
    store.dispatch(actions.fetchRandomPhoto())
  ]);
  
  loadData.then(
    () => prerender(req, res, store),
    () => prerender(req, res, store)
  );
});

app.get('/u/:username', (req, res) => {
  const store = createStore();
  const username = req.params.username;

  // A better implementation might be to traverse the route components and
  // and invoke an agreed-upon static method that dispatches actions.
  const loadData = Promise.all([
    store.dispatch(actions.fetchUser(username)),
    store.dispatch(actions.fetchPhotos(username))
  ]);
  
  loadData.then(
    () => prerender(req, res, store),
    () => prerender(req, res, store)
  );
});

app.get('/p/:photoId', (req, res) => {
  const store = createStore();
  const photoId = req.params.photoId;

  // A better implementation might be to traverse the route components and
  // and invoke an agreed-upon static method that dispatches actions.
  const loadData = Promise.all([
    store.dispatch(actions.fetchPhoto(photoId))
  ]);
  
  loadData.then(
    () => prerender(req, res, store),
    () => prerender(req, res, store)
  );
});

app.get('*', (req, res) => {
  const store = createStore();
  prerender(req, res, store);
})

// start the server
const port = process.env.PORT || 3000;
const server = app.listen(port, function () {
  const host = server.address().address;
  console.log(`Isomorphic app listening at http://${host}:${port}`);
});
