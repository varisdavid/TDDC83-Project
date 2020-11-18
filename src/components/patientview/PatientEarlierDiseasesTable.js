import React, { useMemo, useState } from 'react';

import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@material-ui/core';

const PatientEarlierDiseasesTable = () => {

  const earlierDisease = useMemo(
    () => [
      { disease: 'Hjärtinfarkt', year: 2018 },
      { disease: 'Hjärtinfarkt', year: 2008 },
      { disease: 'Höftoperation', year: 2011 },
      { disease: 'Trött på distans', year: 2020 },
      { disease: 'Koffeinberoende', year: 2018 },
      { disease: 'Höftoperation', year: 2011 },
    ],
    []
  )

  const [lengthOfTable, setLenghtOfTable] = useState(3);

  /* Checks if input data is empty and if thats the case
  * returns and empty row (blankspace) else returns a row for
  * each input 
  */
  function checkIfEmpty() { 
    if (earlierDisease.length === 0) {
      return (
        <TableRow className='row-table-body'>
          <TableCell className='cell-table-body'> &nbsp; </TableCell>
        </TableRow>
      )
    } else {

      return (
        earlierDisease.slice(0,lengthOfTable).map((earlierDiseaseUsed, index) => (
          <TableRow className='row-table-body' key={index}>
            <TableCell className='cell-table-body'> {earlierDiseaseUsed.disease}</TableCell>
            <TableCell className='cell-table-body'> {earlierDiseaseUsed.year}</TableCell>
          </TableRow>
        ))
      )

    }
  }

  function checkButton() {
    if (lengthOfTable+1 > earlierDisease.length){
      return null; 
    } else {
      return ( 
        <TableRow className='row-table-body'>
            <TableCell className='cell-table-body'> <Button onClick={() => setLenghtOfTable(lengthOfTable + 3)}>See more</Button> </TableCell>
            <TableCell className='cell-table-body'></TableCell>
          </TableRow>
      )
    }
  }

  return (
    <div>
      <Table className='table-patient' id='table-with-hidden-rows'>
        <TableHead>
          <TableRow>
            <TableCell className='cell-table-header' colSpan='2'> Tidigare sjukdomar </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {checkIfEmpty()}
          {checkButton()}
        </TableBody>
      </Table>
    </div>
  );
};
export default PatientEarlierDiseasesTable;