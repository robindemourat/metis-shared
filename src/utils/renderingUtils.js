import {resourceToCslJSON} from './assetsUtils';
import constants from '../constants';
const {draftEntitiesNames: INLINE_ASSET} = constants;

export const makeAssets = (props) => {
    const {
      composition: {
        contextualizations,
        contextualizers,
      },
      resources,
    } = props;

    /*
     * Resource Assets preparation
     */
    const assets = Object.keys(contextualizations)
    .reduce((ass, id) => {
      const contextualization = contextualizations[id];
      const contextualizer = contextualizers[contextualization.contextualizerId];
      const resource = resources.find(r => contextualization.resourceId === r._id);
      if (resource) {
        return {
          ...ass,
          [id]: {
            ...contextualization,
            resource,
            contextualizer,
            type: contextualizer ? contextualizer.type : INLINE_ASSET
          }
        };
      }
      return ass;
    }, {});
    return assets;
  };


export const makeCitationData = (props, assets) => {
    const {
      resources,
      composition
    } = props;
    const {
      contextualizations,
      contextualizers
    } = composition;

    /*
     * Citations preparation
     */
    // isolate bib contextualizations
    const bibContextualizations = Object.keys(assets)
    .map(assetKey => assets[assetKey]);

    // build citations items data
    const citationItems = bibContextualizations
      .reduce((finalCitations, asset) => {
        return {
          ...finalCitations,
          [resourceToCslJSON(asset.resource).id]: resourceToCslJSON(asset.resource),
        };
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
    const citationInstances = bibContextualizations // Object.keys(bibContextualizations)
      .map((bibCit, index) => {
        const key1 = bibCit.id;
        const contextualization = contextualizations[key1];

        const contextualizer = contextualizers[contextualization.contextualizerId];
        const resource = resources.find(r => r._id === contextualization.resourceId);
        return {
          citationID: key1,
          citationItems: [{
            id: resourceToCslJSON(resource).id,
            locator: contextualizer.locator,
            prefix: contextualizer.prefix,
            suffix: contextualizer.suffix,
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
    const citationData = citationInstances.map((instance, index) => [
      instance,
      // citations before
      citationInstances.slice(0, (index === 0 ? 0 : index))
        .map((oCitation) => [
            oCitation.citationID,
            oCitation.properties.noteIndex
          ]
        ),
      []
      // citations after (not using it seems to work anyway)
      // citationInstances.slice(index)
      //   .map((oCitation) => [
      //       oCitation.citationID,
      //       oCitation.properties.noteIndex
      //     ]
      //   ),
    ]);

    return {
      citationData,
      citationItems,
      assets
    };
  };
