import React from 'react';
import PropTypes from 'prop-types';

const Block = ({
  // resource,
  // contextualizer,
  // contextualization
}, {renderingMode}) => {

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

Block.contextTypes = {
  renderingMode: PropTypes.oneOf(['web', 'pdf', 'epub-reflowable', 'epub-fixed', 'micro']).isRequired
};


export default Block;
