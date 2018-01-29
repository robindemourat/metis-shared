/* eslint react/no-set-state : 0 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Nav extends Component {
  static contextTypes = {
    Link: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false
    };
  }

  toggleMenu = () => {
    this.setState({
      menuOpen: !this.state.menuOpen
    });
  }

  render() {
    const {
      props: {
        compositions,
        montage,
        toggable = true,
        activeIndex
      },
      state: {
        menuOpen
      },
      context: {
        Link
      },
      toggleMenu
    } = this;
    return (
      <nav className="metis-DynamicNav">
        {toggable && <h2 className="header">
          <Link to={{view: 'home'}}>{montage.metadata.title || 'Montage sans titre'}</Link>

          <button className={`open-menu ${menuOpen || !toggable ? 'active' : ''}`} onClick={toggleMenu}>
            <div className="wrap">
              <div className="artclose">
                <div className="burgx" />
                <div className="burgx2" />
                <div className="burgx3" />
              </div>

            </div>
          </button>
        </h2>}
        <div className={`menu-container ${menuOpen || !toggable ? 'active' : ''}`}>
          <ul className="menu-items">
            {
              montage.data.compositions
              .filter(parameters => parameters.target_composition_id)
              .map((parameters, index) => {
                const id = parameters.target_composition_id;
                const composition = compositions.find(comp => comp._id === id);
                if (composition) {
                  return (
                    <li className={`composition-link ${activeIndex === index ? 'active' : ''}`} key={index}>
                      <Link to={{view: 'composition', index, parameters}}>
                        {composition.metadata.title}
                      </Link>
                    </li>
                  );
                }
                return null;
              })
            }
          </ul>
        </div>
      </nav>
    );
  }
}

