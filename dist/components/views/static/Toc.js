'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Toc = function Toc(_ref, _ref2) {
  var montage = _ref.montage,
      compositions = _ref.compositions;
  var t = _ref2.t,
      Link = _ref2.Link;
  return _react2.default.createElement(
    'section',
    {
      className: 'index' },
    _react2.default.createElement(
      'h2',
      null,
      t('index')
    ),
    _react2.default.createElement(
      'nav',
      null,
      _react2.default.createElement(
        'ul',
        null,
        montage.data.compositions.filter(function (parameters) {
          return parameters.target_composition_id;
        }).map(function (ref, index) {
          var id = ref.target_composition_id;
          var composition = compositions.find(function (comp) {
            return comp._id === id;
          });
          if (!composition) {
            return null;
          }

          return _react2.default.createElement(
            'li',
            { key: index },
            _react2.default.createElement(
              Link,
              { to: { view: 'composition', index: index } },
              composition.metadata.title
            )
          );
        })
      )
    )
  );
};

Toc.contextTypes = {
  t: _propTypes2.default.func.isRequired,
  Link: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.element])
};

exports.default = Toc;