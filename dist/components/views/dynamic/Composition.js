'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactCiteproc = require('react-citeproc');

var _ArticleTemplate = require('./ArticleTemplate');

var _ArticleTemplate2 = _interopRequireDefault(_ArticleTemplate);

var _FullscreenTemplate = require('./FullscreenTemplate');

var _FullscreenTemplate2 = _interopRequireDefault(_FullscreenTemplate);

var _Nav = require('./Nav');

var _Nav2 = _interopRequireDefault(_Nav);

var _renderingUtils = require('../../../utils/renderingUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DynamicComposition = (_temp = _class = function (_Component) {
  _inherits(DynamicComposition, _Component);

  function DynamicComposition(props) {
    _classCallCheck(this, DynamicComposition);

    var _this = _possibleConstructorReturn(this, (DynamicComposition.__proto__ || Object.getPrototypeOf(DynamicComposition)).call(this, props));

    _this.getChildContext = function () {
      return {
        citationItems: _this.state.citationItems
      };
    };

    var assets = (0, _renderingUtils.makeAssets)(props);

    var _makeCitationData = (0, _renderingUtils.makeCitationData)(props, assets),
        citationData = _makeCitationData.citationData,
        citationItems = _makeCitationData.citationItems;

    _this.state = {
      assets: assets,
      citationData: citationData,
      citationItems: citationItems
    };
    return _this;
  }

  _createClass(DynamicComposition, [{
    key: 'componentWillReceiveProps',


    /**
     * Executes code when component receives new properties
     * @param {object} nextProps - the future properties of the component
     */
    value: function componentWillReceiveProps(nextProps) {

      if (this.props.composition._id !== nextProps.composition._id || this.props.composition.contextualizations !== nextProps.composition.contextualizations || this.props.composition.contextualizers !== nextProps.composition.contextualizers || this.props.composition.resources !== nextProps.composition.resources) {

        var assets = (0, _renderingUtils.makeAssets)(nextProps);

        var _makeCitationData2 = (0, _renderingUtils.makeCitationData)(nextProps, assets),
            citationData = _makeCitationData2.citationData,
            citationItems = _makeCitationData2.citationItems;

        this.setState({ /* eslint react/no-set-state : 0 */
          assets: assets,
          citationData: citationData,
          citationItems: citationItems
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          parameters = _props.parameters,
          composition = _props.composition,
          compositions = _props.compositions,
          montage = _props.montage,
          assets = _props.assets,
          resources = _props.resources,
          _state = this.state,
          citationData = _state.citationData,
          citationItems = _state.citationItems,
          _context = this.context,
          citationStyle = _context.citationStyle,
          citationLocale = _context.citationLocale,
          renderingMode = _context.renderingMode;


      var TemplateComponent = null;
      switch (parameters.template) {
        case 'article':
          TemplateComponent = _ArticleTemplate2.default;
          break;
        case 'fullscreen':
          TemplateComponent = _FullscreenTemplate2.default;
          break;
        default:
          break;
      }
      var resourcesMap = resources.reduce(function (t, r) {
        return _extends({}, t, _defineProperty({}, r._id, r));
      }, {});
      var assetsMap = assets.reduce(function (t, a) {
        return _extends({}, t, _defineProperty({}, a._id, a));
      }, {});
      return _react2.default.createElement(
        'div',
        { className: 'metis-DynamicMontageSection dynamic-composition ' + parameters.template, id: 'composition-' + composition._id },
        _react2.default.createElement(
          'aside',
          { className: 'aside-menu' },
          _react2.default.createElement(_Nav2.default, { montage: montage, compositions: compositions })
        ),
        _react2.default.createElement(
          'section',
          { className: 'main-content-container' },
          _react2.default.createElement(
            _reactCiteproc.ReferencesManager,
            {
              style: citationStyle,
              locale: citationLocale,
              items: citationItems,
              citations: citationData },
            TemplateComponent && _react2.default.createElement(TemplateComponent, {
              parameters: parameters,
              composition: composition,
              assets: assetsMap,
              resources: resourcesMap }),
            _react2.default.createElement(
              'style',
              null,
              montage.data.css.shared_css_code,
              montage.data.css[renderingMode + '_css_code'],
              parameters.css.shared_css_code,
              parameters.css[renderingMode + '_css_code']
            )
          )
        )
      );
    }
  }]);

  return DynamicComposition;
}(_react.Component), _class.contextTypes = {
  citationStyle: _propTypes2.default.string,
  citationLocale: _propTypes2.default.string,
  renderingMode: _propTypes2.default.string
}, _class.childContextTypes = {
  citationItems: _propTypes2.default.object
}, _temp);
exports.default = DynamicComposition;