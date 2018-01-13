'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Renderer = require('../../renderers/Renderer');

var _Renderer2 = _interopRequireDefault(_Renderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import './ArticleTemplate.scss';

exports.default = function (_ref) {
  var composition = _ref.composition,
      renderingMode = _ref.renderingMode,
      assets = _ref.assets,
      resources = _ref.resources;

  return _react2.default.createElement(
    'div',
    { className: 'plurishing-ArticleTemplate' },
    _react2.default.createElement(
      'h2',
      null,
      composition.metadata.title
    ),
    _react2.default.createElement(
      'section',
      null,
      _react2.default.createElement(_Renderer2.default, {
        raw: composition.contents,
        renderingMode: renderingMode,
        contextualizations: composition.contextualizations,
        contextualizers: composition.contextualizers,
        resources: resources,
        assets: assets })
    )
  );
};