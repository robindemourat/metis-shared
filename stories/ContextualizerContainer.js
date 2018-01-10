import React, {Component} from 'react';
import TranslationProvider from './TranslationProvider';
import PropTypes from 'prop-types';

export default class ContextualizerContainer extends Component {
  static childContextTypes = {
    assetsData: PropTypes.object,
    getAssetUri: PropTypes.func,
  }

  constructor(props) {
    super(props);
  }

  getAssetUri = asset => `/${asset.filename}`

  getChildContext = () => ({
    assetsData: this.props.assets,
    getAssetUri: this.getAssetUri
  })

  render() {
    const {
      children,
      style
    } = this.props;
    return (
      <section className="contextualizer-container" style={style}>
        <TranslationProvider>
          {children}
        </TranslationProvider>
      </section>
    )
  }
}