

/**
 * @param {object} resource
 * @param {array} rule - set of resource data to check
 * @param {object} assets - map of assets
 */
export const pickAsset = (resource, rule, assets) => {
  let i = 0;
  while (i < rule.length - 1) {
    const candidate = rule[i];
    if (resource.data[candidate] && assets[resource.data[candidate]]) {
      return {
        resourceDataField: candidate,
        asset: assets[resource.data[candidate]]
      };
    }
    i++;
  }
  return undefined;
};
