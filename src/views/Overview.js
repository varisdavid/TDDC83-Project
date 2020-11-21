import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box } from '@material-ui/core';

import { OverviewHeaderBanner, OverviewHeaderNavigation, Patients, OverviewCalendar } from '../components'

import {settingsContext} from "../components/overview/ColumnFilter"

// Function for retrieving current active tab
const getActiveTab = (location) => {

  if (location.pathname === '/overview/home') {
    return 0;
  } else if (location.pathname === '/overview/patients') {
    return 1;
  } else if (location.pathname === '/overview/notices') {
    return 2;
  } else if (location.pathname === '/overview/calendar') {
    return 3;
  } else {
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

const Overview = () => {

  // Hook to retrieve the currently used url path
  const location = useLocation();

  // Function call to get dynamic starting tab
  getActiveTab(location)

  // This keeps track of which the currently active tab is.
  const [activeTabValue, setActiveTabValue] = useState(getActiveTab(location));

  // Will be fetched by user information later on.
  const healthCenter = 'Ryds vårdcentral';

  // Upon rendering the component, this hook calls a function which
  // determines which tab is active, depending on this we load a different tab.
  useEffect(() => {
    setActiveTabValue(getActiveTab(location));
  }, [location] );

  const [settings,setSettings] = useState();


  return (
  <>
    <div className='w-full h-auto'>
      <OverviewHeaderBanner healthCenter={healthCenter} />
      <OverviewHeaderNavigation activeTabValue={activeTabValue} setActiveTabValue={setActiveTabValue} />
    </div>

    <TabPanel className='Home' value={activeTabValue} index={0}>

    </TabPanel>

    <TabPanel className='Patients' value={activeTabValue} index={1}>
      <settingsContext.Provider value={{ settings, setSettings }}>
      <Patients />
      </settingsContext.Provider>
    </TabPanel>

    <TabPanel className='Notices' value={activeTabValue} index={2}>
      {/* <Notices /> */}

    </TabPanel>

    <TabPanel className='Calendar' value={activeTabValue} index={3}>
      <OverviewCalendar/>
    </TabPanel>

  </>

  );
};

export default Overview;