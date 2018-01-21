import React from 'react';


export default ({
  note,
  noteId,
}) => (
  <sup className="plurishing-NotePointerPointer plurishing-EpubNotePointerPointer" id={`note-pointer-pointer-${noteId}`}>
    <a href={`#note-content-pointer-${noteId}`}>
      {note.order}
    </a>.
  </sup>
);
