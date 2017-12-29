'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Block = function Block(_ref) {
  var renderingMode = _ref.renderingMode;


  switch (renderingMode) {
    case 'web':
      return _react2.default.createElement(
        'div',
        null,
        'Block web'
      );
    case 'pdf':
      return _react2.default.createElement(
        'div',
        null,
        'Block pdf'
      );
    case 'epub-reflowable':
      return _react2.default.createElement(
        'div',
        null,
        'Block epub reflowable'
      );
    case 'epub-fixed':
      return _react2.default.createElement(
        'div',
        null,
        'Block epub fixed'
      );
    case 'micro':
      return _react2.default.createElement(
        'div',
        null,
        'Block micro'
      );
    default:
      return null;
  }
};

exports.default = Block;