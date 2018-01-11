'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint react/no-danger : 0 */

var Inline = function Inline(_ref, _ref2) {
  var contextualization = _ref.contextualization;
  var citations = _ref2.citations;

  var citation = citations[contextualization.id];
  if (citation && citation.html) {
    return _react2.default.createElement('cite', {
      dangerouslySetInnerHTML: { __html: citation.html } });
  }
  return null;
};

Inline.contextTypes = {
  citations: _propTypes2.default.object
};

exports.default = Inline;