/**
 * This module exports a stateless reusable block asset wrapper component
 * It handles the connection to context's data and builds proper data to render the asset
 * ============
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import contextualizersModules from '../contextualizers';

class BlockAssetWrapper extends Component {
  constructor(props) {
    super(props);

  }

  shouldComponentUpdate() {
    // if(
    //   this.props.data !== nextProps.data ||
    //   this.context.story !== nextContext.story ||
    //   // this.context.dimensions.width !== nextContext.dimensions.width ||
    //   // this.context.dimensions.height !== nextContext.dimensions.height
    // ) {
    //   return true;
    // }
    return true;
  }

  render() {
    const {
      props: {
        data,
      },
      context: {
        // dimensions = {},
        bindBlockContextualization,
        renderingMode,
        contextualizations,
        contextualizers,
        resources,
        // assets
      }
    } = this;

    const assetId = data.asset.id;

    const contextualization = contextualizations[assetId];
    if (!contextualization) {
      return null;
    }
    const contextualizer = contextualizers[contextualization.contextualizerId];
    const resource = resources[contextualization.resourceId];

    if (!contextualizer || !resource) {
      return null;
    }

    const contextualizerModule = contextualizersModules[contextualizer.type];
    const Block = contextualizerModule && contextualizerModule.Block;

    const bindRef = component => {
      if (typeof bindBlockContextualization === 'function') {
        bindBlockContextualization(assetId, component);
      }
    };

    if (contextualization && Block) {
      return (
        <figure
          ref={bindRef}
          className={'BlockAssetWrapper ' + contextualizer.type}
          style={{
            // minHeight: (contextualizer.type === 'data-presentation' || contextualizer.type === 'dicto' ) ? dimensions.height : '',
            // height: (contextualizer.type === 'data-presentation' || contextualizer.type === 'dicto' ) ? dimensions.height : '',
            position: 'relative',
            // left: fixed ? dimensions && dimensions.position && dimensions.position.left : undefined,
            // top: fixed ? dimensions && dimensions.position && dimensions.position.top : undefined,
            // width: fixed ? dimensions && dimensions.width : undefined,
            // // height: fixed ? dimensions.height : undefined,
            // border: fixed ? '5px solid #f32e36' : undefined,
          }}
          id={assetId}>
          <Block
            resource={resource}
            contextualizer={contextualizer}
            contextualization={contextualization}
            renderingMode={renderingMode} />

          <figcaption>
            {<h4 className="figure-title">
              {contextualization.title || resource.metadata.name}
            </h4>}
            {contextualization.legend || resource.metadata.description.length ? <p>
              {contextualization.legend || resource.metadata.description}
            </p>
            : null}
            {
              resource.metadata.creators && resource.metadata.creators.length ?
                <p className="creator-container">
                  {
                  resource.metadata.creators.map((creator, index) => (
                    <i key={index} className="creator">
                      {creator.given} {creator.family}
                    </i>
                  ))
                }
                </p>
              : null
            }
          </figcaption>
        </figure>
      );
    }
    else {
      return null;
    }

  }
}
/**
 * Component's properties types
 */
BlockAssetWrapper.propTypes = {
  /**
   * Corresponds to the data initially embedded in a draft-js entity
   */
  data: PropTypes.shape({
    asset: PropTypes.shape({
      id: PropTypes.string
    })
  })
};
/**
 * Component's context used properties
 */
BlockAssetWrapper.contextTypes = {

  /**
   * Dimensions of the wrapping element
   */
  dimensions: PropTypes.object,

  bindBlockContextualization: PropTypes.func,

  renderingMode: PropTypes.string,
  contextualizations: PropTypes.object,
  contextualizers: PropTypes.object,
  resources: PropTypes.object,
  assets: PropTypes.object,

};

export default BlockAssetWrapper;
