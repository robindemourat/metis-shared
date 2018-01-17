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

var _PdfNotePointer = require('./PdfNotePointer');

var _PdfNotePointer2 = _interopRequireDefault(_PdfNotePointer);

var _NoteContent = require('./NoteContent');

var _NoteContent2 = _interopRequireDefault(_NoteContent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ArticleTemplate = function ArticleTemplate(_ref, _ref2) {
  var composition = _ref.composition,
      renderingMode = _ref.renderingMode,
      assets = _ref.assets,
      resources = _ref.resources;
  var NotePointer = _ref2.NotePointer;

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'h2',
      null,
      composition.metadata.title
    ),
    _react2.default.createElement(
      'section',
      null,
      _react2.default.createElement(_Renderer2.default, {
        raw: composition.contents,
        renderingMode: renderingMode,
        contextualizations: composition.contextualizations,
        contextualizers: composition.contextualizers,
        resources: resources,
        assets: assets,
        notes: composition.notes,
        NotePointer: NotePointer || _PdfNotePointer2.default })
    ),
    _react2.default.createElement(
      'section',
      { className: 'notes-container' },
      _react2.default.createElement(
        'h3',
        null,
        'Notes'
      ),
      _react2.default.createElement(
        'section',
        null,
        _react2.default.createElement(
          'ul',
          null,
          composition.notesOrder.map(function (noteId) {
            var note = composition.notes[noteId];
            return _react2.default.createElement(
              'li',
              { key: noteId },
              _react2.default.createElement(_NoteContent2.default, {
                note: note,
                noteId: noteId,
                composition: composition,
                resources: resources,
                renderingMode: renderingMode,
                assets: assets })
            );
          })
        )
      )
    )
  );
};

exports.default = ArticleTemplate;


ArticleTemplate.contextTypes = {
  NotePointer: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.element])
};