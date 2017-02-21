import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import PageNotFound from './components/PageNotFound';
import RandomPhotoPage from './containers/RandomPhotoPage';
import UserPage from './containers/UserPage';
import PhotoPage from './containers/PhotoPage';

export function createRoutes() {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={RandomPhotoPage} />
      <Route path="u/:username" component={UserPage} />
      <Route path="p/:photoId" component={PhotoPage} />
      <Route path="*" component={PageNotFound} />
    </Route>
  );
}