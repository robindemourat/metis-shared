'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var note = _ref.note,
      noteId = _ref.noteId;
  return _react2.default.createElement(
    'sup',
    { id: 'note-pointer-pointer-' + noteId },
    _react2.default.createElement(
      'a',
      { href: '#note-pointer-' + noteId },
      note.order
    )
  );
};