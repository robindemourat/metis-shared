import {csvParse, tsvParse} from 'd3-dsv';

export const formatData = (data, fileName) => {
  const extension = fileName.split('.').pop();
    switch (extension) {
      case 'csv':
        return csvParse(data);
      case 'tsv':
        return tsvParse(data);
      case 'json':
      default:
        return data;
    }
  };
/**
 * Determines of the columns of a dataset
 */
export const computeColumns = (data) => {
    const keys = {};
    data.forEach(datum => {
      Object.keys(datum).forEach(key => {
        keys[key] = 'bla';
      });
    });
    const columns = Object.keys(keys).map(key => ({
      Header: key,
      accessor: key
    }));
    return columns;
  };
