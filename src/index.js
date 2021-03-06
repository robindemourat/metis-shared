import {
  parseBibTeXToCSLJSON,
  resourceToCslJSON
} from './utils/assetsUtils';

export default {
  utils: {
    parseBibTeXToCSLJSON,
    resourceToCslJSON
  },
  components: {
    contextualizers: {
      image: require('./components/contextualizers/Image'),
      imagesgallery: require('./components/contextualizers/ImagesGallery'),
      webpage: require('./components/contextualizers/Webpage'),
      video: require('./components/contextualizers/Video'),
      audio: require('./components/contextualizers/Audio'),
      table: require('./components/contextualizers/Table'),
      mobiliscene: require('./components/contextualizers/Mobiliscene'),
      bib: require('./components/contextualizers/Bib'),
    },
    previews: {
      DynamicMontagePreview: require('./components/previews/DynamicMontagePreview/PreviewContainer').default,
      StaticMontagePreview: require('./components/previews/StaticMontagePreview/PreviewContainer').default,
      FacebookPreview: require('./components/previews/FacebookPreview/FacebookPreview').default,
      TwitterPreview: require('./components/previews/TwitterPreview/TwitterPreview').default,
      MailingPreview: require('./components/previews/MailingPreview/MailingPreview').default,
    },
    views: {
      static: {
        Composition: require('./components/views/static/Composition').default,
        DecoratedComposition: require('./components/views/static/DecoratedComposition').default,
        ArticleTemplate: require('./components/views/static/ArticleTemplate').default,
        Colophon: require('./components/views/static/Colophon').default,
        Cover: require('./components/views/static/Cover').default,
        Toc: require('./components/views/static/Toc').default,
        StandaloneCover: require('./components/views/static/StandaloneCover').default,
      },
      dynamic: {
        ArticleTemplate: require('./components/views/dynamic/ArticleTemplate').default,
        FullscreenTemplate: require('./components/views/dynamic/FullscreenTemplate').default,
        Composition: require('./components/views/dynamic/Composition').default,
        Home: require('./components/views/dynamic/Home').default,
      },
      micro: {
        MicropublicationMail: require('./components/views/micro/MicropublicationMail').default,
      }
    },
    renderer: require('./components/renderers/Renderer.js'),
  },
  constants: require('./constants').default
};
