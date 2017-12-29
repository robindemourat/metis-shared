import React from 'react';

const Block = ({
  // resource,
  // contextualizer,
  // contextualization,
  renderingMode
}) => {

  switch (renderingMode) {
    case 'web':
      return (<div>Block web</div>);
    case 'pdf':
      return (<div>Block pdf</div>);
    case 'epub-reflowable':
      return (<div>Block epub reflowable</div>);
    case 'epub-fixed':
      return (<div>Block epub fixed</div>);
    case 'micro':
      return (<div>Block micro</div>);
    default:
      return null;
  }
};

export default Block;
