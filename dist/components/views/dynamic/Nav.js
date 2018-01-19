'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp; /* eslint react/no-set-state : 0 */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Nav = (_temp = _class = function (_Component) {
  _inherits(Nav, _Component);

  function Nav(props) {
    _classCallCheck(this, Nav);

    var _this = _possibleConstructorReturn(this, (Nav.__proto__ || Object.getPrototypeOf(Nav)).call(this, props));

    _this.toggleMenu = function () {
      _this.setState({
        menuOpen: !_this.state.menuOpen
      });
    };

    _this.state = {
      menuOpen: false
    };
    return _this;
  }

  _createClass(Nav, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          compositions = _props.compositions,
          montage = _props.montage,
          _props$toggable = _props.toggable,
          toggable = _props$toggable === undefined ? true : _props$toggable,
          menuOpen = this.state.menuOpen,
          Link = this.context.Link,
          toggleMenu = this.toggleMenu;

      return _react2.default.createElement(
        'nav',
        { className: 'plurishing-DynamicNav' },
        toggable && _react2.default.createElement(
          'h2',
          { className: 'header' },
          _react2.default.createElement(
            Link,
            { to: { view: 'home' } },
            montage.metadata.title || 'Montage sans titre'
          ),
          _react2.default.createElement(
            'button',
            { className: 'open-menu ' + (menuOpen || !toggable ? 'active' : ''), onClick: toggleMenu },
            _react2.default.createElement(
              'div',
              { className: 'wrap' },
              _react2.default.createElement(
                'div',
                { className: 'artclose' },
                _react2.default.createElement('div', { className: 'burgx' }),
                _react2.default.createElement('div', { className: 'burgx2' }),
                _react2.default.createElement('div', { className: 'burgx3' })
              )
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'menu-container ' + (menuOpen || !toggable ? 'active' : '') },
          _react2.default.createElement(
            'ul',
            { className: 'menu-items' },
            montage.data.compositions.filter(function (parameters) {
              return parameters.target_composition_id;
            }).map(function (parameters, index) {
              var id = parameters.target_composition_id;
              var composition = compositions.find(function (comp) {
                return comp._id === id;
              });
              if (composition) {
                return _react2.default.createElement(
                  'li',
                  { key: index },
                  _react2.default.createElement(
                    Link,
                    { to: { view: 'composition', index: index, parameters: parameters } },
                    composition.metadata.title,
                    ' (',
                    parameters.template,
                    ')'
                  )
                );
              }
              return null;
            })
          )
        )
      );
    }
  }]);

  return Nav;
}(_react.Component), _class.contextTypes = {
  Link: _propTypes2.default.func
}, _temp);
exports.default = Nav;