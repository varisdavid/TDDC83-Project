import React, { useMemo, useState } from 'react';

import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@material-ui/core';

//Renders a table displaying a patients earlier diseases
const PatientEarlierDiseasesTable = () => {

  const earlierDisease = useMemo(
    () => [
      { disease: 'Hjärtinfarkt', year: 2018 },
      { disease: 'Höftoperation', year: 2011 },
      { disease: 'Höftoperation', year: 2011 },
      { disease: 'Hjärtinfarkt', year: 2008 },
    ],
    []
  )

  //State variable which decides how many data entries that are shown
  const [lengthOfTable, setLenghtOfTable] = useState(3);

  /* 
  Checks if input data is empty and if thats the case
  returns and empty row (blankspace) else returns according
  to the state variable lengthOfTable
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

  /*
  Checks if there are any more entries that are not displayed, 
  if thats the case displays nothing. Else display the button which on
  click call setLengthOfTable()
  */
  function checkButton() {
    if (lengthOfTable+1 > earlierDisease.length){
      return null; 
    } else {
      return ( 
        <TableRow className='row-table-body'>
            <TableCell className='cell-table-body'> <Button onClick={() => setLenghtOfTable(lengthOfTable + 10)} 
            id="showMoreEntries"
            style={{
            textTransform: 'none',
            font: 'inherit', 
            background: 'none',
            border: 'none',
            padding: 0,
            color: '#069',
            }}>Se mer...</Button> </TableCell>
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