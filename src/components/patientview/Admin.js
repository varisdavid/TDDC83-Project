import React, { useState } from 'react';
import { Button } from "@material-ui/core";
import { ActivityLogPatient, BlockPatientAdmin } from '..'

//Admin page
const Admin = () => {

    //Mock data 
    const mockDataBloodPressure = {
        lowWarning: [1, 1],
        mediumWarning: [2, 2],
        highWarning: [4, 4]
    };

    const mockDataWeight = {
        lowWarning: [1, 1],
        mediumWarning: [2, 2],
        highWarning: [4, 4]
    };

    const mockDataPhysicalActivity = {
        lowWarning: [1, 1],
        mediumWarning: [2, 2],
        highWarning: [4, 4]
    };

    //The values in the forms
    const [dataPhysicalActivity, setDataPhysicalActivity] = useState(
        mockDataPhysicalActivity
    );

    const [dataBloodPressure, setDataBloodPressure] = useState(
        mockDataBloodPressure
    );

    const [dataWeight, setDataWeight] = useState(
        mockDataWeight
    );

    //Local variable saving changes until savebutton clicked
    const [tempDataPhysicalActivity, setTempDataPhysicalActivity] = useState(
        mockDataPhysicalActivity
    );

    const [tempDataWeight, setTempDataWeight] = useState(
        mockDataWeight
    );

    const [tempDataBloodPressure, setTempDataBloodPressure] = useState(
        mockDataBloodPressure
    );


    //Handles click
    const handleOnClick = (event) => {
        setDataPhysicalActivity(tempDataPhysicalActivity);
        setDataBloodPressure(tempDataBloodPressure);
        setDataWeight(tempDataWeight);
    };

    return (
        <div className='flex justify-center'>
            <div style={{ width: "60%" }}>
                <div className="header-admin-patient">
                    Inställningar - Prioriteringar och mätvärden
                </div>
                {/*Displays the blocks for the different measurements*/}
                <BlockPatientAdmin consts={{ header: "Vikt" }} inputValues={dataWeight} setTempValue={setTempDataWeight}/>
                <BlockPatientAdmin consts={{ header: "Blodtryck" }} inputValues={dataBloodPressure} setTempValue={setTempDataBloodPressure}/>
                <BlockPatientAdmin consts={{ header: "Fysisk aktivitet" }} inputValues={dataPhysicalActivity} setTempValue={setTempDataPhysicalActivity}/>
                <div style={{ height: '70px', border: '5px solid #E0E0E0' }}>
                    <Button id="patientViewAdminBtnValue" 
                    onClick={() => handleOnClick()}
                    style={{
                        border: '1px solid lightgrey',
                        boxShadow: "5px 7px 20px lightgrey",
                        fontSize: '20px',
                        fontWeight: 'bold',
                        textTransform: "none",
                        marginTop: '0.5rem',
                        marginRight: '0.5rem',
                        float: 'right'
                    }}> Spara</Button>
                </div>
            </div>
            {/*Displays the activity log for a patient */}
            <div style={{ width: "30%", marginLeft: '5%' }}>
                <ActivityLogPatient />
            </div>
        </div>
    );
};
export default Admin;