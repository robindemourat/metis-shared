
import React from 'react';
import PropTypes from 'prop-types';

const InlineAssetWrapper = ({
  data
}, {
  story,
  contextualizers,
}) => {
  const assetId = data.asset && data.asset.id;
  if (!assetId || !story) {
    return null;
  }
  const contextualization = story.contextualizations[assetId];
  if (!contextualization) {
    return null;
  }

  const contextualizer = story.contextualizers[contextualization.contextualizerId];
  const resource = story.resources[contextualization.resourceId];
  const contextualizerModule = contextualizers[contextualizer.type];
  const Component = contextualizerModule && contextualizerModule.InlineDynamic;

  if (contextualizer && Component) {
    return (
      <span
        className={'InlineAssetWrapper ' + 'inline-' + contextualizer.type}
        id={assetId}>
        <Component
          contextualization={contextualization}
          contextualizer={contextualizer}
          resource={resource} />
      </span>
    );
  }
  return null;
};

/**
 * Component's properties types
 */
InlineAssetWrapper.propTypes = {
  /**
   * Corresponds to the data initially embedded in a draft-js entity
   */
  data: PropTypes.shape({
    asset: PropTypes.shape({
      id: PropTypes.string
    })
  })
};
/**
 * Component's context used properties
 */
InlineAssetWrapper.contextTypes = {
  story: PropTypes.object,
  contextualizers: PropTypes.object,
};

export default InlineAssetWrapper;
