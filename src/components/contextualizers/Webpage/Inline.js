import React from 'react';

const Inline = ({
  resource,
  contextualizer,
  // contextualization,
  renderingMode
}) => {
  let content;
  const url = resource.data.url;

  switch (renderingMode) {
    // interactive -> hyperlink
    case 'web':
    case 'epub-fixed':
      content = contextualizer.content || '*';
      return (<a target="blank" href={url}>{content}</a>);

    // not interactive -> write link in parenthesis
    case 'micro':
      content = contextualizer.content || '';
      return (<span>{content} ({url})</span>);

    // mix -> hyperlink + written link
    case 'epub-reflowable':
    case 'pdf':
      content = contextualizer.content || '';
      return (<a target="blank" href={url}>{content} ({url})</a>);
    default:
      return null;
  }
};

export default Inline;
