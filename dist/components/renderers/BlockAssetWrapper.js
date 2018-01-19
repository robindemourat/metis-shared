'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _contextualizers = require('../contextualizers');

var _contextualizers2 = _interopRequireDefault(_contextualizers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This module exports a stateless reusable block asset wrapper component
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * It handles the connection to context's data and builds proper data to render the asset
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * ============
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var BlockAssetWrapper = function (_Component) {
  _inherits(BlockAssetWrapper, _Component);

  function BlockAssetWrapper(props) {
    _classCallCheck(this, BlockAssetWrapper);

    return _possibleConstructorReturn(this, (BlockAssetWrapper.__proto__ || Object.getPrototypeOf(BlockAssetWrapper)).call(this, props));
  }

  _createClass(BlockAssetWrapper, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      // if(
      //   this.props.data !== nextProps.data ||
      //   this.context.story !== nextContext.story ||
      //   // this.context.dimensions.width !== nextContext.dimensions.width ||
      //   // this.context.dimensions.height !== nextContext.dimensions.height
      // ) {
      //   return true;
      // }
      return true;
    }
  }, {
    key: 'render',
    value: function render() {
      var data = this.props.data,
          _context = this.context,
          bindBlockContextualization = _context.bindBlockContextualization,
          renderingMode = _context.renderingMode,
          contextualizations = _context.contextualizations,
          contextualizers = _context.contextualizers,
          resources = _context.resources;


      var assetId = data.asset.id;

      var contextualization = contextualizations[assetId];
      if (!contextualization) {
        return null;
      }
      var contextualizer = contextualizers[contextualization.contextualizerId];
      var resource = resources[contextualization.resourceId];

      if (!contextualizer || !resource) {
        return null;
      }

      var contextualizerModule = _contextualizers2.default[contextualizer.type];
      var Block = contextualizerModule && contextualizerModule.Block;

      var bindRef = function bindRef(component) {
        if (typeof bindBlockContextualization === 'function') {
          bindBlockContextualization(assetId, component);
        }
      };

      if (contextualization && Block) {
        return _react2.default.createElement(
          'figure',
          {
            ref: bindRef,
            className: 'BlockAssetWrapper ' + contextualizer.type,
            style: {
              // minHeight: (contextualizer.type === 'data-presentation' || contextualizer.type === 'dicto' ) ? dimensions.height : '',
              // height: (contextualizer.type === 'data-presentation' || contextualizer.type === 'dicto' ) ? dimensions.height : '',
              position: 'relative'
              // left: fixed ? dimensions && dimensions.position && dimensions.position.left : undefined,
              // top: fixed ? dimensions && dimensions.position && dimensions.position.top : undefined,
              // width: fixed ? dimensions && dimensions.width : undefined,
              // // height: fixed ? dimensions.height : undefined,
              // border: fixed ? '5px solid #f32e36' : undefined,
            },
            id: assetId },
          _react2.default.createElement(Block, {
            resource: resource,
            contextualizer: contextualizer,
            contextualization: contextualization,
            renderingMode: renderingMode }),
          _react2.default.createElement(
            'figcaption',
            null,
            _react2.default.createElement(
              'h4',
              null,
              contextualization.title || resource.metadata.name
            ),
            _react2.default.createElement(
              'p',
              null,
              contextualization.legend || resource.metadata.description
            ),
            resource.metadata.creators && resource.metadata.creators.length ? _react2.default.createElement(
              'p',
              null,
              resource.metadata.creators.map(function (creator, index) {
                return _react2.default.createElement(
                  'i',
                  { key: index, className: 'creator' },
                  creator.given,
                  ' ',
                  creator.family
                );
              })
            ) : null
          )
        );
      } else {
        return null;
      }
    }
  }]);

  return BlockAssetWrapper;
}(_react.Component);
/**
 * Component's properties types
 */


BlockAssetWrapper.propTypes = {
  /**
   * Corresponds to the data initially embedded in a draft-js entity
   */
  data: _propTypes2.default.shape({
    asset: _propTypes2.default.shape({
      id: _propTypes2.default.string
    })
  })
};
/**
 * Component's context used properties
 */
BlockAssetWrapper.contextTypes = {

  /**
   * Dimensions of the wrapping element
   */
  dimensions: _propTypes2.default.object,

  bindBlockContextualization: _propTypes2.default.func,

  renderingMode: _propTypes2.default.string,
  contextualizations: _propTypes2.default.object,
  contextualizers: _propTypes2.default.object,
  resources: _propTypes2.default.object,
  assets: _propTypes2.default.object

};

exports.default = BlockAssetWrapper;