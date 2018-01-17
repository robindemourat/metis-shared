/**
 * A simple preview container simulating dynamic app routing with a state machine
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Cover from '../../views/static/Cover';
import BackCover from '../../views/static/BackCover';
import Colophon from '../../views/static/Colophon';
import Composition from '../../views/static/Composition';
import Toc from '../../views/static/Toc';

import PdfLink from '../../views/static/PdfLink';
import PdfNotePointerPointer from '../../views/static/PdfNotePointerPointer';
import PdfNoteContentPointer from '../../views/static/PdfNoteContentPointer';


export default class PreviewContainer extends Component {

  static childContextTypes = {
    getAssetUri: PropTypes.func,
    citationStyle: PropTypes.string,
    citationLocale: PropTypes.string,
    renderingMode: PropTypes.string,

    NotePointerPointer: PropTypes.func,
    NoteContentPointer: PropTypes.func,
    Link: PropTypes.func,
  }

  constructor(props) {
    super(props);
  }

  getChildContext = () => ({
    getAssetUri: this.props.getAssetUri,
    citationStyle: this.props.citationStyle,
    citationLocale: this.props.citationLocale,
    renderingMode: this.props.renderingMode,

    NotePointerPointer: this.props.NotePointerPointer || PdfNotePointerPointer,
    NoteContentPointer: this.props.NoteContentPointer || PdfNoteContentPointer,
    Link: this.props.Link || PdfLink,
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

    if (montage && compositions && resources && assets) {
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
                index={index}
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
          <BackCover
            background={montage.data.backcover_color}
            title={montage.metadata.title}
            text={montage.metadata.description} />
        </section>
      );
    }
    return null;

  }
}
