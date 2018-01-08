'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Renders a link as a pure component
 * @param {object} props
 * @param {string} props.to - the url to point to
 * @param {array} props.children - children elements of the component
 * @return {ReactElement} component - the component
 */
/**
 * This module exports a stateless reusable external link component
 * ============
 * @module perinext/components/Link
 */
var Link = function Link(_ref) {
  var to = _ref.to,
      children = _ref.children;
  return _react2.default.createElement(
    'a',
    { href: to, target: 'blank' },
    children
  );
};

/**
 * Component's properties types
 */
Link.propTypes = {
  /**
   * url to point to
   */
  to: _propTypes2.default.string,
  /**
   * children react elements
   */
  children: _propTypes2.default.array
};

exports.default = Link;