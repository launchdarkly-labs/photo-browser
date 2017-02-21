import React from 'react';
import { Link } from 'react-router';

export default ({ photo }) => (
  <Link
    to={`/p/${photo.id}`}
    className="fl w-50 w-third-m w-25ns dim"
  >
    <div className="aspect-ratio aspect-ratio--16x9">
      <img
        className="db bg-center cover aspect-ratio--object"
        style={{
          backgroundColor: photo.color,
          backgroundImage: `url(${photo.urls.regular})`
        }}
      />
    </div>
  </Link>
);