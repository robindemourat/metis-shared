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
        image
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
  }
};


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
        />
      </TranslationsProvider>
    )
  })