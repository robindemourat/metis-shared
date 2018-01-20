import React from 'react';

import { storiesOf } from '@storybook/react';

import {ReferencesManager} from 'react-citeproc';

import TranslationsProvider from './TranslationProvider';
import ContextualizerContainer from './ContextualizerContainer';

import CitationsDataProvider from './CitationsDataProvider';
import rawBib from 'raw-loader!../assets_examples/bibliography.bib';
import citationStyle from 'raw-loader!../assets_examples/apa.csl';
import citationLocale from 'raw-loader!../assets_examples/english-locale.xml';

import staticStyles from '../src/components/views/static/styles.scss';
import dynamicStyles from '../src/components/views/dynamic/styles.scss';

import data from './data';

import lib from '../src';

import 'react-table/react-table.css';


const {
  utils: {
    parseBibTeXToCSLJSON
  },
  components: {
      previews: {
        DynamicMontagePreview,
        StaticMontagePreview,
        FacebookPreview,
        TwitterPreview,
        MailingPreview,
      },
      views: {
        static: {
          DecoratedComposition
        }
      },
      contextualizers: {
        image,
        imagesgallery,
        webpage,
        video,
        audio,
        table,
        mobiliscene,
        bib
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
  },
  '360_video': {
    type: 'asset',
    filename: '360-video.mp4',
    mimetype: 'video/webm'
  },
  '360_text': {
    type: 'asset',
    filename: '360-text.txt',
    mimetype: 'text/plain'
  },
  '360_screenshot': {
    type: 'asset',
    filename: '360-screenshot.png',
    mimetype: 'image/png'
  },
  '360_screencast': {
    type: 'asset',
    filename: '360_screencast.mp4',
    mimetype: 'video/mp4'
  },
  'droid_sans_font': {
    type: 'asset',
    filename: 'DroidSans.json',
    mimetype: 'application/json'
  }
};

/**
 * Bib contextualizer
 */

const bibData = parseBibTeXToCSLJSON(rawBib);
const bibItems = bibData.reduce((total, ref) => ({
  ...total,
  [ref.id]: ref
}), {});

const bibRes = bibData.reduce((total, ref) => [
  ...total,
  {
    _id: ref.id,
    metadata: {
      name: ref.title,
      resource_type: 'bib',
    },
    data: ref
  }
], []);

const bibBlockContextualizer = {
  _id: 'bib block contextualizer',
  type: 'bib',
  insertionType: 'block'
};

const bibBlockContextualization = {
  id: 'bib block contextualization',
  resourceId: bibRes[0]._id,
  contextualizerId: 'bib block contextualizer'
};

const bibInlineContextualizer = {
  id: 'bib inline contextualizer',
  type: 'bib',
  insertionType: 'inline'
};


const bibInlineContextualization = {
  id: 'bib inline contextualization',
  resourceId: bibRes[0]._id,
  contextualizerId: 'bib inline contextualizer'
};


const bibCitations = [
  [{
      citationID: bibInlineContextualization.id,
      citationItems: [{
        id: bibRes[0].data.id
      }],
      properties: {
        noteIndex: 0
      }
    },
    [],
    []
  ]
];

const BibBlock = bib.Block;
const BibInline = bib.Inline;

storiesOf('Bib contextualizer', module)
  .add('Inline (full citation)', () => 
    <ReferencesManager
      style={citationStyle}
      locale={citationLocale}
      items={bibItems}
      citations={bibCitations.slice(0, 1)}
    >
      <BibInline 
        resource={bibRes[0]} 
        contextualizer={bibInlineContextualizer} 
        contextualization={bibInlineContextualization} 
        renderingMode={'web'} 
      />
    </ReferencesManager>
  )
  .add('Block (full citation)', () => 
    <CitationsDataProvider
      style={citationStyle}
      locale={citationLocale}
      items={bibItems}
      citations={bibCitations.slice(0, 1)}
    >
      <BibBlock 
        resource={bibRes[0]} 
        contextualizer={bibBlockContextualizer} 
        contextualization={bibBlockContextualization} 
        renderingMode={'web'} 
      />
    </CitationsDataProvider>
  )



/**
 * Mobiliscene contextualizer
 */

const mobilisceneResource = {
  _id: 'mobiliscene resource',
  metadata: {
    name: 'mobiliscene resource',
    resource_type: 'mobiliscene',
    description: 'a mobiliscene resource'
  },
  data: {
    content_type: 'video',
    geometry: 'sphere',
    content_asset_id: '360_video',
    screencast_video_asset_id: '360_screencast',
    rgb_image_asset_id: '360_screenshot',
    cmyb_image_asset_id: '360_screenshot',
    bw_image_asset_id: '360_screenshot'
  }
};

const mobilisceneResourceAlt = {
  _id: 'mobiliscene resource',
  metadata: {
    name: 'mobiliscene resource',
    resource_type: 'mobiliscene',
    description: 'a mobiliscene resource'
  },
  data: {
    content_type: 'text',
    geometry: 'cylinder',
    content_asset_id: '360_text',
    font_asset_id: 'droid_sans_font',
    screencast_video_asset_id: '360_screencast',
    rgb_image_asset_id: '360_screenshot',
    cmyb_image_asset_id: '360_screenshot',
    bw_image_asset_id: '360_screenshot'
  }
};


const mobilisceneContextualizer = {
  id: 'mobiliscene contextualizer',
  type: 'mobiliscene',
  insertionType: 'block'
};

const mobilisceneContextualization = {
  id: 'mobiliscene contextualization',
  resourceId: 'mobiliscene resource',
  contextualizerId: 'mobiliscene contxtualizer'
};

const MobilisceneBlock = ({renderingMode, resource}) => {
  const Block = mobiliscene.Block;
  return (
    <ContextualizerContainer 
      assets={assets}
      style={{width: '100%', height: '100%', position: 'absolute'}}
    >
      <Block
        resource={resource}
        contextualization={mobilisceneContextualization}
        contextualizer={mobilisceneContextualizer}
        renderingMode={renderingMode}
      />
    </ContextualizerContainer>
  );
}

storiesOf('Mobiliscene contextualizer (video)', module)
  .add('web (video - will display a player)', () => <MobilisceneBlock resource={mobilisceneResource} renderingMode={'web'} />)
  .add('web (text - will display a player)', () => <MobilisceneBlock resource={mobilisceneResourceAlt} renderingMode={'web'} />)
  .add('epub fixed (will display a screencast)', () => <MobilisceneBlock resource={mobilisceneResource} renderingMode={'epub-fixed'} />)
  .add('epub reflowable (will display an image)', () => <MobilisceneBlock resource={mobilisceneResource} renderingMode={'epub-reflowable'} />)
  .add('pdf (will display an image)', () => <MobilisceneBlock resource={mobilisceneResource} renderingMode={'pdf'} />)
  .add('micro (will display an image)', () => <MobilisceneBlock resource={mobilisceneResource} renderingMode={'micro'} />)


/**
 * Webpage contextualizer
 */

const webpageResource = {
  _id: 'webpage resource',
  metadata: {
    name: 'webpage resource',
    resource_type: 'iframe',
    description: 'a webpage resource'
  },
  data: {
    url: 'http://chaire-arts-sciences.org/',
    screencast_video_asset_id: 'iframe_screencast',
    rgb_image_asset_id: 'iframe_screenshot',
    cmyb_image_asset_id: 'iframe_screenshot',
    bw_image_asset_id: 'iframe_screenshot'
  }
};

const webpageContextualizer = {
  id: 'webpage contextualizer',
  type: 'webpage',
  insertionType: 'block'
};

const webpageContextualization = {
  id: 'webpage contextualization',
  resourceId: 'webpage resource',
  contextualizerId: 'webpage contxtualizer'
};

const WebpageBlock = ({renderingMode}) => {
  const Block = webpage.Block;
  return (
    <ContextualizerContainer 
      assets={assets}
    >
      <Block
        resource={webpageResource}
        contextualization={webpageContextualization}
        contextualizer={webpageContextualizer}
        renderingMode={renderingMode}
      />
    </ContextualizerContainer>
  );
}

storiesOf('Webpage contextualizer', module)
  .add('web (will display an iframe)', () => <WebpageBlock renderingMode={'web'} />)
  .add('epub reflowable (will display an image)', () => <WebpageBlock renderingMode={'epub-reflowable'} />)
  .add('epub fixed (will display a screencast)', () => <WebpageBlock renderingMode={'epub-fixed'} />)
  .add('pdf (will display an image)', () => <WebpageBlock renderingMode={'pdf'} />)
  .add('micro (will display an image)', () => <WebpageBlock renderingMode={'micro'} />)

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
              montage_url: 'http://www.example.com',
              attached_assets: [{
                image_asset_id: 'iframe_screenshot'
              }]
            },
          }}
          assets={{
            'iframe_screenshot': 'screenshot-example.png'
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


// import dynamicMock from './dynamic-mock.json';

const dynamicMontage = data.montages.find(montage => montage.metadata.montage_type === 'dynamic')

storiesOf('Dynamic preview', module)
  .add('default', () => {
    return (
      <TranslationsProvider>
        <DynamicMontagePreview
          montage={dynamicMontage}
          compositions={data.compositions}
          resources={data.resources}
          assets={data.assets}
          getAssetUri={asset => `/${asset.filename}`}
          citationStyle={citationStyle}
          citationLocale={citationLocale}
          renderingMode="web"
        />
      </TranslationsProvider>
    )
  })
  .add('with undefined dependent data', () => {
    return (
      <TranslationsProvider>
        <DynamicMontagePreview
          montage={dynamicMontage}
          compositions={undefined}
          resources={undefined}
          assets={undefined}
          getAssetUri={asset => `/${asset.filename}`}
          citationStyle={citationStyle}
          citationLocale={citationLocale}
          renderingMode="web"
        />
      </TranslationsProvider>
    )
  })

// import staticMock from './static-mock.json';

const staticMontage = data.montages.find(montage => montage.metadata.montage_type === 'static')

storiesOf('Static preview', module)
  .add('default', () => {
    return (
      <TranslationsProvider>
        <StaticMontagePreview
          montage={staticMontage}
          compositions={data.compositions}
          resources={data.resources}
          assets={data.assets}
          getAssetUri={asset => `/${asset.filename}`}
          citationStyle={citationStyle}
          citationLocale={citationLocale}
          renderingMode="pdf"
        />
      </TranslationsProvider>
    )
  })
  .add('with undefined data', () => {
    return (
      <TranslationsProvider>
        <StaticMontagePreview
          montage={staticMontage}
          compositions={undefined}
          resources={undefined}
          assets={undefined}
          getAssetUri={asset => `/${asset.filename}`}
          citationStyle={citationStyle}
          citationLocale={citationLocale}
          renderingMode="pdf"
        />
      </TranslationsProvider>
    )
  })
  .add('Decorated composition (autonomously displayed', () => {
    const parameters = staticMontage.data.compositions[0];
    const composition = data.compositions.find(comp => comp._id === parameters.target_composition_id);
    return (
      <TranslationsProvider>
        <DecoratedComposition
          composition={composition}
          parameters={parameters}
          resources={data.resources}
          assets={data.assets}
          getAssetUri={asset => `/${asset.filename}`}
          citationStyle={citationStyle}
          citationLocale={citationLocale}
          renderingMode="pdf"
        />
      </TranslationsProvider>
    )
  })