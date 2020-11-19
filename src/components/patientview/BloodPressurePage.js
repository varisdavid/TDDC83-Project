import React from 'react';
import {BloodPressure, PatientViewHeaderBanner, PatientViewHeaderNavigation} from "..";

const BloodPressurePage  = () => {

    return (
        <>
            <PatientViewHeaderBanner/>
            <PatientViewHeaderNavigation/>
            <div>
                <div>Blodtryck</div>
                <BloodPressure/>
            </div>
        </>
    );

};

export default BloodPressurePage;