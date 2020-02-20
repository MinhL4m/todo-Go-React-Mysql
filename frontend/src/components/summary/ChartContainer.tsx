import React, { useEffect } from 'react'
import { Chart } from 'chart.js'

interface ChartContainerProps {
  done: number[],
}

export const ChartContainer: React.FC<ChartContainerProps> = ({ done }) => {

  useEffect(() => {
    const canvas = document.querySelector('#chart');

    var myChart = new Chart(canvas, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar","Apr", "May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
        datasets: [
          {
            label: "# of Todo Done",
            data: done,
          }
        ]
      },
    });
  }, [])

  return (
    <canvas id="chart" style={{ width: 500, height: 100 }}></canvas>
  );
}