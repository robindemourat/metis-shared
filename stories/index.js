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
        iframe,
        video,
        audio,
        table
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
  },
  'video_hd': {
    type: 'asset',
    filename: 'makridou-bretonneau-hd.mp4',
    mimetype: 'video/mpeg'
  },
  'video_sd': {
    type: 'asset',
    filename: 'makridou-bretonneau-sd.3gp',
    mimetype: 'video/3gpp'
  },
  'video_screenshot': {
    type: 'asset',
    filename: 'makridou-bretonneau-screenshot.png',
    mimetype: 'image/png'
  },
  'audio_track': {
    type: 'asset',
    filename: 'makridou-bretonneau-sound.mp3',
    mimetype: 'audio/mp3'
  },
  'audio_transcription': {
    type: 'asset',
    filename: 'makridou-bretonneau-subtitles.srt',
    mimetype: 'text/srt'
  },
  'table': {
    type: 'asset',
    filename: 'gpe_culture.csv',
    mimetype: 'text/csv'
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
  .add('web (will display an iframe)', () => <IframeBlock renderingMode={'web'} />)
  .add('epub reflowable (will display an image)', () => <IframeBlock renderingMode={'epub-reflowable'} />)
  .add('epub fixed (will display a screencast)', () => <IframeBlock renderingMode={'epub-fixed'} />)
  .add('pdf (will display an image)', () => <IframeBlock renderingMode={'pdf'} />)
  .add('micro (will display an image)', () => <IframeBlock renderingMode={'micro'} />)

/**
 * Video contextualizer
 */

const videoResource = {
  _id: 'video resource',
  metadata: {
    name: 'video resource',
    resource_type: 'video',
    description: 'a video resource'
  },
  data: {
    hd_video_asset_id: 'video_hd',
    sd_video_asset_id: 'video_sd',
    rgb_image_asset_id: 'video_screenshot',
    cmyb_image_asset_id: 'video_screenshot',
    bw_image_asset_id: 'video_screenshot'

  }
};

const videoContextualizer = {
  id: 'video contextualizer',
  type: 'video',
  insertionType: 'block'
};

const videoContextualization = {
  id: 'video contextualization',
  resourceId: 'video resource',
  contextualizerId: 'video contxtualizer'
};

const VideoBlock = ({renderingMode}) => {
  const Block = video.Block;
  return (
    <ContextualizerContainer 
      assets={assets}
    >
      <Block
        resource={videoResource}
        contextualization={videoContextualization}
        contextualizer={videoContextualizer}
        renderingMode={renderingMode}
      />
    </ContextualizerContainer>
  );
}

storiesOf('Video contextualizer', module)
  .add('web (will display a hd video player)', () => <VideoBlock renderingMode={'web'} />)
  .add('epub fixed (will display a sd video player)', () => <VideoBlock renderingMode={'epub-fixed'} />)
  .add('epub reflowable (will display an image)', () => <VideoBlock renderingMode={'epub-reflowable'} />)
  .add('pdf (will display an image)', () => <VideoBlock renderingMode={'pdf'} />)
  .add('micro (will display an image)', () => <VideoBlock renderingMode={'micro'} />)


/**
 * Audio contextualizer
 */

const audioResource = {
  _id: 'audio resource',
  metadata: {
    name: 'audio resource',
    resource_type: 'audio',
    description: 'an audio resource'
  },
  data: {
    audio_track_asset_id: 'audio_track',
    transcription_asset_id: 'audio_transcription',
  }
};

const audioContextualizer = {
  id: 'audio contextualizer',
  type: 'audio',
  insertionType: 'block'
};

const audioContextualization = {
  id: 'audio contextualization',
  resourceId: 'audio resource',
  contextualizerId: 'audio contxtualizer'
};

const AudioBlock = ({renderingMode}) => {
  const Block = audio.Block;
  return (
    <ContextualizerContainer 
      assets={assets}
    >
      <Block
        resource={audioResource}
        contextualization={audioContextualization}
        contextualizer={audioContextualizer}
        renderingMode={renderingMode}
      />
    </ContextualizerContainer>
  );
}

storiesOf('Audio contextualizer', module)
  .add('web (will display an audio player + transcription)', () => <AudioBlock renderingMode={'web'} />)
  .add('epub fixed (will display an audio player + transcription)', () => <AudioBlock renderingMode={'epub-fixed'} />)
  .add('epub reflowable (will display transcription)', () => <AudioBlock renderingMode={'epub-reflowable'} />)
  .add('pdf (will display transcription)', () => <AudioBlock renderingMode={'pdf'} />)
  .add('micro (will display transcription)', () => <AudioBlock renderingMode={'micro'} />)

/**
 * Table contextualizer
 */

const tableResource = {
  _id: 'table resource',
  metadata: {
    name: 'table resource',
    resource_type: 'table',
    description: 'a table resource'
  },
  data: {
    data_asset_id: 'table'
  }
};

const tableContextualizer = {
  id: 'table contextualizer',
  type: 'table',
  insertionType: 'block'
};

const tableContextualization = {
  id: 'table contextualization',
  resourceId: 'table resource',
  contextualizerId: 'table contxtualizer'
};

const TableBlock = ({renderingMode}) => {
  const Block = table.Block;
  return (
    <ContextualizerContainer 
      assets={assets}
    >
      <Block
        resource={tableResource}
        contextualization={tableContextualization}
        contextualizer={tableContextualizer}
        renderingMode={renderingMode}
      />
    </ContextualizerContainer>
  );
}

storiesOf('Table contextualizer', module)
  .add('web', () => <TableBlock renderingMode={'web'} />)
  .add('epub reflowable', () => <TableBlock renderingMode={'epub-reflowable'} />)
  .add('epub fixed', () => <TableBlock renderingMode={'epub-fixed'} />)
  .add('pdf', () => <TableBlock renderingMode={'pdf'} />)
  .add('micro', () => <TableBlock renderingMode={'micro'} />)


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