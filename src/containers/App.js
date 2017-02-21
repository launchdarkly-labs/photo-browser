import React from 'react';
import { connect } from 'react-redux';

import ServerError from '../components/ServerError';

import '../styles.css';

const App = ({ serverError, children }) => (
  <div>
    {serverError
      ? <ServerError error={serverError} />
      : children
    }
  </div>
);

const mapStateToProps = (state, props) => {
  const { serverError } = state;

  return {
    serverError
  };
};

export default connect(mapStateToProps)(App);
