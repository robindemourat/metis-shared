/**
 * This module exports a stateless reusable note pointer component
 * ============
 * @module plurishing-shared/components/renderers/NotePointer
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

/**
 * Renders a not pointer as a pure component
 * @param {object} props
 * @param {array} props.children - children elements of the component
 * @param {array} props.noteId - the id of the note to point to
 * @param {object} context - the context data of the component
 * @return {ReactElement} component - the component
 */
class NotePointer extends Component {
  render() {
    const {
      props: {
        children,
        noteId = ''
      },
      context: {
        notes,
        onNoteContentPointerClick,
        bindNoteContentPointer
      }
    } = this;

    const onNoteClick = () => {
      return typeof onNoteContentPointerClick === 'function' && onNoteContentPointerClick(noteId);
    };
    if (notes) {
      const note = notes[noteId];
      if (note) {
        const bindRef = el => {
          bindNoteContentPointer(noteId, el);
        };
        return (
          <sup
            ref={bindRef} onClick={onNoteClick} className="note-content-pointer"
            id={'note-content-pointer-' + noteId}>
            {note.order}
            {children}
          </sup>
        );
      }
      return null;
    }
    return null;

  }
}

/**
 * Component's properties types
 */
NotePointer.propTypes = {
  /**
   * Children react components
   */
  children: PropTypes.array,
  /**
   * id of the note to render
   */
  noteId: PropTypes.string,
};

/**
 * Component's context used properties
 */
NotePointer.contextTypes = {
  /**
   * Map of available notes to look into
   */
  notes: PropTypes.object,
  /**
   * Triggers a callback upstream when the pointer is clicked
   */
  onNoteContentPointerClick: PropTypes.func,

  bindNoteContentPointer: PropTypes.func,
};

export default NotePointer;
