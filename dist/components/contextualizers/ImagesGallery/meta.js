'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  id: 'imagesgallery',
  accepts: ['imagesgallery'],
  assetPickingRules: {
    image: {
      'web': ['rgb_image_asset_id', 'cmyb_image_asset_id'],
      'micro': ['rgb_image_asset_id', 'bw_image_asset_id'],
      'epub-fixed': ['rgb_image_asset_id', 'bw_image_asset_id'],
      'pdf': ['cmyb_image_asset_id', 'rgb_image_asset_id', 'bw_image_asset_id'],
      'epub-reflowable': ['bw_image_asset_id', 'rgb_image_asset_id']
    }
  }
};