import React from "react";

import ChartBar from "./ChartBar.js";
import "./Chart.css";

const Chart = (props) => {
  console.log("Chart");
  // Identify maximum value in dataPoints array, first create an array of values, then use Math.max to find the maximum value
  const dataPointValues = props.dataPoints.map((dataPoint) => dataPoint.value);
  const totalMaximum = Math.max(...dataPointValues);
  console.log("maxValue: " + totalMaximum);

  return (
    <div className='chart'>
      {props.dataPoints.map((dataPoint) => (
        <ChartBar
          key={dataPoint.label}
          value={dataPoint.value}
          maxValue={totalMaximum}
          label={dataPoint.label}
        />
      ))}
    </div>
  );
};

export default Chart;
