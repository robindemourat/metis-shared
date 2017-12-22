import React from 'react';

import ArticleTemplate from './ArticleTemplate';
import FullScreenTemplate from './FullscreenTemplate';

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
    case 'fullscreen':
      Component = FullScreenTemplate;
      break;
    default:
      break;
  }

  return (
    <div>
      <Component
        parameters={parameters}
        composition={composition}
        assets={assets}
        resources={resources} />
      <style>
        {parameters.css_code}
      </style>
    </div>
  );
};
