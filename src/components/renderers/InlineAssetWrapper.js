
/**
 * This module provides a reusable Inline contextualization for the editor component
 * @module plurishing-backoffice/components/SectionEditor
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import contextualizersModules from '../contextualizers';
/**
 * InlineContainer class for building react component instances
 */
class InlineContainer extends Component {


  /**
   * constructor
   * @param {object} props - properties given to instance at instanciation
   */
  constructor(props) {
    super(props);
  }


  /**
   * Defines whether the component should re-render
   * @param {object} nextProps - the props to come
   * @param {object} nextState - the state to come
   * @return {boolean} shouldUpdate - whether to update or not
   */
  shouldComponentUpdate() {
    // todo: optimize here
    return true;
  }


  /**
   * Renders the component
   * @return {ReactElement} component - the component
   */
  render() {

    const {
      props: {
        data,
      },
      context: {
        renderingMode,
        contextualizations,
        contextualizers,
        resources,
      }
    } = this;

    const assetId = data.asset.id;

    const contextualization = contextualizations[assetId];
    if (!contextualization) {
      return null;
    }
    const contextualizer = contextualizers[contextualization.contextualizerId];
    const resource = resources[contextualization.resourceId];

    if (!contextualizer || !resource || !contextualization) {
      return null;
    }

    const contextualizerModule = contextualizersModules[contextualizer.type];
    const ThatComponent = contextualizerModule && contextualizerModule.Inline;


    if (ThatComponent) {
      return (<ThatComponent
        resource={resource}
        contextualization={contextualization}
        contextualizer={contextualizer}
        renderingMode={renderingMode} />);
    }

    return null;
  }
}

/**
 * Component's properties types
 */
InlineContainer.propTypes = {
  /*
   * the asset to render
   */
  asset: PropTypes.shape({
    resource: PropTypes.object,
  })
};


/**
 * Component's context used properties
 */
InlineContainer.contextTypes = {
  renderingMode: PropTypes.string,
  contextualizations: PropTypes.object,
  contextualizers: PropTypes.object,
  resources: PropTypes.object,
};
export default InlineContainer;
