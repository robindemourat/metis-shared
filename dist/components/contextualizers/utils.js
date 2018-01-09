'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


/**
 * @param {object} resource
 * @param {array} rule - set of resource data to check
 * @param {object} assets - map of assets
 */
var pickAsset = exports.pickAsset = function pickAsset(resource, rule, assets) {
  var i = 0;
  while (i < rule.length) {
    var candidate = rule[i];
    if (candidate.indexOf('_asset_id') === -1) {
      return {
        resourceDataField: candidate,
        asset: null
      };
    } else if (resource.data[candidate] && assets[resource.data[candidate]]) {
      return {
        resourceDataField: candidate,
        asset: assets[resource.data[candidate]]
      };
    }
    i++;
  }
  return undefined;
};

/**
 * @param {object} sub - subset object of a resource
 * @param {array} rule - set of resource data to check
 * @param {object} assets - map of assets
 */
var pickSubAsset = exports.pickSubAsset = function pickSubAsset(sub, rule, assets) {
  var i = 0;
  while (i < rule.length - 1) {
    var candidate = rule[i];
    if (sub[candidate] && assets[sub[candidate]]) {
      return {
        resourceDataField: candidate,
        asset: assets[sub[candidate]]
      };
    }
    i++;
  }
  return undefined;
};