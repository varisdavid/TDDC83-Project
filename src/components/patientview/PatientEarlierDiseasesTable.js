import React, { useMemo } from 'react';

import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@material-ui/core';

const PatientEarlierDiseasesTable = () => {

    const earlierDisease = useMemo (
        () => [
            {disease:'Hjärtinfarkt', year: 2018},
            {disease:'Hjärtinfarkt', year: 2008},
            {disease:'Höftoperation', year: 2011},
          ],
        []
      )


    return(
        <div>
            <Table className='table-patient'>
              <TableHead>
                <TableRow>
                  <TableCell className='cell-table-header' colSpan='2'> Tidigare sjukdomar </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {earlierDisease.map((earlierDisease, index) => (
                <TableRow className='row-table-body' title='earlierDiseases' value='1' key={earlierDisease.disease}>
                  <TableCell className='cell-table-body'> {earlierDisease.disease} </TableCell>
                  <TableCell className='cell-table-body'> {earlierDisease.year} </TableCell>
                </TableRow>
                ))}
                <TableRow className='row-table-body'>
                  <TableCell className='cell-table-body'> <Button>See more</Button> </TableCell>
                  <TableCell className='cell-table-body'></TableCell>
                </TableRow> 
              </TableBody>
            </Table>
        </div>
    );
};
export default PatientEarlierDiseasesTable;