import React from 'react';

import ArticleTemplate from './ArticleTemplate';

export default ({
  parameters,
  composition,
  assets,
  resources,
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
          parameters={parameters}
          composition={composition}
          assets={assets}
          resources={resources} />
      </div>
    );
  }
  return null;
};
