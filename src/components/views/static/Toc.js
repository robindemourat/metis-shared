import React from 'react';
import PropTypes from 'prop-types';

const Toc = ({
  montage,
  compositions,
}, {t}) => (
  <section
    className="index">
    <h2>{t('index')}</h2>
    <nav>
      <ul>
        {
            montage.data.compositions.map((ref, index) => {
              const id = ref.target_composition_id;
              const composition = compositions[id];
              if (!composition) {
                return null;
              }

              return (
                <li key={index}>
                  <a href={`#{composition._id}`}>
                    {composition.metadata.title}
                  </a>
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
};

export default Toc;
