'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTweet = require('react-tweet');

var _reactTweet2 = _interopRequireDefault(_reactTweet);

require('./TwitterPreview.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var TEXT_LIMIT = 280;

var makeText = function makeText(title, link, creators) {
  var creatorsStr = creators.reduce(function (str, creator, index) {
    return str + (creator.given ? creator.given : '') + (creator.given && creator.family ? ' ' : '') + (creator.family ? creator.family : '') + (index === creators.length - 1 ? '' : ' & ');
  }, '');

  var vals = [title, link, creatorsStr];
  var txt = '';
  vals.forEach(function (val) {
    if (val && (txt + ' ' + val).length <= TEXT_LIMIT) {
      txt += ' ' + val;
    }
  });
  return txt;
};

exports.default = function (_ref) {
  var _ref$montage$data = _ref.montage.data,
      link = _ref$montage$data.link,
      _ref$montage$data$att = _ref$montage$data.attached_assets,
      attachedAssets = _ref$montage$data$att === undefined ? [] : _ref$montage$data$att,
      _ref$composition$meta = _ref.composition.metadata,
      title = _ref$composition$meta.title,
      creators = _ref$composition$meta.creators,
      assets = _ref.assets,
      profileImageUri = _ref.profileImageUri;
  var abstractImageUri = assets.abstractImageUri;

  var text = makeText(title, link, creators);
  var registeredMedia = attachedAssets.map(function (citation) {
    var imageAssetId = citation.image_asset_id;

    if (assets[imageAssetId]) {
      var base64 = assets[imageAssetId];
      return {
        id: 'xxx',
        id_str: 'xxxx',
        indices: [240, 280],
        media_url: base64,
        media_url_https: '',
        url: '',
        display_url: '',
        expanded_url: '',
        type: 'photo',
        sizes: {
          medium: {
            w: 600,
            h: 426,
            resize: 'fit'
          },
          large: {
            w: 1024,
            h: 727,
            resize: 'fit'
          },
          thumb: {
            w: 150,
            h: 150,
            resize: 'crop'
          },
          small: {
            w: 340,
            h: 241,
            resize: 'fit'
          }
        }
      };
    }
  }).filter(function (a) {
    return a;
  });
  if (abstractImageUri) {
    registeredMedia = [{
      id: 'xxx',
      id_str: 'xxxx',
      indices: [240, 280],
      media_url: abstractImageUri,
      media_url_https: '',
      url: '',
      display_url: '',
      expanded_url: '',
      type: 'photo',
      sizes: {
        medium: {
          w: 600,
          h: 426,
          resize: 'fit'
        },
        large: {
          w: 1024,
          h: 727,
          resize: 'fit'
        },
        thumb: {
          w: 150,
          h: 150,
          resize: 'crop'
        },
        small: {
          w: 340,
          h: 241,
          resize: 'fit'
        }
      }
    }].concat(_toConsumableArray(registeredMedia));
  }
  var tweetData = {
    // id_str: 'xxxxx',
    user: {
      name: 'Metis',
      screen_name: 'metis',
      profile_image_url: profileImageUri
    },
    text: text,
    created_at: new Date().getTime(),
    favorite_count: '0',
    retweet_count: '0',
    entities: {
      media: registeredMedia,
      urls: [],
      user_mentions: [],
      hashtags: [],
      symbols: []
    }
  };
  var linkProps = { target: '_blank', rel: 'noreferrer' };

  return _react2.default.createElement(
    'div',
    { className: 'metis-backoffice-TwitterPreview' },
    _react2.default.createElement(_reactTweet2.default, {
      data: tweetData,
      linkProps: linkProps })
  );
};