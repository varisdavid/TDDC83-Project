import React, { useState, useMemo, useEffect } from 'react';

import { PatientsSearch, PatientsTable, PatientGroups } from '../components'
import { useTable, useFlexLayout, useFilters, useGlobalFilter, useSortBy } from 'react-table'

import { Tooltip } from '@material-ui/core';
import { NotificationImportant } from '@material-ui/icons';

// Component rendering bell icon (color based on value: integer) and hover information based on (text: string) 
const Notification = ({value, text}) => {

  var color;
  if (value === 1) {
    color = '#FF6464';
  } else if (value === 2) {
    color = '#FED765';
  } else if (value === 3) {
    color = '#27AE60';
  } else if (value === 0) {
    color = '#FFF'; // This is for rendering bug, empty cell not taking same space.
  }

  return (
    <Tooltip title={text} placement='left-start'>
      <NotificationImportant style={{
        color: color,
        fontSize: '30px',
      }}
      />
    </Tooltip>
    
      
  )
}

const Patients = () => {

  // This will apply filters to the table based on what filterData it recieves, 
  // it will also toggle the displaying of what the applied filter is and option to clear it 
  const setOwnFilters = (filterData) => {

    // setAllFilters([
    //   { id: 'gender', value: customFilterData.gender },
    //   { id: 'priority', value: customFilterData.priority },
    // ])
    console.log(filterData);

    setFilter('gender', filterData.gender);
    setFilter('priority', filterData.priority);
    setFilter('team', filterData.team)
    setFilter('department', filterData.department)
    setFilter('age', [filterData.minAge, filterData.maxAge])
    setFilter('diagnoses', filterData.diagnoses)

    // After we have applied it to our table, we will send it to the PatientsSearch component for displaying.
    setActiveFiltersState(filterData)

  }

  const data = useMemo(
    // To get them in the proper order, using numbers to represent priority, 1 = high, 2 = medium, 3 = low
      () => [
        {
          notices: <Notification value={1} text={'Oväntat skattat värde! Vikt: 30 kg (28 kg under förväntat värde)'}/>,
          priority: 1,
          name: 'Gunnilla Andersson',
          sweID: '470203-1324',
          diagnoses: ['Diabetes', 'Hypertoni'],
          updatedAt: '2020-10-08',
          updatedBy: 'Patienten',
          age: 73,
          gender: 'female',
          team: 'Team 1',
          department: 'Department 1'
        },
        {
          notices: <Notification value={1} text={'Oväntat skattat värde! Vikt: 30 kg (28 kg under förväntat värde)'}/>,
          priority: 1,
          name: 'Gunnilla Andersson',
          sweID: '470203-1324',
          diagnoses: ['Diabetes', 'Hypertoni'],
          updatedAt: '2020-10-08',
          updatedBy: 'Patienten',
          age: 73,
          gender: 'female',
          team: 'Team 1',
          department: 'Department 1'
        },
        {
          notices: <Notification value={1} text={'Oväntat skattat värde! Vikt: 30 kg (28 kg under förväntat värde)'}/>,
          priority: 1,
          name: 'Gunnilla Andersson',
          sweID: '470203-1324',
          diagnoses: ['Diabetes', 'Hypertoni'],
          updatedAt: '2020-10-08',
          updatedBy: 'Patienten',
          age: 73,
          gender: 'female',
          team: 'Team 1',
          department: 'Department 1'
        },
        {
          notices: <Notification value={1} text={'Oväntat skattat värde! Vikt: 30 kg (28 kg under förväntat värde)'}/>,
          priority: 1,
          name: 'Gunnilla Andersson',
          sweID: '470203-1324',
          diagnoses: ['Diabetes', 'Hypertoni'],
          updatedAt: '2020-10-08',
          updatedBy: 'Patienten',
          age: 73,
          gender: 'female',
          team: 'Team 1',
          department: 'Department 1'
        },
        {
          notices: <Notification value={1} text={'Oväntat skattat värde! Vikt: 30 kg (28 kg under förväntat värde)'}/>,
          priority: 1,
          name: 'Gunnilla Andersson',
          sweID: '470203-1324',
          diagnoses: ['Diabetes', 'Hypertoni'],
          updatedAt: '2020-10-08',
          updatedBy: 'Patienten',
          age: 73,
          gender: 'female',
          team: 'Team 1',
          department: 'Department 1'
        },
        {
          notices: <Notification value={2} text={'Oväntat skattat värde! Vikt: 30 kg (28 kg under förväntat värde)'}/>,
          priority: 2,
          name: 'Gunnilla Andersson',
          sweID: '470203-1324',
          diagnoses: ['Diabetes', 'Hypertoni'],
          updatedAt: '2020-10-08',
          updatedBy: 'Patienten',
          age: 73,
          gender: 'female',
          team: 'Team 1',
          department: 'Department 1'
        },
        {
          notices: <Notification value={2} text={'Oväntat skattat värde! Vikt: 30 kg (28 kg under förväntat värde)'}/>,
          priority: 2,
          name: 'Gunnilla Andersson',
          sweID: '470203-1324',
          diagnoses: ['Diabetes', 'Hypertoni'],
          updatedAt: '2020-10-08',
          updatedBy: 'Patienten',
          age: 73,
          gender: 'female',
          team: 'Team 1',
          department: 'Department 1'
        },
        {
          notices: <Notification value={2} text={'Oväntat skattat värde! Vikt: 30 kg (28 kg under förväntat värde)'}/>,
          priority: 2,
          name: 'Gunnilla Andersson',
          sweID: '470203-1324',
          diagnoses: ['Diabetes', 'Hypertoni'],
          updatedAt: '2020-10-08',
          updatedBy: 'Patienten',
          age: 73,
          gender: 'female',
          team: 'Team 1',
          department: 'Department 2'
        },
        {
          notices: <Notification value={2} text={'Oväntat skattat värde! Vikt: 30 kg (28 kg under förväntat värde)'}/>,
          priority: 2,
          name: 'Gunnilla Andersson',
          sweID: '470203-1324',
          diagnoses: ['Diabetes', 'Hypertoni'],
          updatedAt: '2020-10-08',
          updatedBy: 'Patienten',
          age: 73,
          gender: 'female',
        },
        {
          notices: <Notification value={3} text={'Oväntat skattat värde! Vikt: 30 kg (28 kg under förväntat värde)'}/>,
          priority: 3,
          name: 'Gunnilla Andersson',
          sweID: '470203-1324',
          diagnoses: ['Diabetes', 'Hypertoni'],
          updatedAt: '2020-10-08',
          updatedBy: 'Patienten',
          age: 73,
          gender: 'female',
          team: 'Team 1',
          department: 'Department 2'
        },
        {
          notices: <Notification value={3} text={'Oväntat skattat värde! Vikt: 30 kg (28 kg under förväntat värde)'}/>,
          priority: 3,
          name: 'Gunnilla Andersson',
          sweID: '470203-1324',
          diagnoses: ['Diabetes', 'Hypertoni'],
          updatedAt: '2020-10-08',
          updatedBy: 'Patienten',
          age: 73,
          gender: 'female',
          team: 'Team 1',
          department: 'Department 2'
        },
        {
          notices: <Notification value={3} text={'Oväntat skattat värde! Vikt: 30 kg (28 kg under förväntat värde)'}/>,
          priority: 3,
          name: 'Gunnilla Andersson',
          sweID: '470203-1324',
          diagnoses: ['Diabetes', 'Hypertoni'],
          updatedAt: '2020-10-08',
          updatedBy: 'Patienten',
          age: 73,
          gender: 'female',
          team: 'Team 2',
          department: 'Department 2'
        },
        {
          notices: <Notification value={0} text={''}/>,
          priority: 3,
          name: 'Patrik Andersson',
          sweID: '410203-1324',
          diagnoses: ['Diabetes'],
          updatedAt: '2020-10-08',
          updatedBy: 'Patienten',
          age: 79,
          gender: 'male',
          team: 'Team 2',
          department: 'Department 2'
        },
        {
          notices: <Notification value={1} text={'Oväntat skattat värde! Vikt: 30 kg (28 kg under förväntat värde)'}/>,
          priority: 1,
          name: 'Göran Andersson',
          sweID: '350203-1324',
          diagnoses: ['Diabetes'],
          updatedAt: '2020-10-08',
          updatedBy: 'Patienten',
          age: 85,
          gender: 'male',
          team: 'Team 2',
          department: 'Department 2'
        },
        {
          notices: <Notification value={3} text={'Oväntat skattat värde! Vikt: 30 kg (28 kg under förväntat värde)'}/>,
          priority: 3,
          name: 'Casper Andersson',
          sweID: '998877-1324',
          diagnoses: ['Diabetes'],
          updatedAt: '2020-10-08',
          updatedBy: 'Patienten',
          age: 21,
          gender: 'male',
          team: 'Team 2',
          department: 'Department 2'
        },
        {
          notices: <Notification value={3} text={'Oväntat skattat värde! Vikt: 30 kg (28 kg under förväntat värde)'}/>,
          priority: 3,
          name: 'Xander Andersson',
          sweID: '350203-1324',
          diagnoses: ['Diabetes'],
          updatedAt: '2020-10-08',
          updatedBy: 'Patienten',
          age: 85,
          gender: 'male',
          team: 'Team 2',
          department: 'Department 1'
        },
        {
          notices: <Notification value={3} text={'Oväntat skattat värde! Vikt: 30 kg (28 kg under förväntat värde)'}/>,
          priority: 3,
          name: 'Viktor Andersson',
          sweID: '350203-1324',
          diagnoses: ['Diabetes'],
          updatedAt: '2020-10-08',
          updatedBy: 'Patienten',
          age: 85,
          gender: 'male',
          team: 'Team 2',
          department: 'Department 1'
        },
      ],
      []
    )
    
  const columns = useMemo(
      () => [
        {
          Header: '',
          accessor: 'notices',
        },
        {
          Header: 'Prioritering',
          accessor: 'priority', // accessor is the 'key' in the data
          filter: 'priorityFilter',
        },
        {
          Header: 'Namn',
          accessor: 'name',
        },
        {
          Header: 'Personnummer',
          accessor: 'sweID',
        },
        {
          Header: 'Diagnos',
          accessor: 'diagnoses',
          Cell: ({ value }) => String(value.join(', ')),
          filter: 'containsMatchingValues',
        },
        {
          Header: 'Senast uppdaterad',
          accessor: 'updatedAt',
        },
        {
          Header: 'Uppdaterad av',
          accessor: 'updatedBy',
        },
        {
          Header: 'Ålder',
          accessor: 'age',
          filter: 'numberInRangeFilter',
        },
        {
          Header: 'Kön',
          accessor: 'gender',
          filter: 'selectFilter', 
        },
        {
          Header: 'Team',
          accessor: 'team',
          filter: 'selectFilter', 
        },
        {
          Header: 'Department',
          accessor: 'department',
          filter: 'selectFilter', 
        },
      ],
      []
    )

  // Returns all rows containing either a selected value or all
  function selectFilterFn(rows, id, filterValue) {
    if (filterValue === 'all') {
      return rows;
    } 
    return rows.filter(row => row.values[id] === filterValue)
  }
  
  // Returns all rows containing a chosen priority.
  function priorityFilterFn(rows, id, filterValue) {

    var priority = [];
    if (filterValue.low) {
      priority[0] = 3
    }
    if (filterValue.average) {
      priority[1] = 2
    }
    if (filterValue.high) {
      priority[2] = 1
    }

    if (priority.length > 0) {
      return rows.filter(row => priority.includes(row.values[id]))
    } else {
      return rows
    }

    // if (filterValue.low) {
    //   return rows.filter(row => row.values[id] === 3)
    // }
    // if (filterValue.average) {
    //   return rows.filter(row => row.values[id] === 2)
    // }
    // if (filterValue.high) {
    //   return rows.filter(row => row.values[id] === 1)
    // } 
    // if (!filterValue.low && !filterValue.average && !filterValue.high) {
    //   return rows;
    // }
    
  }

  // Returns all rows containing a number inbetween a chosen range.
  function numberInRangeFilterFn(rows, id, filterValue) {
    return rows.filter(row => filterValue[0] < row.values[id] && row.values[id] < filterValue[1])
  }

  // Returns all patients with one of the selected diagnoses
  function containsMatchingValuesFn(rows, id, filterValue) {

    // This is used to avoid duplicates.
    var matches = [];

    // If we dont have any diagnoses to filter with, all should be returned
    if (filterValue.length > 0) {
      // This line goes through all possible filters and sees if any of the rows have one of the filter values in its diagnoses array
      // , and if this is fulfilled + that row hasen't already been added, we add it.
      filterValue.forEach(value => rows.forEach((row, index) => {if ((row.values[id].indexOf(value) !== -1) && matches.indexOf(index) === -1) { matches.push(index)}}))
      return matches.map(index => rows[index])
    } else {
      return rows;
    }
    
  }

  const filterTypes = useMemo(
    () => ({
      selectFilter: selectFilterFn,
      priorityFilter: priorityFilterFn,
      numberInRangeFilter: numberInRangeFilterFn,
      containsMatchingValues: containsMatchingValuesFn,
    }),
    []
  );

  const [searchValue, setSearchValue] = useState('')
  
  // Keeps track of sorting options, starting column sorting : 'priority'
  const [sortState, setSortState] = useState({columnId: 'priority'});

  // This state will keep track of what filters we have active.flex-row
  const [activeFiltersState, setActiveFiltersState] = useState({});

  // Basic structure [{ id: 'name', value: 'Jane'}, { id: 'age', value: 21 }]
  //const [filterState, setFilterState] = useState({});

  // Used for beginning values passed to the PatientTable
  const initialState = {
    sortBy: [sortState],
    filters: [],
    hiddenColumns: ['age', 'gender', 'team', 'department']
    // filters: [{ id: 'col1', value: 'Green'}]
  };

  // Creates an instance of table, given columns, data and an initial state.
  const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
      toggleSortBy,
      setGlobalFilter,
      setFilter,
      setAllFilters,
  } = useTable({ columns, data, initialState, filterTypes},
    useFilters, // useFilters!
    useGlobalFilter,
    useSortBy,
    useFlexLayout,
  );

  // When something happens, we check to see if we change the sorting option, and we check if the search has been triggered
  useEffect(() => {
    toggleSortBy(sortState.columnId); // We use the value of the sortState to change sorting of the table
    setGlobalFilter(searchValue); // We use the stored searchValue to globally filter our table by. 
  }, [sortState, toggleSortBy, searchValue, setGlobalFilter]);

  return (
  <>
      <div className='flex justify-center'>
          <div
              style={{ backgroundColor: '#A9D7FF', borderRadius: '15px 15px' }} 
              className='flex w-10/12 mt-2 p-2'
          >
              <PatientsSearch 
                  setSortState={setSortState}
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                  setOwnFilters={setOwnFilters}
                  activeFiltersState={activeFiltersState}
                  setActiveFiltersState={setActiveFiltersState}
                  setAllFilters={setAllFilters}
              /> 
          </div>
      </div>

      <div className='flex justify-center'>
          <div style={{ width: 'calc(85%)', marginRight: '22.5px' }} className='mt-3 p-2'>
              <div style={{ width: 'calc(100%)' }}>
                  <PatientsTable 
                    data={data}
                    getTableProps={getTableProps}
                    getTableBodyProps={getTableBodyProps}
                    headerGroups={headerGroups}
                    rows={rows}
                    prepareRow={prepareRow}
                  />
              </div>
          </div>
      </div>

      <div className='flex justify-center'>
          <div className='w-10/12 mt-3 p-2'>
              <div style={{ width: '100%' }}>
                  <PatientGroups setOwnFilters={setOwnFilters} />
              </div>
          </div>
      </div>

  </>
  );
};

export default Patients;