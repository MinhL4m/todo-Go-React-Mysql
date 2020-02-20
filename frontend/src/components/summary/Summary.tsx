import React from 'react'
import { ChartContainer as Chart } from './ChartContainer'

interface SummaryProps {

}

export const Summary: React.FC<SummaryProps> = ({ }) => {
    return (
        <div className='summary'>
            <h1>Summary</h1>
            <div className='chart' style={{ width: 1000, height: 700 }}>
                <Chart done={[1, 2, 3, 4, 5, 4, 3, 2, 1, 3, 2, 3]} />
            </div>
        </div>

    );
}