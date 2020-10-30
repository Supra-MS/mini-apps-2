import React from 'react';
import { Line } from 'react-chartjs-2';

const Chart = ({ bpiData }) => {
  let chartArr = [];
  let chartData;
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
          label: "Weekly Range (till date)",
          data: chartArr,
          fill: true,
          backgroundColor: "rgba(224, 233, 210, 0.4)",
          borderColor: "rgba(88, 0, 197, 0.8)",
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
          text: '2020 Bitcoin Price Index (USD)',
          fontSize: 23
        },
        legend:{
          display: true,
          position: 'right'
        },
        scales:{
          xAxes: [{
            type: 'time',
            time: {
                unit: 'week'
            }
          }]
        }
      }}
      />
  );
};

export default Chart;