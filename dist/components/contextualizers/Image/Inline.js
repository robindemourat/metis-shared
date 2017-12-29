'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Inline = function Inline(_ref) {
  var renderingMode = _ref.renderingMode;


  switch (renderingMode) {
    case 'web':
      return _react2.default.createElement(
        'span',
        null,
        'inline web'
      );
    case 'pdf':
      return _react2.default.createElement(
        'span',
        null,
        'inline pdf'
      );
    case 'epub-reflowable':
      return _react2.default.createElement(
        'span',
        null,
        'inline epub reflowable'
      );
    case 'epub-fixed':
      return _react2.default.createElement(
        'span',
        null,
        'inline epub fixed'
      );
    case 'micro':
      return _react2.default.createElement(
        'span',
        null,
        'inline micro'
      );
    default:
      return null;
  }
};

exports.default = Inline;