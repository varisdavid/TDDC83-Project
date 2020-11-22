import React, {PureComponent} from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer,
} from 'recharts';

//fake data that is being displayed in the chart
const data = [
    {
        name: '', Högt: 100, Lågt: 70, status:'red',
    },
    {
        name: '18/5', Högt: 100, Lågt: 70, status:'red',
    },
    {
        name: '13/6', Högt: 110, Lågt: 75, status:'yellow',
    },
    {
        name: '25/7', Högt: 110, Lågt: 75, status:"yellow",
    },
    {
        name: '1/9', Högt: 117, Lågt: 73, status:"green",
    },
    {
        name: '10/9', Högt: 130, Lågt: 70, status:'green',
    },
    {
        name: '2/10', Högt: 130, Lågt: 74, status:'green',
    },
    {
        name: '10/10', Högt: 130, Lågt: 76, status:'green',
    },
    {
        name: '', Högt: 147, Lågt: 76, status:'red',
    },
];

//fake data that displays boundaires
const goalLimitsUpper = [120,130];
const goalLimitsLower = [70,80];
const accLimitsUpper = [115,135];
const accLimitsLower = [65,85];
const nonAccLimitsUpper = [110, 140];
const nonAccLimitsLower = [60,90];


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

//Skulle behöva en responsiveContainer för att få olika storlek beroende på skärmstorlek samt val av sida
//Displays the chart
export default class BloodPressure extends PureComponent {

    render() {
        return (
            <div style={{width: '100%', height: '100%'}}>
                {/* The header above the chart */}
                <div className='header-measurement'>Blodtryck</div>
                {/* Setting up the charts size*/}
                <ResponsiveContainer>
                <LineChart
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
                    {/* The lines that print the goal area. Green doted */}
                    <ReferenceLine y={goalLimitsUpper[0]} stroke="green" strokeDasharray="5 5"/>
                    <ReferenceLine y={goalLimitsUpper[1]} stroke="green" strokeDasharray="5 5"/>
                    <ReferenceLine y={goalLimitsLower[0]} stroke="green" strokeDasharray="5 5"/>
                    <ReferenceLine y={goalLimitsLower[1]} stroke="green" strokeDasharray="5 5"/>

                    {/* The lines that print the acceptable area. Yellow doted */}
                    <ReferenceLine y={accLimitsUpper[0]} stroke="yellow" strokeDasharray="5 5"/>
                    <ReferenceLine y={accLimitsUpper[1]} stroke="yellow" strokeDasharray="5 5"/>
                    <ReferenceLine y={accLimitsLower[0]} stroke="yellow" strokeDasharray="5 5"/>
                    <ReferenceLine y={accLimitsLower[1]} stroke="yellow" strokeDasharray="5 5"/>

                    {/* The lines that print the marks the innacceptable area. Red doted */}
                    <ReferenceLine y={nonAccLimitsUpper[0]} stroke="red" strokeDasharray="5 5"/>
                    <ReferenceLine y={nonAccLimitsUpper[1]} stroke="red" strokeDasharray="5 5"/>
                    <ReferenceLine y={nonAccLimitsLower[0]} stroke="red" strokeDasharray="5 5"/>
                    <ReferenceLine y={nonAccLimitsLower[1]} stroke="red" strokeDasharray="5 5"/>

                    {/* The lines printed with the data above*/}
                    <Line type="monotone" dataKey="Högt" stroke="#8884d8" dot={<CustomizedDot/>}/>
                    <Line type="monotone" dataKey="Lågt" stroke="#8884d8" dot={<CustomizedDot/>}/>
                </LineChart>
                </ResponsiveContainer>
            </div>
        );
    }
}