/**
 * A simple preview container simulating dynamic app routing with a state machine
 */

/* eslint react/no-set-state : 0 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'react-dimensions';

import Home from '../../views/dynamic/Home';
import Composition from '../../views/dynamic/Composition';

class PreviewContainer extends Component {

  static childContextTypes = {
    Link: PropTypes.func,
    getAssetUri: PropTypes.func,
    citationStyle: PropTypes.string,
    citationLocale: PropTypes.string,
    renderingMode: PropTypes.string,
  }

  constructor(props) {
    super(props);

    this.state = {
      location: 'home'
    };
  }

  getChildContext = () => ({
    Link: this.Link,
    getAssetUri: this.props.getAssetUri,
    citationStyle: this.props.citationStyle,
    citationLocale: this.props.citationLocale,
    renderingMode: this.props.renderingMode,
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
        // const composition = compositions[montage.data.compositions[+locationIndex].target_composition_id];
        const thatComposition = compositions.find(composition => composition._id === montage.data.compositions[+locationIndex].target_composition_id);
        return (
          <Composition
            parameters={locationParameters}
            compositions={compositions}
            composition={thatComposition}
            resources={resources}
            montage={montage}
            assets={assets} />
        );

      default:
        return null;
    }
  }

  computeClass = (width, height) => {
    if (width <= 768) {
      return 'mobile';
    }
 else if (width <= 1024) {
      return 'tablet';
    }
 else if (width <= 1216) {
      return 'widescreen';
    }
 else {
      return 'fullhd';
    }
  }

  render() {
    const {
      props: {
        assets,
        compositions,
        resources,
        montage,
        containerHeight,
        containerWidth,
      },
      renderView,
      computeClass,
    } = this;
    const className = computeClass(containerWidth, containerHeight);
    if (assets && compositions && resources && montage) {
      return (
        <section className={className}>
          <section>
            {renderView()}
          </section>
          <style>
            {montage.data.css.shared_css_code}
          </style>
        </section>
      );
    }
    return null;

  }
}

export default Dimensions()(PreviewContainer);
