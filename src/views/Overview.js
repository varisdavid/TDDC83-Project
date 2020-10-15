import React, { useState } from "react";

import PropTypes from 'prop-types';
import { Typography, Box } from '@material-ui/core';

import { OverviewHeader } from "../components"

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
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};


const Overview = () => {

  // will change later on
  const healthCenter = useState("X_Vårdcentral");
  const [activeTabValue, setActiveTabValue] = useState(0);

  return (
  <>
    <OverviewHeader healthCenter={healthCenter} activeTabValue={activeTabValue} setActiveTabValue={setActiveTabValue}/>
    <TabPanel value={activeTabValue} index={0}>
      
    </TabPanel>
    <TabPanel value={activeTabValue} index={1}>
      
    </TabPanel>
    <TabPanel value={activeTabValue} index={2}>
      Page Three
    </TabPanel>
    <TabPanel value={activeTabValue} index={3}>
      Page Four
    </TabPanel>
    <TabPanel value={activeTabValue} index={4}>
      Page Five
    </TabPanel>
  </>

  );
};

export default Overview;