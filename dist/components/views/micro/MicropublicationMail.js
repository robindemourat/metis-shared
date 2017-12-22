'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _oyVey = require('oy-vey');

var _oyVey2 = _interopRequireDefault(_oyVey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Table = _oyVey2.default.Table,
    TBody = _oyVey2.default.TBody,
    Tr = _oyVey2.default.TR,
    Td = _oyVey2.default.TD;

exports.default = function (_ref) {
  var _ref$montage$data = _ref.montage.data,
      includeAbstract = _ref$montage$data.include_abstract,
      montageUrl = _ref$montage$data.montage_url,
      _ref$composition$meta = _ref.composition.metadata,
      title = _ref$composition$meta.title,
      abstractOriginal = _ref$composition$meta.abstract_original;
  return _react2.default.createElement(
    Table,
    null,
    _react2.default.createElement(
      TBody,
      null,
      _react2.default.createElement(
        Tr,
        null,
        _react2.default.createElement(
          Td,
          { align: 'left' },
          _react2.default.createElement(
            'b',
            null,
            _react2.default.createElement(
              'a',
              { href: montageUrl },
              title
            )
          ),
          _react2.default.createElement('br', null),
          includeAbstract && _react2.default.createElement(
            'p',
            null,
            abstractOriginal
          )
        )
      )
    )
  );
};