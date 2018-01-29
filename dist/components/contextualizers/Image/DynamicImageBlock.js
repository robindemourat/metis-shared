'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _class, _temp, _initialiseProps;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

var _reactDimensions = require('react-dimensions');

var _reactDimensions2 = _interopRequireDefault(_reactDimensions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint react/no-set-state : 0 */
/* eslint  no-new-func : 0 */
/* eslint react/prefer-stateless-function : 0 */


var ZoomableImage = null;


var isBrowser = new Function('try {return this===window;}catch(e){ return false;}');
var inBrowser = isBrowser();

if (inBrowser) {
  ZoomableImage = require('react-zoomable-image').default;
}

var computeDimensions = function computeDimensions(imageDimensions, containerDimensions) {
  var dimensions = {
    width: 0,
    height: 0
  };
  // proportion relatively to height
  if (imageDimensions.width > imageDimensions.height) {
    dimensions.width = containerDimensions.width;
    dimensions.height = containerDimensions.width * imageDimensions.height / imageDimensions.width;
    // proportion relatively to width
  } else {
    dimensions.height = containerDimensions.height;
    dimensions.width = containerDimensions.height * imageDimensions.width / imageDimensions.height;
  }
  return {
    dimensions: dimensions,
    ratio: imageDimensions.width * imageDimensions.height / (containerDimensions.width * containerDimensions.height)
  };
};

var ZoomableComponent = function (_Component) {
  _inherits(ZoomableComponent, _Component);

  function ZoomableComponent() {
    _classCallCheck(this, ZoomableComponent);

    return _possibleConstructorReturn(this, (ZoomableComponent.__proto__ || Object.getPrototypeOf(ZoomableComponent)).apply(this, arguments));
  }

  _createClass(ZoomableComponent, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return true;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          src = _props.src,
          _props$title = _props.title,
          title = _props$title === undefined ? '' : _props$title,
          imageDimensions = _props.imageDimensions,
          containerWidth = _props.containerWidth,
          containerHeight = _props.containerHeight,
          className = _props.className,
          onClose = _props.onClose;

      var _computeDimensions = computeDimensions(imageDimensions, {
        width: containerWidth,
        height: containerHeight
      }),
          dimensions = _computeDimensions.dimensions,
          ratio = _computeDimensions.ratio;

      if (imageDimensions.width * imageDimensions.height > containerWidth * containerHeight) {
        return _react2.default.createElement(
          'div',
          { className: 'zoomable-wrapper' },
          _react2.default.createElement(ZoomableImage, {
            className: className,
            baseImage: {
              alt: title,
              src: src,
              width: dimensions.width,
              height: dimensions.height
            },
            largeImage: {
              alt: title,
              src: src,
              width: dimensions.width * ratio,
              height: dimensions.height * ratio
            },
            thumbnailImage: {
              alt: title,
              src: src
            } }),
          _react2.default.createElement(
            'button',
            { onClick: onClose, className: 'button close-zoomable' },
            '\u2715'
          )
        );
      } else {
        return _react2.default.createElement('img', {
          src: src,
          alt: title,
          style: {
            width: dimensions.width,
            height: dimensions.height
          } });
      }
    }
  }]);

  return ZoomableComponent;
}(_react.Component);

var Zoomable = (0, _reactDimensions2.default)()(ZoomableComponent);

var BlockDynamic = (_temp = _class = function (_Component2) {
  _inherits(BlockDynamic, _Component2);

  function BlockDynamic(props) {
    _classCallCheck(this, BlockDynamic);

    var _this2 = _possibleConstructorReturn(this, (BlockDynamic.__proto__ || Object.getPrototypeOf(BlockDynamic)).call(this, props));

    _initialiseProps.call(_this2);

    _this2.state = {
      modalIsOpen: false
    };
    return _this2;
  }

  _createClass(BlockDynamic, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.updateImageDimensions(this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.resource !== nextProps.resource) {
        this.updateImageDimensions(nextProps);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          assetUri = _props2.assetUri,
          resource = _props2.resource,
          _state = this.state,
          modalIsOpen = _state.modalIsOpen,
          imageHeight = _state.imageHeight,
          imageWidth = _state.imageWidth,
          toggleModal = this.toggleModal;


      return assetUri ? _react2.default.createElement(
        'figure',
        {
          className: 'peritext-contextualization peritext-contextualization-block peritext-contextualization-web peritext-contextualizer-image' },
        _react2.default.createElement('img', {
          src: assetUri,
          onClick: toggleModal }),
        inBrowser ? _react2.default.createElement(
          _reactModal2.default,
          {
            isOpen: modalIsOpen,
            ariaHideApp: false,
            onRequestClose: toggleModal,
            className: 'zoomable-image-container',
            style: {
              content: {
                background: 'rgba(0,0,0,0)',
                border: 'none'
              }
            } },
          _react2.default.createElement(Zoomable, {
            src: assetUri,
            title: resource.metadata.title,
            className: 'image-detail',
            onClose: toggleModal,
            imageDimensions: {
              width: imageWidth,
              height: imageHeight
            } }),
          _react2.default.createElement(
            'button',
            { className: 'close-zoomable', onClick: toggleModal },
            '\u2715'
          )
        ) : _react2.default.createElement('img', { src: assetUri })
      ) : null;
    }
  }]);

  return BlockDynamic;
}(_react.Component), _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.toggleModal = function (e) {
    if (e && typeof e.stopPropagation === 'function') {
      e.stopPropagation();
    }
    _this3.setState({
      modalIsOpen: !_this3.state.modalIsOpen
    });
  };

  this.updateImageDimensions = function (props) {
    var assetUri = _this3.props.assetUri;
    var resource = props.resource;


    if (inBrowser && assetUri && resource && resource.data) {

      var img = new Image();

      img.onload = function () {
        var imageHeight = img.height;
        var imageWidth = img.width;

        _this3.setState({
          imageHeight: imageHeight,
          imageWidth: imageWidth
        });
      };

      img.src = assetUri;
    }
  };
}, _temp);
exports.default = BlockDynamic;