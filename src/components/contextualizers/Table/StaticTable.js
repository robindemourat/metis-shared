/* eslint react/no-set-state : 0 */

import React, {Component} from 'react';

import {get} from 'axios';
import {computeColumns, formatData} from './utils';

const DEFAULT_STATIC_ROWS_LIMIT = 200;


export default class StaticTable extends Component {

  constructor (props) {
    super(props);
    this.state = {
      loading: true,
      data: undefined
    };
  }

  componentWillMount() {
    this.updateData(this.props);
  }

  componentWillReceiveProps (nextProps) {
    if (
        this.props.src !== nextProps.src
      ) {
      this.updateData(nextProps);
    }
  }

  updateData = props => {
    if (props.asset && props.asset.asset && props.asset.asset.rawData) {
      const data = formatData(props.asset.asset.rawData, props.asset.asset.filename);
      const columns = computeColumns(data);
      this.setState({
        data,
        columns,
        loading: false,
      });
      return;
    }
 else if (!props.src) {
      return;
    }
    const src = props.src;
    this.setState({
      loading: true,
      error: undefined,
    });
    get(src)
    .then((response) => {
      const data = formatData(response.data, src);
      this.setState({
        data,
        columns: computeColumns(data),
        loading: false,
      });
    })
    .catch((error) => {
      this.setState({
        error
      });
    });
  }


  render () {
    const {
      props: {
        contextualizer,
      },
      state: {
        columns = [],
        data = [],
        // error,
        // loading = false
      }
    } = this;

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
  }
}

