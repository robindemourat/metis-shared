'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InlineAssetWrapper = function InlineAssetWrapper(_ref, _ref2) {
  var data = _ref.data;
  var story = _ref2.story,
      contextualizers = _ref2.contextualizers;

  var assetId = data.asset && data.asset.id;
  if (!assetId || !story) {
    return null;
  }
  var contextualization = story.contextualizations[assetId];
  if (!contextualization) {
    return null;
  }

  var contextualizer = story.contextualizers[contextualization.contextualizerId];
  var resource = story.resources[contextualization.resourceId];
  var contextualizerModule = contextualizers[contextualizer.type];
  var Component = contextualizerModule && contextualizerModule.InlineDynamic;

  if (contextualizer && Component) {
    return _react2.default.createElement(
      'span',
      {
        className: 'InlineAssetWrapper ' + 'inline-' + contextualizer.type,
        id: assetId },
      _react2.default.createElement(Component, {
        contextualization: contextualization,
        contextualizer: contextualizer,
        resource: resource })
    );
  }
  return null;
};

/**
 * Component's properties types
 */
InlineAssetWrapper.propTypes = {
  /**
   * Corresponds to the data initially embedded in a draft-js entity
   */
  data: _propTypes2.default.shape({
    asset: _propTypes2.default.shape({
      id: _propTypes2.default.string
    })
  })
};
/**
 * Component's context used properties
 */
InlineAssetWrapper.contextTypes = {
  story: _propTypes2.default.object,
  contextualizers: _propTypes2.default.object
};

exports.default = InlineAssetWrapper;