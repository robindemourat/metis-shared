

export default {
  id: 'video',
  accepts: ['video'],
  assetPickingRules: {
    element: {
      'web': ['hd_video_asset_id', 'sd_video_asset_id'],
      'micro': ['rgb_image_asset_id', 'bw_image_asset_id'],
      'epub-fixed': ['sd_video_asset_id', 'rgb_image_asset_id', 'bw_image_asset_id'],
      'pdf': ['cmyb_image_asset_id', 'rgb_image_asset_id', 'bw_image_asset_id'],
      'epub-reflowable': ['bw_image_asset_id', 'rgb_image_asset_id']
    }
  }
};
