import React from 'react';
import { Button } from "@material-ui/core";
import { ActivityLogPatient, BlockPatientAdmin } from '..'

const Admin = () => {

    return (
        <div className='flex justify-center'>
            <div style={{ width: "60%"}}>
                <div className="header-admin-patient">
                    Inställningar - Prioriteringar och mätvärden
                </div>
                <BlockPatientAdmin consts={{ header: "Vikt" }} />
                <BlockPatientAdmin consts={{ header: "Blodtryck" }} />
                <BlockPatientAdmin consts={{ header: "Fysisk aktivitet" }} />
                <div style={{height: '70px', border: '5px solid #E0E0E0'}}>
                <Button id = "patientViewAdminBtnValue" style={{
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
            <div style={{ width: "30%", marginLeft: '5%'}}>
                <ActivityLogPatient/>
            </div>
        </div>
    );
};
export default Admin;