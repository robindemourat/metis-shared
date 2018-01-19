import React from 'react';
import PropTypes from 'prop-types';

import meta from './meta';
import {pickSubAsset} from '../utils';
import DynamicBlock from './DynamicImagesBlock';

const Block = ({
  resource,
  // contextualizer,
  // contextualization,
  renderingMode
}, {assetsData, getAssetUri}) => {

  switch (renderingMode) {
    case 'web':
      const getAppropriateAssetUri = img => {
        const appropriateAsset = pickSubAsset(img, meta.assetPickingRules.image[renderingMode], assetsData);
        const imageAssetUri = getAssetUri(appropriateAsset.asset);
        return imageAssetUri;
      };
      return (
        <DynamicBlock
          getAppropriateAssetUri={getAppropriateAssetUri}
          resource={resource} />
      );
    case 'pdf':
    case 'epub-reflowable':
    case 'epub-fixed':
    case 'micro':
    default:
      return (
        <div>
          {
            resource.data.map((img, index) => {
              const appropriateAsset = pickSubAsset(img, meta.assetPickingRules.image[renderingMode], assetsData);
              if (appropriateAsset) {
                const imageAssetUri = getAssetUri(appropriateAsset.asset);
                return <img src={imageAssetUri} key={index} />;
              }
              return null;
            })
          }
        </div>
      );
  }
};

Block.contextTypes = {
  assetsData: PropTypes.object,
  getAssetUri: PropTypes.func,
};

export default Block;
