import React, { useMemo } from 'react';

import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'

const PatientOverview = () => {

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
        emergencyContactAddress: "Linköpingsvägen 1"
      },
    ],
    []
  )

  // One after another the tables for Förnamn Efternamn, Kontaktinformation, Nödkontakt, Nuvarnade Diagnoser...
  return (
    <div className='flex justify-center'>
        <div style={{ width: '25%' }}>        
          <div style={{ width: '80%', marginBottom: '30px'}}>
          {data.map((data) => (
            <Table className='table-patient'>
              <TableHead>
                <TableRow>
                  <TableCell className='cell-table-header'>
                    {data.name}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell className='cell-table-body' style={{background:'#FFF'}}> Kön: {data.gender} </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='cell-table-body'> Ålder: {data.age} </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='cell-table-body' style={{background:'#FFF'}}> Längd (cm): {data.length} </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='cell-table-body'> Vikt (kg): {data.weight} </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ))}
          </div>

          <div style={{ width: '80%' }}>
          {data.map((data) => (
            <Table className='table-patient'>
              <TableHead>
                <TableRow>
                  <TableCell className='cell-table-header'>
                    Kontaktinformation
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell className='cell-table-body' style={{background:'#FFF'}}> Telefon: {data.phone} </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='cell-table-body'> Mejladress: {data.email} </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='cell-table-body' style={{background:'#FFF'}}> Adress: {data.address} </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ))}
          </div>

          <div style={{ width: '80%' }} className='vertical-align' >
          {data.map((data) => (
            <Table className='table-patient'>
              <TableHead>
                <TableRow>
                  <TableCell className='cell-table-header'>
                    Nödkontakt
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell className='cell-table-body' style={{background:'#FFF'}}> Kön: {data.gender} </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='cell-table-body'> Ålder: {data.age} </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='cell-table-body' style={{background:'#FFF'}}> Längd (cm): {data.length} </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ))}
          </div>

        </div>

        <div style={{ width: '25%' }} className='vertical-align'>
          <div style={{ width: '80%' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className='cell-table-header'>
                    {data.name}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    Text
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div style={{ width: '80%' }} className='vertical-align'>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className='cell-table-header'>
                    {data.name}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    Text
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

        <div style={{ width: '50%' }}>
          <div style={{ width: '80%' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className='cell-table-header'>
                    {data.name}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                      Text
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
    </div>
  );
};

export default PatientOverview;