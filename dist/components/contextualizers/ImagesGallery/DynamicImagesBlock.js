'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactImages = require('react-images');

var _reactImages2 = _interopRequireDefault(_reactImages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint react/no-set-state : 0 */
/* eslint  no-new-func : 0 */


var isBrowser = new Function('try {return this===window;}catch(e){ return false;}');
var inBrowser = isBrowser();

var Block = function (_Component) {
  _inherits(Block, _Component);

  function Block(props) {
    _classCallCheck(this, Block);

    var _this = _possibleConstructorReturn(this, (Block.__proto__ || Object.getPrototypeOf(Block)).call(this, props));

    _this.setCurrentImage = function (currentImage) {
      _this.setState({
        currentImage: currentImage
      });
    };

    _this.nextImage = function () {
      var currentImage = _this.state.currentImage;

      var newImage = currentImage + 1 > _this.props.resource.data.length - 1 ? 0 : currentImage + 1;
      _this.setState({
        currentImage: newImage
      });
    };

    _this.previousImage = function () {
      var currentImage = _this.state.currentImage;

      var newImage = currentImage - 1 < 0 ? _this.props.resource.data.length - 1 : currentImage - 1;
      _this.setState({
        currentImage: newImage
      });
    };

    _this.onOpenLightBox = function () {
      _this.setState({
        currentImage: 0,
        lightBoxOpen: true
      });
    };

    _this.onCloseLightBox = function () {
      _this.setState({
        lightBoxOpen: false
      });
    };

    _this.state = {
      currentImage: 0,
      lightBoxOpen: false
    };
    return _this;
  }

  _createClass(Block, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          resource = _props.resource,
          getAppropriateAssetUri = _props.getAppropriateAssetUri,
          _state = this.state,
          _state$currentImage = _state.currentImage,
          currentImage = _state$currentImage === undefined ? 0 : _state$currentImage,
          lightBoxOpen = _state.lightBoxOpen,
          nextImage = this.nextImage,
          previousImage = this.previousImage,
          onOpenLightBox = this.onOpenLightBox,
          onCloseLightBox = this.onCloseLightBox,
          setCurrentImage = this.setCurrentImage;


      var images = resource.data && resource.data.map(function (image) {
        return {
          src: getAppropriateAssetUri(image)
        };
      });

      return inBrowser ? _react2.default.createElement(
        'figure',
        null,
        _react2.default.createElement('img', {
          src: images[currentImage].src,
          onClick: onOpenLightBox }),
        _react2.default.createElement(
          'ul',
          null,
          images.map(function (image, index) {
            var active = index === currentImage;
            var onThisClick = function onThisClick() {
              return setCurrentImage(index);
            };
            return _react2.default.createElement(
              'li',
              { key: index },
              _react2.default.createElement(
                'button',
                { onClick: onThisClick, className: 'imageButton ' + (active ? 'active' : '') },
                index + 1
              )
            );
          })
        ),
        _react2.default.createElement(_reactImages2.default, {
          images: images,
          isOpen: lightBoxOpen,
          currentImage: currentImage,
          onClickPrev: previousImage,
          onClickNext: nextImage,
          onClose: onCloseLightBox })
      ) : _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('img', { src: images[currentImage].src })
      );
    }
  }]);

  return Block;
}(_react.Component);

exports.default = Block;