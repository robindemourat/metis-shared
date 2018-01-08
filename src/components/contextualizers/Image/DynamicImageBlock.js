/* eslint react/no-set-state : 0 */
/* eslint  no-new-func : 0 */
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

const Zoomable = Dimensions()(({
  src,
  title = '',
  imageDimensions,
  containerWidth,
  containerHeight
}) => {
  const {dimensions, ratio} = computeDimensions(imageDimensions, {
      width: containerWidth,
      height: containerHeight
    });
  if (imageDimensions.width * imageDimensions.height > containerWidth * containerHeight) {
    return (
      <ZoomableImage
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
});

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
            style={{
              content: {
                background: 'rgba(0,0,0,0)',
                border: 'none'
              }
            }}>

            <Zoomable
              src={assetUri}
              title={resource.metadata.title}
              imageDimensions={{
                  width: imageWidth,
                  height: imageHeight,
                }} />

          </Modal>
        :
          <img src={assetUri} />
        }
      </figure>
    ) : null;

  }
}

export default BlockDynamic;
