import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Composition from './Composition';

import PdfLink from '../../views/static/PdfLink';
import PdfNotePointerPointer from '../../views/static/PdfNotePointerPointer';
import PdfNoteContentPointer from '../../views/static/PdfNoteContentPointer';


export default class DecoratedComposition extends Component {
  static childContextTypes = {
    getAssetUri: PropTypes.func,
    renderingMode: PropTypes.string,
    citationStyle: PropTypes.string,
    citationLocale: PropTypes.string,
    assetsData: PropTypes.object,


    NotePointerPointer: PropTypes.func,
    NoteContentPointer: PropTypes.func,
    Link: PropTypes.func,
  }

  getChildContext = () => ({
    getAssetUri: this.props.getAssetUri,
    renderingMode: this.props.renderingMode,
    citationStyle: this.props.citationStyle,
    citationLocale: this.props.citationLocale,
    assetsData: this.props.assets.reduce((total, asset) => ({
      ...total,
      [asset._id]: asset
    }), {}),

    NotePointerPointer: this.props.NotePointerPointer || PdfNotePointerPointer,
    NoteContentPointer: this.props.NoteContentPointer || PdfNoteContentPointer,
    Link: this.props.Link || PdfLink,
  })

  render() {
    return (
      <Composition
        {...this.props} />
    );
  }
}
