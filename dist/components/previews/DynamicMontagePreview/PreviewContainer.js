'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Home = require('../../views/dynamic/Home');

var _Home2 = _interopRequireDefault(_Home);

var _Composition = require('../../views/dynamic/Composition');

var _Composition2 = _interopRequireDefault(_Composition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * A simple preview container simulating dynamic app routing with a state machine
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/* eslint react/no-set-state : 0 */

var PreviewContainer = function (_Component) {
  _inherits(PreviewContainer, _Component);

  function PreviewContainer(props) {
    _classCallCheck(this, PreviewContainer);

    var _this = _possibleConstructorReturn(this, (PreviewContainer.__proto__ || Object.getPrototypeOf(PreviewContainer)).call(this, props));

    _this.setLocation = function (location, locationId, locationParameters) {
      _this.setState({ location: location, locationId: locationId, locationParameters: locationParameters });
    };

    _this.renderView = function () {
      switch (_this.state.location) {
        case 'home':
          return _react2.default.createElement(_Home2.default, null);
        case 'composition':
          var _this$state = _this.state,
              locationId = _this$state.locationId,
              locationParameters = _this$state.locationParameters;
          var _this$props = _this.props,
              resources = _this$props.resources,
              assets = _this$props.assets,
              compositions = _this$props.compositions;
          // const parameters = montage.data.compositions.find(parameter => parameter.target_composition_id === locationId);

          var composition = compositions[locationId];

          return _react2.default.createElement(_Composition2.default, {
            parameters: locationParameters,
            composition: composition,
            resources: resources,
            assets: assets });

        default:
          return null;
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
          montage = _props.montage,
          compositions = _props.compositions,
          setLocation = this.setLocation,
          renderView = this.renderView;

      return _react2.default.createElement(
        'section',
        null,
        _react2.default.createElement(
          'nav',
          null,
          _react2.default.createElement(
            'ul',
            null,
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                'span',
                { onClick: function onClick() {
                    return setLocation('home');
                  } },
                montage.metadata.title
              )
            ),
            montage.data.compositions.map(function (parameters, index) {
              var id = parameters.target_composition_id;
              var composition = compositions[id];
              if (!composition) {
                return null;
              }
              var onClick = function onClick() {
                setLocation('composition', id, parameters);
              };
              return _react2.default.createElement(
                'li',
                { key: index },
                _react2.default.createElement(
                  'span',
                  { onClick: onClick },
                  composition.metadata.title
                )
              );
            })
          )
        ),
        _react2.default.createElement(
          'section',
          null,
          renderView()
        ),
        _react2.default.createElement(
          'style',
          null,
          montage.data.css_code
        )
      );
    }
  }]);

  return PreviewContainer;
}(_react.Component);

exports.default = PreviewContainer;