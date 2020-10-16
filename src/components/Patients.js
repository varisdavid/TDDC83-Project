import React from "react";

import { PatientsSearch, PatientsTable, PatientGroups } from "../components"

const Patients = () => {

    return (
    <>
        <div className="flex justify-center">
            <div
                style={{ backgroundColor: "#A9D7FF", borderRadius: "15px 15px" }} 
                className="flex w-10/12 mt-2 p-2"
            >
                <PatientsSearch /> 
            </div>
        </div>

        <div className="flex justify-center">
            <div className="w-10/12 mt-3 p-2">
                <div style={{ minHeight: 480, width: '100%' }}>
                    <PatientsTable />
                </div>
            </div>
        </div>

        <div className="flex justify-center">
            <div className="w-10/12 mt-3 p-2">
                <div style={{ width: '100%' }}>
                    <PatientGroups />
                </div>
            </div>
        </div>

    </>
    );
};

export default Patients;