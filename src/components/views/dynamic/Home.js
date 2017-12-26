import React from 'react';

import Nav from './Nav';

export default ({
  montage,
  compositions
}) => (
  <section>
    <Nav montage={montage} compositions={compositions} />
    <h2>Home</h2>
    {
          /*
           * @todo implement general && renderingMode-specific css call
           */
        }
  </section>
);
