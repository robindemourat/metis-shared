'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeCitationData = exports.makeAssets = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _assetsUtils = require('./assetsUtils');

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var INLINE_ASSET = _constants2.default.draftEntitiesNames;
var makeAssets = exports.makeAssets = function makeAssets(props) {
  var _props$composition = props.composition,
      contextualizations = _props$composition.contextualizations,
      contextualizers = _props$composition.contextualizers,
      resources = props.resources;

  /*
   * Resource Assets preparation
   */

  var assets = Object.keys(contextualizations).reduce(function (ass, id) {
    var contextualization = contextualizations[id];
    var contextualizer = contextualizers[contextualization.contextualizerId];
    var resource = resources.find(function (r) {
      return contextualization.resourceId === r._id;
    });
    if (resource) {
      return _extends({}, ass, _defineProperty({}, id, _extends({}, contextualization, {
        resource: resource,
        contextualizer: contextualizer,
        type: contextualizer ? contextualizer.type : INLINE_ASSET
      })));
    }
    return ass;
  }, {});
  return assets;
};

var makeCitationData = exports.makeCitationData = function makeCitationData(props, assets) {
  var resources = props.resources,
      composition = props.composition;
  var contextualizations = composition.contextualizations,
      contextualizers = composition.contextualizers;

  /*
   * Citations preparation
   */
  // isolate bib contextualizations

  var bibContextualizations = Object.keys(assets).map(function (assetKey) {
    return assets[assetKey];
  });

  // build citations items data
  var citationItems = bibContextualizations.reduce(function (finalCitations, asset) {
    return _extends({}, finalCitations, _defineProperty({}, (0, _assetsUtils.resourceToCslJSON)(asset.resource).id, (0, _assetsUtils.resourceToCslJSON)(asset.resource)));
    // const citations = resourceToCslJSON(asset.resource);
    // console.log(citations);
    // const newCitations = citations.reduce((final2, citation) => {
    //   return {
    //     ...final2,
    //     [citation.id]: citation
    //   };
    // }, {});
    // return {
    //   ...finalCitations,
    //   ...newCitations,
    // };
  }, {});

  // build citations's citations data
  var citationInstances = bibContextualizations // Object.keys(bibContextualizations)
  .map(function (bibCit, index) {
    var key1 = bibCit.id;
    var contextualization = contextualizations[key1];

    var contextualizer = contextualizers[contextualization.contextualizerId];
    var resource = resources.find(function (r) {
      return r._id === contextualization.resourceId;
    });
    return {
      citationID: key1,
      citationItems: [{
        id: (0, _assetsUtils.resourceToCslJSON)(resource).id,
        locator: contextualizer.locator,
        prefix: contextualizer.prefix,
        suffix: contextualizer.suffix
      }],
      // citationItems: resourceToCslJSON(resource).map(ref => ({
      //   locator: contextualizer.locator,
      //   prefix: contextualizer.prefix,
      //   suffix: contextualizer.suffix,
      //   // ...contextualizer,
      //   // id: ref.id,
      //   id: ref.id,
      // })),
      properties: {
        noteIndex: index + 1
      }
    };
  });
  // map them to the clumsy formatting needed by citeProc
  // todo: refactor the citationInstances --> citeProc-formatted data as a util
  var citationData = citationInstances.map(function (instance, index) {
    return [instance,
    // citations before
    citationInstances.slice(0, index === 0 ? 0 : index).map(function (oCitation) {
      return [oCitation.citationID, oCitation.properties.noteIndex];
    }), []
    // citations after (not using it seems to work anyway)
    // citationInstances.slice(index)
    //   .map((oCitation) => [
    //       oCitation.citationID,
    //       oCitation.properties.noteIndex
    //     ]
    //   ),
    ];
  });

  return {
    citationData: citationData,
    citationItems: citationItems,
    assets: assets
  };
};