'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Inline = function Inline(_ref) {
  var resource = _ref.resource,
      contextualizer = _ref.contextualizer,
      renderingMode = _ref.renderingMode;

  var content = contextualizer.content || '*';
  var url = resource.data.url;

  switch (renderingMode) {
    // interactive -> hyperlink
    case 'web':
    case 'epub-fixed':
      return _react2.default.createElement(
        'a',
        { target: 'blank', href: url },
        content
      );

    // not interactive -> write link in parenthesis
    case 'micro':
      return _react2.default.createElement(
        'span',
        null,
        content,
        ' (',
        url,
        ')'
      );

    // mix -> hyperlink + written link
    case 'epub-reflowable':
    case 'pdf':
      return _react2.default.createElement(
        'a',
        { target: 'blank', href: url },
        content,
        ' (',
        url,
        ')'
      );
    default:
      return null;
  }
};

exports.default = Inline;