/* eslint react/no-set-state : 0 */
/* eslint  no-new-func : 0 */
import React, {Component} from 'react';
import Lightbox from 'react-images';

const isBrowser = new Function('try {return this===window;}catch(e){ return false;}');
const inBrowser = isBrowser();


class Block extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImage: 0,
      lightBoxOpen: false
    };
  }

  setCurrentImage = currentImage => {
    this.setState({
      currentImage
    });
  }

  nextImage = () => {
    const {currentImage} = this.state;
    const newImage = currentImage + 1 > this.props.resource.data.length - 1 ? 0 : currentImage + 1;
    this.setState({
      currentImage: newImage
    });
  }

  previousImage = () => {
    const {currentImage} = this.state;
    const newImage = currentImage - 1 < 0 ? this.props.resource.data.length - 1 : currentImage - 1;
    this.setState({
      currentImage: newImage
    });
  }

  onOpenLightBox = () => {
    this.setState({
      currentImage: 0,
      lightBoxOpen: true
    });
  }

  onCloseLightBox = () => {
    this.setState({
      lightBoxOpen: false
    });
  }

  render() {
    const {
      props: {
        resource,
        getAppropriateAssetUri
      },
      state: {
        currentImage = 0,
        lightBoxOpen
      },
      nextImage,
      previousImage,
      onOpenLightBox,
      onCloseLightBox,
      setCurrentImage
    } = this;

    const images = resource.data
                  && resource.data.map(image => ({
                    src: getAppropriateAssetUri(image)
                  }));

    return inBrowser ? (
      <figure>
        <img
          src={images[currentImage].src}
          onClick={onOpenLightBox} />
        <ul>
          {
            images.map((image, index) => {
              const active = index === currentImage;
              const onThisClick = () => setCurrentImage(index);
              return (
                <li key={index}>
                  <button onClick={onThisClick} className={`imageButton ${active ? 'active' : ''}`}>{index + 1}</button>
                </li>
              );
            })
          }
        </ul>

        <Lightbox
          images={images}
          isOpen={lightBoxOpen}
          currentImage={currentImage}
          onClickPrev={previousImage}
          onClickNext={nextImage}
          onClose={onCloseLightBox} />
      </figure>
    ) :
    (
      <div>
        <img src={images[currentImage].src} />
      </div>
    )
    ;

  }
}

export default Block;
