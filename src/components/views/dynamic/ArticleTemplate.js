import React from 'react';
import PropTypes from 'prop-types';
import Renderer from '../../renderers/Renderer';
import NoteContent from './NoteContent';
import {Bibliography} from 'react-citeproc';

// import './ArticleTemplate.scss';

const ArticleTemplate = ({
  composition,
  renderingMode,
  // parameters,
  assets,
  resources,
}, {
  NoteContentPointer,
  citationStyle,
  citationLocale,
  citationItems,
  t
}) => {
  return (
    <div className="plurishing-DynamicArticleTemplate">
      <h2>{composition.metadata.title}</h2>
      {composition.metadata.subtitle && <h3>{composition.metadata.subtitle}</h3>}
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
      {composition.notesOrder.length ? <section className="notes-container">
        <h3>{t('Notes')}</h3>
        <section>
          <ul className="notes-wrapper">
            {
            composition.notesOrder.map(noteId => {
              const note = composition.notes[noteId];
              return (
                <li key={noteId} className="note-wrapper">
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
      </section> : null}
      {Object.keys(citationItems).length ?
        <section className="bibliography-container">
          <h3>{t('Bibliographie')}</h3>
          <Bibliography
            style={citationStyle}
            locale={citationLocale}
            items={citationItems} />
        </section> : null}
    </div>
  );
};

export default ArticleTemplate;

ArticleTemplate.contextTypes = {
  NoteContentPointer: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.element,
    ]),
  citationStyle: PropTypes.string,
  citationLocale: PropTypes.string,
  citationItems: PropTypes.object,
  t: PropTypes.func
};
