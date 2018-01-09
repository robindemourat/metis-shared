'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.computeColumns = exports.formatData = undefined;

var _d3Dsv = require('d3-dsv');

var formatData = exports.formatData = function formatData(data, fileName) {
  var extension = fileName.split('.').pop();
  switch (extension) {
    case 'csv':
      return (0, _d3Dsv.csvParse)(data);
    case 'tsv':
      return (0, _d3Dsv.tsvParse)(data);
    case 'json':
    default:
      return data;
  }
};
/**
 * Determines of the columns of a dataset
 */
var computeColumns = exports.computeColumns = function computeColumns(data) {
  var keys = {};
  data.forEach(function (datum) {
    Object.keys(datum).forEach(function (key) {
      keys[key] = 'bla';
    });
  });
  var columns = Object.keys(keys).map(function (key) {
    return {
      Header: key,
      accessor: key
    };
  });
  return columns;
};