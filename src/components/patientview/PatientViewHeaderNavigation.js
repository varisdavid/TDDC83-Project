import React from 'react';
import { AppBar, Tabs, Tab } from '@material-ui/core';

import { useHistory } from 'react-router-dom';

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
      component='a'
      onClick={(event) => {
        event.preventDefault();
        history.push(props.href);
      }}
      {...props}
    />
  );
}

const PatientViewHeaderNavigation = ({ activeTabValue }) => {

  return (
    <>
      <AppBar 
        position='relative'
        style={{ boxShadow: 'none' }}
      >
        <Tabs
          TabIndicatorProps={{
            style: {
              height:'0px',
            }
          }}
          style={{ backgroundColor: '#A9D7FF', color: '#000' }} 
          className='text-gray-800'
          variant='fullWidth'
          value={activeTabValue}
          aria-label='overview-navtab'
        >
          <LinkTab 
            style={{ textDecoration: 'none', backgroundColor: activeTabValue === 0 ? '#0066B3' : 'inherit', color: activeTabValue === 0 ? '#FFF' : 'inherit' }} 
            label='Mätvärden' 
            href='/patient/measurements' 
            {...a11yProps(0)}
          />
          <LinkTab 
            style={{ textDecoration: 'none', backgroundColor: activeTabValue === 1 ? '#0066B3' : 'inherit', color: activeTabValue === 1 ? '#FFF' : 'inherit'}} 
            label='Översikt' 
            href='/patient/overview' 
            {...a11yProps(1)}
          />
          <LinkTab 
            style={{ textDecoration: 'none', backgroundColor: activeTabValue === 2 ? '#0066B3' : 'inherit', color: activeTabValue === 2 ? '#FFF' : 'inherit'}} 
            label='Läkemedelslista'
            href='/patient/medications' 
            {...a11yProps(2)}
          />
          
          <LinkTab 
            style={{ textDecoration: 'none', backgroundColor: activeTabValue === 3 ? '#0066B3' : 'inherit', color: activeTabValue === 3 ? '#FFF' : 'inherit'}} 
            label='Kalender' 
            href='/patient/calendar' 
            {...a11yProps(3)}
          />
          <LinkTab 
            style={{ textDecoration: 'none', backgroundColor: activeTabValue === 4 ? '#0066B3' : 'inherit', color: activeTabValue === 4 ? '#FFF' : 'inherit'}} 
            label='Admin' 
            href='/patient/admin' 
            {...a11yProps(4)}
          />

        </Tabs>
      </AppBar>
    </>
  );
};

export default PatientViewHeaderNavigation;