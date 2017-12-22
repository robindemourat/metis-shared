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
        .map((parameters, index) => {
          const id = parameters.target_composition_id;
          const composition = compositions[id];
          return (
            <li key={index}>
              <Link to={{view: 'compositions', id, parameters}}>
                {composition.metadata.title}
              </Link>
            </li>
          );
        })
      }
    </ul>
  </nav>
);

Nav.contextTypes = {
  Link: PropTypes.func
};

export default Nav;
