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
      subtitle = _ref.subtitle,
      _ref$creators = _ref.creators,
      creators = _ref$creators === undefined ? [] : _ref$creators;
  return _react2.default.createElement(
    'section',
    {
      className: 'cover break-after static-section' },
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
        null,
        title
      ),
      subtitle && _react2.default.createElement(
        'h2',
        null,
        subtitle
      ),
      creators.length ? _react2.default.createElement(
        'div',
        { className: 'creators' },
        creators.map(function (creator, index) {
          return _react2.default.createElement(
            'span',
            { className: 'creator', key: index },
            creator.given,
            ' ',
            creator.family
          );
        })
      ) : null
    )
  );
};