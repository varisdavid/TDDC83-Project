import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box } from '@material-ui/core';

import {PatientViewMeasurementsHeaderNavigation, Measurements, WeightChartPage, BloodPressurePage, PhysicalActivityPage } from '../components'

// Function for retrieving current active tab from our url.
const getActiveTabM = (locationM) => {
  
  if (locationM.pathname === '/patient/measurements') {
    return 0;
  } else if (locationM.pathname === '/patient/measurements/weight') {
    return 1;  
  } else if (locationM.pathname === '/patient/measurements/blood-pressure') {
    return 2;  
  } else if (locationM.pathname === '/patient/measurements/physical-activity') {
    return 3;   
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

const MeasurementsView = () => {

  // Hook to retrieve the currently used url path
  const locationM = useLocation();

  // Function call to get dynamic starting tab
  getActiveTabM(locationM)

  // This keeps track of which the currently active tab is.
  const [activeTabValueM, setActiveTabValueM] = useState(getActiveTabM(locationM));

  // Upon rendering the component, this hook calls a function which 
  // determines which tab is active, depending on this we load a different tab.
  useEffect(() => {
    setActiveTabValueM(getActiveTabM(locationM));
  }, [locationM] );

  // --------------------------------------------------------------
  // Insert your components inside a tabPanel, like PatientCalendar.
  // --------------------------------------------------------------

  return (
  <>
    <div className='w-full h-auto'>
      <PatientViewMeasurementsHeaderNavigation activeTabValueM={activeTabValueM} setActiveTabValueM={setActiveTabValueM} />
    </div>

    <TabPanel id='tab-scroll' className='Measurements' value={activeTabValueM} index={0}>
      <Measurements
      setActiveTabValueM={setActiveTabValueM}
      />
    </TabPanel>

    <TabPanel id='tab-scroll' className='Weight' value={activeTabValueM} index={1}>
      <WeightChartPage/>
    </TabPanel>

    <TabPanel id='tab-scroll' className='Blood-pressure' value={activeTabValueM} index={2}>
      <BloodPressurePage/>
    </TabPanel>

    <TabPanel id='tab-scroll' className='Physical-activity' value={activeTabValueM} index={3}>
      <PhysicalActivityPage/>
    </TabPanel>
  </>

  );
};

export default MeasurementsView;