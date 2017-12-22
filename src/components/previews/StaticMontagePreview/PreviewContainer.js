/**
 * A simple preview container simulating dynamic app routing with a state machine
 */

import React from 'react';

import Cover from '../../views/static/Cover';
import Colophon from '../../views/static/Colophon';
import Composition from '../../views/static/Composition';
import Toc from '../../views/static/Toc';

export default ({
  montage,
  compositions,
  resources,
  assets
}) => {
  return (
    <section>
      <Cover
        background={montage.data.cover_color}
        title={montage.metadata.title} />
      <Toc montage={montage} compositions={compositions} />
      {
          montage.data.compositions.map((parameters, index) => {
            const composition = compositions[parameters.target_composition_id];
            if (!composition) {
              return null;
            }
            return (<Composition
              key={index}
              parameters={parameters}
              composition={composition}
              resources={resources}
              assets={assets}
              locationIndex={index} />);
          })
        }
      <Colophon contents={montage.data.colophon} />
      <style>
        {montage.data.css_code}
      </style>
    </section>
    );
};
