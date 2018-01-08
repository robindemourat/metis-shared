'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This module exports a stateless reusable note pointer component
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * ============
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @module plurishing-shared/components/renderers/NotePointer
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * Renders a not pointer as a pure component
 * @param {object} props
 * @param {array} props.children - children elements of the component
 * @param {array} props.noteId - the id of the note to point to
 * @param {object} context - the context data of the component
 * @return {ReactElement} component - the component
 */
var NotePointer = function (_Component) {
  _inherits(NotePointer, _Component);

  function NotePointer() {
    _classCallCheck(this, NotePointer);

    return _possibleConstructorReturn(this, (NotePointer.__proto__ || Object.getPrototypeOf(NotePointer)).apply(this, arguments));
  }

  _createClass(NotePointer, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          _props$noteId = _props.noteId,
          noteId = _props$noteId === undefined ? '' : _props$noteId,
          _context = this.context,
          notes = _context.notes,
          onNoteContentPointerClick = _context.onNoteContentPointerClick,
          bindNoteContentPointer = _context.bindNoteContentPointer;


      var onNoteClick = function onNoteClick() {
        return typeof onNoteContentPointerClick === 'function' && onNoteContentPointerClick(noteId);
      };
      if (notes) {
        var note = notes[noteId];
        if (note) {
          var bindRef = function bindRef(el) {
            bindNoteContentPointer(noteId, el);
          };
          return _react2.default.createElement(
            'sup',
            {
              ref: bindRef, onClick: onNoteClick, className: 'note-content-pointer',
              id: 'note-content-pointer-' + noteId },
            note.order,
            children
          );
        }
        return null;
      }
      return null;
    }
  }]);

  return NotePointer;
}(_react.Component);

/**
 * Component's properties types
 */


NotePointer.propTypes = {
  /**
   * Children react components
   */
  children: _propTypes2.default.array,
  /**
   * id of the note to render
   */
  noteId: _propTypes2.default.string
};

/**
 * Component's context used properties
 */
NotePointer.contextTypes = {
  /**
   * Map of available notes to look into
   */
  notes: _propTypes2.default.object,
  /**
   * Triggers a callback upstream when the pointer is clicked
   */
  onNoteContentPointerClick: _propTypes2.default.func,

  bindNoteContentPointer: _propTypes2.default.func
};

exports.default = NotePointer;