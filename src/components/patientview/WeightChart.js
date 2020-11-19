import React, { PureComponent } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine,
} from 'recharts';

const data = [
    {
       name: '11/4', Vikt: 30,
    },
    {
        name: '18/5',  Vikt: 67,
    },
    {
        name: '13/6',  Vikt: 50,
    },
    {
        name: '25/7',  Vikt: 67,
    },
    {
        name: '1/9',  Vikt: 60,
    },
    {
        name: '10/9',  Vikt: 65,
    },
    {
        name: '2/10', Vikt: 30,
    },
    {
        name: '10/10',  Vikt: 60,
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
                <ReferenceLine y={70} stroke="green" strokeDasharray="5 5"/>
                <ReferenceLine y={60} stroke="green" strokeDasharray="5 5"/>
                <Line type="monotone" dataKey="Vikt" stroke="#8884d8"/>
            </LineChart>
        );
    }
}
