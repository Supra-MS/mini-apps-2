import React from 'react';

const ChartType = ({ chartType, handleOnChange }) => {
  return (
    <div className="dropdown">
      <span>Chart Type: </span>
      <select name="chartType" value={chartType} onChange={handleOnChange}>
        <option>Week</option>
        <option>Month</option>
        <option>Day</option>
      </select>
    </div>
  );
};

export default ChartType;