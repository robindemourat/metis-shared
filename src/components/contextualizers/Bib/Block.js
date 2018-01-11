/* eslint no-new-func : 0 */
import React from 'react';
import PropTypes from 'prop-types';
import {Bibliography} from 'react-citeproc';

const Block = ({
  resource,
  // contextualizer,
  // contextualization,
  // renderingMode
}, {
  citationLocale,
  citationStyle,
  citationItems
}) => {
  const item = citationItems[resource.data.id];
  if (item) {
    return (
      <Bibliography
        style={citationStyle}
        locale={citationLocale}
        items={{[item.id]: item}} />
    );
  }
  return null;
};

Block.contextTypes = {
  citationLocale: PropTypes.string,
  citationStyle: PropTypes.string,
  citationItems: PropTypes.object
};

export default Block;
