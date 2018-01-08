import React from 'react';

import ArticleTemplate from './ArticleTemplate';

export default ({
  parameters,
  composition,
  // compositions,
  // montage,
  assets,
  resources,
  renderingMode = 'pdf',
  index
}) => {
  let Component = null;
  switch (parameters.template) {
    case 'article':
      Component = ArticleTemplate;
      break;
    default:
      break;
  }
  if (Component) {
    return (
      <div className={`composition-${index}`}>
        <Component
          renderingMode={renderingMode}
          composition={composition}
          parameters={parameters}
          resources={resources}
          assets={assets} />
      </div>
    );
  }
  return null;
};
