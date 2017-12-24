import React from 'react';
import PropTypes from 'prop-types';

const Inline = ({
  // resource,
  // contextualizer,
  // contextualization
}, {renderingMode}) => {

  switch (renderingMode) {
    case 'web':
      return (<span>inline web</span>);
    case 'pdf':
      return (<span>inline pdf</span>);
    case 'epub-reflowable':
      return (<span>inline epub reflowable</span>);
    case 'epub-fixed':
      return (<span>inline epub fixed</span>);
    case 'micro':
      return (<span>inline micro</span>);
    default:
      return null;
  }
};

Inline.contextTypes = {
  renderingMode: PropTypes.oneOf(['web', 'pdf', 'epub-reflowable', 'epub-fixed', 'micro']).isRequired
};

export default Inline;
