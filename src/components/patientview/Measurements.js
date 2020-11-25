import React from 'react';
import { WeightChart, BloodPressure, PhysicalActivityChart } from "..";
import {
    patientPrioritizationScore
} from '../ruleEngine/ruleEngine'

//Displays three charts (Measurment page)
const Measurements = ({ setActiveTabValueM }) => {
    console.log(patientPrioritizationScore(123));

    return (
        <>
            <div>
                {/*Displays a clickable weightChart*/}
                <div className='flex justify-center' style={{marginTop: 'none', marginBottom: 'none'}}>
                    <div style={{ width: '30%', height: '40vh'}} onClick={(e) => {
                        e.preventDefault();
                        setActiveTabValueM(1);
                    }} >
                        <WeightChart />
                    </div>
                    
                    {/*Displays a clickable BloodPressureChart*/}
                    <div style={{ width: '30%', height: '40vh'}} onClick={(e) => {
                        e.preventDefault();
                        setActiveTabValueM(2);
                    }}>
                        <BloodPressure />
                    </div>

                    {/*Displays a clickable physicalChart*/}
                    <div style={{ width: '30%', height: '40vh'}} onClick={(e) => {
                        e.preventDefault();
                        setActiveTabValueM(3);
                    }}>
                        <PhysicalActivityChart />
                    </div>
                </div>
            </div>
        </> 
    );
export default Measurements;