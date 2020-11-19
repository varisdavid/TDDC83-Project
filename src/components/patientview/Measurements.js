import React from 'react';
import { WeightChart, BloodPressure, PhysicalActivityChart } from "..";

const Measurements  = () => {

    return (
        <>
            <div className='flex justify-center' style={{ paddingTop: '5%'}} >
            <div onClick={(e) => {
                e.preventDefault();
                window.location.href='/WeightChartPage';
            }}>
                <div>Vikt</div>
                <WeightChart/>
            </div>
            <div onClick={(e) => {
                e.preventDefault();
                window.location.href='/BloodPressurePage';
            }}>
                <div>Blodtryck</div>
                <BloodPressure/>
            </div>
            <div>
                <div>Fysisk aktivitet</div>
                <PhysicalActivityChart/>
            </div>
            </div>

        </>
    );

};

export default Measurements;