'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var contents = _ref.contents;
  return _react2.default.createElement(
    'section',
    null,
    _react2.default.createElement(
      'h2',
      null,
      'Colophon'
    ),
    _react2.default.createElement(
      'div',
      null,
      contents
    )
  );
};