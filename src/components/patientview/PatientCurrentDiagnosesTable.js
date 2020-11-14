import React, { useMemo } from 'react';

import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

const PatientCurrentDiagnosesTable = () => {

    const diagnoses = useMemo(
        () => [
          {name: 'Diabetes'},
          {name: 'Hypertoni'},
        ],
        []
    )


    return(
        <div>
            <Table className='table-patient'>
              <TableHead>
                <TableRow>
                  <TableCell className='cell-table-header'> Nuvarande diagnoser </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {diagnoses.map((diagnoses,index) => (
                <TableRow className='row-table-body' key={diagnoses.name}>
                  <TableCell className='cell-table-body'> {diagnoses.name} </TableCell>
                </TableRow>
                 ))}
              </TableBody>
            </Table>
        </div>
    );
};
export default PatientCurrentDiagnosesTable;