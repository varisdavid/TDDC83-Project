import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box } from '@material-ui/core';

import { PatientViewHeaderBanner, PatientViewHeaderNavigation, PatientCalendar, PatientListOfMedication, PatientOverview, Admin } from '../components'
import { MeasurementsView} from '../views';

// Function for retrieving current active tab from our url.
let ssn
const getActiveTab = (location) => {
  const arrssn = location.pathname.split("/");
   ssn = arrssn[3]

  if (location.pathname.includes( '/patient/measurements')) {
    return 0;
  } else if (location.pathname.includes('/patient/overview' )) {
    return 1;  
  } else if (location.pathname.includes('/patient/medications')) {
    return 2;  
  } else if (location.pathname.includes('/patient/calendar')) {
    return 3;  
  } else if (location.pathname.includes('/patient/admin')) {
    return 4;  
  }else {
    return 0;  
  }

}

// Simple tab component, describing styling for each tab.
const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

const PatientView = () => {

  // Hook to retrieve the currently used url path
  const location = useLocation();
  console.log(location);


  // Function call to get dynamic starting tab
  getActiveTab(location)

  // This keeps track of which the currently active tab is.
  const [activeTabValue, setActiveTabValue] = useState(getActiveTab(location));

  // Will be fetched by user information later on. 
  const patientInformation = 'Gerd Karlsson, '+ ssn;

  // Upon rendering the component, this hook calls a function which 
  // determines which tab is active, depending on this we load a different tab.
  useEffect(() => {
    setActiveTabValue(getActiveTab(location));
  }, [location] );

  // --------------------------------------------------------------
  // Insert your components inside a tabPanel, like PatientCalendar.
  // --------------------------------------------------------------

  return (
  <>
    <div className='w-full h-auto'>
      <PatientViewHeaderBanner patientInformation={patientInformation} />  
      <PatientViewHeaderNavigation activeTabValue={activeTabValue} setActiveTabValue={setActiveTabValue}  ssn = {ssn}/>
    </div>

    <TabPanel id='patientViewMeasurementsTabBtn' className='Measurements' value={activeTabValue} index={0}>
      <MeasurementsView/>
    </TabPanel>

    <TabPanel id='patientViewOverviewTabBtn' className='tab-scroll' value={activeTabValue} index={1}>
      <PatientOverview/>
    </TabPanel>

    <TabPanel id='patientViewMedicationsTabBtn' className='tab-scroll' value={activeTabValue} index={2}>
      <PatientListOfMedication/>
    </TabPanel>

    <TabPanel id="patientViewCalenderTabBtn" className='tab-scroll' value={activeTabValue} index={3}>
      <PatientCalendar/>
    </TabPanel>

    <TabPanel  id="patientViewAdminTabBtn" className='tab-scroll' value={activeTabValue} index={4}>
      <Admin/>
    </TabPanel>
  </>

  );
};

export default PatientView;