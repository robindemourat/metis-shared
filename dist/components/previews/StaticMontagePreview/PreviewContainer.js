'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Cover = require('../../views/static/Cover');

var _Cover2 = _interopRequireDefault(_Cover);

var _Colophon = require('../../views/static/Colophon');

var _Colophon2 = _interopRequireDefault(_Colophon);

var _Composition = require('../../views/static/Composition');

var _Composition2 = _interopRequireDefault(_Composition);

var _Toc = require('../../views/static/Toc');

var _Toc2 = _interopRequireDefault(_Toc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var montage = _ref.montage,
      compositions = _ref.compositions,
      resources = _ref.resources,
      assets = _ref.assets;

  return _react2.default.createElement(
    'section',
    null,
    _react2.default.createElement(_Cover2.default, {
      background: montage.data.cover_color,
      title: montage.metadata.title }),
    _react2.default.createElement(_Toc2.default, { montage: montage, compositions: compositions }),
    montage.data.compositions.map(function (parameters, index) {
      var composition = compositions[parameters.target_composition_id];
      if (!composition) {
        return null;
      }
      return _react2.default.createElement(_Composition2.default, {
        key: index,
        parameters: parameters,
        composition: composition,
        resources: resources,
        assets: assets,
        locationIndex: index });
    }),
    _react2.default.createElement(_Colophon2.default, { contents: montage.data.colophon }),
    _react2.default.createElement(
      'style',
      null,
      montage.data.css_code
    )
  );
}; /**
    * A simple preview container simulating dynamic app routing with a state machine
    */