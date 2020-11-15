import React, { useMemo } from 'react';

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

  var n = 3; 

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
        earlierDisease.slice(0, n).map((earlierDisease, index) => (
          <TableRow className='row-table-body' key={earlierDisease.disease}>
            <TableCell className='cell-table-body'> {earlierDisease.disease}</TableCell>
            <TableCell className='cell-table-body'> {earlierDisease.year}</TableCell>
          </TableRow>
        ))
      )

    }
  }

  function checkButton() {
    if (n+1 > earlierDisease.length){
      return null; 
    } else {
      return ( 
        <TableRow className='row-table-body'>
            <TableCell className='cell-table-body'> <Button onClick={clickButton()}>See more</Button> </TableCell>
            <TableCell className='cell-table-body'></TableCell>
          </TableRow>
      )
    }
  }

  function clickButton() { //Behöver uppdatera tabellen
    n = n+3;
  }


  return (
    <div>
      <Table className='table-patient'>
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