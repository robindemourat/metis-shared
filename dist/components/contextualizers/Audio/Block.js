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

var _TextPlayer = require('./TextPlayer');

var _TextPlayer2 = _interopRequireDefault(_TextPlayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isBrowser = new Function('try {return this===window;}catch(e){ return false;}'); /* eslint no-new-func : 0 */

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
  var appropriateTranscriptionAsset = (0, _utils.pickAsset)(resource, _meta2.default.assetPickingRules.transcription[renderingMode], assetsData);

  switch (renderingMode) {
    case 'web':
    case 'epub-fixed':
      if (inBrowser && appropriateTrackAsset) {
        var PlayPause = controls.PlayPause,
            CurrentTime = controls.CurrentTime,
            Progress = controls.Progress,
            SeekBar = controls.SeekBar,
            Duration = controls.Duration,
            MuteUnmute = controls.MuteUnmute,
            Volume = controls.Volume,
            Fullscreen = controls.Fullscreen;

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
                _react2.default.createElement(PlayPause, null),
                _react2.default.createElement(CurrentTime, null),
                _react2.default.createElement(Progress, null),
                _react2.default.createElement(SeekBar, null),
                _react2.default.createElement(Duration, null),
                _react2.default.createElement(MuteUnmute, null),
                _react2.default.createElement(Volume, null),
                _react2.default.createElement(Fullscreen, null)
              )
            )
          ),
          _react2.default.createElement(_TextPlayer2.default, { src: getAssetUri(appropriateTranscriptionAsset.asset) })
        );
      }
    // other than dynamic + serverside rendering
    case 'pdf': /* eslint no-fallthrough : 0 */
    case 'epub-reflowable':
    case 'micro':
      if (appropriateTranscriptionAsset) {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_TextPlayer2.default, { src: getAssetUri(appropriateTranscriptionAsset.asset) })
        );
      }
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