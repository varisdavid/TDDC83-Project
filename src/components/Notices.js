import React, { useState, useMemo, useEffect } from "react";

import { PatientsSearch, NoticesTable, PatientGroups } from "../components"
import { useTable, useFlexLayout, useFilters, useGlobalFilter, useSortBy } from 'react-table'

import { Tooltip } from "@material-ui/core";
import { NotificationImportant, HourglassEmpty } from "@material-ui/icons";

const Notification = ({type, value, text}) => {

  var color;
  if (value === 1) {
    color = "#FF6464";
  } else if (value === 2) {
    color = "#FED765";
  } else if (value === 3) {
    color = "#27AE60";
  } else {
    return;
  }

  if (type === "bell") {
      return (
        <Tooltip title={text} placement="left-start">
          <NotificationImportant style={{
            color: color,
            fontSize: "30px",
          }}
          />
        </Tooltip>
      )
  } else if (type === "time") {
    return (
        <Tooltip title={text} placement="left-start">
          <HourglassEmpty style={{
            color: color,
            fontSize: "30px",
          }}
          />
        </Tooltip>
      ) 
  }
}

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

const Notices = () => {

  const data = useMemo(
    // To get them in the proper order, using numbers to represent priority, 1 = high, 2 = medium, 3 = low
      () => [
        {
        name: "Gunilla Andersson",
        id: '470203-1324',
        date: '2020-10-10',
        notice: <Notification type={"bell"} value={1} text={"Oväntat skattat värde! Vikt: 30 kg (28 kg under förväntat värde)"} />,
        priority: '1',
        },
        {
        name: "Gunilla Andersson",
        id: '470203-1324',
        date: '2020-10-10',
        notice: <Notification type={"bell"} value={1} text={"Oväntat skattat värde! Vikt: 30 kg (28 kg under förväntat värde)"} />,
        priority: '1',
        },
        {
        name: "Gunilla Andersson",
        id: '470203-1324',
        date: '2020-10-10',
        notice: <Notification type={"time"} value={1} text={"Oväntat skattat värde! Vikt: 30 kg (28 kg under förväntat värde)"} />,
        priority: '1',
        },
      ],
      []
    )
    
  const columns = useMemo(
      () => [
        {
          Header: 'Namn',
          accessor: 'name',
        },
        {
          Header: 'Personnummer',
          accessor: 'id', // accessor is the "key" in the data
          Filter: SelectColumnFilter,
          filter: "includes",
        },
        {
          Header: 'Datum',
          accessor: 'date',
          Filter: NumberRangeColumnFilter,
          filter: "between",
        },
        {
          Header: 'Notis',
          accessor: 'notice',
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
    useFlexLayout,
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
          <div style={{ width: 'calc(85%)', marginRight: "22.5px" }} className="mt-3 p-2">
              <div style={{ width: 'calc(100%)' }}>
                  <NoticesTable 
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

export default Notices;