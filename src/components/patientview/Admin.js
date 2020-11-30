import React from 'react';
import {Button} from "@material-ui/core";
import { ActivityLogPatient, BlockPatientAdmin } from '..'

const Admin = () => {

return (
    <div className='flex justify-center'>
        <div style={{ width: "50%" }}>
            <div className="header-admin-patient">
                Inställningar - Prioriteringar och mätvärden
            </div>
            <BlockPatientAdmin consts={{header: "Vikt"}} />
            <BlockPatientAdmin consts={{header: "Blodtryck"}} />
            <BlockPatientAdmin consts={{header: "Fysisk aktivitet"}} />
            <div>
                <Button></Button>
            </div>
        </div>
        <div style={{ width: "30%" }}>
            <ActivityLogPatient />
        </div>
    </div>
);
};
export default Admin;