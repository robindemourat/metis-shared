'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp, _initialiseProps;

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

var _assetsUtils = require('../../../utils/assetsUtils');

var _constants = require('../../../constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var INLINE_ASSET = _constants2.default.draftEntitiesNames.INLINE_ASSET;
var DynamicComposition = (_temp = _class = function (_Component) {
  _inherits(DynamicComposition, _Component);

  function DynamicComposition(props) {
    _classCallCheck(this, DynamicComposition);

    var _this = _possibleConstructorReturn(this, (DynamicComposition.__proto__ || Object.getPrototypeOf(DynamicComposition)).call(this, props));

    _initialiseProps.call(_this);

    var assets = _this.makeAssets(props);

    var _this$makeCitationDat = _this.makeCitationData(props, assets),
        citationData = _this$makeCitationDat.citationData,
        citationItems = _this$makeCitationDat.citationItems;

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

        var assets = this.makeAssets(nextProps);

        var _makeCitationData = this.makeCitationData(nextProps, assets),
            citationData = _makeCitationData.citationData,
            citationItems = _makeCitationData.citationItems;

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
          _props$renderingMode = _props.renderingMode,
          renderingMode = _props$renderingMode === undefined ? 'web' : _props$renderingMode,
          _state = this.state,
          citationData = _state.citationData,
          citationItems = _state.citationItems,
          _context = this.context,
          citationStyle = _context.citationStyle,
          citationLocale = _context.citationLocale;


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
        null,
        _react2.default.createElement(_Nav2.default, { montage: montage, compositions: compositions }),
        _react2.default.createElement(
          _reactCiteproc.ReferencesManager,
          {
            style: citationStyle,
            locale: citationLocale,
            items: citationItems,
            citations: citationData },
          _react2.default.createElement(TemplateComponent, {
            parameters: parameters,
            composition: composition,
            assets: assetsMap,
            resources: resourcesMap,
            renderingMode: renderingMode }),
          _react2.default.createElement(
            'style',
            null,
            montage.data.css.shared_css_code,
            montage.data.css[renderingMode + '_css_code'],
            parameters.css.shared_css_code,
            parameters.css[renderingMode + '_css_code']
          )
        )
      );
    }
  }]);

  return DynamicComposition;
}(_react.Component), _class.contextTypes = {
  citationStyle: _propTypes2.default.string,
  citationLocale: _propTypes2.default.string
}, _class.childContextTypes = {
  citationItems: _propTypes2.default.object
}, _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.getChildContext = function () {
    return {
      citationItems: _this2.state.citationItems
    };
  };

  this.makeAssets = function (props) {
    var _props$composition = props.composition,
        contextualizations = _props$composition.contextualizations,
        contextualizers = _props$composition.contextualizers,
        resources = props.resources;

    /*
     * Resource Assets preparation
     */

    var assets = Object.keys(contextualizations).reduce(function (ass, id) {
      var contextualization = contextualizations[id];
      var contextualizer = contextualizers[contextualization.contextualizerId];
      var resource = resources.find(function (r) {
        return contextualization.resourceId === r._id;
      });
      if (resource) {
        return _extends({}, ass, _defineProperty({}, id, _extends({}, contextualization, {
          resource: resource,
          contextualizer: contextualizer,
          type: contextualizer ? contextualizer.type : INLINE_ASSET
        })));
      }
      return ass;
    }, {});
    return assets;
  };

  this.makeCitationData = function (props, assets) {
    var resources = props.resources,
        composition = props.composition;
    var contextualizations = composition.contextualizations,
        contextualizers = composition.contextualizers;

    /*
     * Citations preparation
     */
    // isolate bib contextualizations

    var bibContextualizations = Object.keys(assets).map(function (assetKey) {
      return assets[assetKey];
    });

    // build citations items data
    var citationItems = bibContextualizations.reduce(function (finalCitations, asset) {
      return _extends({}, finalCitations, _defineProperty({}, (0, _assetsUtils.resourceToCslJSON)(asset.resource).id, (0, _assetsUtils.resourceToCslJSON)(asset.resource)));
      // const citations = resourceToCslJSON(asset.resource);
      // console.log(citations);
      // const newCitations = citations.reduce((final2, citation) => {
      //   return {
      //     ...final2,
      //     [citation.id]: citation
      //   };
      // }, {});
      // return {
      //   ...finalCitations,
      //   ...newCitations,
      // };
    }, {});

    // build citations's citations data
    var citationInstances = bibContextualizations // Object.keys(bibContextualizations)
    .map(function (bibCit, index) {
      var key1 = bibCit.id;
      var contextualization = contextualizations[key1];

      var contextualizer = contextualizers[contextualization.contextualizerId];
      var resource = resources.find(function (r) {
        return r._id === contextualization.resourceId;
      });
      return {
        citationID: key1,
        citationItems: [{
          id: (0, _assetsUtils.resourceToCslJSON)(resource).id,
          locator: contextualizer.locator,
          prefix: contextualizer.prefix,
          suffix: contextualizer.suffix
        }],
        // citationItems: resourceToCslJSON(resource).map(ref => ({
        //   locator: contextualizer.locator,
        //   prefix: contextualizer.prefix,
        //   suffix: contextualizer.suffix,
        //   // ...contextualizer,
        //   // id: ref.id,
        //   id: ref.id,
        // })),
        properties: {
          noteIndex: index + 1
        }
      };
    });
    // map them to the clumsy formatting needed by citeProc
    // todo: refactor the citationInstances --> citeProc-formatted data as a util
    var citationData = citationInstances.map(function (instance, index) {
      return [instance,
      // citations before
      citationInstances.slice(0, index === 0 ? 0 : index).map(function (oCitation) {
        return [oCitation.citationID, oCitation.properties.noteIndex];
      }), []
      // citations after (not using it seems to work anyway)
      // citationInstances.slice(index)
      //   .map((oCitation) => [
      //       oCitation.citationID,
      //       oCitation.properties.noteIndex
      //     ]
      //   ),
      ];
    });

    return {
      citationData: citationData,
      citationItems: citationItems,
      assets: assets
    };
  };
}, _temp);
exports.default = DynamicComposition;