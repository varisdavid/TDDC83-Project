import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box } from '@material-ui/core';

import { PatientViewHeaderBanner, PatientViewHeaderNavigation, PatientCalendar, PatientListOfMedication, PatientOverview, Measurements, Admin } from '../components'

// Function for retrieving current active tab from our url.
const getActiveTab = (location) => {
  
  if (location.pathname === '/patient/measurements') {
    return 0;
  } else if (location.pathname === '/patient/overview') {
    return 1;  
  } else if (location.pathname === '/patient/medications') {
    return 2;  
  } else if (location.pathname === '/patient/calendar') {
    return 3;  
  } else if (location.pathname === '/patient/admin') {
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

  // Function call to get dynamic starting tab
  getActiveTab(location)

  // This keeps track of which the currently active tab is.
  const [activeTabValue, setActiveTabValue] = useState(getActiveTab(location));

  // Will be fetched by user information later on. 
  const patientInformation = 'Namn Efternamn, yymmdd-xxxx, Diagnos';

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
      <PatientViewHeaderNavigation activeTabValue={activeTabValue} setActiveTabValue={setActiveTabValue} />
    </div>

    <TabPanel id='tab-scroll' className='Measurements' value={activeTabValue} index={0}>
      <Measurements/>
    </TabPanel>

    <TabPanel id='tab-scroll' className='Overview' value={activeTabValue} index={1}>
      <PatientOverview/>
    </TabPanel>

    <TabPanel id='tab-scroll' className='Medications' value={activeTabValue} index={2}>
      <PatientListOfMedication/>
    </TabPanel>

    <TabPanel id='tab-scroll' className='Calendar' value={activeTabValue} index={3}>
      <PatientCalendar/>
    </TabPanel>

    <TabPanel id='tab-scroll' className='Admin' value={activeTabValue} index={4}>
      <Admin/>
    </TabPanel>
  </>

  );
};

export default PatientView;