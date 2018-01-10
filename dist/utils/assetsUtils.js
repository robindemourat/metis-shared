'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseBibTeXToCSLJSON = parseBibTeXToCSLJSON;

var _citationJs = require('citation-js');

var _citationJs2 = _interopRequireDefault(_citationJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
function parseBibTeXToCSLJSON(str) {
  // forcing references separation to parse a maximum of references, even with shitty formatting
  var refs = str.split('\n\n');
  return refs.reduce(function (result, ref) {
    return [].concat(_toConsumableArray(result), _toConsumableArray(new _citationJs2.default(ref).get({
      type: 'json',
      style: 'csl'
    })));
  }, []);
}