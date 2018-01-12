/**
 * A simple preview container simulating dynamic app routing with a state machine
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Cover from '../../views/static/Cover';
import Colophon from '../../views/static/Colophon';
import Composition from '../../views/static/Composition';
import Toc from '../../views/static/Toc';


import defaultStyle from 'raw-loader!./assets/apa.csl';
import defaultLocale from 'raw-loader!./assets/english-locale.xml';


export default class PreviewContainer extends Component {

  static childContextTypes = {
    getAssetUri: PropTypes.func,
    citationStyle: PropTypes.string,
    citationLocale: PropTypes.string,
    renderingMode: PropTypes.string
  }

  constructor(props) {
    super(props);
  }

  getChildContext = () => ({
    getAssetUri: this.props.getAssetUri,
    citationStyle: defaultStyle,
    citationLocale: defaultLocale,
    renderingMode: this.props.renderingMode,
  })

  render() {
    const {
      props: {
        montage,
        compositions,
        resources,
        assets,
        renderingMode
      },
    } = this;


    return (
      <section>
        <Cover
          background={montage.data.cover_color}
          title={montage.metadata.title} />
        <Toc montage={montage} compositions={compositions} />
        {
          montage.data.compositions.map((parameters, index) => {
            const composition = compositions.find(c => c._id === parameters.target_composition_id);
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
          {montage.data.css[`${renderingMode}_css_code`]}
        </style>
      </section>
    );

  }
}
