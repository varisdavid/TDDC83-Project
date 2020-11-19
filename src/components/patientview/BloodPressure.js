import React, { PureComponent } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine,
} from 'recharts';

const data = [
    {
        name: '', Högt: 100, Lågt: 70,
    },
    {
        name: '18/5', Högt: 100, Lågt: 70,
    },
    {
        name: '13/6', Högt: 110, Lågt: 75,
    },
    {
        name: '25/7', Högt: 110, Lågt: 75,
    },
    {
        name: '1/9', Högt: 117, Lågt: 73,
    },
    {
        name: '10/9', Högt: 130, Lågt: 70,
    },
    {
        name: '2/10', Högt: 130, Lågt: 74,
    },
    {
        name: '10/10', Högt: 130, Lågt: 76,
    },
    {
        name: '', Högt: 147, Lågt: 76,
    },
];

export default class BloodPressure extends PureComponent {

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
                <XAxis dataKey="name"/>
                <YAxis />
                <Tooltip />
                <Legend />
                <ReferenceLine y={130}  stroke="green" strokeDasharray="5 5" />
                <ReferenceLine y={120}  stroke="green" strokeDasharray="5 5" />
                <ReferenceLine y={80}  stroke="green" strokeDasharray="5 5" />
                <ReferenceLine y={70}  stroke="green" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="Högt" stroke="#8884d8" />
                <Line type="monotone" dataKey="Lågt" stroke="#8884d8" />
            </LineChart>
        );
    }
}
