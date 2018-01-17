'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp; /**
                    * A simple preview container simulating dynamic app routing with a state machine
                    */

/* eslint react/no-set-state : 0 */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDimensions = require('react-dimensions');

var _reactDimensions2 = _interopRequireDefault(_reactDimensions);

var _Home = require('../../views/dynamic/Home');

var _Home2 = _interopRequireDefault(_Home);

var _Composition = require('../../views/dynamic/Composition');

var _Composition2 = _interopRequireDefault(_Composition);

var _WebNotePointerPointer = require('../../views/dynamic/WebNotePointerPointer');

var _WebNotePointerPointer2 = _interopRequireDefault(_WebNotePointerPointer);

var _WebNoteContentPointer = require('../../views/dynamic/WebNoteContentPointer');

var _WebNoteContentPointer2 = _interopRequireDefault(_WebNoteContentPointer);

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
        NotePointerPointer: _this.props.NotePointerPointer || _WebNotePointerPointer2.default,
        NoteContentPointer: _this.props.NoteContentPointer || _WebNoteContentPointer2.default,
        Link: _this.props.Link || _this.Link
      };
    };

    _this.Link = function (_ref) {
      var to = _ref.to,
          children = _ref.children;

      var onClick = function onClick() {
        var index = to.index,
            view = to.view,
            parameters = to.parameters;

        _this.setLocation(view, index, parameters);
      };
      return _react2.default.createElement(
        'button',
        { onClick: onClick },
        children
      );
    };

    _this.setLocation = function (location, locationIndex, locationParameters) {
      _this.setState({ location: location, locationIndex: locationIndex, locationParameters: locationParameters });
    };

    _this.renderView = function () {
      var _this$props = _this.props,
          resources = _this$props.resources,
          assets = _this$props.assets,
          montage = _this$props.montage,
          compositions = _this$props.compositions;
      var _this$state = _this.state,
          locationIndex = _this$state.locationIndex,
          locationParameters = _this$state.locationParameters;


      switch (_this.state.location) {
        case 'home':
          return _react2.default.createElement(_Home2.default, {
            compositions: compositions,
            montage: montage });
        case 'composition':
          // const composition = compositions[montage.data.compositions[+locationIndex].target_composition_id];
          var thatComposition = compositions.find(function (composition) {
            return composition._id === montage.data.compositions[+locationIndex].target_composition_id;
          });
          return _react2.default.createElement(_Composition2.default, {
            parameters: locationParameters,
            compositions: compositions,
            composition: thatComposition,
            resources: resources,
            montage: montage,
            assets: assets });

        default:
          return null;
      }
    };

    _this.computeClass = function (width) {
      if (width <= 768) {
        return 'mobile';
      } else if (width <= 1024) {
        return 'tablet';
      } else if (width <= 1216) {
        return 'widescreen';
      } else {
        return 'fullhd';
      }
    };

    _this.state = {
      location: 'home'
    };
    return _this;
  }

  _createClass(PreviewContainer, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          assets = _props.assets,
          compositions = _props.compositions,
          resources = _props.resources,
          montage = _props.montage,
          containerHeight = _props.containerHeight,
          containerWidth = _props.containerWidth,
          renderView = this.renderView,
          computeClass = this.computeClass;

      var className = computeClass(containerWidth, containerHeight);
      if (assets && compositions && resources && montage) {
        return _react2.default.createElement(
          'section',
          { className: className },
          _react2.default.createElement(
            'section',
            null,
            renderView()
          ),
          _react2.default.createElement(
            'style',
            null,
            montage.data.css.shared_css_code,
            montage.data.css.web_css_code
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

  NotePointerPointer: _propTypes2.default.func,
  NoteContentPointer: _propTypes2.default.func,
  Link: _propTypes2.default.func
}, _temp);
exports.default = (0, _reactDimensions2.default)()(PreviewContainer);