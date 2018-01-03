import React, {Component} from 'react';
import TranslationProvider from './TranslationProvider';
import PropTypes from 'prop-types';

export default class ContextualizerContainer extends Component {
  static childContextTypes = {
    assets: PropTypes.object,
    getAssetUri: PropTypes.func,
  }

  constructor(props) {
    super(props);
  }

  getAssetUri = asset => `/${asset.filename}`

  getChildContext = () => ({
    assets: this.props.assets,
    getAssetUri: this.getAssetUri
  })

  render() {
    const {
      children
    } = this.props;
    return (
      <section className="contextualizer-container">
        <TranslationProvider>
          {children}
        </TranslationProvider>
      </section>
    )
  }
}