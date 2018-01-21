/* eslint no-new-func : 0 */

import React from 'react';
import PropTypes from 'prop-types';

import meta from './meta';
import {pickAsset} from '../utils';

import DynamicTable from './DynamicTable';
import StaticTable from './StaticTable';

const Block = ({
  resource,
  contextualizer,
  // contextualization,
  renderingMode
}, {assetsData, getAssetUri}) => {

  const appropriateAsset = pickAsset(resource, meta.assetPickingRules.data[renderingMode], assetsData);
  if (appropriateAsset) {
    const tableAssetUri = getAssetUri(appropriateAsset.asset);
    switch (renderingMode) {
      case 'web':
        return (
          <DynamicTable
            src={tableAssetUri} />
        );
      case 'pdf':
      case 'epub-reflowable':
      case 'epub-fixed':
      case 'micro':
        return (
          <StaticTable
            src={tableAssetUri}
            contextualizer={contextualizer}
            asset={appropriateAsset} />
        );
      default:
        return null;
    }
  }
  return null;
};

Block.contextTypes = {
  assetsData: PropTypes.object,
  getAssetUri: PropTypes.func,
};

export default Block;
