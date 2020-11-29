import React from 'react';
import { ActivityLogPatient, FormPatientAdmin } from '..'

const Admin = () => {

    return (
        <div className='flex justify-center'>
            <div style={{width:"50%"}}>
                <FormPatientAdmin />
            </div>
            <div style={{width:"30%"}}>
                <ActivityLogPatient />
            </div>
        </div>
    );
};
export default Admin;