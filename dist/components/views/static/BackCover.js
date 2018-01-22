'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getColorByBgColor = function getColorByBgColor(bgColor) {
  if (!bgColor) {
    return '';
  }
  return parseInt(bgColor.replace('#', ''), 16) > 0xffffff / 2 ? '#000' : '#fff';
};

exports.default = function (_ref) {
  var title = _ref.title,
      _ref$background = _ref.background,
      background = _ref$background === undefined ? '#FFFFFF' : _ref$background,
      text = _ref.text;
  return _react2.default.createElement(
    'section',
    {
      className: 'back-cover break-before metis-StaticMontageSection' },
    _react2.default.createElement(
      'div',
      {
        className: 'content',
        style: {
          background: background,
          color: getColorByBgColor(background)
        } },
      _react2.default.createElement(
        'h1',
        { className: 'backcover-title' },
        title
      ),
      _react2.default.createElement(
        'p',
        { className: 'backcover-abstract' },
        text
      )
    )
  );
};