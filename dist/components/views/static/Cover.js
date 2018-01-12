'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var title = _ref.title,
      _ref$background = _ref.background,
      background = _ref$background === undefined ? '#FFFFFF' : _ref$background;
  return _react2.default.createElement(
    'section',
    {
      className: 'cover break-before',
      style: {
        background: background
      } },
    _react2.default.createElement(
      'h1',
      null,
      title
    )
  );
};