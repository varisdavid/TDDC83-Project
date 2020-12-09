import React, { useMemo } from 'react';

import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

//Renders a table displaying a patients emergency contact
const PatientEmergencyContactTable = () => {

  const data = useMemo(
    () => [
      {
        priority: 1,
        name: "Gerd Karlsson",
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
        phone: '070-9123123',
        email: "Gerd.karlsson@mail.se",
        address: "Linköpingsvägen 1",
        emergencyContact: "Per Karlsson",
        emergencyContactPhone: '070-9292929',
        emergencyContactEmail: "Per.karlsson@mail.se",
        emergencyContactAddress: "Linköpingsvägen 1",
        personalInfo: "Rädd för sprutor",
      },
    ],
    []
  )


  return (
    <div>
      {data.map((data) => (
        <Table className='table-patient' key="emergency-table">
          <TableHead>
            <TableRow>
              <TableCell className='cell-table-header'> Nödkontakt </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow className='row-table-body'>
              <TableCell className='cell-table-body'> Namn: {data.emergencyContact} </TableCell>
            </TableRow>
            <TableRow className='row-table-body'>
              <TableCell className='cell-table-body'> Telefon: {data.emergencyContactPhone} </TableCell>
            </TableRow>
            <TableRow className='row-table-body'>
              <TableCell className='cell-table-body'> Mejladress: {data.emergencyContactEmail} </TableCell>
            </TableRow>
            <TableRow className='row-table-body'>
              <TableCell className='cell-table-body'> Adress: {data.emergencyContactAddress} </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ))}
    </div>
  );
};
export default PatientEmergencyContactTable;