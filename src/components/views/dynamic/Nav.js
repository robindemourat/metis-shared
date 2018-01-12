import React from 'react';
import PropTypes from 'prop-types';

const Nav = ({
  compositions,
  montage
}, {Link}) => (
  <nav>
    <ul>
      {
        montage.data.compositions
        .filter(parameters => parameters.target_composition_id)
        .map((parameters, index) => {
          const id = parameters.target_composition_id;
          const composition = compositions.find(comp => comp._id === id);
          if (composition) {
            return (
              <li key={index}>
                <Link to={{view: 'composition', index, parameters}}>
                  {composition.metadata.title} ({parameters.template})
                </Link>
              </li>
            );
          }
          return null;
        })
      }
    </ul>
  </nav>
);

Nav.contextTypes = {
  Link: PropTypes.func
};

export default Nav;
