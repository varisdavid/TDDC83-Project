import React from 'react';
import { WeightChart, BloodPressure, PhysicalActivityChart } from "..";

const Measurements = ({ setActiveTabValueM }) => {

    return (
        <>
            <div>
                <div className='flex justify-center' style={{marginTop: 'none', marginBottom: 'none'}}>
                    <div style={{ width: '30%', height: '40vh'}} onClick={(e) => {
                        e.preventDefault();
                        setActiveTabValueM(1);
                    }} >
                        <WeightChart />
                    </div>
                    <div style={{ width: '30%', height: '40vh'}} onClick={(e) => {
                        e.preventDefault();
                        setActiveTabValueM(2);
                    }}>
                        <BloodPressure />
                    </div>
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

};

export default Measurements;