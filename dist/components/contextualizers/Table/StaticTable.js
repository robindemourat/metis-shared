'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp, _initialiseProps; /* eslint react/no-set-state : 0 */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _axios = require('axios');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEFAULT_STATIC_ROWS_LIMIT = 200;

var StaticTable = (_temp = _class = function (_Component) {
  _inherits(StaticTable, _Component);

  function StaticTable(props) {
    _classCallCheck(this, StaticTable);

    var _this = _possibleConstructorReturn(this, (StaticTable.__proto__ || Object.getPrototypeOf(StaticTable)).call(this, props));

    _initialiseProps.call(_this);

    _this.state = {
      loading: true,
      data: undefined
    };
    return _this;
  }

  _createClass(StaticTable, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.updateData(this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.src !== nextProps.src) {
        this.updateData(nextProps);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var contextualizer = this.props.contextualizer,
          _state = this.state,
          _state$columns = _state.columns,
          columns = _state$columns === undefined ? [] : _state$columns,
          _state$data = _state.data,
          data = _state$data === undefined ? [] : _state$data;


      var rowNumberLimit = contextualizer && contextualizer.pageRowsLimit && typeof contextualizer.pageRowsLimit === 'number' ? contextualizer.pageRowsLimit : DEFAULT_STATIC_ROWS_LIMIT;

      var realData = data.slice(0, rowNumberLimit);

      return _react2.default.createElement(
        'table',
        null,
        _react2.default.createElement(
          'thead',
          null,
          _react2.default.createElement(
            'tr',
            null,
            columns.map(function (column, index) {
              return _react2.default.createElement(
                'th',
                { key: index },
                column.Header
              );
            })
          )
        ),
        _react2.default.createElement(
          'tbody',
          null,
          realData.map(function (row, rowIndex) {
            return _react2.default.createElement(
              'tr',
              { key: rowIndex },
              columns.map(function (column, index) {
                return _react2.default.createElement(
                  'th',
                  { key: index },
                  row[column.accessor]
                );
              })
            );
          })
        )
      );
    }
  }]);

  return StaticTable;
}(_react.Component), _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.updateData = function (props) {
    if (props.asset && props.asset.asset && props.asset.asset.rawData) {
      var data = (0, _utils.formatData)(props.asset.asset.rawData, props.asset.asset.filename);
      var columns = (0, _utils.computeColumns)(data);
      _this2.setState({
        data: data,
        columns: columns,
        loading: false
      });
      return;
    } else if (!props.src) {
      return;
    }
    var src = props.src;
    _this2.setState({
      loading: true,
      error: undefined
    });
    (0, _axios.get)(src).then(function (response) {
      var data = (0, _utils.formatData)(response.data, src);
      _this2.setState({
        data: data,
        columns: (0, _utils.computeColumns)(data),
        loading: false
      });
    }).catch(function (error) {
      _this2.setState({
        error: error
      });
    });
  };
}, _temp);
exports.default = StaticTable;