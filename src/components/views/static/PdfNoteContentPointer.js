import React from 'react';


export default ({
  note,
  noteId,
}) => (
  <sup className="plurishing-NoteContentPointer plurishing-PdfNoteContentPointer" id={`note-content-pointer-${noteId}`}>
    <a href={`#note-content-${noteId}`}>
      {note.order}
    </a>
  </sup>
);
