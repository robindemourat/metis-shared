import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class CitationsDataProvider extends Component {

  static childContextTypes = {
    citationLocale: PropTypes.string,
    citationStyle: PropTypes.string,
    citationItems: PropTypes.object
  }
  constructor(props) {
    super(props);
  }

  getChildContext = () => ({
    citationLocale: this.props.locale,
    citationStyle: this.props.style,
    citationItems: this.props.items
  });

  render () {
    const {
      children,
      items
    } = this.props;
    return (
      <div>
        {children}
      </div>
    )
  }
}