import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ReferencesManager} from 'react-citeproc';

import ArticleTemplate from './ArticleTemplate';
import {makeAssets, makeCitationData} from '../../../utils/renderingUtils';


export default class DynamicComposition extends Component {


  static contextTypes = {
    citationStyle: PropTypes.string,
    citationLocale: PropTypes.string,
    renderingMode: PropTypes.string,
  }

  static childContextTypes = {
    citationItems: PropTypes.object
  }

  constructor(props) {
    super(props);
    const assets = makeAssets(props);
    const {citationData, citationItems} = makeCitationData(props, assets);
    this.state = {
      assets,
      citationData,
      citationItems
    };
  }

  getChildContext = () => ({
    citationItems: this.state.citationItems,
  })

  /**
   * Executes code when component receives new properties
   * @param {object} nextProps - the future properties of the component
   */
  componentWillReceiveProps(nextProps) {

    if (
      this.props.composition._id !== nextProps.composition._id ||
      this.props.composition.contextualizations !== nextProps.composition.contextualizations ||
      this.props.composition.contextualizers !== nextProps.composition.contextualizers ||
      this.props.composition.resources !== nextProps.composition.resources
    ) {

      const assets = makeAssets(nextProps);
      const {
        citationData,
        citationItems,
      } = makeCitationData(nextProps, assets);


      this.setState({/* eslint react/no-set-state : 0 */
        assets,
        citationData,
        citationItems,
      });
    }
  }

  render() {
    const {
      props: {
        parameters,
        composition,
        // compositions,
        // montage,
        assets,
        resources,
      },
      state: {
        citationData,
        citationItems
      },
      context: {
        citationStyle,
        citationLocale,
        renderingMode
      }
    } = this;

    let TemplateComponent = null;
    switch (parameters.template) {
      case 'article':
        TemplateComponent = ArticleTemplate;
        break;
      default:
        break;
    }
    const resourcesMap = resources.reduce((t, r) => ({...t, [r._id]: r}), {});
    const assetsMap = assets.reduce((t, a) => ({...t, [a._id]: a}), {});
    return (
      <div>
        <ReferencesManager
          style={citationStyle}
          locale={citationLocale}
          items={citationItems}
          citations={citationData}>
          <TemplateComponent
            parameters={parameters}
            composition={composition}
            assets={assetsMap}
            resources={resourcesMap}
            renderingMode={renderingMode} />
        </ReferencesManager>
      </div>
    );
  }
}
