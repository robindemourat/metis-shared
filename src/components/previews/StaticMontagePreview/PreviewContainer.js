/**
 * A simple preview container simulating dynamic app routing with a state machine
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Cover from '../../views/static/Cover';
import Colophon from '../../views/static/Colophon';
import Composition from '../../views/static/Composition';
import Toc from '../../views/static/Toc';

export default class PreviewContainer extends Component {

  static childContextTypes = {
    getAssetUri: PropTypes.func,
  }

  constructor(props) {
    super(props);
  }

  getChildContext = () => ({
    getAssetUri: this.props.getAssetUri
  })

  render() {
    const {
      montage,
      compositions,
      resources,
      assets
    } = this.props;

    return (
      <section>
        <Cover
          background={montage.data.cover_color}
          title={montage.metadata.title} />
        <Toc montage={montage} compositions={compositions} />
        {
          montage.data.compositions.map((parameters, index) => {
            const composition = compositions[parameters.target_composition_id];
            if (!composition) {
              return null;
            }
            return (<Composition
              key={index}
              parameters={parameters}
              composition={composition}
              resources={resources}
              assets={assets}
              locationIndex={index} />);
          })
        }
        <Colophon contents={montage.data.colophon} />
        <style>
          {montage.data.css.shared_css_code}
          {
          /*
           * @todo implement renderingMode-specific css call
           */
        }
        </style>
      </section>
    );

  }
}
