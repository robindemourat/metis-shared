

export default {
  components: {
    contextualizers: {

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
        ArticleTemplate: require('./components/views/static/ArticleTemplate').default,
        Colophon: require('./components/views/static/Colophon').default,
        Cover: require('./components/views/static/Cover').default,
        Toc: require('./components/views/static/Toc').default,
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
    }
  }
};
