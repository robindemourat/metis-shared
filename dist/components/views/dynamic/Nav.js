'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Nav = function Nav(_ref, _ref2) {
  var compositions = _ref.compositions,
      montage = _ref.montage;
  var Link = _ref2.Link;
  return _react2.default.createElement(
    'nav',
    null,
    _react2.default.createElement(
      'ul',
      null,
      montage.data.compositions.map(function (parameters, index) {
        var id = parameters.target_composition_id;
        var composition = compositions[id];
        return _react2.default.createElement(
          'li',
          { key: index },
          _react2.default.createElement(
            Link,
            { to: { view: 'composition', index: index, parameters: parameters } },
            composition.metadata.title
          )
        );
      })
    )
  );
};

Nav.contextTypes = {
  Link: _propTypes2.default.func
};

exports.default = Nav;