import React from 'react';


export default ({
  note,
  noteId,
}) => (
  <sup id={`note-pointer-pointer-${noteId}`}>
    <a href={`#note-content-pointer-${noteId}`}>
      {note.order}
    </a>
  </sup>
);
