import React, { useMemo } from 'react';

import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

const PatientCurrentMedicationsTable = () => {

    const medications = useMemo (
        () => [
            {medication:'Alvedon', type: 'Tablett', amount:'500mg'},
            {medication:'Actrapid', type: 'Injektionsvätska', amount:'400mg'},
          ],
        []
      )


    return(
        <div>
            <Table className='table-patient'>
              <TableHead>
                <TableRow>
                  <TableCell className='cell-table-header' colSpan='3'> Aktuellt medicinintag </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {medications.map((medications, index) => (
                <TableRow className='row-table-body' key={medications.medication}>
                  <TableCell className='cell-table-body'> {medications.medication} </TableCell>
                  <TableCell className='cell-table-body'> {medications.type} </TableCell>
                  <TableCell className='cell-table-body'> {medications.amount} </TableCell>
                </TableRow>
                ))}
              </TableBody>
            </Table>
        </div>
    );
};
export default PatientCurrentMedicationsTable;