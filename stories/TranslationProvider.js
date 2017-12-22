import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class TranslationProvider extends Component {
  static childContextTypes = {
    t: PropTypes.func
  }

  constructor(props) {
    super(props);
  }

  getChildContext = () => ({
    t: this.translate
  })

  translate = (key) => key

  render() {
    const {
      children
    } = this.props;
    return (
      <section className="translations-provider">
        {children}
      </section>
    )
  }
}