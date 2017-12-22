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
  var link = _ref.montage.data.link,
      _ref$composition$meta = _ref.composition.metadata,
      title = _ref$composition$meta.title,
      creators = _ref$composition$meta.creators,
      abstractImageUri = _ref.assets.abstractImageUri,
      profileImageUri = _ref.profileImageUri;

  var text = makeText(title, link, creators);
  var registeredMedia = abstractImageUri ? [{
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
  }] : [];
  var tweetData = {
    // id_str: 'xxxxx',
    user: {
      name: 'Plurishing',
      screen_name: 'plurishing',
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
    { className: 'plurishing-backoffice-TwitterPreview' },
    _react2.default.createElement(_reactTweet2.default, {
      data: tweetData,
      linkProps: linkProps })
  );
};