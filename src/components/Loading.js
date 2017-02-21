import React from 'react';

export default ({children}) => (
  <div className="dt w-100 vh-100">
    <div className="dtc v-mid tc black ph3 ph4-l">
      <h1 className="f6 f2-m f-subheadline-l fw6 tc">
        {children}
      </h1>
    </div>
  </div>
);
