import React from 'react';


export default ({
  note,
  noteId,
}) => (
  <sup className="metis-NoteContentPointer metis-EpubNoteContentPointer" id={`note-content-pointer-${noteId}`}>
    <a href={`#note-content-${noteId}`}>
      {note.order}
    </a>
  </sup>
);
