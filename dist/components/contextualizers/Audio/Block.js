'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _meta = require('./meta');

var _meta2 = _interopRequireDefault(_meta);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// text player is deprecated for now as the fact of
// fetching transcription as a file causes problems
// when rendering serverside
// import TextPlayer from './TextPlayer';

/* eslint no-new-func : 0 */

var isBrowser = new Function('try {return this===window;}catch(e){ return false;}');

var inBrowser = isBrowser();

var _ref = inBrowser ? require('react-media-player') : {},
    Media = _ref.Media,
    Player = _ref.Player,
    controls = _ref.controls;

var Block = function Block(_ref2, _ref3) {
  var resource = _ref2.resource,
      renderingMode = _ref2.renderingMode;
  var assetsData = _ref3.assetsData,
      getAssetUri = _ref3.getAssetUri;


  var appropriateTrackAsset = (0, _utils.pickAsset)(resource, _meta2.default.assetPickingRules.track[renderingMode], assetsData);
  // const appropriateTranscriptionAsset = pickAsset(resource, meta.assetPickingRules.transcription[renderingMode], assetsData);

  switch (renderingMode) {
    case 'web':
    case 'epub-fixed':
      if (inBrowser && appropriateTrackAsset) {
        var PlayPause = controls.PlayPause,
            CurrentTime = controls.CurrentTime,
            SeekBar = controls.SeekBar,
            Duration = controls.Duration,
            MuteUnmute = controls.MuteUnmute,
            Volume = controls.Volume;

        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            Media,
            null,
            _react2.default.createElement(
              'div',
              { className: 'media' },
              _react2.default.createElement(Player, { src: getAssetUri(appropriateTrackAsset.asset) }),
              _react2.default.createElement(
                'div',
                { className: 'media-controls' },
                _react2.default.createElement(PlayPause, { className: 'button play-pause' }),
                _react2.default.createElement(CurrentTime, { className: 'current-time tag' }),
                _react2.default.createElement(SeekBar, { className: 'seek-bar' }),
                _react2.default.createElement(Duration, { className: 'tag duration' }),
                _react2.default.createElement(MuteUnmute, { className: 'button mute' }),
                _react2.default.createElement(Volume, { className: 'volume' })
              )
            )
          ),
          resource.data.transcription && _react2.default.createElement(
            'blockquote',
            { className: 'transcription' },
            resource.data.transcription
          )
        );
      }
    // other than dynamic + serverside rendering
    case 'pdf': /* eslint no-fallthrough : 0 */
    case 'epub-reflowable':
    case 'micro':
      return resource.data.transcription ? _react2.default.createElement(
        'blockquote',
        { className: 'transcription' },
        resource.data.transcription
      ) : null;
    // if (appropriateTranscriptionAsset) {
    //   return (
    //     <div>

    //       {/*<TextPlayer src={getAssetUri(appropriateTranscriptionAsset.asset)} />*/}
    //     </div>
    //   );
    // }
    default:
      /* eslint no-fallthrough : 0 */
      return null;
  }
};

Block.contextTypes = {
  assetsData: _propTypes2.default.object,
  getAssetUri: _propTypes2.default.func
};

exports.default = Block;