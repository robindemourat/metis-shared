'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactCiteproc = require('react-citeproc');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /* eslint no-new-func : 0 */


var Block = function Block(_ref, _ref2) {
  var resource = _ref.resource;
  var citationLocale = _ref2.citationLocale,
      citationStyle = _ref2.citationStyle,
      citationItems = _ref2.citationItems;

  var item = citationItems[resource.data.id];
  return _react2.default.createElement(_reactCiteproc.Bibliography, {
    style: citationStyle,
    locale: citationLocale,
    items: _defineProperty({}, item.id, item) });
};

Block.contextTypes = {
  citationLocale: _propTypes2.default.string,
  citationStyle: _propTypes2.default.string,
  citationItems: _propTypes2.default.object
};

exports.default = Block;