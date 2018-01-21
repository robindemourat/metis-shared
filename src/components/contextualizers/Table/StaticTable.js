
import React from 'react';

import {computeColumns, formatData} from './utils';


const DEFAULT_STATIC_ROWS_LIMIT = 200;

const StaticTable = ({
  contextualizer,
  asset: {
    asset: {
      rawData = '',
      filename
    }
  }
}) => {
  const data = formatData(rawData, filename);
  const columns = computeColumns(data);

  const rowNumberLimit = contextualizer &&
                    contextualizer.pageRowsLimit &&
                    typeof contextualizer.pageRowsLimit === 'number' ?
                      contextualizer.pageRowsLimit : DEFAULT_STATIC_ROWS_LIMIT;

  const realData = data.slice(0, rowNumberLimit);

  return (
    <table>
      <thead>
        <tr>
          {
            columns.map((column, index) => (<th key={index}>{column.Header}</th>))
          }
        </tr>
      </thead>
      <tbody>
        {
          realData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {
                columns.map((column, index) => (<th key={index}>{row[column.accessor]}</th>))
              }
            </tr>
          ))
        }
      </tbody>
    </table>
   );
};

export default StaticTable;
