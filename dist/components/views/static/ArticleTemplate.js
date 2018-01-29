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

var _NoteContent = require('./NoteContent');

var _NoteContent2 = _interopRequireDefault(_NoteContent);

var _reactCiteproc = require('react-citeproc');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ArticleTemplate = function ArticleTemplate(_ref, _ref2) {
  var composition = _ref.composition,
      renderingMode = _ref.renderingMode,
      assets = _ref.assets,
      resources = _ref.resources;
  var NoteContentPointer = _ref2.NoteContentPointer,
      Link = _ref2.Link,
      citationItems = _ref2.citationItems,
      citationLocale = _ref2.citationLocale,
      citationStyle = _ref2.citationStyle,
      t = _ref2.t;

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'h2',
      { className: 'composition-title' },
      composition.metadata.title
    ),
    composition.metadata.subtitle && _react2.default.createElement(
      'h3',
      { className: 'composition-subtitle' },
      composition.metadata.subtitle
    ),
    composition.metadata.creators.length ? _react2.default.createElement(
      'div',
      { className: 'creators' },
      composition.metadata.creators.map(function (creator, index) {
        return _react2.default.createElement(
          'span',
          { className: 'creator', key: index },
          !!index && ', ',
          creator.given,
          ' ',
          creator.family
        );
      })
    ) : null,
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
        NoteContentPointer: NoteContentPointer,
        Link: Link })
    ),
    composition.notesOrder.length ? _react2.default.createElement(
      'section',
      { className: 'notes-container' },
      _react2.default.createElement(
        'h3',
        null,
        t('Notes')
      ),
      _react2.default.createElement(
        'section',
        null,
        _react2.default.createElement(
          'ul',
          { className: 'notes-wrapper' },
          composition.notesOrder.map(function (noteId) {
            var note = composition.notes[noteId];
            return _react2.default.createElement(
              'li',
              { key: noteId, className: 'note-wrapper' },
              _react2.default.createElement(_NoteContent2.default, {
                note: note,
                noteId: noteId,
                composition: composition,
                resources: resources,
                renderingMode: renderingMode,
                assets: assets,
                Link: Link })
            );
          })
        )
      )
    ) : null,
    Object.keys(citationItems).length ? _react2.default.createElement(
      'section',
      { className: 'bibliography-container no-break-inside' },
      _react2.default.createElement(
        'h3',
        null,
        t('Références')
      ),
      _react2.default.createElement(_reactCiteproc.Bibliography, {
        style: citationStyle,
        locale: citationLocale,
        items: citationItems })
    ) : null,
    composition.metadata.creators.length ? _react2.default.createElement(
      'div',
      { className: 'creators-info-container no-break-inside' },
      _react2.default.createElement(
        'h3',
        null,
        composition.metadata.creators.length > 1 ? t('Auteur.e.s') : t('Auteur.e')
      ),
      composition.metadata.creators.map(function (creator, index) {
        return _react2.default.createElement(
          'div',
          { className: 'creator-info', key: index },
          _react2.default.createElement(
            'h4',
            null,
            creator.given,
            ' ',
            creator.family
          ),
          creator.role && _react2.default.createElement(
            'h5',
            null,
            creator.role
          ),
          creator.presentation && _react2.default.createElement(
            'p',
            null,
            creator.presentation
          )
        );
      })
    ) : null
  );
};

exports.default = ArticleTemplate;


ArticleTemplate.contextTypes = {
  NoteContentPointer: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.element]),
  Link: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.element]),
  citationItems: _propTypes2.default.object,
  citationLocale: _propTypes2.default.string,
  citationStyle: _propTypes2.default.string,
  t: _propTypes2.default.func
};