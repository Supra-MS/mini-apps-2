import React, { Component } from 'react';
import http from 'axios';
import Chart from './Chart.jsx';
import Disclaimer from './Disclaimer.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bpiData: {}
    };
    this.getAllData = this.getAllData.bind(this);
  }

  componentDidMount() {
    this.getAllData();
  }

  getAllData() {
    http.get('/bpi')
      .then(response => {
        const { bpi } = response.data;
        console.log('Successfully able to get the response', response.data, typeof (bpi));
        this.setState({
          bpiData: bpi
        });
      })
      .catch(err => console.err('Error getting response from the server'))
  }

  render() {
    const { bpiData } = this.state;
    return (
      <React.Fragment>
        <Chart bpiData={bpiData} />
        <Disclaimer />
      </React.Fragment>
    );
  }
};

export default App;