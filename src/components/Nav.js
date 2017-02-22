import React from 'react';
import { Link } from 'react-router';

import FeatureFlag from '../containers/FeatureFlag';
import Header from '../components/Header';

export default () => (
  <Header>
    <Link to="/" className="mr2 mr3-m mr4-l f6 fw6 link dim white">Home</Link>
    <FeatureFlag flagKey="curated-photos-page">
      {(value) => value && <Link to="/curated" className="f6 fw6 link dim white">Curated photos</Link>}
    </FeatureFlag>
  </Header>
);
