'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_STATIC_ROWS_LIMIT = 200;

var StaticTable = function StaticTable(_ref) {
  var contextualizer = _ref.contextualizer,
      _ref$asset$asset = _ref.asset.asset,
      _ref$asset$asset$rawD = _ref$asset$asset.rawData,
      rawData = _ref$asset$asset$rawD === undefined ? '' : _ref$asset$asset$rawD,
      filename = _ref$asset$asset.filename;

  var data = (0, _utils.formatData)(rawData, filename);
  var columns = (0, _utils.computeColumns)(data);

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
};

exports.default = StaticTable;