'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Renderer = require('../../renderers/Renderer');

var _Renderer2 = _interopRequireDefault(_Renderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var note = _ref.note,
      renderingMode = _ref.renderingMode,
      composition = _ref.composition,
      resources = _ref.resources,
      assets = _ref.assets,
      noteId = _ref.noteId;
  return _react2.default.createElement(
    'section',
    { className: 'note-content', id: 'note-content-' + noteId },
    _react2.default.createElement(
      'a',
      { className: 'note-pointer-link', href: '#note-pointer-' + noteId },
      note.order
    ),
    _react2.default.createElement(
      'section',
      { className: 'note-content-container' },
      _react2.default.createElement(_Renderer2.default, {
        raw: note.contents,
        renderingMode: renderingMode,
        contextualizations: composition.contextualizations,
        contextualizers: composition.contextualizers,
        resources: resources,
        assets: assets })
    )
  );
};