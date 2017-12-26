import React from 'react';

import ArticleTemplate from './ArticleTemplate';
import FullScreenTemplate from './FullscreenTemplate';
import Nav from './Nav';

export default ({
  parameters,
  composition,
  compositions,
  montage,
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
      <Nav montage={montage} compositions={compositions} />
      <Component
        parameters={parameters}
        composition={composition}
        assets={assets}
        resources={resources} />
      <style>
        {montage.data.css.shared_css_code}
        {
          /*
           * @todo implement renderingMode-specific css call
           */
        }
      </style>
    </div>
  );
};
