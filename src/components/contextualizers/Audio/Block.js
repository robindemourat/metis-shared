/* eslint no-new-func : 0 */

import React from 'react';
import PropTypes from 'prop-types';

import meta from './meta';
import {pickAsset} from '../utils';
// text player is deprecated for now as the fact of
// fetching transcription as a file causes problems
// when rendering serverside
// import TextPlayer from './TextPlayer';

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
  // const appropriateTranscriptionAsset = pickAsset(resource, meta.assetPickingRules.transcription[renderingMode], assetsData);

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
                    <PlayPause className="button play-pause" />
                    <CurrentTime className="current-time tag" />
                    <SeekBar className="seek-bar" />
                    <Duration className="tag duration" />
                    <MuteUnmute className="button mute" />
                    <Volume className="volume" />
                  </div>
                </div>
              </Media>
              {/*<TextPlayer src={getAssetUri(appropriateTranscriptionAsset.asset)} />*/}
              {resource.data.transcription && <blockquote className="transcription">
                {resource.data.transcription}
              </blockquote>}
            </div>
          );
        }
      // other than dynamic + serverside rendering
      case 'pdf':/* eslint no-fallthrough : 0 */
      case 'epub-reflowable':
      case 'micro':
        return resource.data.transcription ? <blockquote className="transcription">
          {resource.data.transcription}
        </blockquote> : null;
        // if (appropriateTranscriptionAsset) {
        //   return (
        //     <div>

        //       {/*<TextPlayer src={getAssetUri(appropriateTranscriptionAsset.asset)} />*/}
        //     </div>
        //   );
        // }
      default:/* eslint no-fallthrough : 0 */
        return null;
  }
};

Block.contextTypes = {
  assetsData: PropTypes.object,
  getAssetUri: PropTypes.func,
};

export default Block;
