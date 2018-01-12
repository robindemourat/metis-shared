import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ReferencesManager} from 'react-citeproc';

import ArticleTemplate from './ArticleTemplate';
import FullScreenTemplate from './FullscreenTemplate';
import Nav from './Nav';
import {resourceToCslJSON} from '../../../utils/assetsUtils';
import constants from '../../../constants';
const {draftEntitiesNames: {INLINE_ASSET}} = constants;


export default class DynamicComposition extends Component {


  static contextTypes = {
    citationStyle: PropTypes.string,
    citationLocale: PropTypes.string,
  }

  static childContextTypes = {
    citationItems: PropTypes.object
  }

  constructor(props) {
    super(props);
    const assets = this.makeAssets(props);
    const {citationData, citationItems} = this.makeCitationData(props, assets);
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

      const assets = this.makeAssets(nextProps);
      const {
        citationData,
        citationItems,
      } = this.makeCitationData(nextProps, assets);


      this.setState({/* eslint react/no-set-state : 0 */
        assets,
        citationData,
        citationItems,
      });
    }
  }

  makeAssets = (props) => {
    const {
      composition: {
        contextualizations,
        contextualizers,
      },
      resources,
    } = props;

    /*
     * Resource Assets preparation
     */
    const assets = Object.keys(contextualizations)
    .reduce((ass, id) => {
      const contextualization = contextualizations[id];
      const contextualizer = contextualizers[contextualization.contextualizerId];
      const resource = resources.find(r => contextualization.resourceId === r._id);
      if (resource) {
        return {
          ...ass,
          [id]: {
            ...contextualization,
            resource,
            contextualizer,
            type: contextualizer ? contextualizer.type : INLINE_ASSET
          }
        };
      }
      return ass;
    }, {});
    return assets;
  }


  makeCitationData = (props, assets) => {
    const {
      resources,
      composition
    } = props;
    const {
      contextualizations,
      contextualizers
    } = composition;

    /*
     * Citations preparation
     */
    // isolate bib contextualizations
    const bibContextualizations = Object.keys(assets)
    .map(assetKey => assets[assetKey]);

    // build citations items data
    const citationItems = bibContextualizations
      .reduce((finalCitations, asset) => {
        return {
          ...finalCitations,
          [resourceToCslJSON(asset.resource).id]: resourceToCslJSON(asset.resource),
        };
        // const citations = resourceToCslJSON(asset.resource);
        // console.log(citations);
        // const newCitations = citations.reduce((final2, citation) => {
        //   return {
        //     ...final2,
        //     [citation.id]: citation
        //   };
        // }, {});
        // return {
        //   ...finalCitations,
        //   ...newCitations,
        // };
      }, {});


    // build citations's citations data
    const citationInstances = bibContextualizations // Object.keys(bibContextualizations)
      .map((bibCit, index) => {
        const key1 = bibCit.id;
        const contextualization = contextualizations[key1];

        const contextualizer = contextualizers[contextualization.contextualizerId];
        const resource = resources.find(r => r._id === contextualization.resourceId);
        return {
          citationID: key1,
          citationItems: [{
            id: resourceToCslJSON(resource).id,
            locator: contextualizer.locator,
            prefix: contextualizer.prefix,
            suffix: contextualizer.suffix,
          }],
          // citationItems: resourceToCslJSON(resource).map(ref => ({
          //   locator: contextualizer.locator,
          //   prefix: contextualizer.prefix,
          //   suffix: contextualizer.suffix,
          //   // ...contextualizer,
          //   // id: ref.id,
          //   id: ref.id,
          // })),
          properties: {
            noteIndex: index + 1
          }
        };
      });
    // map them to the clumsy formatting needed by citeProc
    // todo: refactor the citationInstances --> citeProc-formatted data as a util
    const citationData = citationInstances.map((instance, index) => [
      instance,
      // citations before
      citationInstances.slice(0, (index === 0 ? 0 : index))
        .map((oCitation) => [
            oCitation.citationID,
            oCitation.properties.noteIndex
          ]
        ),
      []
      // citations after (not using it seems to work anyway)
      // citationInstances.slice(index)
      //   .map((oCitation) => [
      //       oCitation.citationID,
      //       oCitation.properties.noteIndex
      //     ]
      //   ),
    ]);

    return {
      citationData,
      citationItems,
      assets
    };
  }

  render() {
    const {
      props: {
        parameters,
        composition,
        compositions,
        montage,
        assets,
        resources,
        renderingMode = 'web'
      },
      state: {
        citationData,
        citationItems
      },
      context: {
        citationStyle,
        citationLocale
      }
    } = this;

    let TemplateComponent = null;
    switch (parameters.template) {
      case 'article':
        TemplateComponent = ArticleTemplate;
        break;
      case 'fullscreen':
        TemplateComponent = FullScreenTemplate;
        break;
      default:
        break;
    }
    const resourcesMap = resources.reduce((t, r) => ({...t, [r._id]: r}), {});
    const assetsMap = assets.reduce((t, a) => ({...t, [a._id]: a}), {});
    return (
      <div>
        <Nav montage={montage} compositions={compositions} />
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
          <style>
            {montage.data.css.shared_css_code}
            {montage.data.css[`${renderingMode}_css_code`]}
            {parameters.css.shared_css_code}
            {parameters.css[`${renderingMode}_css_code`]}
          </style>
        </ReferencesManager>
      </div>
    );
  }
}
