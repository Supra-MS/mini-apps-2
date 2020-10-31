import React from 'react';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import "chartjs-plugin-lineheight-annotation";

const Chart = ({ chartArr, chartType }) => {
  let chartData;
  let smCT = chartType.toLowerCase();
  if (chartType === 'Day') {
    chartType = 'Dai';
  }
  if (chartArr) {
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
        responsive: true,
        lineHeightAnnotation: {
          always: false,
          hover: true,
          color: '#f6595f',
          lineWeight: 1.5,
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
          }],
          yAxes: [{
            ticks: {
              callback: function (value) {
                return `$${value}`;
              }
            }
          }]
        }
      }}
      />
  );
};

export default Chart;