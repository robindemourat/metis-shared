import React from 'react';
import Renderer from '../../renderers/Renderer';

export default ({
  composition,
  renderingMode,
  // parameters,
  assets,
  resources
}) => {
  return (
    <div>
      <h2>{composition.metadata.title}</h2>
      {/* main content */}
      <section>
        <Renderer
          raw={composition.contents}
          renderingMode={renderingMode}
          contextualizations={composition.contextualizations}
          contextualizers={composition.contextualizers}
          resources={resources}
          assets={assets} />
      </section>
      {/* notes */}

    </div>
  );
};
