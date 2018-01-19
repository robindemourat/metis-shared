import React from 'react';


export default ({
  note,
  noteId,
}) => (
  <span className="plurishing-WebNotePointerPointer" id={`note-pointer-pointer-${noteId}`}>
    <a href={`#note-content-pointer-${noteId}`}>
      {note.order}.
    </a>
  </span>
);
