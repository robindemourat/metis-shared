import React from 'react';
import PropTypes from 'prop-types';

import meta from './meta';
import {pickAsset} from '../utils';
import DynamicBlock from './DynamicImageBlock';

const Block = ({
  resource,
  // contextualizer,
  // contextualization,
  renderingMode
}, {assets, getAssetUri}) => {

  const appropriateAsset = pickAsset(resource, meta.assetPickingRules.image[renderingMode], assets);
  if (appropriateAsset) {
    const imageAssetUri = getAssetUri(appropriateAsset.asset);
    switch (renderingMode) {
      case 'web':
        return (
          <DynamicBlock assetUri={imageAssetUri} resource={resource} />
        );
      case 'pdf':
      case 'epub-reflowable':
      case 'epub-fixed':
      case 'micro':
        return (
          <img src={imageAssetUri} />
        );
      default:
        return null;
    }
  }
  return null;
};

Block.contextTypes = {
  assets: PropTypes.object,
  getAssetUri: PropTypes.func,
};

export default Block;
