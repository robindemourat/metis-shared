import React from 'react';
import PropTypes from 'prop-types';
import Renderer from '../../renderers/Renderer';
import NoteContent from './NoteContent';

// import './ArticleTemplate.scss';

const ArticleTemplate = ({
  composition,
  renderingMode,
  // parameters,
  assets,
  resources,
}, {
  NoteContentPointer
}) => {
  return (
    <div className="plurishing-DynamicArticleTemplate">
      <h2>{composition.metadata.title}</h2>
      {/* main content */}
      <section>
        <Renderer
          raw={composition.contents}
          renderingMode={renderingMode}
          contextualizations={composition.contextualizations}
          contextualizers={composition.contextualizers}
          resources={resources}
          assets={assets}
          notes={composition.notes}
          NoteContentPointer={NoteContentPointer} />
      </section>

      {/* notes */}
      <section className="notes-container">
        <h3>Notes</h3>
        <section>
          <ul>
            {
            composition.notesOrder.map(noteId => {
              const note = composition.notes[noteId];
              return (
                <li key={noteId}>
                  <NoteContent
                    note={note}
                    noteId={noteId}
                    composition={composition}
                    resources={resources}
                    renderingMode={renderingMode}
                    assets={assets} />
                </li>
              );
            })
          }
          </ul>
        </section>
      </section>
    </div>
  );
};

export default ArticleTemplate;

ArticleTemplate.contextTypes = {
  NoteContentPointer: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.element,
    ])
};
