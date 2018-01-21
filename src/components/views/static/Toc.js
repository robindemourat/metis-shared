import React from 'react';
import PropTypes from 'prop-types';


const buildAuthors = creators =>
  creators.map(creator => `${creator.given} ${creator.family}`)
    .join(', ');

const Toc = ({
  montage,
  compositions,
}, {t, Link}) => (
  <section
    className="table-of-contents break-after break-before plurishing-StaticMontageSection">
    <h2>{t('Table des matières')}</h2>
    <nav className="index-wrapper">
      <ul className="index-container">
        {
            montage.data.compositions
            .filter(parameters => parameters.target_composition_id)
            .map((ref, index) => {
              const id = ref.target_composition_id;
              const composition = compositions.find(comp => comp._id === id);
              if (!composition) {
                return null;
              }

              return (
                <li className="index-item" key={index}>
                  <Link className="index-link" to={{view: 'composition', index}}>
                    {composition.metadata.title} - {buildAuthors(composition.metadata.creators)}
                  </Link>
                </li>
              );
            })
          }
      </ul>
    </nav>
  </section>
);

Toc.contextTypes = {
  t: PropTypes.func.isRequired,
  Link: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.element,
    ])
};

export default Toc;
