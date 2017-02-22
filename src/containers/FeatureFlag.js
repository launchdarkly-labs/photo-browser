import React from 'react';
import { connect } from 'react-redux';

const FeatureFlag = ({ value, children }) => children(value);

FeatureFlag.propTypes = {
  children: React.PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => {
  const { flags } = state;
  return {
    value: flags[props.flagKey]
  };
};

export default connect(mapStateToProps)(FeatureFlag);
