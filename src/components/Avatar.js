import React from 'react';

const steps = {
  small: 2,
  big: 3
};

const Avatar = ({ size = 'small', url }) => (
  <img
    src={url}
    alt="avatar"
    className={`br-100 pa1 ba b--white h${steps[size]} w${steps[size]} v-mid`}
  />
);


Avatar.propTypes = {
  size: React.PropTypes.oneOf(['small', 'big'])
};

export default Avatar;
