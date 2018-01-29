'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Nav = require('./Nav');

var _Nav2 = _interopRequireDefault(_Nav);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var montage = _ref.montage,
      compositions = _ref.compositions;
  return _react2.default.createElement(
    'section',
    { className: 'metis-DynamicMontageSection' },
    _react2.default.createElement(
      'aside',
      { className: 'aside-menu' },
      _react2.default.createElement(_Nav2.default, { montage: montage, compositions: compositions })
    ),
    _react2.default.createElement(
      'section',
      { className: 'main-content-container' },
      _react2.default.createElement(
        'h2',
        null,
        montage.metadata.title.length ? montage.metadata.title : 'Montage sans titre'
      ),
      montage.metadata.subtitle && montage.metadata.subtitle.length ? _react2.default.createElement(
        'h3',
        null,
        'montage.metadata.subtitle'
      ) : null,
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'p',
          null,
          montage.metadata.description
        )
      ),
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h3',
          null,
          'Table des mati\xE8res'
        ),
        _react2.default.createElement(_Nav2.default, { toggable: false, montage: montage, compositions: compositions })
      )
    ),
    _react2.default.createElement(
      'style',
      null,
      montage.data.css.shared_css_code,
      montage.data.css.web_css_code
    )
  );
};