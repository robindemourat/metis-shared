'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Composition = require('./Composition');

var _Composition2 = _interopRequireDefault(_Composition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DecoratedComposition = (_temp2 = _class = function (_Component) {
  _inherits(DecoratedComposition, _Component);

  function DecoratedComposition() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DecoratedComposition);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DecoratedComposition.__proto__ || Object.getPrototypeOf(DecoratedComposition)).call.apply(_ref, [this].concat(args))), _this), _this.getChildContext = function () {
      return {
        getAssetUri: _this.props.getAssetUri,
        renderingMode: _this.props.renderingMode,
        citationStyle: _this.props.citationStyle,
        citationLocale: _this.props.citationLocale,
        assetsData: _this.props.assets.reduce(function (total, asset) {
          return _extends({}, total, _defineProperty({}, asset._id, asset));
        }, {})
      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DecoratedComposition, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_Composition2.default, this.props);
    }
  }]);

  return DecoratedComposition;
}(_react.Component), _class.childContextTypes = {
  getAssetUri: _propTypes2.default.func,
  renderingMode: _propTypes2.default.string,
  citationStyle: _propTypes2.default.string,
  citationLocale: _propTypes2.default.string,
  assetsData: _propTypes2.default.string
}, _temp2);
exports.default = DecoratedComposition;