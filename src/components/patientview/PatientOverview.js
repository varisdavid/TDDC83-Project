import React, { useMemo } from 'react';

import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

import { PatientCalendar } from '..'

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
        personalInfo: "Rädd för sprutor",
      },
    ],
    []
  )

  const diagnoses = useMemo(
    () => [
      {name: 'Diabetes'},
      {name: 'Hypertoni'},
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

  const measurments = useMemo (
    () => [
        {measure:'Vikt', average: '60 kg', goal: '62 kg'},
        {measure:'Blodtryck', average: '140 - 160 / 90 - 100', goal: '140 - 160 / 90 - 100'},
        {measure:'Fysisk aktivitet', average: 'Nivå 3 (av 5)', goal: 'Nivå 5 (av 5)'},
      ],
    []
  )

  const responsibleCaregivers = useMemo (
    () => [
        {name:'Anders Persson', title: 'Med', clinic: 'Medicinkliniken', status: 'Inskriven', typeOfClinic: 'Primary'},
        {name:'Per Persson', title: 'Ortoped', clinic: 'Ortopedkliniken', status: 'Inskriven', typeOfClinic: 'Secondary'},
        {name:'Nina Eriksson', title: 'Allmän läk', clinic: 'Lyckans vårdcentral', status: 'Skrevs ut 2020-03-13', typeOfClinic: 'Old'},
      ],
    []
  )

  // One after another the tables for Förnamn Efternamn, Kontaktinformation, Nödkontakt, Nuvarnade Diagnoser...
  return (
    <div className='flex justify-center'>
        <div style={{ width: '25%' }}> 
          <div className='div-table-patient-view'>
            <img className='img-overview-page' src="https://cdn.pixabay.com/photo/2017/10/14/23/44/computer-2852240_1280.png" alt='patient'></img>
          </div>      

          <div className='div-table-patient-view-personal'> 
          {data.map((data) => (
            <Table className='table-patient'>
              <TableHead>
                <TableRow>
                  <TableCell className='cell-table-header'> Personligt </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow className='row-table-body'>
                  <TableCell className='cell-table-body'> {data.personalInfo} </TableCell>
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

          <div className='div-table-patient-view'>
          {data.map((data) => (
            <Table className='table-patient'>
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

        </div>

        <div style={{ width: '25%' }}>        
          <div className='div-table-patient-view'> 
            <Table className='table-patient'>
              <TableHead>
                <TableRow>
                  <TableCell className='cell-table-header'> Nuvarande diagnoser </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {diagnoses.map((diagnoses,index) => (
                <TableRow className='row-table-body' key={diagnoses.name}>
                  <TableCell className='cell-table-body'> {diagnoses.name} </TableCell>
                </TableRow>
                 ))}
              </TableBody>
            </Table>
          </div>

          <div className='div-table-patient-view'>
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

          <div className='div-table-patient-view'>
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

        </div>

        <div style={{ width: '50%' }}>
          <div className='div-table-patient-view'>
            <PatientCalendar/>
          </div>
          <div className='div-table-patient-view'>
            <Table className='table-patient'>
              <TableHead>
                <TableRow>
                  <TableCell className='cell-table-header'> Mätvärden </TableCell>
                  <TableCell className='cell-table-header'> Snitt senaste 7 dagarna </TableCell>
                  <TableCell className='cell-table-header'> Målvärde </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {measurments.map((measurments, index) => (
                <TableRow className='row-table-body' key={measurments.measure}>
                  <TableCell className='cell-table-body'> {measurments.measure} </TableCell>
                  <TableCell className='cell-table-body'> {measurments.average} </TableCell>
                  <TableCell className='cell-table-body'> {measurments.goal} </TableCell>
                </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className='div-table-patient-view'>
            <Table className='table-patient'>
              <TableHead>
                <TableRow>
                  <TableCell className='cell-table-header' colSpan='4'>
                    Ansvarig vårdpersonal
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {responsibleCaregivers.map((responsibleCaregivers, index) => (
                <TableRow className='row-table-body' key={responsibleCaregivers.name}>
                  <TableCell className='cell-table-body' title={responsibleCaregivers.typeOfClinic}> {responsibleCaregivers.name} </TableCell>
                  <TableCell className='cell-table-body' title={responsibleCaregivers.typeOfClinic}> {responsibleCaregivers.title} </TableCell>
                  <TableCell className='cell-table-body' title={responsibleCaregivers.typeOfClinic}> {responsibleCaregivers.clinic} </TableCell>
                  <TableCell className='cell-table-body' title={responsibleCaregivers.typeOfClinic} status={responsibleCaregivers.status}> {responsibleCaregivers.status} </TableCell>
                </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
    </div>
  );
};

export default PatientOverview;