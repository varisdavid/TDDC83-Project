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

const PatientViewHeaderNavigation = ({ activeTabValue, ssn }) => {
    const history = useHistory();
// functions that adds the ssn to the url so patientView can send the ssn to the other js files
    const navigateToMeasurement = () => {
        const href = '/patient/measurements/' + ssn;
        history.push(href);
    };
    const navigateToOverview = () => {
        const href = '/patient/overview/' + ssn;
        history.push(href);
    };
    const navigateToMedications = () => {
        const href = '/patient/medications/' + ssn;
        history.push(href);
    };
    const navigateToCalendar = () => {
        const href = '/patient/calendar/' + ssn;
        history.push(href);
    };
    const navigateToAdmin = () => {
        const href = '/patient/admin/' + ssn;
        history.push(href);
    };

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
            onClick={navigateToMeasurement}
            {...a11yProps(0)}
          />
          <LinkTab 
            style={{ textDecoration: 'none', backgroundColor: activeTabValue === 1 ? '#0066B3' : 'inherit', color: activeTabValue === 1 ? '#FFF' : 'inherit'}} 
            label='Översikt'
            onClick={navigateToOverview}
            {...a11yProps(1)}
          />
          <LinkTab 
            style={{ textDecoration: 'none', backgroundColor: activeTabValue === 2 ? '#0066B3' : 'inherit', color: activeTabValue === 2 ? '#FFF' : 'inherit'}} 
            label='Läkemedelslista'
            onClick={navigateToMedications}
            {...a11yProps(2)}
          />
          
          <LinkTab 
            style={{ textDecoration: 'none', backgroundColor: activeTabValue === 3 ? '#0066B3' : 'inherit', color: activeTabValue === 3 ? '#FFF' : 'inherit'}} 
            label='Kalender'
            onClick={navigateToCalendar}
            {...a11yProps(3)}
          />
          <LinkTab 
            id="patientViewAdminTabBtn"
            style={{ textDecoration: 'none', backgroundColor: activeTabValue === 4 ? '#0066B3' : 'inherit', color: activeTabValue === 4 ? '#FFF' : 'inherit'}} 
            label='Admin'
            onClick={navigateToAdmin}
            {...a11yProps(4)}
          />

        </Tabs>
      </AppBar>
    </>
  );
};

export default PatientViewHeaderNavigation;
