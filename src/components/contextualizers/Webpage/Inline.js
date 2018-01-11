import React from 'react';

const Inline = ({
  resource,
  contextualizer,
  // contextualization,
  renderingMode
}) => {
  const content = contextualizer.content || '*';
  const url = resource.data.url;

  switch (renderingMode) {
    // interactive -> hyperlink
    case 'web':
    case 'epub-fixed':
      return (<a target="blank" href={url}>{content}</a>);

    // not interactive -> write link in parenthesis
    case 'micro':
      return (<span>{content} ({url})</span>);

    // mix -> hyperlink + written link
    case 'epub-reflowable':
    case 'pdf':
      return (<a target="blank" href={url}>{content} ({url})</a>);
    default:
      return null;
  }
};

export default Inline;
