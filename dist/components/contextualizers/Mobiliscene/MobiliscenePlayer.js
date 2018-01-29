'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDimensions = require('react-dimensions');

var _reactDimensions2 = _interopRequireDefault(_reactDimensions);

var _axios = require('axios');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

global.THREE = require('three');
global.opentype = require('opentype.js');
var MobilizingLib = require('./vendor/mobilizing.js');
global.Mobilizing = MobilizingLib.Mobilizing ? MobilizingLib.Mobilizing : MobilizingLib;
var mobiliscene = require('./mobiliscene');

var MobiliscenePlayer = function (_Component) {
  _inherits(MobiliscenePlayer, _Component);

  function MobiliscenePlayer(props) {
    _classCallCheck(this, MobiliscenePlayer);

    var _this = _possibleConstructorReturn(this, (MobiliscenePlayer.__proto__ || Object.getPrototypeOf(MobiliscenePlayer)).call(this, props));

    _this.resolveDependencies = function (data, assetUri) {
      return new Promise(function (resolve, reject) {
        // get text
        if (data.content_type === 'text') {
          (0, _axios.get)(assetUri).then(function (resp) {
            var content = resp.data;
            resolve(_extends({}, data, {
              content: content
            }));
          }).catch(reject);
        } else {
          resolve(data);
        }
      });
    };

    _this.initMobiliscene = function () {
      var _this$props = _this.props,
          data = _this$props.resource.data,
          assetUri = _this$props.assetUri,
          fontUri = _this$props.fontUri;


      _this.resolveDependencies(data, assetUri).then(function (finalData) {
        _this.mobilizing = new Mobilizing.Context(); /* eslint no-undef : 0 */
        var s = new mobiliscene(_this.canvas, finalData, assetUri, fontUri);
        _this.mobilizing.addComponent(s);
        _this.runner = new Mobilizing.Runner({ context: _this.mobilizing }); /* eslint no-undef : 0 */
      }).catch();
    };

    _this.unloadMobiliscene = function () {
      _this.runner = null;
      // this.mobilizing._components.forEach(component => {
      //   component = null;
      // });
      _this.mobilizing._components = [];
      _this.mobilizing = null;
    };

    return _this;
  }

  _createClass(MobiliscenePlayer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.initMobiliscene();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      if (this.props.resource._id !== nextProps.resource._id) {
        this.unloadMobiliscene();
        setTimeout(function () {
          return _this2.initMobiliscene();
        }, 500);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unloadMobiliscene();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          containerWidth = _props.containerWidth,
          containerHeight = _props.containerHeight;

      var bindCanvas = function bindCanvas(canvas) {
        _this3.canvas = canvas;
      };
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('canvas', {
          ref: bindCanvas,
          width: containerWidth,
          height: containerHeight,
          style: { width: containerWidth, height: containerHeight } })
      );
    }
  }]);

  return MobiliscenePlayer;
}(_react.Component);

exports.default = (0, _reactDimensions2.default)()(MobiliscenePlayer);