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
        emergencyContactAddress: "Linköpingsvägen 1",
      },
    ],
    []
  )

  const medications = useMemo (
    () => [
        {medication:'Alvedon', type: 'Tablett', amount:'500mg'},
        {medication:'Actrapid', type: 'Injektionsvätska', amount:'400mg'},
      ],
    []
  )

  const earlierDisease = useMemo (
    () => [
        {disease:'Hjärtinfarkt', year: 2018},
        {disease:'Hjärtinfarkt', year: 2008},
        {disease:'Höftoperation', year: 2011},
      ],
    []
  )

  // One after another the tables for Förnamn Efternamn, Kontaktinformation, Nödkontakt, Nuvarnade Diagnoser...
  return (
    <div className='flex justify-center'>
        <div style={{ width: '25%' }}>        
          <div className='div-table-patient-view'> 
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
                  <TableCell className='cell-table-body' > Ålder: {data.age} </TableCell>
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

          <div className='div-table-patient-view'>
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

          <div className='div-table-patient-view'>
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
                  <TableCell className='cell-table-body' style={{background:'#FFF'}}> Namn: {data.emergencyContact} </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='cell-table-body'> Telefon: {data.emergencyContactPhone} </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='cell-table-body' style={{background:'#FFF'}}> Mejladress: {data.emergencyContactEmail} </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='cell-table-body'> Adress: {data.emergencyContactAddress} </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ))}
          </div>

        </div>

        <div style={{ width: '25%' }}>        
          <div className='div-table-patient-view'> 
          {data.map((data) => (
            <Table className='table-patient'>
              <TableHead>
                <TableRow>
                  <TableCell className='cell-table-header'>
                    Nuvarande diagnoser
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow className='row-table-body-red'>
                  <TableCell className='cell-table-body-red' style={{background:'#FFF'}}> {data.diagnoses[0]} &nbsp; </TableCell>
                </TableRow>
                <TableRow className='row-table-body-red'>
                  <TableCell className='cell-table-body-red'> {data.diagnoses[1]} &nbsp; </TableCell>
                </TableRow>
                <TableRow className='row-table-body-red'>
                  <TableCell className='cell-table-body-red' style={{background:'#FFF'}}> {data.diagnoses[2]}&nbsp; </TableCell>
                </TableRow>
                <TableRow className='row-table-body-red'>
                  <TableCell className='cell-table-body-red'> {data.diagnoses[3]} &nbsp; </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ))}
          </div>

          <div className='div-table-patient-view'>
            <Table className='table-patient'>
              <TableHead>
                <TableRow>
                  <TableCell className='cell-table-header' colSpan='3'>
                    Aktuellt medicinintag
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {medications.map((medications, index) => (
                <TableRow className='row-table-body-red' key={medications.medication}>
                  <TableCell className='cell-table-body-red'> {medications.medication} </TableCell>
                  <TableCell className='cell-table-body-red'> {medications.type} </TableCell>
                  <TableCell className='cell-table-body-red'> {medications.amount} </TableCell>
                </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className='div-table-patient-view'>
          {data.map((data) => (
            <Table className='table-patient'>
              <TableHead>
                <TableRow>
                  <TableCell className='cell-table-header'>
                    Mätvärden - Snitt senaste 7 dagarna
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell className='cell-table-body' style={{background:'#FFF'}}> Vikt: </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='cell-table-body'> Blodtryck: </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='cell-table-body' style={{background:'#FFF'}}> Fysisk aktivitet: </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ))}
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