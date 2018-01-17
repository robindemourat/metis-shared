import React from 'react';


export default ({
  note,
  noteId,
}) => (
  <sup id={`note-pointer-${noteId}`}>
    <a href={`#note-content-${noteId}`}>
      {note.order}
    </a>
  </sup>
);
