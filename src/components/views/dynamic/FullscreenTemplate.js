import React, {Component} from 'react';
import Renderer from '../../renderers/Renderer';
import Dimensions from 'react-dimensions';

// import './FullscreenTemplate.scss';

// component must be statefull to be enhanced with Dimensions HOC because it gives it refs
class FigureWrapper extends Component {/* eslint react/prefer-stateless-function : 0 */

  shouldComponentUpdate = () => true;

  render () {
    const {
      containerWidth,
      containerHeight,
      children
    } = this.props;

    return (
      <section
        className="figure-wrapper"
        style={{
          width: containerWidth,
          height: containerHeight
        }}>
        {children}
      </section>
    );
  }
}

const EnhancedFigureWrapper = Dimensions()(FigureWrapper);

const FullscreenTemplate = ({
  composition,
  renderingMode,
  // parameters,
  assets,
  resources,
}) => {
  // just keep the first block contextualization
  const filteredContents = {
    ...composition.contents,
    blocks: [composition.contents.blocks.find(block => block.type === 'atomic')]
  };
  return (
    <div className="plurishing-DynamicFullscreenTemplate">
      <h2>{composition.metadata.title}</h2>
      {/* main content */}
      <section className="figure-container">
        <EnhancedFigureWrapper>
          <Renderer
            raw={filteredContents}
            renderingMode={renderingMode}
            contextualizations={composition.contextualizations}
            contextualizers={composition.contextualizers}
            resources={resources}
            assets={assets} />
        </EnhancedFigureWrapper>
      </section>
      {/* notes */}

    </div>
  );
};


export default FullscreenTemplate;
