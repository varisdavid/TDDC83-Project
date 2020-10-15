import React from "react";

// import { PatientsSearch, PatientsTable, PatientGroups } from "../components"
import { PatientsSearch, PatientsTable } from "../components"

const Patients = () => {

    return (
    <>
        <div className="flex justify-center">
            <div className="flex-row w-10/12 mt-2 p-2 shadow">
                <PatientsSearch /> 
            </div>
        </div>
        
        <div className="flex justify-center">
            <div className="w-10/12 mt-3 p-2 shadow">
                <div style={{ height: 400, width: '100%' }}>
                    <PatientsTable />
                </div>
            </div>
        </div>
    </>
    );
};

export default Patients;