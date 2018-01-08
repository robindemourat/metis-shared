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

var _DynamicImagesBlock = require('./DynamicImagesBlock');

var _DynamicImagesBlock2 = _interopRequireDefault(_DynamicImagesBlock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Block = function Block(_ref, _ref2) {
  var resource = _ref.resource,
      renderingMode = _ref.renderingMode;
  var assetsData = _ref2.assetsData,
      getAssetUri = _ref2.getAssetUri;


  switch (renderingMode) {
    case 'web':
      var getAppropriateAssetUri = function getAppropriateAssetUri(img) {
        var appropriateAsset = (0, _utils.pickSubAsset)(img, _meta2.default.assetPickingRules.image[renderingMode], assetsData);
        var imageAssetUri = getAssetUri(appropriateAsset.asset);
        return imageAssetUri;
      };
      return _react2.default.createElement(_DynamicImagesBlock2.default, {
        getAppropriateAssetUri: getAppropriateAssetUri,
        resource: resource });
    case 'pdf':
    case 'epub-reflowable':
    case 'epub-fixed':
    case 'micro':
      return _react2.default.createElement(
        'div',
        null,
        resource.data.map(function (img, index) {
          var appropriateAsset = (0, _utils.pickSubAsset)(img, _meta2.default.assetPickingRules.image[renderingMode], assetsData);
          var imageAssetUri = getAssetUri(appropriateAsset.asset);
          return _react2.default.createElement('img', { src: imageAssetUri, key: index });
        })
      );
    default:
      return null;
  }
};

Block.contextTypes = {
  assetsData: _propTypes2.default.object,
  getAssetUri: _propTypes2.default.func
};

exports.default = Block;