/* eslint react/no-set-state : 0 */
import React, {Component} from 'react';
import ReactTable from 'react-table';

import {get} from 'axios';
import {computeColumns, formatData} from './utils';

// import 'react-table/react-table.css';


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
      state: {
        columns = [],
        data = [],
        // error,
        loading = false
      }
    } = this;

    return (
      <ReactTable
        data={data}
        columns={columns}
        loading={loading} />
     );
  }
}
