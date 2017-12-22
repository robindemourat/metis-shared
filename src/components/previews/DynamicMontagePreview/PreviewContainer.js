/**
 * A simple preview container simulating dynamic app routing with a state machine
 */

/* eslint react/no-set-state : 0 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Home from '../../views/dynamic/Home';
import Composition from '../../views/dynamic/Composition';

export default class PreviewContainer extends Component {

  static childContextTypes = {
    Link: PropTypes.func
  }

  constructor(props) {
    super(props);

    this.state = {
      location: 'home'
    };
  }

  getChildContext = () => ({
    Link: this.Link
  })

  Link = ({to, children}) => {
    const onClick = () => {
      const {id, view, parameters} = to;
      this.setLocation(view, id, parameters);
    };
    return (
      <button onClick={onClick}>
        {children}
      </button>
    );
  }

  setLocation = (location, locationId, locationParameters) => {
    this.setState({location, locationId, locationParameters});
  }

  renderView = () => {
    const {
      resources,
      assets,
      montage,
      compositions,
    } = this.props;

    const {
      locationId,
      locationParameters
    } = this.state;

    switch (this.state.location) {
      case 'home':

        return (
          <Home
            compositions={compositions}
            montage={montage} />
        );
      case 'compositions':
        // const parameters = montage.data.compositions.find(parameter => parameter.target_composition_id === locationId);
        const composition = compositions[locationId];

        return (
          <Composition
            parameters={locationParameters}
            compositions={compositions}
            montage={montage}
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
      },
      renderView,
    } = this;
    return (
      <section>
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
