

export default {
  id: 'iframe',
  accepts: ['iframe'],
  assetPickingRules: {
    element: {
      'web': ['url', 'backup_asset_id', 'screencast_video_asset_id', 'rgb_image_asset_id', 'bw_image_asset_id'],
      'micro': ['rgb_image_asset_id', 'bw_image_asset_id'],
      'epub-fixed': ['rgb_image_asset_id', 'bw_image_asset_id'],
      'pdf': ['cmyb_image_asset_id', 'rgb_image_asset_id', 'bw_image_asset_id'],
      'epub-reflowable': ['screencast_video_asset_id', 'bw_image_asset_id', 'rgb_image_asset_id']
    }
  }
};
