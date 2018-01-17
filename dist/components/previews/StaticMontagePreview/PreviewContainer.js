'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp; /**
                    * A simple preview container simulating dynamic app routing with a state machine
                    */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Cover = require('../../views/static/Cover');

var _Cover2 = _interopRequireDefault(_Cover);

var _Colophon = require('../../views/static/Colophon');

var _Colophon2 = _interopRequireDefault(_Colophon);

var _Composition = require('../../views/static/Composition');

var _Composition2 = _interopRequireDefault(_Composition);

var _Toc = require('../../views/static/Toc');

var _Toc2 = _interopRequireDefault(_Toc);

var _PdfLink = require('../../views/static/PdfLink');

var _PdfLink2 = _interopRequireDefault(_PdfLink);

var _PdfNotePointer = require('../../views/static/PdfNotePointer');

var _PdfNotePointer2 = _interopRequireDefault(_PdfNotePointer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PreviewContainer = (_temp = _class = function (_Component) {
  _inherits(PreviewContainer, _Component);

  function PreviewContainer(props) {
    _classCallCheck(this, PreviewContainer);

    var _this = _possibleConstructorReturn(this, (PreviewContainer.__proto__ || Object.getPrototypeOf(PreviewContainer)).call(this, props));

    _this.getChildContext = function () {
      return {
        getAssetUri: _this.props.getAssetUri,
        citationStyle: _this.props.citationStyle,
        citationLocale: _this.props.citationLocale,
        renderingMode: _this.props.renderingMode,
        Link: _this.props.Link || _PdfLink2.default,
        NotePointer: _this.props.NotePointer || _PdfNotePointer2.default
      };
    };

    return _this;
  }

  _createClass(PreviewContainer, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          montage = _props.montage,
          compositions = _props.compositions,
          resources = _props.resources,
          assets = _props.assets,
          renderingMode = _props.renderingMode;


      if (montage && compositions && resources && assets) {
        return _react2.default.createElement(
          'section',
          null,
          _react2.default.createElement(_Cover2.default, {
            background: montage.data.cover_color,
            title: montage.metadata.title }),
          _react2.default.createElement(_Toc2.default, { montage: montage, compositions: compositions }),
          montage.data.compositions.map(function (parameters, index) {
            var composition = compositions.find(function (c) {
              return c._id === parameters.target_composition_id;
            });
            if (!composition) {
              return null;
            }
            return _react2.default.createElement(_Composition2.default, {
              key: index,
              index: index,
              parameters: parameters,
              composition: composition,
              resources: resources,
              assets: assets,
              locationIndex: index });
          }),
          _react2.default.createElement(_Colophon2.default, { contents: montage.data.colophon }),
          _react2.default.createElement(
            'style',
            null,
            montage.data.css.shared_css_code,
            montage.data.css[renderingMode + '_css_code']
          )
        );
      }
      return null;
    }
  }]);

  return PreviewContainer;
}(_react.Component), _class.childContextTypes = {
  getAssetUri: _propTypes2.default.func,
  citationStyle: _propTypes2.default.string,
  citationLocale: _propTypes2.default.string,
  renderingMode: _propTypes2.default.string,
  Link: _propTypes2.default.func,
  NotePointer: _propTypes2.default.func
}, _temp);
exports.default = PreviewContainer;