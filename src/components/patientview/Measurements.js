import React from 'react';
import { WeightChart, BloodPressure, PhysicalActivityChart } from "..";

const Measurements  = ({setActiveTabValueM}) => {

    return (
        <>
            <div className='flex justify-center' style={{height: '40vh', marginTop:'none'}}>
            <div style={{width: '30%'}} onClick={(e) => {
                e.preventDefault();
                setActiveTabValueM(1);
            }} >
                <WeightChart/>
            </div>
            <div style={{width: '30%'}} onClick={(e) => {
                e.preventDefault();
                setActiveTabValueM(2);
            }}>
                <BloodPressure/>
            </div>
            <div style={{width: '30%'}} onClick={(e) => {
                e.preventDefault();
                setActiveTabValueM(3);
            }}>
                <PhysicalActivityChart/>
            </div>
            </div>

        </>
    );

};

export default Measurements;