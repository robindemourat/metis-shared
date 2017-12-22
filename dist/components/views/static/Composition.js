'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ArticleTemplate = require('./ArticleTemplate');

var _ArticleTemplate2 = _interopRequireDefault(_ArticleTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var parameters = _ref.parameters,
      composition = _ref.composition,
      assets = _ref.assets,
      resources = _ref.resources,
      index = _ref.index;

  var Component = null;
  switch (parameters.template) {
    case 'article':
      Component = _ArticleTemplate2.default;
      break;
    default:
      break;
  }
  if (Component) {
    return _react2.default.createElement(
      'div',
      { className: 'composition-' + index },
      _react2.default.createElement(Component, {
        parameters: parameters,
        composition: composition,
        assets: assets,
        resources: resources })
    );
  }
  return null;
};