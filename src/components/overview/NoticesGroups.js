import React, { useMemo } from 'react';

import { CreateNewFilterModal } from '..'
import { Button } from '@material-ui/core';

const NoticesGroups = ({ setOwnFilters, customFilterData, setCustomFilterData, dropdownOpen, setDropdownOpen }) => {

  // Should contain a row of buttons for all the user specified patient groups, as well as a button to add 
  // new patientgroups.

  const patientGroups = useMemo(
    () => [
      {
        // connect to data/how to tell table
        Name: 'Mina Patienter',
        accessor: 'group1', // accessor is the 'key' in the data
        filterData: {
          minAge: 0,
          maxAge: 200,
          gender: 'all',
          team: 'all',
          department: 'Department 2',
          priority: { low: false, average: false, high: false }, // Either low, medium, high, undefined (translated to 3, 2, 1, 0)
          diagnoses: [],
        }
      },
      {
        Name: 'Diabetespatienter',
        accessor: 'group2',
        filterData: {
          minAge: 0,
          maxAge: 200,
          gender: 'all',
          team: 'all',
          department: 'all',
          priority: { low: false, average: false, high: false }, // Either low, medium, high, undefined (translated to 3, 2, 1, 0)
          diagnoses: ["Diabetes"],
        }
      },
    ],
    []
  )

  return (
    <>
      <div style={{ width: 'auto', textAlign: 'end' }}>

        {patientGroups.map(group => {
          return (
            <Button
              className='shadow mr-2'
              key={group.accessor}
              style={{
                paddingTop: '2px',
                paddingBottom: '2px',
                paddingLeft: '15px',
                paddingRight: '15px',
                borderRadius: '0'
              }}
              onClick={() => setOwnFilters(group.filterData)}
            >
              { group.Name}
            </Button>
          )
        })}

        <CreateNewFilterModal
          setOwnFilters={setOwnFilters}
          customFilterData={customFilterData}
          setCustomFilterData={setCustomFilterData}
          dropdownOpen={dropdownOpen}
          setDropdownOpen={setDropdownOpen}
          patientGroups={patientGroups}
        />
      </div>
    </>
  );
};

export default NoticesGroups;

