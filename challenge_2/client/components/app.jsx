import React, { Component } from 'react';
import http from 'axios';
import Chart from './Chart.jsx';
import Disclaimer from './Disclaimer.jsx';
import ChartType from './ChartType.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bpiData: {},
      chartType: 'Week'
    };
    this.getAllData = this.getAllData.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  componentDidMount() {
    this.getAllData();
  }

  getAllData() {
    http.get('/bpi')
      .then(response => {
        const { bpi } = response.data;
        console.log('Successfully able to get the response', response.data);
        this.setState({
          bpiData: bpi
        });
      })
      .catch(err => console.err('Error getting response from the server'))
  }

  handleOnChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  }

  render() {
    const { bpiData, chartType } = this.state;
    return (
      <React.Fragment>
        <Chart
          bpiData={bpiData}
          chartType={chartType}
          />
        <ChartType
          chartType={chartType}
          handleOnChange={this.handleOnChange}
          />
        <Disclaimer />
      </React.Fragment>
    );
  }
};

export default App;