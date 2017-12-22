/**
 * A simple preview container simulating dynamic app routing with a state machine
 */

/* eslint react/no-set-state : 0 */

import React, {Component} from 'react';

import Home from '../../views/dynamic/Home';
import Composition from '../../views/dynamic/Composition';

export default class PreviewContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      location: 'home'
    };
  }

  setLocation = (location, locationId, locationParameters) => {
    this.setState({location, locationId, locationParameters});
  }

  renderView = () => {
    switch (this.state.location) {
      case 'home':
        return (
          <Home />
        );
      case 'composition':
        const {
          locationId,
          locationParameters
        } = this.state;
        const {
          resources,
          assets,
          montage,
          compositions,
        } = this.props;
        // const parameters = montage.data.compositions.find(parameter => parameter.target_composition_id === locationId);
        const composition = compositions[locationId];

        return (
          <Composition
            parameters={locationParameters}
            composition={composition}
            resources={resources}
            assets={assets} />
        );

      default:
        return null;
    }
  }

  render() {
    const {
      props: {
        montage,
        compositions,
      },

      setLocation,
      renderView,
    } = this;
    return (
      <section>
        <nav>
          <ul>
            <li>
              <span onClick={() => setLocation('home')}>
                {montage.metadata.title}
              </span>
            </li>
            {
              montage.data.compositions.map((parameters, index) => {
                const id = parameters.target_composition_id;
                const composition = compositions[id];
                if (!composition) {
                  return null;
                }
                const onClick = () => {
                  setLocation('composition', id, parameters);
                };
                return (
                  <li key={index}>
                    <span onClick={onClick}>
                      {composition.metadata.title}
                    </span>
                  </li>
                );
              })
            }
          </ul>
        </nav>
        <section>
          {renderView()}
        </section>
        <style>
          {montage.data.css_code}
        </style>
      </section>
    );
  }
}
