import React from 'react';


export default ({
  note,
  noteId,
}) => (
  <sup className="plurishing-WebNoteContentPointer" id={`note-content-pointer-${noteId}`}>
    <a href={`#note-content-${noteId}`}>
      {note.order}
    </a>
  </sup>
);
