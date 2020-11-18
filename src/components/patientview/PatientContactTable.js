import React, { useMemo } from 'react';

import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

//Renders a table displaying a patients contact information
const PatientContactTable = () => {

  const data = useMemo(
    () => [
      {
        priority: 1,
        name: "Gunilla Andersson",
        sweID: '470203-1324',
        diagnoses: ['Diabetes', 'Hypertoni'],
        updatedAt: '2020-10-08',
        updatedBy: 'Patienten',
        age: 73,
        gender: 'female',
        team: 'Team 1',
        department: 'Department 1',
        length: 164,
        weight: 60,
        phone: '070-9292929',
        email: "gunilla@andersson.se",
        address: "Linköpingsvägen 1",
        emergencyContact: "Per Andersson",
        emergencyContactPhone: '070-9292929',
        emergencyContactEmail: "per@andersson.se",
        emergencyContactAddress: "Linköpingsvägen 1",
        personalInfo: "Rädd för sprutor",
      },
    ],
    []
  )


  return (
    <div>
      {data.map((data) => (
        <Table className='table-patient'>
          <TableHead>
            <TableRow>
              <TableCell className='cell-table-header'> Kontaktinformation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow className='row-table-body'>
              <TableCell className='cell-table-body'> Telefon: {data.phone} </TableCell>
            </TableRow>
            <TableRow className='row-table-body'>
              <TableCell className='cell-table-body'> Mejladress: {data.email} </TableCell>
            </TableRow>
            <TableRow className='row-table-body'>
              <TableCell className='cell-table-body'> Adress: {data.address} </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ))}
    </div>
  );
};
export default PatientContactTable;