import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab, Typography, Box, InputBase } from '@material-ui/core';
import { Search } from '@material-ui/icons';

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

const a11yProps = (index) => {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

const LinkTab = (props) => {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const NavTabs = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="overview-navtab"
        >
          <LinkTab label="Hem" href="/overview/home" {...a11yProps(0)} />
          <LinkTab label="Patienter" href="/overview/patients" {...a11yProps(1)} />
          <LinkTab label="Kalender" href="/overview/calendar" {...a11yProps(2)} />
          <LinkTab label="Notiser" href="/overview/notices" {...a11yProps(3)} />
          <div className="w-1/5 text-center self-center">
              <Search className="mr-2 text-gray-800"/>
              <InputBase
              className="text-gray-800"
              placeholder="Sök..."
              inputProps={{ 'aria-label': 'search' }}
              />
          </div>
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        Page One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Page Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Page Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Page Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Page Five
      </TabPanel>
    </div>
  );
};

export default NavTabs;