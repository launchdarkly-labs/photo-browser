import React from 'react';

import Page from '../components/Page';

export default ({ error }) => (
  <Page>
    <section className="vh-100 bg-washed-red">
      <header className="tc ph5 lh-copy">
        <h1 className="f1 f-headline-l code mb3 fw9 dib tracked-tight red">{error.status || 500}</h1>
        <h2 className="tc f1-l fw1 light-red">{error.message}</h2>
      </header>
    </section>
  </Page>
);