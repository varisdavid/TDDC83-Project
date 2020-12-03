import React, {useEffect} from 'react';

import {
  PatientOverviewCalendar, PatientContactTable, PatientEmergencyContactTable,
  PatientPersonalInfoTable, PatientCurrentDiagnosesTable, PatientCurrentMedicationsTable,
  PatientEarlierDiseasesTable, PatientOverviewMeasurementsTable, PatientResponsibleCaregiversTable
} from '..'

//Renders the patientOverview page
const PatientOverview = () => {

  // When something happens, we check to see if we change the sorting option, and we check if the search has been triggered
  useEffect(() => {
    // Basic example of how to make a authorized fetch call to our backend endpoints
    const overview = async () => {
      const ehrid = "c784e009-c51b-437c-9c8d-a4a87dc18a72"
      const domain =  "http://127.0.0.1:5000/overview/";

      try {
        // const token = await getAccessTokenSilently();
        const response = await fetch(domain+ehrid,
            {
              headers: {},
            }
        );

        const responseData = await response.json();
        console.log(responseData);
      } catch (error) {
        console.log(error.message);
      }
    };
    overview();
    console.log(overview());
  },[] );

  return (
    <div className='flex justify-center'>
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