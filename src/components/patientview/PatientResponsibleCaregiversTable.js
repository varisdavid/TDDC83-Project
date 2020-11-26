import React, { useMemo } from 'react';

import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

//Renders a table displaying a patients caregivers
const PatientResponsibleCaregiversTable = () => {

  const responsibleCaregivers = useMemo(
    () => [
      { name: 'Anders Persson', title: 'Med', clinic: 'Medicinkliniken', status: 'Inskriven', typeOfClinic: 'Primary' },
      { name: 'Per Persson', title: 'Ortoped', clinic: 'Ortopedkliniken', status: 'Inskriven', typeOfClinic: 'Secondary' },
      { name: 'Nina Eriksson', title: 'Allmän läk', clinic: 'Lyckans vårdcentral', status: 'Skrevs ut 2020-03-13', typeOfClinic: 'Old' },
    ],
    []
  )

  /* 
  Checks if input data is empty and if thats the case
  returns and empty row (blankspace) else returns a row for
  each input 
  */
  function checkIfEmpty() {
    if (responsibleCaregivers === 0) {
      return (
        <TableRow className='row-table-body'>
          <TableCell className='cell-table-body'> &nbsp; </TableCell>
        </TableRow>
      )
    } else {
      return (
        responsibleCaregivers.map((responsibleCaregivers, index) => (
          <TableRow className='row-table-body' key={responsibleCaregivers.name}>
            <TableCell className='cell-table-body' title={responsibleCaregivers.typeOfClinic}> {responsibleCaregivers.name} </TableCell>
            <TableCell className='cell-table-body' title={responsibleCaregivers.typeOfClinic}> {responsibleCaregivers.title} </TableCell>
            <TableCell className='cell-table-body' title={responsibleCaregivers.typeOfClinic}> {responsibleCaregivers.clinic} </TableCell>
            <TableCell className='cell-table-body' title={responsibleCaregivers.typeOfClinic} status={responsibleCaregivers.status}> {responsibleCaregivers.status} </TableCell>
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
            <TableCell className='cell-table-header' colSpan='4'>
              Ansvarig vårdpersonal
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {checkIfEmpty()}
        </TableBody>
      </Table>
    </div>
  );
};
export default PatientResponsibleCaregiversTable;