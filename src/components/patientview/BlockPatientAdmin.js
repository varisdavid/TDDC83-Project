import React from 'react';
import {Button} from "@material-ui/core";

import {FormPatientAdmin} from '..';

const BlockPatientAdmin = ({consts}) => {

    return (
        <div>
        <div style={{border: '5px solid #E0E0E0', fontSize:'20px', fontWeight:'bold'}} height='20px'>
            {consts.header}
        </div>    
        <div className="flex justify-center" style={{border: '5px solid #E0E0E0'}}>
            <div>
                <FormPatientAdmin/>
            </div>
            <div>
                <h3>Inställda intervall</h3>
                <Button>Ändra intervall</Button>
            </div>
        </div>
        </div>
    );
};
export default BlockPatientAdmin;