/* eslint no-new-func : 0 */
import React from 'react';
import PropTypes from 'prop-types';
const isBrowser = new Function('try {return this===window;}catch(e){ return false;}');

import meta from './meta';
import {pickAsset} from '../utils';

const inBrowser = isBrowser();

const {Media, Player, controls} = inBrowser ? require('react-media-player') : {};

const Block = ({
  resource,
  // contextualizer,
  // contextualization,
  renderingMode
}, {assetsData, getAssetUri}) => {

  const appropriateAsset = pickAsset(resource, meta.assetPickingRules.element[renderingMode], assetsData);
  const field = appropriateAsset.resourceDataField;
  let assetUri;
  switch (field) {
    case 'url':
      return <iframe src={resource.data.url} />;
    case 'screencast_video_asset_id':
      if (inBrowser) {
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
      }
      return <video controls>
                  <source src={assetUri} type={`video/${assetUri.split('.').pop()}`} />
                </video>

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
