require('babel-core/register')({
  presets: [
    'babel-preset-es2015',
    'babel-preset-react',
    'babel-preset-stage-0',
  ].map(require.resolve)
});

require('dotenv').config();

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
const actions = require('./src/actions');

const LDClient = require('ldclient-node');
const ldClient = LDClient.init(process.env.LAUNCHDARKLY_SDK_KEY);

const createStore = () => createServerStore();

app.use('/assets', express.static('./dist'));

const getFlags = (user) => {
  return new Promise((resolve, reject) => {
    ldClient.all_flags(user, (err, flags) => err ? reject(err) : resolve(flags));
  });
};

const prerender = (req, res, store) => {
  const routes = createRoutes(store);

  // This could be from any authentication system.
  const user = {
    key: process.env.EXAMPLE_USER_KEY
  };

  if(process.env.EXAMPLE_USER_CUSTOM_JSON) {
    try {
      user.custom = JSON.parse(process.env.EXAMPLE_USER_CUSTOM_JSON);
    } catch(e) {
      console.log("Unable to parse env variable EXAMPLE_USER_CUSTOM_JSON:", process.env.EXAMPLE_USER_CUSTOM_JSON, e);
    }
  }
  
  getFlags(user).then(
    (flags) => {
      store.dispatch(actions.updateFlags(flags));

      match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
        if (error) {
          res.status(500).send(error.message)
        } else if (redirectLocation) {
          res.redirect(302, redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {
          const loadData = Promise.all(renderProps.routes.map(r =>
            r.component.loadData && r.component.loadData(store, { params: renderProps.params })
          ));

          loadData
            .then(
              () => {
                const app = ReactDOM.renderToString(
                  React.createElement(Provider, { store },
                    React.createElement(RouterContext, renderProps)
                  )
                );

                const html = ReactDOM.renderToStaticMarkup(
                  React.createElement(HTMLComponent, {
                    markup: app,
                    state: 'window.state = ' + JSON.stringify({
                      store: store.getState(),
                      flags,
                      user
                    }) + ';'
                  })
                );

                res.status(200).send(html);
              },
              () => {
                console.log('Failed to load data');
              }
            );
        } else {
          res.status(404).send('Not found')
        }
      });
    },
    (error) => {
      console.log('Error fetching user flags:', error);
    }
  );
};

app.get('/', (req, res) => {
  const store = createStore();
  prerender(req, res, store);
});

app.get('/curated', (req, res) => {
  const store = createStore();
  prerender(req, res, store);
});

app.get('/u/:username', (req, res) => {
  const store = createStore();
  prerender(req, res, store);
});

app.get('/p/:photoId', (req, res) => {
  const store = createStore();
  prerender(req, res, store);
});

app.get('*', (req, res) => {
  const store = createStore();
  prerender(req, res, store);
})

// Wait for LaunchDarkly to be ready
ldClient.once('ready', () => {
  console.log('LaunchDarkly is ready\n');
  // Start the server
  const port = process.env.PORT || 3000;
  const server = app.listen(port, function () {
    const host = server.address().address;
    console.log(`Isomorphic app listening at http://${host}:${port}`);
  });
});
