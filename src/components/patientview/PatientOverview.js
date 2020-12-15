import React from 'react';

import {
  PatientOverviewCalendar, PatientContactTable, PatientEmergencyContactTable,
  PatientPersonalInfoTable, PatientCurrentDiagnosesTable, PatientCurrentMedicationsTable,
  PatientEarlierDiseasesTable, PatientOverviewMeasurementsTable, PatientResponsibleCaregiversTable
} from '..'

//Renders the patientOverview page
const PatientOverview = () => {

  return (
    <div className='patient-overview-flex justify-center'>
      <div style={{ width: '25%' }}>
        <div className='div-table-patient-view'>
          <img className='img-overview-page' src="https://cdn.pixabay.com/photo/2017/10/14/23/44/computer-2852240_1280.png" alt='patient'></img>
        </div>
        <div className='div-table-patient-view-personal'>
          <PatientPersonalInfoTable />
        </div>
        <div className='div-table-patient-view'>
          <PatientContactTable />
        </div>
        <div className='div-table-patient-view'>
          <PatientEmergencyContactTable />
        </div>
      </div>
      <div style={{ width: '25%' }}>
        <div className='div-table-patient-view'>
          <PatientCurrentDiagnosesTable />
        </div>
        <div className='div-table-patient-view'>
          <PatientCurrentMedicationsTable />
        </div>
        <div className='div-table-patient-view'>
          <PatientEarlierDiseasesTable />
        </div>
      </div>
      <div style={{ width: '50%' }}>
        <div className='div-table-patient-view'>
          <PatientOverviewCalendar />
        </div>
        <div className='div-table-patient-view'>
          <PatientOverviewMeasurementsTable />
        </div>
        <div className='div-table-patient-view'>
          <PatientResponsibleCaregiversTable />
        </div>
      </div>
    </div>
  );
};

export default PatientOverview;
