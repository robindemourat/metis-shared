/* eslint react/no-set-state : 0 */
/* eslint  no-new-func : 0 */
/* eslint react/prefer-stateless-function : 0 */
import React, {Component} from 'react';
import Modal from 'react-modal';
let ZoomableImage = null;
import Dimensions from 'react-dimensions';

const isBrowser = new Function('try {return this===window;}catch(e){ return false;}');
const inBrowser = isBrowser();

if (inBrowser) {
 ZoomableImage = require('react-zoomable-image').default;
}

const computeDimensions = (imageDimensions, containerDimensions) => {
  const dimensions = {
    width: 0,
    height: 0
  };
  // proportion relatively to height
  if (imageDimensions.width > imageDimensions.height) {
    dimensions.width = containerDimensions.width;
    dimensions.height = (containerDimensions.width * imageDimensions.height) / imageDimensions.width;
  // proportion relatively to width
  }
 else {
    dimensions.height = containerDimensions.height;
    dimensions.width = (containerDimensions.height * imageDimensions.width) / imageDimensions.height;
  }
  return {
    dimensions,
    ratio: (imageDimensions.width * imageDimensions.height) / (containerDimensions.width * containerDimensions.height)
  };
};

class ZoomableComponent extends Component {

  shouldComponentUpdate() {
    return true;
  }
  render() {
    const {
      src,
      title = '',
      imageDimensions,
      containerWidth,
      containerHeight,
      className,
      onClose,
    } = this.props;
    const {dimensions, ratio} = computeDimensions(imageDimensions, {
        width: containerWidth,
        height: containerHeight
      });
    if (imageDimensions.width * imageDimensions.height > containerWidth * containerHeight) {
      return (
        <div className="zoomable-wrapper">
          <ZoomableImage
            className={className}
            baseImage={{
                alt: title,
                src,
                width: dimensions.width,
                height: dimensions.height
              }}
            largeImage={{
                alt: title,
                src,
                width: dimensions.width * ratio,
                height: dimensions.height * ratio
              }}
            thumbnailImage={{
                alt: title,
                src
              }} />
          <button onClick={onClose} className="button close-zoomable">
            ✕
          </button>
        </div>
      );
    }
    else {
      return (
        <img
          src={src}
          alt={title}
          style={{
            width: dimensions.width,
            height: dimensions.height
          }} />
      );
    }
  }
}

const Zoomable = Dimensions()(ZoomableComponent);

class BlockDynamic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false
    };
  }

  componentWillMount() {
    this.updateImageDimensions(this.props);
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.resource !== nextProps.resource) {
      this.updateImageDimensions(nextProps);
    }
  }

  toggleModal = (e) => {
    if (e && typeof e.stopPropagation === 'function') {
      e.stopPropagation();
    }
    this.setState({
      modalIsOpen: !this.state.modalIsOpen,
    });
  }

  updateImageDimensions = (props) => {
    const {
      props: {
        assetUri
      }
    } = this;

    const {
      resource
    } = props;

    if (inBrowser && assetUri && resource && resource.data) {

      const img = new Image();

      img.onload = () => {
        const imageHeight = img.height;
        const imageWidth = img.width;

        this.setState({
          imageHeight,
          imageWidth
        });
      };

      img.src = assetUri;
    }
  }

  render() {
    const {
      props: {
        assetUri,
        resource
      },
      state: {
        modalIsOpen,
        imageHeight,
        imageWidth,
      },
      toggleModal
    } = this;


    return assetUri ? (
      <figure
        className="peritext-contextualization peritext-contextualization-block peritext-contextualization-web peritext-contextualizer-image">
        <img
          src={assetUri}
          onClick={toggleModal} />
        {inBrowser ?
          <Modal
            isOpen={modalIsOpen}
            ariaHideApp={false}
            onRequestClose={toggleModal}
            className="zoomable-image-container"
            style={{
              content: {
                background: 'rgba(0,0,0,0)',
                border: 'none'
              }
            }}>

            <Zoomable
              src={assetUri}
              title={resource.metadata.title}
              className="image-detail"
              onClose={toggleModal}
              imageDimensions={{
                  width: imageWidth,
                  height: imageHeight,
                }} />
            <button className="close-zoomable" onClick={toggleModal}>
            ✕
            </button>
          </Modal>
        :
          <img src={assetUri} />
        }
      </figure>
    ) : null;

  }
}

export default BlockDynamic;
