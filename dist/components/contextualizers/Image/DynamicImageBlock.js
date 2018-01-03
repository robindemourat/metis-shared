'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp, _initialiseProps; /* eslint react/no-set-state : 0 */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

var _reactZoomableImage = require('react-zoomable-image');

var _reactZoomableImage2 = _interopRequireDefault(_reactZoomableImage);

var _reactDimensions = require('react-dimensions');

var _reactDimensions2 = _interopRequireDefault(_reactDimensions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var Zoomable = (0, _reactDimensions2.default)()(function (_ref) {
  var src = _ref.src,
      title = _ref.title,
      imageDimensions = _ref.imageDimensions,
      containerWidth = _ref.containerWidth,
      containerHeight = _ref.containerHeight;

  var _computeDimensions = computeDimensions(imageDimensions, {
    width: containerWidth,
    height: containerHeight
  }),
      dimensions = _computeDimensions.dimensions,
      ratio = _computeDimensions.ratio;

  if (imageDimensions.width * imageDimensions.height > containerWidth * containerHeight) {
    return _react2.default.createElement(_reactZoomableImage2.default, {
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
      } });
  } else {
    return _react2.default.createElement('img', {
      src: src,
      alt: title,
      style: {
        width: dimensions.width,
        height: dimensions.height
      } });
  }
});

var BlockDynamic = (_temp = _class = function (_Component) {
  _inherits(BlockDynamic, _Component);

  function BlockDynamic(props) {
    _classCallCheck(this, BlockDynamic);

    var _this = _possibleConstructorReturn(this, (BlockDynamic.__proto__ || Object.getPrototypeOf(BlockDynamic)).call(this, props));

    _initialiseProps.call(_this);

    _this.state = {
      modalIsOpen: false
    };
    return _this;
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
      var _props = this.props,
          assetUri = _props.assetUri,
          resource = _props.resource,
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
        _react2.default.createElement(
          _reactModal2.default,
          {
            isOpen: modalIsOpen,
            ariaHideApp: false,
            onRequestClose: toggleModal,
            style: {
              content: {
                background: 'rgba(0,0,0,0)',
                border: 'none'
              }
            } },
          _react2.default.createElement(Zoomable, {
            src: assetUri,
            title: resource.metadata.title,
            imageDimensions: {
              width: imageWidth,
              height: imageHeight
            } })
        )
      ) : null;
    }
  }]);

  return BlockDynamic;
}(_react.Component), _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.toggleModal = function (e) {
    if (e && typeof e.stopPropagation === 'function') {
      e.stopPropagation();
    }
    _this2.setState({
      modalIsOpen: !_this2.state.modalIsOpen
    });
  };

  this.updateImageDimensions = function (props) {
    var assetUri = _this2.props.assetUri;
    var resource = props.resource;


    if (assetUri && resource && resource.data) {

      var img = new Image();

      img.onload = function () {
        var imageHeight = img.height;
        var imageWidth = img.width;

        _this2.setState({
          imageHeight: imageHeight,
          imageWidth: imageWidth
        });
      };

      img.src = assetUri;
    }
  };
}, _temp);
exports.default = BlockDynamic;