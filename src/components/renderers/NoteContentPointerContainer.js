/**
 * This module exports a stateless reusable note pointer component
 * ============
 * @module metis-shared/components/renderers/NotePointer
 */
import React from 'react';
import PropTypes from 'prop-types';

const NoteContentPointerContainer = ({
  noteId
}, {
  notes,
  NoteContentPointer
}) => {
  const note = notes && notes[noteId];
  if (note && NoteContentPointer) {
    return (
      <NoteContentPointer note={note} noteId={noteId} />
    );
  }
  return null;
};

NoteContentPointerContainer.contextTypes = {
  notes: PropTypes.object,
  NoteContentPointer: PropTypes.func,
};


export default NoteContentPointerContainer;
