import React from 'react';

import Page from '../components/Page';
import Nav from '../components/Nav';

export default () => (
  <Page>
    <Nav />
    <section className="vh-100 bg-washed-red">
      <header className="tc ph5 lh-copy">
        <h1 className="f1 f-headline-l code mb3 fw9 dib tracked-tight red">404</h1>
        <h2 className="tc f1-l fw1 light-red">Sorry, we can’t find the page you are looking for.</h2>
      </header>
    </section>
  </Page>
);