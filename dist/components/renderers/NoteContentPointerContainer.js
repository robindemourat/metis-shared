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
var NoteContentPointerContainer = function NoteContentPointerContainer(_ref, _ref2) {
  var noteId = _ref.noteId;
  var notes = _ref2.notes,
      NoteContentPointer = _ref2.NoteContentPointer;

  var note = notes && notes[noteId];
  if (note && NoteContentPointer) {
    return _react2.default.createElement(NoteContentPointer, { note: note, noteId: noteId });
  }
  return null;
};

NoteContentPointerContainer.contextTypes = {
  notes: _propTypes2.default.object,
  NoteContentPointer: _propTypes2.default.func
};

exports.default = NoteContentPointerContainer;