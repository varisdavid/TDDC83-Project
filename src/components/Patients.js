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

  // Table filter for values between number x and y
  function NumberRangeColumnFilter({
    column: { filterValue = [], preFilteredRows, setFilter, id },
    }) {
    const [min, max] = useMemo(() => {
        let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
        let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
        preFilteredRows.forEach(row => {
        min = Math.min(row.values[id], min)
        max = Math.max(row.values[id], max)
        console.log(min);
        console.log(max);
        })
        return [min, max]
    }, [id, preFilteredRows])
    
    return (
        <div
        style={{
            display: 'flex',
        }}
        >
        <input
            value={filterValue[0] || ''}
            type='number'
            onChange={e => {
            const val = e.target.value
            setFilter((old = []) => [val ? parseInt(val, 10) : undefined, old[1]])
            }}
            placeholder={`Min (${min})`}
            style={{
            width: '70px',
            marginRight: '0.5rem',
            }}
        />
        to
        <input
            value={filterValue[1] || ''}
            type='number'
            onChange={e => {
            const val = e.target.value
            setFilter((old = []) => [old[0], val ? parseInt(val, 10) : undefined])
            }}
            placeholder={`Max (${max})`}
            style={{
            width: '70px',
            marginLeft: '0.5rem',
            }}
        />
        </div>
    )
    }

  // Table filter for selected value
  function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
    }) {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = useMemo(() => {
        const options = new Set()
        preFilteredRows.forEach(row => {
        options.add(row.values[id])
        })
        return [...options.values()]
    }, [id, preFilteredRows])
    
    // Render a multi-select box
    return (
        <select
        value={filterValue}
        onChange={e => {
            setFilter(e.target.value || undefined)
        }}
        >
        <option value=''>All</option>
        {options.map((option, i) => (
            <option key={i} value={option}>
            {option}
            </option>
        ))}
        </select>
    )
}

const Patients = () => {


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
          gender: "female",
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
          gender: "female",
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
          gender: "female",
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
          gender: "female",
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
          gender: "female",
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
          gender: "female",
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
          gender: "female",
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
          gender: "female",
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
          gender: "female",
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
          gender: "female",
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
          gender: "female",
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
          gender: "female",
        },
        {
          notices: <Notification value={0} />,
          priority: 3,
          name: 'Patrik Andersson',
          sweID: '410203-1324',
          diagnoses: ['Diabetes'],
          updatedAt: '2020-10-08',
          updatedBy: 'Patienten',
          age: 79,
          gender: "male",
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
          gender: "male",
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
          gender: "male",
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
          gender: "male",
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
          gender: "male",
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
          Cell: ({ value }) => String(value.join(", "))
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
        },
        {
          Header: 'Kön',
          accessor: 'gender',
        },
      ],
      []
    )
  
  const [searchValue, setSearchValue] = useState('')
  
  // Keeps track of sorting options
  const [sortState, setSortState] = useState({columnId: 'priority'});
  
  // Basic structure [{ id: 'name', value: 'Jane'}, { id: 'age', value: 21 }]
  //const [filterState, setFilterState] = useState({});

  // Used for beginning values
  const initialState = {
    sortBy: [sortState],
    filters: [],
    hiddenColumns: ["age", "gender"]
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
      setAllFilters,
  } = useTable(
    {
      columns,
      data,
      initialState,
    },
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
                  columns={columns}
                  NumberRangeColumnFilter={NumberRangeColumnFilter} 
                  SelectColumnFilter={SelectColumnFilter}
                  setSortState={setSortState}
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
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
                  <PatientGroups />
              </div>
          </div>
      </div>

  </>
  );
};

export default Patients;