import React from 'react';
import { WeightChart, BloodPressure, PhysicalActivityChart } from "..";

const Measurements  = ({setActiveTabValueM}) => {

    return (
        <>
            <div className='flex justify-center' style={{ paddingTop: '0%'}} >
            <div onClick={(e) => {
                e.preventDefault();
                setActiveTabValueM(1);
            }} >
                <WeightChart/>
            </div>
            <div onClick={(e) => {
                e.preventDefault();
                setActiveTabValueM(2);
            }}>
                <BloodPressure/>
            </div>
            <div onClick={(e) => {
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