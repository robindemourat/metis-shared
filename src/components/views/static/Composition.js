import React from 'react';

import ArticleTemplate from './ArticleTemplate';

export default ({
  parameters,
  composition,
  assets,
  resources
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
      <div>
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
