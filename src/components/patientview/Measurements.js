import React from 'react';
import { WeightChart, BloodPressure, PhysicalActivityChart } from "..";

const Measurements  = () => {

    return (
        <>
            <div className='flex justify-center' style={{ paddingTop: '5%'}} >
            <div>
                <div>Vikt</div>
                <WeightChart/>
            </div>
            <div>
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