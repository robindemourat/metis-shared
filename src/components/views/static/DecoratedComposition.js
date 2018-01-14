import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Composition from './Composition';

export default class DecoratedComposition extends Component {
  static childContextTypes = {
    getAssetUri: PropTypes.func,
    renderingMode: PropTypes.string,
    citationStyle: PropTypes.string,
    citationLocale: PropTypes.string
  }

  getChildContext = () => ({
    getAssetUri: this.props.getAssetUri,
    renderingMode: this.props.renderingMode,
    citationStyle: this.props.citationStyle,
    citationLocale: this.props.citationLocale
  })

  render() {
    return (
      <Composition
        {...this.props} />
    );
  }
}
