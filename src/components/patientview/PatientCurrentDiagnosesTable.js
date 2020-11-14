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
  
  //Gör som en const istället?
  function checkIfEmpty() {
    console.log("Function is called")
    if (diagnoses !== null){
      return(
          //<TableRow className='row-table-body' key={diagnoses.name}>
            //<TableCell className='cell-table-body'> {diagnoses.name} </TableCell>
          //</TableRow>
        <TableRow className='row-table-body'>
          <TableCell className='cell-table-body'> Hej </TableCell>
        </TableRow>
      )
    } else {
      return (
        <TableRow className='row-table-body'>
          <TableCell className='cell-table-body'> Hej </TableCell>
        </TableRow>
      )

    }
  }
    return(
        <div>
            <Table className='table-patient'>
              <TableHead>
                <TableRow>
                  <TableCell className='cell-table-header'> Nuvarande diagnoser </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {checkIfEmpty()}
              </TableBody>
            </Table>
        </div>
    );
};
export default PatientCurrentDiagnosesTable;