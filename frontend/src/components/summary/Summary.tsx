import React, { useEffect, useState } from 'react';
import { ChartContainer as Chart } from './ChartContainer';
import { NothingSVG } from './NothingSVG';

interface SummaryProps {}

export const Summary: React.FC<SummaryProps> = ({}) => {
	const [ data, setData ] = useState([ 0, 0 ]);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const response = await fetch('http://localhost:8080/api/summary');
			if (response.status === 200) {
				console.log('what');
				const data = await response.json();
				setData([data.Done, data.Undone]);
			}
		} catch (err) {
			console.log('catch error');
		}
	};

	const checkEmpty = () => {
		return data.filter((item) => item > 0).length >= 1;
	};

	return (
		<div className="summary">
			<h1>Summary Current ToDo</h1>
			{checkEmpty() ? (
				<div className="chart" style={{ width: 1000, height: 500 }}>
					<Chart data={data} />
				</div>
			) : (
				<div className='nothing'>
					<h2>Nothing to show</h2>
					<NothingSVG />
				</div>
			)}
		</div>
	);
};
