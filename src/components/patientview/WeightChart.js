import React, { PureComponent } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine,
} from 'recharts';

const data = [
    {
        name: '18/5',  pv: 2400, amt: 2400,
    },
    {
        name: '13/6',  pv: 1398, amt: 2210,
    },
    {
        name: '23/7',  pv: 9800, amt: 2290,
    },
    {
        name: '1/9',  pv: 3908, amt: 2000,
    },
    {
        name: '10/9',  pv: 4800, amt: 2181,
    },
    {
        name: '2/10', pv: 3800, amt: 2500,
    },
    {
        name: '10/10',  pv: 4300, amt: 2100,
    },
];

export default class WeightChart extends PureComponent {

    render() {
        return (
            <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 20, right: 50, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <ReferenceLine x="Page C" stroke="red" label="Max PV PAGE" />
                <ReferenceLine y={9800} label="Max" stroke="red" />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
        );
    }
}
