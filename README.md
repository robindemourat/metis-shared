# metis-shared 

Collection of utilities and components being used accross the apps in the `metis` experiment.

## Installation

```sh
npm install metis-shared --save
```


## Tests

```sh
npm install
npm test
```

## Usage

The lib provides the following modules :

```js
{
  utils: { // utilitary pure functions
    parseBibTeXToCSLJSON, // transform bibtex data into a csl-json representation
    resourceToCslJSON // tranform metis-schema compliant resource into a csl-json representation
  },
  components: { // react components
    contextualizers: { // all the contextualizers modules
      image,
      imagesgallery,
      webpage,
      video,
      audio,
      table,
      mobiliscene,
      bib,
    },
    previews: {
      DynamicMontagePreview, // dynamic preview component (simulates the routes logic with its inner state)
      StaticMontagePreview, // static montage assemblage
      FacebookPreview, // facebook post simulation
      TwitterPreview, // tweet simumation
      MailingPreview, // mail preview wrapper
    },
    views: {
      static: {
        Composition, // composition component
        DecoratedComposition, // standalone comosition component to display in its own (e.g. in epub composition)
        ArticleTemplate, // static article template
        Colophon, // colophon component
        Cover, // cover component
        Toc, // table of content component
        StandaloneCover, // static cover to be displayed in its own (i.e. for epub cover generation)
      },
      dynamic: {
        ArticleTemplate, // dynamic article template
        FullscreenTemplate, // dynamic full screen template
        Composition, // dynamic composition
        Home, // dynamic main page
      },
      micro: {
        MicropublicationMail // micropublication mail component
      }
    }
    renderer // enhanced redraft renderer for draft-based content rendering
  },
  constants // various constants names (i.e. draft entities names)
}
```


### Note on contextualizers modules

Each contextualizer module :

* *must* expose a `meta` submodule, which is a json object describing parameters and properties of the contextualizer
* *must* expose a `Block` submodue, which is a react component handling block contextualizations
* *may* expose an `Inline` submodue, which is a react component handling inline contextualizations

The `meta` submodule *must* be structured as follows :

```js
{
  id: 'audio', // id of the contextualizer module
  accepts: ['audio'],// accepted ressources types
  assetPickingRules: { // rules for finding the right field to display one of the contextualizer's properties
    track: {// each key correspond to a specific contexualizer property
        // each key is an array of resources' data properties keys
        // the order of ids in the array defines a cascade to look into
        // for selecting the best available resource property to use for contextualization
      'web': ['audio_track_asset_id'],// rules for web rendering
      'micro': [], // rules for micropublication rendering
      'epub-fixed': ['audio_track_asset_id'], // rules for epub (fixed) rendering
      'pdf': [], // rules for pdf rendering
      'epub-reflowable': [] // rules for epub (reflowable) rendering
    }
  }
};

```

## Dependencies

- [axios](https://github.com/axios/axios): Promise based HTTP client for the browser and node.js
- [citation-js](https://github.com/larsgw/citation.js): Citation.js converts formats like BibTeX, Wikidata JSON and ContentMine JSON to CSL-JSON to convert to other formats like APA, Vancouver and back to BibTeX.
- [d3-dsv](https://github.com/d3/d3-dsv): A parser and formatter for delimiter-separated values, such as CSV and TSV
- [mime-types](https://github.com/jshttp/mime-types): The ultimate javascript content-type utility.
- [opentype.js](https://github.com/nodebox/opentype.js): OpenType font parser
- [oy-vey](https://github.com/oysterbooks/oy): React utilities for building server-side email templates.
- [parse-srt](https://github.com/MrSlide/parseSRT): Parse and convert SRT subtitles into JSON format.
- [react-citeproc](https://github.com/robindemourat/react-citeproc): react wrapping components for csl-based citations
- [react-dimensions](https://github.com/digidem/react-dimensions): React [higher-order component](https://gist.github.com/sebmarkbage/ef0bf1f338a7182b6775) to get dimensions of container
- [react-image-tiler](https://github.com/mike-douglas/react-image-tiler): A responsive image tiling component for React
- [react-images](https://github.com/jossmac/react-images): A simple, responsive lightbox component for displaying an array of images with React.js
- [react-media-player](https://github.com/souporserious/react-media-player): React media player.
- [react-modal](https://github.com/reactjs/react-modal): Accessible modal dialog component for React.JS
- [react-table](https://github.com/react-tools/react-table): A fast, lightweight, opinionated table and datagrid built on React
- [react-tweet](https://github.com/artnotfound/react-tweet): React.js component for rendering tweets as they are presented on Twitter.com
- [react-zoomable-image](https://github.com/ivtpz/react-zoomable-image): React component for zoomable images
- [redraft](https://github.com/lokiuz/redraft): Renders the result of Draft.js convertToRaw using provided callbacks, works well with React
- [three](https://github.com/mrdoob/three.js): JavaScript 3D library

## Dev Dependencies

- [@robindemourat/eslint-config](https://github.com/robindemourat/eslint-config): Just an eslint config.
- [@storybook/addon-actions](https://github.com/storybooks/storybook): Action Logger addon for storybook
- [@storybook/addon-links](https://github.com/storybooks/storybook): Story Links addon for storybook
- [@storybook/react](https://github.com/storybooks/storybook): Storybook for React: Develop React Component in isolation with Hot Reloading.
- [babel-cli](https://github.com/babel/babel/tree/master/packages): Babel command line.
- [babel-core](https://github.com/babel/babel/tree/master/packages): Babel compiler core.
- [babel-eslint](https://github.com/babel/babel-eslint): Custom parser for ESLint
- [babel-plugin-transform-class-properties](https://github.com/babel/babel/tree/master/packages): This plugin transforms static class properties as well as properties declared with the property initializer syntax
- [babel-plugin-transform-decorators](https://github.com/babel/babel/tree/master/packages): Compile class and object decorators to ES5
- [babel-plugin-transform-decorators-legacy](https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy): A plugin for Babel 6 that (mostly) replicates the old decorator behavior from Babel 5.
- [babel-plugin-transform-object-rest-spread](https://github.com/babel/babel/tree/master/packages): Compile object rest and spread to ES5
- [babel-preset-es2015](https://github.com/babel/babel/tree/master/packages): Babel preset for all es2015 plugins.
- [babel-preset-react](https://github.com/babel/babel/tree/master/packages): Babel preset for all React plugins.
- [babel-template](https://github.com/babel/babel/tree/master/packages): Generate an AST from a string template.
- [chai](https://github.com/chaijs/chai): BDD/TDD assertion library for node.js and the browser. Test framework agnostic.
- [css-loader](https://github.com/webpack/css-loader): css loader module for webpack
- [csscomb](https://github.com/csscomb/csscomb.js): CSS coding style formatter
- [del](https://github.com/sindresorhus/del): Delete files and folders
- [enzyme](https://github.com/airbnb/enzyme): JavaScript Testing utilities for React
- [eslint](https://github.com/eslint/eslint): An AST-based pattern checker for JavaScript.
- [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react): React specific linting rules for ESLint
- [gulp](https://github.com/gulpjs/gulp): The streaming build system
- [gulp-babel](https://github.com/babel/gulp-babel): Use next generation JavaScript, today
- [gulp-concat](https://github.com/contra/gulp-concat): Concatenates files
- [gulp-sass](https://github.com/dlmanning/gulp-sass): Gulp plugin for sass
- [gulp-uglify](https://github.com/terinjokes/gulp-uglify): Minify files with UglifyJS.
- [image-webpack-loader](https://github.com/tcoopman/image-webpack-loader): Image loader module for webpack
- [mocha](https://github.com/mochajs/mocha): simple, flexible, fun test framework
- [node-sass](https://github.com/sass/node-sass): Wrapper around libsass
- [pre-commit](https://github.com/observing/pre-commit): Automatically install pre-commit hooks for your npm modules.
- [raw-loader](https://github.com/webpack/raw-loader): raw loader module for webpack
- [react](https://github.com/facebook/react): React is a JavaScript library for building user interfaces.
- [react-addons-test-utils](https://github.com/facebook/react): This package provides the React TestUtils add-on.
- [react-dom](https://github.com/facebook/react): React package for working with the DOM.
- [sass-loader](https://github.com/webpack-contrib/sass-loader): Sass loader for webpack
- [script-loader](https://github.com/webpack-contrib/script-loader): script loader module for webpack
- [storybook](https://github.com/storybooks/storybook-package): Storybook&#39;s CLI - easiest method of adding storybook to your projects
- [style-loader](https://github.com/webpack/style-loader): style loader module for webpack
- [uglify-es](https://github.com/mishoo/UglifyJS2): JavaScript parser, mangler/compressor and beautifier toolkit for ES6+
- [uglifyjs-webpack-plugin](https://github.com/webpack-contrib/uglifyjs-webpack-plugin): UglifyJS plugin for webpack


## License

LGPL-3.0

CECCIL-C