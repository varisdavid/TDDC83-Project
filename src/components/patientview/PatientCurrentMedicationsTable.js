import React, { useMemo } from 'react';

import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

//Renders a table displaying a patients current medications
const PatientCurrentMedicationsTable = () => {

  const medications = useMemo(
    () => [
      { medication: 'Alvedon', type: 'Tablett', amount: '500mg' },
      { medication: 'Actrapid', type: 'Injektionsvätska', amount: '400mg' },
      { medication: 'Amplodin', type: 'Tablett', amount: '500mg'}
    ],
    []
  )

  /*
  Checks if input data is empty and if thats the case
  returns and empty row (blankspace) else returns a row for
  each input 
  */
  function checkIfEmpty() {
    if (medications.length === 0) {
      return (
        <TableRow className='row-table-body'>
          <TableCell className='cell-table-body'> &nbsp; </TableCell>
        </TableRow>
      )
    } else {
      return (
        medications.map((medications, index) => (
          <TableRow className='row-table-body' key={medications.medication}>
            <TableCell className='cell-table-body'> {medications.medication} </TableCell>
            <TableCell className='cell-table-body'> {medications.type} </TableCell>
            <TableCell className='cell-table-body'> {medications.amount} </TableCell>
          </TableRow>
        ))
      )

    }
  }

  return (
    <div>
      <Table className='table-patient'>
        <TableHead>
          <TableRow>
            <TableCell className='cell-table-header' colSpan='3'> Aktuellt medicinintag </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {checkIfEmpty()}
        </TableBody>
      </Table>
    </div>
  );
};
export default PatientCurrentMedicationsTable;