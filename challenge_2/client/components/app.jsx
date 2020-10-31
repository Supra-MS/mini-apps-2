import React, { Component } from 'react';
import http from 'axios';
import Chart from './Chart.jsx';
import Disclaimer from './Disclaimer.jsx';
import ChartType from './ChartType.jsx';
import InfoPanel from './InfoPanel.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartArr: [],
      bpiData: {},
      chartType: 'Week',
      currentPrice: 0,
      changeUSD: 0,
      changePerc: null,
      updatedAt: ''
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
          bpiData: bpi,
          data: response.data
        }, () => {
          console.log(this.state.data)
        });
      })
      .then(() => {
        let chartArr = [];
        const { bpiData } = this.state;
        for (let key in bpiData) {
          chartArr.push({
            x: key,
            y: bpiData[key]
          });
        }
        this.setState({
          chartArr: chartArr
        });
      })
      .then(() => {
        http.get('/cp')
          .then((response) => {
            const { rate_float } = response.data.bpi.USD;
            const { chartArr } = this.state;
            const price = rate_float;
            const change = price - chartArr[0].y;
            const changeP = (price - chartArr[0].y) / chartArr[0].y * 100;

            console.log(response, "000", price, change, changeP, chartArr)
            this.setState({
              currentPrice: rate_float,
              changeUSD: change.toLocaleString('us-EN',{ style: 'currency', currency: 'USD' }),
              changePerc: changeP.toFixed(2) + '%',
              updatedAt: response.data.time.updated
            })
          })
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
    const { chartType, chartArr, currentPrice, updatedAt, changeUSD, changePerc } = this.state;
    return (
      <React.Fragment>
        <InfoPanel
          currentPrice={currentPrice}
          updatedAt={updatedAt}
          changeUSD={changeUSD}
          changePerc={changePerc}
          />
        <Chart
          chartArr={chartArr}
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