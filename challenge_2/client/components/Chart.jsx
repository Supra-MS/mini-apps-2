import React from 'react';
import { Line } from 'react-chartjs-2';

const Chart = ({ bpiData, chartType }) => {
  let chartArr = [];
  let chartData;
  let smCT = chartType.toLowerCase();
  if (chartType === 'Day') {
    chartType = 'Dai';
  }
  if (bpiData) {
    for (let key in bpiData) {
      chartArr.push({
        x: key,
        y: bpiData[key]
      });
    }
    chartData = {
      datasets: [
        {
          label: `${chartType}ly Range (till date)`,
          data: chartArr,
          fill: true,
          backgroundColor: "rgba(255, 251, 235, 0.7)",
          borderColor: "rgba(240, 142, 26, 0.9)",
          lineTension: 0.1,
        },
      ]
    }
  }
  return (
    <Line
      data={chartData}
      options={{
        title:{
          display: true,
          text: '2020 [Aug-Oct] Bitcoin Price Index (USD)',
          fontSize: 20
        },
        legend:{
          display: true,
          position: 'right'
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        scales:{
          xAxes: [{
            type: 'time',
            time: {
                unit: `${smCT}`
            }
          }]
        }
      }}
      />
  );
};

export default Chart;