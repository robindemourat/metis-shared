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

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
/**
 * This module provides a reusable Inline contextualization for the editor component
 * @module plurishing-backoffice/components/SectionEditor
 */

/**
 * InlineContainer class for building react component instances
 */
var InlineContainer = function (_Component) {
  _inherits(InlineContainer, _Component);

  /**
   * constructor
   * @param {object} props - properties given to instance at instanciation
   */
  function InlineContainer(props) {
    _classCallCheck(this, InlineContainer);

    return _possibleConstructorReturn(this, (InlineContainer.__proto__ || Object.getPrototypeOf(InlineContainer)).call(this, props));
  }

  /**
   * Defines whether the component should re-render
   * @param {object} nextProps - the props to come
   * @param {object} nextState - the state to come
   * @return {boolean} shouldUpdate - whether to update or not
   */


  _createClass(InlineContainer, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      // todo: optimize here
      return true;
    }

    /**
     * Renders the component
     * @return {ReactElement} component - the component
     */

  }, {
    key: 'render',
    value: function render() {
      var data = this.props.data,
          _context = this.context,
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

      if (!contextualizer || !resource || !contextualization) {
        return null;
      }

      var contextualizerModule = _contextualizers2.default[contextualizer.type];
      var ThatComponent = contextualizerModule && contextualizerModule.Inline;

      if (ThatComponent) {
        return _react2.default.createElement(ThatComponent, {
          resource: resource,
          contextualization: contextualization,
          contextualizer: contextualizer,
          renderingMode: renderingMode });
      }

      return null;
    }
  }]);

  return InlineContainer;
}(_react.Component);

/**
 * Component's properties types
 */


InlineContainer.propTypes = {
  /*
   * the asset to render
   */
  asset: _propTypes2.default.shape({
    resource: _propTypes2.default.object
  })
};

/**
 * Component's context used properties
 */
InlineContainer.contextTypes = {
  renderingMode: _propTypes2.default.string,
  contextualizations: _propTypes2.default.object,
  contextualizers: _propTypes2.default.object,
  resources: _propTypes2.default.object
};
exports.default = InlineContainer;