/**
 * This module exports a stateless reusable note pointer component
 * ============
 * @module plurishing-shared/components/renderers/NotePointer
 */
import React from 'react';
import PropTypes from 'prop-types';

const NotePointerContainer = ({
  noteId
}, {
  notes,
  NotePointer
}) => {
  const note = notes && notes[noteId];
  if (note && NotePointer) {
    return (
      <NotePointer note={note} noteId={noteId} />
    );
  }
  return null;
};

NotePointerContainer.contextTypes = {
  notes: PropTypes.object,
  NotePointer: PropTypes.func,
};


export default NotePointerContainer;
