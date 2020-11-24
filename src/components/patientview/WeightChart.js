import React, { PureComponent } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer,
} from 'recharts';

//Fake data that is being displayed in the chart below
const data = [
    {
        name: '11/4', Vikt: 30, status: 'red',
    },
    {
        name: '18/5', Vikt: 67, status: 'green',
    },
    {
        name: '13/6', Vikt: 50, status: 'yellow',
    },
    {
        name: '25/7', Vikt: 67, status: 'green',
    },
    {
        name: '1/9', Vikt: 60, status: 'green',
    },
    {
        name: '10/9', Vikt: 65, status: 'green',
    },
    {
        name: '2/10', Vikt: 30, status: 'red',
    },
    {
        name: '10/10', Vikt: 60, status: 'green',
    },
];

//fake data that displays boundaires
const goalLimits = [60, 70];
const accLimits = [50, 75];
const nonAccLimits = [40, 79];

//Decides which color a dot should depending on the measurements status
const CustomizedDot = (props) => {
    const {
        cx, cy, payload,
    } = props;

    if (payload.status === "red") {
        return (
            <circle cx={cx} cy={cy} r={5} stroke="red" strokeWidth={2} fill="red" />
        );
    } else if (payload.status === "yellow") {
        return (
            <circle cx={cx} cy={cy} r={5} stroke="yellow" strokeWidth={2} fill="yellow" />
        );
    }

    return (
        <circle cx={cx} cy={cy} r={5} stroke="blue" strokeWidth={2} fill="white" />
    );
};

export default class WeightChart extends PureComponent {

    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                {/* Header name on the chart*/}
                <div className='header-measurement'>Vikt</div>
                {/* Setting the size of the chart*/}
                <ResponsiveContainer>
                    <LineChart
                        data={data}
                        margin={{
                            top: 30, right: 50, left: 20, bottom: 5,
                        }}
                    >
                        {/* The grid on the chart. Can be removed if wanted. The grid can also be changed*/}
                        <CartesianGrid strokeDasharray="3 3" />
                        {/* Displaying the Axises*/}
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />

                        {/* The lines that print the goal area. Green doted */}
                        <ReferenceLine y={goalLimits[0]} stroke="green" strokeDasharray="5 5" />
                        <ReferenceLine y={goalLimits[1]} stroke="green" strokeDasharray="5 5" />

                        {/* The lines that print the acceptable area. Yellow doted */}
                        <ReferenceLine y={accLimits[0]} stroke="yellow" strokeDasharray="5 5" />
                        <ReferenceLine y={accLimits[1]} stroke="yellow" strokeDasharray="5 5" />

                        {/* The lines that print the marks the innacceptable area. Red doted */}
                        <ReferenceLine y={nonAccLimits[0]} stroke="red" strokeDasharray="5 5" />
                        <ReferenceLine y={nonAccLimits[1]} stroke="red" strokeDasharray="5 5" />

                        {/* The line that is printed with the data from above*/}
                        <Line type="monotone" dataKey="Vikt" stroke="#8884d8" dot={<CustomizedDot />} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        );
    }
}
