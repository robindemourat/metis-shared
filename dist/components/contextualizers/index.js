'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Image = require('./Image');

var image = _interopRequireWildcard(_Image);

var _ImagesGallery = require('./ImagesGallery');

var imagesgallery = _interopRequireWildcard(_ImagesGallery);

var _Iframe = require('./Iframe');

var iframe = _interopRequireWildcard(_Iframe);

var _utils = require('./utils');

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = {
  image: image,
  imagesgallery: imagesgallery,
  iframe: iframe,
  utils: utils
};