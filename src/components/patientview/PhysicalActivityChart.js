import React, { PureComponent } from 'react';
import {
    BarChart, Bar,  XAxis, YAxis,  Tooltip, Legend, ReferenceLine,
} from 'recharts';

const data = [
    {
         Timmar: 3,
    },
    {
         Timmar: 4,
    },
    {
         Timmar: 3,
    },
    {
         Timmar: 6,
    },
    {
         Timmar: 2,
    },
    {
         Timmar: 5,
    },
    {
         Timmar: 1,
    },
];

export default class PhysicalActivityChart extends PureComponent {
    render() {
        return (
            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <XAxis dataKey="name" />
                <YAxis/>
                <Tooltip />
                <Legend />
                <ReferenceLine y={3}  stroke="green" strokeDasharray="5 5" />
                <ReferenceLine y={7}  stroke="green" strokeDasharray="5 5" />
                <Bar dataKey="Timmar" fill="#8884d8" />
            </BarChart>
        );
    }
}
