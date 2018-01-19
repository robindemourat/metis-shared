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


  var appropriateAsset = (0, _utils.pickAsset)(resource, _meta2.default.assetPickingRules.element[renderingMode], assetsData);
  var field = appropriateAsset.resourceDataField;
  var assetUri = void 0;
  switch (field) {
    case 'url':
      return _react2.default.createElement('iframe', { src: resource.data.url });
    case 'screencast_video_asset_id':
      if (inBrowser) {
        assetUri = getAssetUri(appropriateAsset.asset);
        var PlayPause = controls.PlayPause,
            MuteUnmute = controls.MuteUnmute;

        return _react2.default.createElement(
          Media,
          null,
          _react2.default.createElement(
            'div',
            { className: 'media' },
            _react2.default.createElement(Player, { src: assetUri }),
            _react2.default.createElement(
              'div',
              { className: 'media-controls' },
              _react2.default.createElement(PlayPause, null),
              _react2.default.createElement(MuteUnmute, null)
            )
          )
        );
      } else if (assetUri) {
        return _react2.default.createElement(
          'video',
          { controls: true },
          _react2.default.createElement('source', { src: assetUri, type: 'video/' + assetUri.split('.').pop() })
        );
      } else return null;

    default:
      assetUri = getAssetUri(appropriateAsset.asset);
      return _react2.default.createElement('img', { src: assetUri });
  }
};

Block.contextTypes = {
  assetsData: _propTypes2.default.object,
  getAssetUri: _propTypes2.default.func
};

exports.default = Block;