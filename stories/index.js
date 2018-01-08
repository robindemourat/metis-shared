import React from 'react';

import { storiesOf } from '@storybook/react';
import TranslationsProvider from './TranslationProvider';
import ContextualizerContainer from './ContextualizerContainer';

import lib from '../src';

const {
  components: {
      previews: {
        DynamicMontagePreview,
        StaticMontagePreview,
        FacebookPreview,
        TwitterPreview,
        MailingPreview,
      },
      contextualizers: {
        image,
        imagesgallery,
        iframe
      }
  }
} = lib;

/**
 * Contextualizers stories
 */


const assets = {
  'image': {
    type: 'asset',
    filename: 'image-example.jpg',
    mimetype: 'image/jpg'
  },
  'iframe_screenshot': {
    type: 'asset',
    filename: 'screenshot-example.png',
    mimetype: 'image/png'
  },
  'iframe_screencast': {
    type: 'asset',
    filename: 'screencast-example.mp4',
    mimetype: 'video/mpeg'
  }
};

/**
 * Iframe contextualizer
 */

const iframeResource = {
  _id: 'iframe resource',
  metadata: {
    name: 'iframe resource',
    resource_type: 'iframe',
    description: 'an iframe resource'
  },
  data: {
    url: 'http://chaire-arts-sciences.org/',
    screencast_video_asset_id: 'iframe_screencast',
    rgb_image_asset_id: 'iframe_screenshot',
    cmyb_image_asset_id: 'iframe_screenshot',
    bw_image_asset_id: 'iframe_screenshot'
  }
};

const iframeContextualizer = {
  id: 'iframe contextualizer',
  type: 'iframe',
  insertionType: 'block'
};

const iframeContextualization = {
  id: 'iframe contextualization',
  resourceId: 'iframe resource',
  contextualizerId: 'iframe contxtualizer'
};

const IframeBlock = ({renderingMode}) => {
  const Block = iframe.Block;
  return (
    <ContextualizerContainer 
      assets={assets}
    >
      <Block
        resource={iframeResource}
        contextualization={iframeContextualization}
        contextualizer={iframeContextualizer}
        renderingMode={renderingMode}
      />
    </ContextualizerContainer>
  );
}

storiesOf('Iframe contextualizer', module)
  .add('web', () => <IframeBlock renderingMode={'web'} />)
  .add('epub reflowable', () => <IframeBlock renderingMode={'epub-reflowable'} />)
  .add('epub fixed', () => <IframeBlock renderingMode={'epub-fixed'} />)
  .add('pdf', () => <IframeBlock renderingMode={'pdf'} />)
  .add('micro', () => <IframeBlock renderingMode={'micro'} />)


/**
 * Image contextualizer
 */

const imageResource = {
  _id: 'image resource',
  metadata: {
    name: 'image resource',
    resource_type: 'image',
    description: 'an image resource'
  },
  data: {
    rgb_image_asset_id: 'image',
    cmyb_image_asset_id: 'image',
    bw_image_asset_id: 'image'
  }
};

const imageContextualizer = {
  id: 'image contextualizer',
  type: 'image',
  insertionType: 'block'
};

const imageContextualization = {
  id: 'image contextualization',
  resourceId: 'image resource',
  contextualizerId: 'image contxtualizer'
};

const ImageBlock = ({renderingMode}) => {
  const Block = image.Block;
  return (
    <ContextualizerContainer 
      assets={assets}
    >
      <Block
        resource={imageResource}
        contextualization={imageContextualization}
        contextualizer={imageContextualizer}
        renderingMode={renderingMode}
      />
    </ContextualizerContainer>
  );
}

storiesOf('Image contextualizer', module)
  .add('web', () => <ImageBlock renderingMode={'web'} />)
  .add('epub reflowable', () => <ImageBlock renderingMode={'epub-reflowable'} />)
  .add('epub fixed', () => <ImageBlock renderingMode={'epub-fixed'} />)
  .add('pdf', () => <ImageBlock renderingMode={'pdf'} />)
  .add('micro', () => <ImageBlock renderingMode={'micro'} />)

/**
 * Image gallery contextualizer
 */

const imagesGalleryResource = {
  _id: 'images gallery resource',
  metadata: {
    name: 'image gallery resource',
    resource_type: 'image',
    description: 'an images gallery resource'
  },
  data: [{
      rgb_image_asset_id: 'image',
      cmyb_image_asset_id: 'image',
      bw_image_asset_id: 'image'
    },
    {
      rgb_image_asset_id: 'image',
      cmyb_image_asset_id: 'image',
      bw_image_asset_id: 'image'
    }]
};

const imagesGalleryContextualizer = {
  id: 'images gallery contextualizer',
  type: 'imagesgallery',
  insertionType: 'block'
};

const imagesGalleryContextualization = {
  id: 'images gallery contextualization',
  resourceId: 'images gallery resource',
  contextualizerId: 'images gallery contxtualizer'
};

const ImagesGalleryBlock = ({renderingMode}) => {
  const Block = imagesgallery.Block;
  return (
    <ContextualizerContainer 
      assets={assets}
    >
      <Block
        resource={imagesGalleryResource}
        contextualization={imagesGalleryContextualization}
        contextualizer={imagesGalleryContextualizer}
        renderingMode={renderingMode}
      />
    </ContextualizerContainer>
  );
}

storiesOf('Images gallery contextualizer', module)
  .add('web', () => <ImagesGalleryBlock renderingMode={'web'} />)
  .add('epub reflowable', () => <ImagesGalleryBlock renderingMode={'epub-reflowable'} />)
  .add('epub fixed', () => <ImagesGalleryBlock renderingMode={'epub-fixed'} />)
  .add('pdf', () => <ImagesGalleryBlock renderingMode={'pdf'} />)
  .add('micro', () => <ImagesGalleryBlock renderingMode={'micro'} />)


/**
 * =======================
 * PREVIEW COMPONENTS
 * =======================
 */
storiesOf('Mailing preview', module)
  .add('default', () => {
    return (
      <TranslationsProvider>
        <MailingPreview
          montage={{
            data: {
              include_abstract: true,
              montage_url: 'http://www.example.com'
            },
          }}
          composition={{
              metadata: {
                title: 'My composition',
                abstract_original: 'This is an abstract'
              }
            }}
        />
      </TranslationsProvider>
    )
  })

storiesOf('Facebook preview', module)
  .add('default', () => {
    return (
      <TranslationsProvider>
        <FacebookPreview
          montage={{
            data: {
              include_abstract: true,
              montage_url: 'http://www.example.com'
            },
          }}
          composition={{
              metadata: {
                title: 'My composition',
                abstract_original: 'This is an abstract'
              }
            }}
          profileImageUri='profile-image.jpg'
        />
      </TranslationsProvider>
    )
  })

storiesOf('Twitter preview', module)
  .add('default', () => {
    return (
      <TranslationsProvider>
        <TwitterPreview
          montage={{
            data: {
              link: 'http://www.example.com',
              // include-abstract
            }
          }}
          composition={{
            metadata: {
              title: 'My composition',
              creators: [{given: 'Charles', family: 'Dupond'}]
            }
          }}
          assets={{
            abstractImageUri: 'abstract-example.jpeg'
          }}
          profileImageUri='profile-image.jpg'
        />
      </TranslationsProvider>
    )
  })


import dynamicMock from './dynamic-mock.json';
storiesOf('Dynamic preview', module)
  .add('default', () => {
    return (
      <TranslationsProvider>
        <DynamicMontagePreview
          montage={dynamicMock.montage}
          compositions={dynamicMock.compositions}
          resources={dynamicMock.resources}
          assets={dynamicMock.assets}
          getAssetUri={asset => `/${asset.filename}`}
        />
      </TranslationsProvider>
    )
  })

import staticMock from './static-mock.json';
storiesOf('Static preview', module)
  .add('default', () => {
    return (
      <TranslationsProvider>
        <StaticMontagePreview
          montage={staticMock.montage}
          compositions={staticMock.compositions}
          resources={staticMock.resources}
          assets={staticMock.assets}
          getAssetUri={asset => `/${asset.filename}`}
        />
      </TranslationsProvider>
    )
  })