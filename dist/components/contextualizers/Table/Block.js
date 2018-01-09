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

var _DynamicTable = require('./DynamicTable');

var _DynamicTable2 = _interopRequireDefault(_DynamicTable);

var _StaticTable = require('./StaticTable');

var _StaticTable2 = _interopRequireDefault(_StaticTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint no-new-func : 0 */

var Block = function Block(_ref, _ref2) {
  var resource = _ref.resource,
      contextualizer = _ref.contextualizer,
      renderingMode = _ref.renderingMode;
  var assetsData = _ref2.assetsData,
      getAssetUri = _ref2.getAssetUri;


  var appropriateAsset = (0, _utils.pickAsset)(resource, _meta2.default.assetPickingRules.data[renderingMode], assetsData);
  if (appropriateAsset) {
    var tableAssetUri = getAssetUri(appropriateAsset.asset);
    switch (renderingMode) {
      case 'web':
        return _react2.default.createElement(_DynamicTable2.default, {
          src: tableAssetUri });
      case 'pdf':
      case 'epub-reflowable':
      case 'epub-fixed':
      case 'micro':
        return _react2.default.createElement(_StaticTable2.default, {
          src: tableAssetUri,
          contextualizer: contextualizer });
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