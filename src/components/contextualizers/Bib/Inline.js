/* eslint react/no-danger : 0 */

import React from 'react';
import PropTypes from 'prop-types';

const Inline = ({
  // resource,
  // contextualizer,
  contextualization,
  // renderingMode
}, {
  citations
}) => {
  const citation = citations[contextualization.id];
  if (citation && citation.html) {
    return (<cite
      dangerouslySetInnerHTML={{__html: citation.html}} />);
  }
  return null;
};

Inline.contextTypes = {
  citations: PropTypes.object
};

export default Inline;
