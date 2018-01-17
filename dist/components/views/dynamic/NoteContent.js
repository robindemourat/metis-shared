'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Renderer = require('../../renderers/Renderer');

var _Renderer2 = _interopRequireDefault(_Renderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NoteContent = function NoteContent(_ref, _ref2) {
  var note = _ref.note,
      renderingMode = _ref.renderingMode,
      composition = _ref.composition,
      resources = _ref.resources,
      assets = _ref.assets,
      noteId = _ref.noteId;
  var NotePointerPointer = _ref2.NotePointerPointer,
      Link = _ref2.Link;
  return _react2.default.createElement(
    'section',
    { className: 'note-content', id: 'note-content-' + noteId },
    _react2.default.createElement(NotePointerPointer, { noteId: noteId, note: note }),
    _react2.default.createElement(
      'section',
      { className: 'note-content-container' },
      _react2.default.createElement(_Renderer2.default, {
        raw: note.contents,
        renderingMode: renderingMode,
        contextualizations: composition.contextualizations,
        contextualizers: composition.contextualizers,
        resources: resources,
        assets: assets,
        Link: Link })
    )
  );
};

NoteContent.contextTypes = {
  NotePointerPointer: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.element]),
  Link: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.element])
};

exports.default = NoteContent;