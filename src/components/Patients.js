import React, { useState, useMemo, useEffect } from "react";

import { PatientsSearch, PatientsTable, PatientGroups } from "../components"
import { useTable, useFilters, useGlobalFilter, useSortBy } from 'react-table'

  // Filter for between number x and y
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
            type="number"
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
            type="number"
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

  // Filter for selected value
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
        <option value="">All</option>
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
      () => [
        {
          col1: 'High',
          col2: 'Gunnilla Andersson',
          col3: '470203-1324',
          col4: 'Diabetes, Hypertoni',
          col5: '2020-10-08',
          col6: 'Patienten',
        },
        {
          col1: 'High',
          col2: 'Gunnilla Andersson',
          col3: '470203-1324',
          col4: 'Diabetes, Hypertoni',
          col5: '2020-10-08',
          col6: 'Patienten',
        },
        {
          col1: 'High',
          col2: 'Gunnilla Andersson',
          col3: '470203-1324',
          col4: 'Diabetes, Hypertoni',
          col5: '2020-10-08',
          col6: 'Patienten',
        },
        {
          col1: 'High',
          col2: 'Gunnilla Andersson',
          col3: '470203-1324',
          col4: 'Diabetes, Hypertoni',
          col5: '2020-10-08',
          col6: 'Patienten',
        },
        {
          col1: 'High',
          col2: 'Gunnilla Andersson',
          col3: '470203-1324',
          col4: 'Diabetes, Hypertoni',
          col5: '2020-10-08',
          col6: 'Patienten',
        },
        {
          col1: 'Medium',
          col2: 'Gunnilla Andersson',
          col3: '470203-1324',
          col4: 'Diabetes, Hypertoni',
          col5: '2020-10-08',
          col6: 'Patienten',
        },
        {
          col1: 'Medium',
          col2: 'Gunnilla Andersson',
          col3: '470203-1324',
          col4: 'Diabetes, Hypertoni',
          col5: '2020-10-08',
          col6: 'Patienten',
        },
        {
          col1: 'Medium',
          col2: 'Gunnilla Andersson',
          col3: '470203-1324',
          col4: 'Diabetes, Hypertoni',
          col5: '2020-10-08',
          col6: 'Patienten',
        },
        {
          col1: 'Medium',
          col2: 'Gunnilla Andersson',
          col3: '470203-1324',
          col4: 'Diabetes, Hypertoni',
          col5: '2020-10-08',
          col6: 'Patienten',
        },
        {
          col1: 'Low',
          col2: 'Gunnilla Andersson',
          col3: '470203-1324',
          col4: 'Diabetes, Hypertoni',
          col5: '2020-10-08',
          col6: 'Patienten',
        },
        {
          col1: 'Low',
          col2: 'Gunnilla Andersson',
          col3: '470203-1324',
          col4: 'Diabetes, Hypertoni',
          col5: '2020-10-08',
          col6: 'Patienten',
        },
        {
          col1: 'Low',
          col2: 'Gunnilla Andersson',
          col3: '470203-1324',
          col4: 'Diabetes, Hypertoni',
          col5: '2020-10-08',
          col6: 'Patienten',
        },
        {
          col1: 'Cool',
          col2: 'Gilla Andersson',
          col3: '410203-1324',
          col4: 'Diabetes',
          col5: '2020-10-08',
          col6: 'Patienten',
        },
        {
          col1: 'Cool',
          col2: 'Andersson',
          col3: '350203-1324',
          col4: 'Diabetes',
          col5: '2020-10-08',
          col6: 'Patienten',
        },
      ],
      []
    )
    
  const columns = useMemo(
      () => [
        {
          Header: 'Prioritering',
          accessor: 'col1', // accessor is the "key" in the data
          Filter: SelectColumnFilter,
          filter: "includes",
        },
        {
          Header: 'Namn',
          accessor: 'col2',
        },
        {
          Header: 'Personnummer',
          accessor: 'col3',
          Filter: NumberRangeColumnFilter,
          filter: "between",
        },
        {
          Header: 'Diagnos',
          accessor: 'col4',
          Filter: SelectColumnFilter,
          filter: "includes",
        },
        {
          Header: 'Senast uppdaterad',
          accessor: 'col5',
        },
        {
          Header: 'Uppdaterad av',
          accessor: 'col6',
        },
      ],
      []
    )
  
  const [searchValue, setSearchValue] = useState("")
  
  // Keeps track of sorting options
  const [sortState, setSortState] = useState({columnId: "col1"});
  
  // Basic structure [{ id: 'name', value: 'Jane'}, { id: 'age', value: 21 }]
  //const [filterState, setFilterState] = useState({});

  // Used for beginning values
  const initialState = {
    sortBy: [sortState],
    filters: [],
    // filters: [{ id: 'col1', value: "Green"}]
  };

  const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
      toggleSortBy,
      setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState,
    },
    useFilters, // useFilters!
    useGlobalFilter,
    useSortBy,
  );

  useEffect(() => {
    toggleSortBy(sortState.columnId);
    setGlobalFilter(searchValue);
  }, [sortState, toggleSortBy, searchValue, setGlobalFilter]);

  return (
  <>
      <div className="flex justify-center">
          <div
              style={{ backgroundColor: "#A9D7FF", borderRadius: "15px 15px" }} 
              className="flex w-10/12 mt-2 p-2"
          >
              <PatientsSearch 
                  columns={columns}
                  NumberRangeColumnFilter={NumberRangeColumnFilter} 
                  SelectColumnFilter={SelectColumnFilter}
                  setSortState={setSortState}
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
              /> 
          </div>
      </div>

      <div className="flex justify-center">
          <div className="w-10/12 mt-3 p-2">
              <div style={{ minHeight: 480, width: '100%' }}>
                  <PatientsTable 
                    getTableProps={getTableProps}
                    getTableBodyProps={getTableBodyProps}
                    headerGroups={headerGroups}
                    rows={rows}
                    prepareRow={prepareRow}
                  />
              </div>
          </div>
      </div>

      <div className="flex justify-center">
          <div className="w-10/12 mt-3 p-2">
              <div style={{ width: '100%' }}>
                  <PatientGroups />
              </div>
          </div>
      </div>

  </>
  );
};

export default Patients;