import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';

import { OverviewHeader } from "../components"

import { Patients, OverviewCalendar } from "../components"

// Current thinking is that all views described in the 
// prototype should have this as a baseplate, were either the children 
// of "home" or "patients" etc is rendered within
const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
};


const Overview = () => {

  const location = useLocation();
  
  // will change later on
  const healthCenter = "X_Vårdcentral";

  const [activeTabValue, setActiveTabValue] = useState(0);

  useEffect(() => {

    if (location.pathname === "/overview/home") {
      setActiveTabValue(0);
    } else if (location.pathname === "/overview/patients") {
      setActiveTabValue(1);
    } else if (location.pathname === "/overview/notices") {
      setActiveTabValue(2);
    } else if (location.pathname === "/overview/calendar") {
      setActiveTabValue(3);
    } else {
      setActiveTabValue(0);
    }

  }, [location] );


  return (
  <>
    <OverviewHeader healthCenter={healthCenter} activeTabValue={activeTabValue} setActiveTabValue={setActiveTabValue}/>


    <TabPanel value={activeTabValue} index={0}>
      
    </TabPanel>

    <TabPanel value={activeTabValue} index={1}>
      <Patients />
    </TabPanel>

    <TabPanel value={activeTabValue} index={2}>
      
    </TabPanel>

    <TabPanel value={activeTabValue} index={3}>
      <OverviewCalendar/>
    </TabPanel>

  </>

  );
};

export default Overview;