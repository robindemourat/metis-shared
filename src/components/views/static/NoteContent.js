import React from 'react';
import PropTypes from 'prop-types';
import Renderer from '../../renderers/Renderer';


const NoteContent = ({
  note,
  renderingMode,
  composition,
  resources,
  assets,
  noteId,
}, {
  NotePointerPointer,
  Link
}) => (
  <section className="note-content" id={`note-content-${noteId}`}>
    <NotePointerPointer noteId={noteId} note={note} />
    <section className="note-content-container">
      <Renderer
        raw={note.contents}
        renderingMode={renderingMode}
        contextualizations={composition.contextualizations}
        contextualizers={composition.contextualizers}
        resources={resources}
        assets={assets}
        Link={Link} />
    </section>
  </section>
);

NoteContent.contextTypes = {
  NotePointerPointer: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
  ]),
  Link: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
  ]),
};


export default NoteContent;
