/* eslint no-new-func : 0 */

import React from 'react';
import PropTypes from 'prop-types';

import meta from './meta';
import {pickAsset} from '../utils';

let MobiliscenePlayer;

const isBrowser = new Function('try {return this===window;}catch(e){ return false;}');

const inBrowser = isBrowser();

if (inBrowser) {
  MobiliscenePlayer = require('./MobiliscenePlayer').default;
}

const {Media, Player, controls} = inBrowser ? require('react-media-player') : {};


const Block = ({
  resource,
  // contextualizer,
  // contextualization,
  renderingMode
}, {assetsData, getAssetUri}) => {

  const appropriateAsset = pickAsset(resource, meta.assetPickingRules.element[renderingMode], assetsData);
  if (!appropriateAsset) {
    return null;
  }
  const field = appropriateAsset.resourceDataField;

  let assetUri;
  let fontUri;
  if (resource.data.font_asset_id) {
    fontUri = getAssetUri(assetsData[resource.data.font_asset_id]);
  }

  switch (field) {
    case 'content_asset_id':
      if (inBrowser) {
        assetUri = getAssetUri(appropriateAsset.asset);
        return (
          <MobiliscenePlayer
            resource={resource}
            assetUri={assetUri}
            fontUri={fontUri} />
        );
      }
      return null;

    case 'screencast_video_asset_id':
      assetUri = getAssetUri(appropriateAsset.asset);
        const {PlayPause, MuteUnmute} = controls;
        return (
          <Media>
            <div className="media">
              <Player src={assetUri} />
              <div className="media-controls">
                <PlayPause />
                <MuteUnmute />
              </div>
            </div>
          </Media>
        );

    default:
      assetUri = getAssetUri(appropriateAsset.asset);
      return <img src={assetUri} />;
  }
};

Block.contextTypes = {
  assetsData: PropTypes.object,
  getAssetUri: PropTypes.func,
};

export default Block;
