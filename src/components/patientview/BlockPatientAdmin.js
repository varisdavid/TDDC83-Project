import React from 'react';
import { Button } from "@material-ui/core";

import { FormPatientAdmin } from '..';

//Not working just the shell for each block at patientView
const BlockPatientAdmin = ({ consts, inputValues,setTempValue}) => {

    //Handles click for moving to changing refernce values for a measurment type
    const handleClick = (event) => {
        if (consts.header==="Vikt" ) {
            window.location.href='/patient/measurements/weight'
        } else if (consts.header==="Blodtryck"){
            window.location.href='/patient/measurements/blood-pressure'
        } else if (consts.header==="Fysisk aktivitet"){
            window.location.href='/patient/measurements/physical-activity'
        }
    };

    return (
        <div>
            <div style={{ border: '5px solid #E0E0E0', fontSize: '20px', fontWeight: 'bold' }} height='20px'>
                {consts.header}
            </div>
            <div className="flex justify-center" style={{ border: '5px solid #E0E0E0' }}>
                <div style={{ marginRight: '20px' }}>
                    <FormPatientAdmin inputValues={inputValues} setTempValue={setTempValue}/>
                </div>
                <div>
                    <h1 style={{ marginTop: "1.5rem", fontsize: '15px', fontWeight: 'bold' }}>Inställda målintervall för mätvärden</h1>

                    <Button id="moveToChangeInterval" onClick={() => handleClick()} style={{
                        border: '1px solid lightgrey',
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginTop: "1.5rem",
                        boxShadow: "5px 7px 20px lightgrey",
                        textTransform: "none"
                    }}>Ändra intervall</Button>
                </div>
            </div>
        </div>
    );
};
export default BlockPatientAdmin;