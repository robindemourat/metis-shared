import React from 'react';
import Renderer from '../../renderers/Renderer';

import './ArticleTemplate.scss';

export default ({
  composition,
  renderingMode,
  // parameters,
  assets,
  resources
}) => {
  return (
    <div className="plurishing-ArticleTemplate">
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
