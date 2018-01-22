'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./FacebookPreview.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var assets = _ref.assets,
      _ref$montage$data = _ref.montage.data,
      includeAbstract = _ref$montage$data.include_abstract,
      montageUrl = _ref$montage$data.montage_url,
      _ref$montage$data$att = _ref$montage$data.attached_assets,
      attachedAssets = _ref$montage$data$att === undefined ? [] : _ref$montage$data$att,
      _ref$composition$meta = _ref.composition.metadata,
      title = _ref$composition$meta.title,
      abstractOriginal = _ref$composition$meta.abstract_original,
      profileImageUri = _ref.profileImageUri;

  return _react2.default.createElement(
    'div',
    { className: 'metis-backoffice-FacebookPreview' },
    _react2.default.createElement(
      'div',
      { className: 'header' },
      _react2.default.createElement(
        'div',
        { className: 'left' },
        _react2.default.createElement('img', { className: 'profile-image', src: profileImageUri })
      ),
      _react2.default.createElement(
        'div',
        { className: 'right' },
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'h3',
            { className: 'fb-important' },
            'Metis'
          ),
          _react2.default.createElement(
            'p',
            { className: 'post-info' },
            'Publi\xE9 par Michel \xB7 8 mars 2016 '
          )
        )
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'body' },
      _react2.default.createElement(
        'b',
        null,
        title
      ),
      _react2.default.createElement('br', null),
      includeAbstract && _react2.default.createElement(
        'p',
        null,
        abstractOriginal
      ),
      _react2.default.createElement(
        'p',
        null,
        montageUrl
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'images' },
      attachedAssets.map(function (citation) {
        var imageAssetId = citation.image_asset_id;

        return assets[imageAssetId];
      }).filter(function (a) {
        return a;
      }).map(function (base64, index) {
        return _react2.default.createElement('img', { key: index, src: base64 });
      })
    )
  );
};