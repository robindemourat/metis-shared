/* eslint no-new-func : 0 */

import React from 'react';
import PropTypes from 'prop-types';

import meta from './meta';
import {pickAsset} from '../utils';

const isBrowser = new Function('try {return this===window;}catch(e){ return false;}');

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
    case 'hd_video_asset_id':
    case 'sd_video_asset_id':
      if (inBrowser) {
        assetUri = getAssetUri(appropriateAsset.asset);
        const {PlayPause, CurrentTime, Progress, SeekBar, Duration, MuteUnmute, Volume, Fullscreen} = controls;
        return (
          <Media>
            <div className="media">
              <Player src={assetUri} />
              <div className="media-controls">
                <PlayPause/>
                <CurrentTime/>
                <Progress/>
                <SeekBar/>
                <Duration/>
                <MuteUnmute/>
                <Volume/>
                <Fullscreen/>
              </div>
            </div>
          </Media>
        );
      }
      return null;

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
