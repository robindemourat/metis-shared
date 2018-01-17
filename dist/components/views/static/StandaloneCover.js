'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Cover = require('./Cover');

var _Cover2 = _interopRequireDefault(_Cover);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var _ref$montage$data = _ref.montage.data,
      coverColor = _ref$montage$data.cover_color,
      title = _ref$montage$data.title,
      css = _ref$montage$data.css,
      _ref$renderingMode = _ref.renderingMode,
      renderingMode = _ref$renderingMode === undefined ? 'epub-fixed' : _ref$renderingMode;
  return _react2.default.createElement(
    'div',
    { className: 'StandaloneCover' },
    _react2.default.createElement(_Cover2.default, { title: title, background: coverColor }),
    _react2.default.createElement(
      'style',
      null,
      css.shared_css_code,
      css[renderingMode + '_css_code']
    )
  );
};