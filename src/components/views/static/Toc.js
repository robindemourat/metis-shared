import React from 'react';
import PropTypes from 'prop-types';

const Toc = ({
  montage,
  compositions,
}, {t, Link}) => (
  <section
    className="index">
    <h2>{t('index')}</h2>
    <nav>
      <ul>
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
                <li key={index}>
                  <Link to={{view: 'composition', index}}>
                    {composition.metadata.title}
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
