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
 * This module exports a stateless reusable note pointer component
 * ============
 * @module plurishing-shared/components/renderers/NotePointer
 */
var NotePointerContainer = function NotePointerContainer(_ref, _ref2) {
  var noteId = _ref.noteId;
  var notes = _ref2.notes,
      NotePointer = _ref2.NotePointer;

  var note = notes && notes[noteId];
  if (note && NotePointer) {
    return _react2.default.createElement(NotePointer, { note: note, noteId: noteId });
  }
  return null;
};

NotePointerContainer.contextTypes = {
  notes: _propTypes2.default.object,
  NotePointer: _propTypes2.default.func
};

exports.default = NotePointerContainer;