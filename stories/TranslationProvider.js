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

    const style = {
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%'
    }

    return (
      <section 
        className="translations-provider"
        style={style}
      >
        {children}
      </section>
    )
  }
}