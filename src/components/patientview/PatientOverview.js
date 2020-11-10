import React, { useMemo } from 'react';

import { PatientTables } from '..'

import { useTable, useFlexLayout} from 'react-table'

const PatientOverview = () => {

    const data = useMemo(
          () => [
            {
              priority: 1,
              name: "Gunilla Andersson",
              sweID: '470203-1324',
              diagnoses: ['Diabetes', 'Hypertoni'],
              updatedAt: '2020-10-08',
              updatedBy: 'Patienten',
              age: 73,
              gender: 'female',
              team: 'Team 1',
              department: 'Department 1'
            },
          ],
          []
    )

    const data2 = useMemo(
        () => [
          {
            priority: 1,
            name: "Gunilla Andersson",
            sweID: '470203-1324',
            diagnoses: ['Diabetes', 'Hypertoni'],
            updatedAt: '2020-10-08',
            updatedBy: 'Patienten',
            age: 73,
            gender: 'female',
            team: 'Team 1',
            department: 'Department 1'
          },
        ],
        []
  )
    
    const columns = useMemo (
          () => [
            {
                Header: 'Rubrik',
                accessor: 'info',
            },
          ],
          []
    )

    const columns2 = useMemo (
        () => [
          {
              Header: 'Inte rubrik',
              accessor: 'info',
          },
        ],
        []
  )

    // Creates an instance of table, given columns, data and an initial state.
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({columns, data}, //Columns?
        useFlexLayout,
    );

    return (
        <div className='flex justify-center'>
            <div style={{ width: 'calc(85%)', marginRight: '22.5px' }} className='mt-3 p-2'>
                <div style={{ width: 'calc(100%)' }}>
                    <PatientTables
                        data={data2}
                        columns={columns2}
                        getTableProps={getTableProps}
                        getTableBodyProps={getTableBodyProps}
                        headerGroups={headerGroups}
                        rows={rows}
                        prepareRow={prepareRow}
                    />
                </div>
            </div>
        </div>

    );
};

export default PatientOverview;