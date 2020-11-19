import React from 'react';
import { AppBar, Tabs, Tab} from '@material-ui/core';

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

const PatientViewMeasurementsHeaderNavigation = ({ activeTabValueM }) => {

  return (
    <>
      <AppBar 
        position='relative'
        style={{ boxShadow: 'none', 
            backgroundColor: '#FFF !important',
            //background: 'transparent',
            //color: "none"
        }}
      >
        <Tabs
          TabIndicatorProps={{
            style: {
              height:'0px',
            }
          }}
          style={{ 
            backgroundColor: '#FFF', 
            color: '#275E8E', 
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: '14px'
        }} 
          value={activeTabValueM}
          aria-label='overview-navtab'
        >
          <LinkTab 
            style={{display: activeTabValueM === 0 ? 'none' : 'inherit'}} 
            label='Mätvärden -' 
            href='/patient/measurements' 
            {...a11yProps(0)}
          />
          <LinkTab 
            style={{textDecoration: activeTabValueM === 1 ? 'underline' : 'inherit',
                    fontWeight: activeTabValueM === 1 ? 'bold' : 'inherit',
                    display: activeTabValueM !== 1 ? 'none' : 'inherit'}} 
            label='Vikt' 
            href='/patient/measurements/weight' 
            {...a11yProps(1)}
          />
          <LinkTab 
            style={{textDecoration: activeTabValueM === 2 ? 'underline' : 'inherit',
                    fontWeight: activeTabValueM === 2 ? 'bold' : 'inherit',
                    display: activeTabValueM !== 2 ? 'none' : 'inherit'}} 
            label='Blodtryck'
            href='/patient/measurements/blood-pressure' 
            {...a11yProps(2)}
          />
          
          <LinkTab 
            style={{textDecoration: activeTabValueM === 3 ? 'underline' : 'inherit',
                    fontWeight: activeTabValueM === 3 ? 'bold' : 'inherit',
                    display: activeTabValueM !== 3 ? 'none' : 'inherit'}} 
            label='Fysisk Aktivitet' 
            href='/patient/measurements/physical-activity' 
            {...a11yProps(3)}
          />

        </Tabs>
      </AppBar>
    </>
  );
};

export default PatientViewMeasurementsHeaderNavigation;