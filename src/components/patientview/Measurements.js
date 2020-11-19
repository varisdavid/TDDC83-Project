import React from 'react';
import { WeightChart, BloodPressure, PhysicalActivityChart } from "..";

const Measurements  = ({setActiveTabValue}) => {

    return (
        <>
            <div className='flex justify-center' style={{ paddingTop: '5%'}} >
            <div onClick={(e) => {
                e.preventDefault();
                setActiveTabValue(1);
            }} >
                <div className='header-measurement'>Vikt</div>
                <WeightChart/>
            </div>
            <div onClick={(e) => {
                e.preventDefault();
                setActiveTabValue(2);
            }}>
                <div className='header-measurement'>Blodtryck</div>
                <BloodPressure/>
            </div>
            <div onClick={(e) => {
                e.preventDefault();
                setActiveTabValue(3);
            }}>
                <div className='header-measurement'>Fysisk aktivitet</div>
                <PhysicalActivityChart/>
            </div>
            </div>

        </>
    );

};

export default Measurements;