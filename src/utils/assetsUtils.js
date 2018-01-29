

import Cite from 'citation-js';


/**
 * Converts bibtex data to csl-json in a secure way
 * (if not splitting all the refs in separate objects,
 * a single error blows the whole conversion process with citation-js.
 * This is a problem as for instance zotero bibTeX output
 * generates a lot of errors as it is not standard bibTeX).
 * @todo: comply to zotero-flavoured & mendeley-flavoured bibtex formatting
 * (see https://github.com/citation-style-language/schema/wiki/Data-Model-and-Mappings)
 * @param {string} str - input bibTeX-formatted string
 * @return {array} references - a list of csl-json formatted references
 */
export function parseBibTeXToCSLJSON (str) {
  // forcing references separation to parse a maximum of references, even with shitty formatting
  const refs = str.split('\n\n');
  return refs.reduce((result, ref) => {
    return [
      ...result,
      ...new Cite(ref).get({
        type: 'json',
        style: 'csl'
      })
    ];
  }, []);
}


export const resourceToCslJSON = resource => {

  const type = resource.metadata.resource_type;
  let cslType;
  if (type === 'bib') {
    return resource.data;
  }
  switch (type) {
    case 'video':
      cslType = 'broadcast';
      break;
    case 'data-presentation':
      cslType = 'dataset';
      break;
    case 'webpage':
      cslType = 'webpage';
      break;
    case 'table':
      cslType = 'dataset';
      break;
    case 'image':
    case 'imagegallery':
      cslType = 'graphic';
      break;
    default:
      cslType = 'misc';
      break;
  }
  return {
    type: cslType,
    title: resource.metadata.title || resource.metadata.name,
    id: resource._id,
    abstract: resource.metadata.description,
    issued: resource.metadata.date && {raw: resource.metadata.date},
    URL: resource.metadata.url  || resource.data.url,
    author: (
              resource.metadata.creators &&
              Array.isArray(resource.metadata.creators) &&
              resource.metadata.creators.map(author => {
                if (typeof author === 'string') {
                  return {family: author};
                }
                return author;
              })
            ) || []
  };
};
