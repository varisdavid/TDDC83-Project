import React, { useMemo } from 'react';

import { Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';

const PatientResponsibleCaregiversTable = () => {

    const responsibleCaregivers = useMemo (
        () => [
            {name:'Anders Persson', title: 'Med', clinic: 'Medicinkliniken', status: 'Inskriven', typeOfClinic: 'Primary'},
            {name:'Per Persson', title: 'Ortoped', clinic: 'Ortopedkliniken', status: 'Inskriven', typeOfClinic: 'Secondary'},
            {name:'Nina Eriksson', title: 'Allmän läk', clinic: 'Lyckans vårdcentral', status: 'Skrevs ut 2020-03-13', typeOfClinic: 'Old'},
          ],
        []
      )


    return(
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
              {responsibleCaregivers.map((responsibleCaregivers, index) => (
                <TableRow className='row-table-body' key={responsibleCaregivers.name}>
                  <TableCell className='cell-table-body' title={responsibleCaregivers.typeOfClinic}> {responsibleCaregivers.name} </TableCell>
                  <TableCell className='cell-table-body' title={responsibleCaregivers.typeOfClinic}> {responsibleCaregivers.title} </TableCell>
                  <TableCell className='cell-table-body' title={responsibleCaregivers.typeOfClinic}> {responsibleCaregivers.clinic} </TableCell>
                  <TableCell className='cell-table-body' title={responsibleCaregivers.typeOfClinic} status={responsibleCaregivers.status}> {responsibleCaregivers.status} </TableCell>
                </TableRow>
                ))}
              </TableBody>
            </Table>
        </div>
    );
};
export default PatientResponsibleCaregiversTable;