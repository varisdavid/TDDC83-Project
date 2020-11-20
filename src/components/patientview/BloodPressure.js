import React, {PureComponent} from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine,
} from 'recharts';

//fake data that is being displayed in the chart
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

//Skulle behöva en responsiveContainer för att få olika storlek beroende på skärmstorlek samt val av sida
//Displays the chart
export default class BloodPressure extends PureComponent {

    render() {
        return (
            <div>
                {/* The header above the chart */}
                <div className='header-measurement'>Blodtryck</div>
                {/* Setting up the charts size*/}
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 20, right: 50, left: 20, bottom: 5,
                    }}

                >
                    {/* Choosing the grid on the chart. Can be removed if wanted*/}
                    <CartesianGrid strokeDasharray="3 3"/>

                    {/* Displays the axis */}
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    {/* The lines that print the accepted area. Green doted */}
                    <ReferenceLine y={130} stroke="green" strokeDasharray="5 5"/>
                    <ReferenceLine y={120} stroke="green" strokeDasharray="5 5"/>
                    <ReferenceLine y={80} stroke="green" strokeDasharray="5 5"/>
                    <ReferenceLine y={70} stroke="green" strokeDasharray="5 5"/>

                    {/* The lines printed with the data above*/}
                    <Line type="monotone" dataKey="Högt" stroke="#8884d8"/>
                    <Line type="monotone" dataKey="Lågt" stroke="#8884d8"/>
                </LineChart>
            </div>
        );
    }
}
