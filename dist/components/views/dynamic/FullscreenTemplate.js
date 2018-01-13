'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Renderer = require('../../renderers/Renderer');

var _Renderer2 = _interopRequireDefault(_Renderer);

var _reactDimensions = require('react-dimensions');

var _reactDimensions2 = _interopRequireDefault(_reactDimensions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import './FullscreenTemplate.scss';

// component must be statefull to be enhanced with Dimensions HOC because it gives it refs
var FigureWrapper = function (_Component) {
  _inherits(FigureWrapper, _Component);

  function FigureWrapper() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, FigureWrapper);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FigureWrapper.__proto__ || Object.getPrototypeOf(FigureWrapper)).call.apply(_ref, [this].concat(args))), _this), _this.shouldComponentUpdate = function () {
      return true;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  } /* eslint react/prefer-stateless-function : 0 */

  _createClass(FigureWrapper, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          containerWidth = _props.containerWidth,
          containerHeight = _props.containerHeight,
          children = _props.children;


      return _react2.default.createElement(
        'section',
        {
          className: 'figure-wrapper',
          style: {
            width: containerWidth,
            height: containerHeight
          } },
        children
      );
    }
  }]);

  return FigureWrapper;
}(_react.Component);

var EnhancedFigureWrapper = (0, _reactDimensions2.default)()(FigureWrapper);

var FullscreenTemplate = function FullscreenTemplate(_ref2) {
  var composition = _ref2.composition,
      renderingMode = _ref2.renderingMode,
      assets = _ref2.assets,
      resources = _ref2.resources;

  // just keep the first block contextualization
  var filteredContents = _extends({}, composition.contents, {
    blocks: [composition.contents.blocks.find(function (block) {
      return block.type === 'atomic';
    })]
  });
  return _react2.default.createElement(
    'div',
    { className: 'plurishing-FullscreenTemplate' },
    _react2.default.createElement(
      'h2',
      null,
      composition.metadata.title
    ),
    _react2.default.createElement(
      'section',
      { className: 'figure-container' },
      _react2.default.createElement(
        EnhancedFigureWrapper,
        null,
        _react2.default.createElement(_Renderer2.default, {
          raw: filteredContents,
          renderingMode: renderingMode,
          contextualizations: composition.contextualizations,
          contextualizers: composition.contextualizers,
          resources: resources,
          assets: assets })
      )
    )
  );
};

exports.default = FullscreenTemplate;