'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var children = _ref.children,
      _ref$to = _ref.to,
      view = _ref$to.view,
      index = _ref$to.index;

  var finalHref = void 0;
  switch (view) {
    case 'composition':
      finalHref = '#composition-' + index;
      break;
    default:
      break;
  }
  if (finalHref) {
    return _react2.default.createElement(
      'a',
      { href: finalHref },
      children
    );
  }
  return null;
};