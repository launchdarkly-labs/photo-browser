import React from 'react';
import { Link } from 'react-router';

import Avatar from './Avatar';

export default ({ user, showName, ...props }) => (
  <Link {...props} to={`/u/${user.username}`}>
    <Avatar url={user.profileImage.large} />

    {showName && (
      <span className="ml2 dim">
        {user.name}
      </span>
    )}
  </Link>
);