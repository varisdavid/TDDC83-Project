import React, { PureComponent } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ReferenceLine, ResponsiveContainer,
} from 'recharts';

//Fake data that is being displayed in the chart below. Can be made in to real data
const data = [
    {
        name: '18/5', Timmar: 3,
    },
    {
        name: '19/5', Timmar: 4,
    },
    {
        name: '20/5', Timmar: 3,
    },
    {
        name: '21/5', Timmar: 6,
    },
    {
        name: '22/5', Timmar: 2,
    },
    {
        name: '23/5', Timmar: 5,
    },
    {
        name: '24/5', Timmar: 1,
    },
];

//fake data that displays boundaires
const goalLimits = [3];
const accLimits = [2];
const nonAccLimits = [1];

export default class PhysicalActivityChart extends PureComponent {
    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                {/* Header displayed over the chart*/}
                <div className='header-measurement'>Fysisk aktivitet</div>
                <ResponsiveContainer>
                    <BarChart
                        data={data}
                        margin={{
                            top: 30, right: 50, left: 20, bottom: 5,
                        }}
                    >
                        {/* Displays the chart axises */}
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />

                        {/* Prints bars from the data above*/}
                        <Bar dataKey="Timmar" fill="#8884d8" />

                        {/* The lines that print the goal area. Green doted */}
                        <ReferenceLine y={goalLimits[0]} stroke="green" strokeDasharray="5 5" />

                        {/* The lines that print the acceptable area. Yellow doted */}
                        <ReferenceLine y={accLimits[0]} stroke="yellow" strokeDasharray="5 5" />

                        {/* The lines that print the marks the innacceptable area. Red doted */}
                        <ReferenceLine y={nonAccLimits[0]} stroke="red" strokeDasharray="5 5" />

                    </BarChart>
                </ResponsiveContainer>
            </div>
        );
    }
}
