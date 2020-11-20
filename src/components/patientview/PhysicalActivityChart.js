import React, {PureComponent} from 'react';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ReferenceLine,
} from 'recharts';
//Fake data that is being displayed in the chart below. Can be made in to real data
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
            <div>
                {/* Header displayed over the chart*/}
                <div className='header-measurement'>Fysisk aktivitet</div>
                <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    {/* Displays the chart axises */}
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    {/* The doted lines displaying the area you want to be in */}
                    <ReferenceLine y={3} stroke="green" strokeDasharray="5 5"/>
                    <ReferenceLine y={7} stroke="green" strokeDasharray="5 5"/>
                    {/* Prints bars from the data above*/}
                    <Bar dataKey="Timmar" fill="#8884d8"/>
                </BarChart>
            </div>
        );
    }
}
