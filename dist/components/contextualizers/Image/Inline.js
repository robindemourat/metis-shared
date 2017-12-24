'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

var Inline = function Inline(_ref, _ref2) {
  var renderingMode = _ref2.renderingMode;

  _objectDestructuringEmpty(_ref);

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

Inline.contextTypes = {
  renderingMode: _propTypes2.default.oneOf(['web', 'pdf', 'epub-reflowable', 'epub-fixed', 'micro']).isRequired
};

exports.default = Inline;