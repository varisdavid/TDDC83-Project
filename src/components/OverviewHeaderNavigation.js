import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab, InputBase } from '@material-ui/core';
import { Search } from '@material-ui/icons';

import { useHistory } from "react-router-dom";

const a11yProps = (index) => {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

const LinkTab = (props) => {

  const history = useHistory();

  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
        history.push(props.href);
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#fff",
    color: "#2d3748",
    marginTop: "4px",
  },
}));

const OverviewHeaderNavigation = ({activeTabValue, setActiveTabValue}) => {
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setActiveTabValue(newValue)
  };

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
    };


  return (
    <div className={classes.root}>
      <AppBar className="bg-white shadow-none" position="relative">
        <Tabs
          className="bg-white text-gray-800"
          variant="fullWidth"
          value={activeTabValue}
          onChange={handleChange}
          aria-label="overview-navtab"
        >
          <LinkTab label="Hem" href="/overview/home" {...a11yProps(0)} />
          <LinkTab label="Patienter" href="/overview/patients" {...a11yProps(1)} />
          <LinkTab label="Kalender" href="/overview/calendar" {...a11yProps(2)} />
          <LinkTab label="Notiser" href="/overview/notices" {...a11yProps(3)} />
          <div className="text-center self-center">
              <Search className="mr-2 text-gray-800"/>
              <InputBase
                className="text-gray-800"
                placeholder="Sök..."
                inputProps={{ 'aria-label': 'search' }}
                onChange={handleSearchChange}
                value={searchTerm}
              />
          </div>
        </Tabs>
      </AppBar>
    </div>
  );
};

export default OverviewHeaderNavigation;