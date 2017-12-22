'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ArticleTemplate = require('./ArticleTemplate');

var _ArticleTemplate2 = _interopRequireDefault(_ArticleTemplate);

var _FullscreenTemplate = require('./FullscreenTemplate');

var _FullscreenTemplate2 = _interopRequireDefault(_FullscreenTemplate);

var _Nav = require('./Nav');

var _Nav2 = _interopRequireDefault(_Nav);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var parameters = _ref.parameters,
      composition = _ref.composition,
      compositions = _ref.compositions,
      montage = _ref.montage,
      assets = _ref.assets,
      resources = _ref.resources;

  var Component = null;
  switch (parameters.template) {
    case 'article':
      Component = _ArticleTemplate2.default;
      break;
    case 'fullscreen':
      Component = _FullscreenTemplate2.default;
      break;
    default:
      break;
  }

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_Nav2.default, { montage: montage, compositions: compositions }),
    _react2.default.createElement(Component, {
      parameters: parameters,
      composition: composition,
      assets: assets,
      resources: resources }),
    _react2.default.createElement(
      'style',
      null,
      parameters.css_code
    )
  );
};