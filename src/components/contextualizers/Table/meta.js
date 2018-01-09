

export default {
  id: 'table',
  accepts: ['table'],
  assetPickingRules: {
    data: {
      'web': ['data_asset_id'],
      'micro': ['data_asset_id'],
      'epub-fixed': ['data_asset_id'],
      'pdf': ['data_asset_id'],
      'epub-reflowable': ['data_asset_id']
    }
  }
};
