/* eslint react/no-set-state : 0 */

import React, {Component} from 'react';

import {get} from 'axios';
import {computeColumns, formatData} from './utils';


export default class DynamicTable extends Component {

  constructor (props) {
    super(props);
    this.state = {
      loading: true,
      data: undefined
    };
  }

  componentWillMount() {
    this.updateData(this.props.src);
  }

  componentWillReceiveProps (nextProps) {
    if (
        this.props.src !== nextProps.src
      ) {
      this.updateData(nextProps.src);
    }
  }

  updateData = src => {
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
                        contextualizer.pageRowsLimit : 100;

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
