'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  id: 'mobiliscene',
  accepts: ['mobiliscene'],
  assetPickingRules: {
    element: {
      'web': ['content_asset_id', 'screencast_video_asset_id', 'rgb_image_asset_id', 'bw_image_asset_id'],
      'epub-fixed': ['screencast_video_asset_id', 'rgb_image_asset_id', 'bw_image_asset_id'],
      'pdf': ['cmyb_image_asset_id', 'rgb_image_asset_id', 'bw_image_asset_id'],
      'epub-reflowable': ['bw_image_asset_id', 'rgb_image_asset_id'],
      'micro': ['rgb_image_asset_id', 'bw_image_asset_id']
    }
  }
};