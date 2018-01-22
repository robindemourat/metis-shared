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
    <div className="metis-DynamicArticleTemplate">
      <h2>{composition.metadata.title}</h2>
      {composition.metadata.subtitle && <h3>{composition.metadata.subtitle}</h3>}
      {
      composition.metadata.creators.length ?
        <div className="creators">
          {
          composition.metadata.creators.map((creator, index) => (
            <span className="creator" key={index}>
              {!!index && ', '}
              {creator.given} {creator.family}
            </span>
          ))
        }
        </div>
      : null
    }
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

      {
      composition.metadata.creators.length ?
        <div className="creators-info-container">
          <h3>{composition.metadata.creators.length > 1 ? t('Auteur.e.s') : t('Auteur.e')}</h3>
          {
          composition.metadata.creators.map((creator, index) => (
            <div className="creator-info" key={index}>
              <h4>{creator.given} {creator.family}</h4>
              {creator.role && <h5>{creator.role}</h5>}
              {
                creator.presentation &&
                <p>
                  {creator.presentation}
                </p>
              }
            </div>
          ))
        }
        </div>
      : null
    }
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
