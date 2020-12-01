import React from 'react';
import { Button } from "@material-ui/core";

import { FormPatientAdmin } from '..';

//Not working just the shell for each block at patientView
const BlockPatientAdmin = ({ consts }) => {

    return (
        <div>
            <div style={{ border: '5px solid #E0E0E0', fontSize: '20px', fontWeight: 'bold' }} height='20px'>
                {consts.header}
            </div>
            <div className="flex justify-center" style={{ border: '5px solid #E0E0E0' }}>
                <div style={{ marginRight: '20px' }}>
                    <FormPatientAdmin />
                </div>
                <div>
                    <h1 style={{ marginTop: "1.5rem", fontsize: '15px', fontWeight: 'bold' }}>Inställda målintervall för mätvärden</h1>

                    <Button id="moveToChangeInterval" style={{
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