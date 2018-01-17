import React from 'react';
import Renderer from '../../renderers/Renderer';


export default ({
  note,
  renderingMode,
  composition,
  resources,
  assets,
  noteId,
}) => (
  <section className="note-content" id={`note-content-${noteId}`}>
    <a className="note-pointer-link" href={`#note-pointer-${noteId}`}>
      {note.order}
    </a>
    <section className="note-content-container">
      <Renderer
        raw={note.contents}
        renderingMode={renderingMode}
        contextualizations={composition.contextualizations}
        contextualizers={composition.contextualizers}
        resources={resources}
        assets={assets} />
    </section>
  </section>
);
