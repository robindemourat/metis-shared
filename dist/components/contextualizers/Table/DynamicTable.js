'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTable = require('react-table');

var _reactTable2 = _interopRequireDefault(_reactTable);

var _axios = require('axios');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint react/no-set-state : 0 */


// import 'react-table/react-table.css';


var DynamicTable = function (_Component) {
  _inherits(DynamicTable, _Component);

  function DynamicTable(props) {
    _classCallCheck(this, DynamicTable);

    var _this = _possibleConstructorReturn(this, (DynamicTable.__proto__ || Object.getPrototypeOf(DynamicTable)).call(this, props));

    _this.updateData = function (src) {
      _this.setState({
        loading: true,
        error: undefined
      });
      (0, _axios.get)(src).then(function (response) {
        var data = (0, _utils.formatData)(response.data, src);
        _this.setState({
          data: data,
          columns: (0, _utils.computeColumns)(data),
          loading: false
        });
      }).catch(function (error) {
        _this.setState({
          error: error
        });
      });
    };

    _this.state = {
      loading: true,
      data: undefined
    };
    return _this;
  }

  _createClass(DynamicTable, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.updateData(this.props.src);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.src !== nextProps.src) {
        this.updateData(nextProps.src);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          _state$columns = _state.columns,
          columns = _state$columns === undefined ? [] : _state$columns,
          _state$data = _state.data,
          data = _state$data === undefined ? [] : _state$data,
          _state$loading = _state.loading,
          loading = _state$loading === undefined ? false : _state$loading;


      return _react2.default.createElement(_reactTable2.default, {
        data: data,
        columns: columns,
        loading: loading });
    }
  }]);

  return DynamicTable;
}(_react.Component);

exports.default = DynamicTable;