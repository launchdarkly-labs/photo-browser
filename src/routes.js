import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import PageNotFound from './components/PageNotFound';
import RandomPhotoPage from './containers/RandomPhotoPage';
import CuratedPhotosPage from './containers/CuratedPhotosPage';
import UserPage from './containers/UserPage';
import PhotoPage from './containers/PhotoPage';


const requireFlag = ({getState}) => (flagKey, redirect) => {
  return (nextState, replace) => {
    if (!getState().flags[flagKey]) {
      replace(redirect);
    }
  };
};

export function createRoutes(store) {
  const check = requireFlag(store);

  return (
    <Route path="/" component={App}>
      <IndexRoute component={RandomPhotoPage} />
      <Route path="/curated" component={CuratedPhotosPage} onEnter={check('curated-photos-page', '/')} />
      <Route path="u/:username" component={UserPage} />
      <Route path="p/:photoId" component={PhotoPage} />
      <Route path="*" component={PageNotFound} />
    </Route>
  );
}