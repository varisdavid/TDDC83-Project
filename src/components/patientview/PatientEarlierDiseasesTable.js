import React, { useMemo } from 'react';

import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@material-ui/core';

const PatientEarlierDiseasesTable = () => {

  const earlierDisease = useMemo(
    () => [
      { disease: 'Hjärtinfarkt', year: 2018 },
      { disease: 'Hjärtinfarkt', year: 2008 },
      { disease: 'Höftoperation', year: 2011 },
    ],
    []
  )

  //var nrOfRows = 3; - Använd denna till att bestämma 
  //antal rader som ska visas tillsammans med funktionen

  /* Checks if input data is empty and if thats the case
  * returns and empty row (blankspace) else returns a row for
  * each input 
  */
 function checkIfEmpty() {
  console.log("Function is called")
  if (earlierDisease.length===0){
    return(
      <TableRow className='row-table-body'>
        <TableCell className='cell-table-body'> &nbsp; </TableCell>
      </TableRow>
    )
  } else {
    return (
      earlierDisease.map((earlierDisease, index) => (
        <TableRow className='row-table-body' key={earlierDisease.disease}>
          <TableCell className='cell-table-body'> {earlierDisease.disease}</TableCell>
          <TableCell className='cell-table-body'> {earlierDisease.year}</TableCell>
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
            <TableCell className='cell-table-header' colSpan='2'> Tidigare sjukdomar </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {checkIfEmpty()}
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