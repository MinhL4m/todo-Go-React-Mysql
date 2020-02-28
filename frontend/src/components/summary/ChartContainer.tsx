import React, { useEffect } from 'react';
import { Chart } from 'chart.js';

interface ChartContainerProps {
	data: number[];
}

export const ChartContainer: React.FC<ChartContainerProps> = ({ data }) => {
	useEffect(() => {
		const canvas = document.querySelector('#chart');

		var myChart = new Chart(canvas, {
			type: 'doughnut',
			data: {
				labels: [ 'Done', 'Undone' ],
				datasets: [
					{
						label: '# of Todo Done',
						data: data,
						backgroundColor: [ 'rgba(20, 175, 100,0.2)', 'rgba(221, 17, 48,0.2)' ],
						borderColor: [ 'rgba(20, 175, 100,0.4)', 'rgba(221, 17, 48,0.4)' ]
					}
				]
			}
		});
	}, []);

	return <canvas id="chart" style={{ width: 500, height: 150 }} />;
};
