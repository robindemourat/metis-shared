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

var _DynamicImageBlock = require('./DynamicImageBlock');

var _DynamicImageBlock2 = _interopRequireDefault(_DynamicImageBlock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Block = function Block(_ref, _ref2) {
  var resource = _ref.resource,
      renderingMode = _ref.renderingMode;
  var assetsData = _ref2.assetsData,
      getAssetUri = _ref2.getAssetUri;


  var appropriateAsset = (0, _utils.pickAsset)(resource, _meta2.default.assetPickingRules.image[renderingMode], assetsData);
  if (appropriateAsset) {
    var imageAssetUri = getAssetUri(appropriateAsset.asset);
    switch (renderingMode) {
      case 'web':
        return _react2.default.createElement(_DynamicImageBlock2.default, { assetUri: imageAssetUri, resource: resource });
      case 'pdf':
      case 'epub-reflowable':
      case 'epub-fixed':
      case 'micro':
        return _react2.default.createElement('img', { src: imageAssetUri });
      default:
        return null;
    }
  }
  return null;
};

Block.contextTypes = {
  assetsData: _propTypes2.default.object,
  getAssetUri: _propTypes2.default.func
};

exports.default = Block;