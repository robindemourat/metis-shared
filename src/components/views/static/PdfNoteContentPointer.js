import React from 'react';


export default ({
  note,
  noteId,
}) => (
  <sup id={`note-content-pointer-${noteId}`}>
    <a href={`#note-content-${noteId}`}>
      {note.order}
    </a>
  </sup>
);
