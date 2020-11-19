import React from 'react';
import {  WeightChart, PatientViewHeaderBanner, PatientViewHeaderNavigation } from "..";


const BloodPressurePage  = () => {

    return (
        <>
            <PatientViewHeaderBanner/>
            <PatientViewHeaderNavigation/>
            <div>
                <div>Vikt</div>
                <WeightChart/>
            </div>
        </>
    );

};

export default BloodPressurePage;