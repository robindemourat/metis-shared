import React from 'react';


export default ({
  note,
  noteId,
}) => (
  <sup  className="plurishing-PdfNotePointerPointer"  id={`note-pointer-pointer-${noteId}`}>
    <a href={`#note-content-pointer-${noteId}`}>
      {note.order}
    </a>
  </sup>
);
