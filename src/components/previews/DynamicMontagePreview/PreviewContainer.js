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
    Link: PropTypes.func,
    getAssetUri: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.state = {
      location: 'home'
    };
  }

  getChildContext = () => ({
    Link: this.Link,
    getAssetUri: this.props.getAssetUri
  })

  Link = ({to, children}) => {
    const onClick = () => {
      const {index, view, parameters} = to;
      this.setLocation(view, index, parameters);
    };
    return (
      <button onClick={onClick}>
        {children}
      </button>
    );
  }

  setLocation = (location, locationIndex, locationParameters) => {
    this.setState({location, locationIndex, locationParameters});
  }

  renderView = () => {
    const {
      resources,
      assets,
      montage,
      compositions,
    } = this.props;

    const {
      locationIndex,
      locationParameters
    } = this.state;

    switch (this.state.location) {
      case 'home':
        return (
          <Home
            compositions={compositions}
            montage={montage} />
        );
      case 'composition':
        const composition = compositions[montage.data.compositions[+locationIndex].target_composition_id];
        return (
          <Composition
            parameters={locationParameters}
            compositions={compositions}
            composition={composition}
            resources={resources}
            montage={montage}
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
          {montage.data.css.shared_css_code}
        </style>
      </section>
    );
  }
}
