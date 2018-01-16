/* eslint no-new-func : 0 */

import React from 'react';
import PropTypes from 'prop-types';

import meta from './meta';
import {pickAsset} from '../utils';
import TextPlayer from './TextPlayer';

const isBrowser = new Function('try {return this===window;}catch(e){ return false;}');

const inBrowser = isBrowser();

const {Media, Player, controls} = inBrowser ? require('react-media-player') : {};

const Block = ({
  resource,
  // contextualizer,
  // contextualization,
  renderingMode
}, {assetsData, getAssetUri}) => {

  const appropriateTrackAsset = pickAsset(resource, meta.assetPickingRules.track[renderingMode], assetsData);
  const appropriateTranscriptionAsset = pickAsset(resource, meta.assetPickingRules.transcription[renderingMode], assetsData);

  switch (renderingMode) {
      case 'web':
      case 'epub-fixed':
        if (inBrowser && appropriateTrackAsset) {
          const {PlayPause, CurrentTime, SeekBar, Duration, MuteUnmute, Volume} = controls;
          return (
            <div>
              <Media>
                <div className="media">
                  <Player src={getAssetUri(appropriateTrackAsset.asset)} />
                  <div className="media-controls">
                    <PlayPause />
                    <CurrentTime />
                    <SeekBar />
                    <Duration />
                    <MuteUnmute />
                    <Volume />
                  </div>
                </div>
              </Media>
              <TextPlayer src={getAssetUri(appropriateTranscriptionAsset.asset)} />
            </div>
          );
        }
      // other than dynamic + serverside rendering
      case 'pdf':/* eslint no-fallthrough : 0 */
      case 'epub-reflowable':
      case 'micro':
        if (appropriateTranscriptionAsset) {
          return (
            <div>
              <TextPlayer src={getAssetUri(appropriateTranscriptionAsset.asset)} />
            </div>
          );
        }
      default:/* eslint no-fallthrough : 0 */
        return null;
  }
};

Block.contextTypes = {
  assetsData: PropTypes.object,
  getAssetUri: PropTypes.func,
};

export default Block;
