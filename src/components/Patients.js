import React, { useState, useMemo } from "react";

import { PatientsSearch, PatientGroups } from "../components"
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table'

  // Define a default UI for filtering
  function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
  }) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
      setGlobalFilter(value || undefined)
    }, 200)
  
    return (
      <span>
        Search:{' '}
        <input
          value={value || ""}
          onChange={e => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`${count} records...`}
          style={{
            fontSize: '1.1rem',
            border: '0',
          }}
        />
      </span>
    )
  }
  
  // Define a default UI for filtering
  function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
  }) {
    const count = preFilteredRows.length
  
    return (
      <input
        value={filterValue || ''}
        onChange={e => {
          setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
        }}
        placeholder={`Search ${count} records...`}
      />
    )
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

const Patients = () => {

    const data = useMemo(
        () => [
          {
            col1: 'Red',
            col2: 'Gunnilla Andersson',
            col3: '470203-1324',
            col4: 'Diabetes, Hypertoni',
            col5: '2020-10-08',
            col6: 'Patienten',
          },
          {
            col1: 'Red',
            col2: 'Gunnilla Andersson',
            col3: '470203-1324',
            col4: 'Diabetes, Hypertoni',
            col5: '2020-10-08',
            col6: 'Patienten',
          },
          {
            col1: 'Red',
            col2: 'Gunnilla Andersson',
            col3: '470203-1324',
            col4: 'Diabetes, Hypertoni',
            col5: '2020-10-08',
            col6: 'Patienten',
          },
          {
            col1: 'Red',
            col2: 'Gunnilla Andersson',
            col3: '470203-1324',
            col4: 'Diabetes, Hypertoni',
            col5: '2020-10-08',
            col6: 'Patienten',
          },
          {
            col1: 'Red',
            col2: 'Gunnilla Andersson',
            col3: '470203-1324',
            col4: 'Diabetes, Hypertoni',
            col5: '2020-10-08',
            col6: 'Patienten',
          },
          {
            col1: 'Yellow',
            col2: 'Gunnilla Andersson',
            col3: '470203-1324',
            col4: 'Diabetes, Hypertoni',
            col5: '2020-10-08',
            col6: 'Patienten',
          },
          {
            col1: 'Yellow',
            col2: 'Gunnilla Andersson',
            col3: '470203-1324',
            col4: 'Diabetes, Hypertoni',
            col5: '2020-10-08',
            col6: 'Patienten',
          },
          {
            col1: 'Yellow',
            col2: 'Gunnilla Andersson',
            col3: '470203-1324',
            col4: 'Diabetes, Hypertoni',
            col5: '2020-10-08',
            col6: 'Patienten',
          },
          {
            col1: 'Yellow',
            col2: 'Gunnilla Andersson',
            col3: '470203-1324',
            col4: 'Diabetes, Hypertoni',
            col5: '2020-10-08',
            col6: 'Patienten',
          },
          {
            col1: 'Green',
            col2: 'Gunnilla Andersson',
            col3: '470203-1324',
            col4: 'Diabetes, Hypertoni',
            col5: '2020-10-08',
            col6: 'Patienten',
          },
          {
            col1: 'Green',
            col2: 'Gunnilla Andersson',
            col3: '470203-1324',
            col4: 'Diabetes, Hypertoni',
            col5: '2020-10-08',
            col6: 'Patienten',
          },
          {
            col1: 'Green',
            col2: 'Gunnilla Andersson',
            col3: '470203-1324',
            col4: 'Diabetes, Hypertoni',
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
          filterable: true,
        },
        {
          Header: 'Namn',
          accessor: 'col2',
          filterable: false,

        },
        {
          Header: 'Personnummer',
          accessor: 'col3',
          Filter: NumberRangeColumnFilter,
          filter: "between",
          filterable: true,

        },
        {
          Header: 'Diagnos',
          accessor: 'col4',
          Filter: SelectColumnFilter,
          filter: "includes",
          filterable: true,
        },
        {
          Header: 'Senast uppdaterad',
          accessor: 'col5',
          filterable: false,
        },
        {
          Header: 'Uppdaterad av',
          accessor: 'col6',
          filterable: false,
        },
      ],
      []
    )
  
    const filterTypes = useMemo(
      () => ({
        // Add a new fuzzyTextFilterFn filter type.
        // Or, override the default text filter to use
        // "startWith"
        text: (rows, id, filterValue) => {
          return rows.filter(row => {
            const rowValue = row.values[id]
            return rowValue !== undefined
              ? String(rowValue)
                  .toLowerCase()
                  .startsWith(String(filterValue).toLowerCase())
              : true
          })
        },
      }),
      []
    )
  
    const defaultColumn = useMemo(
      () => ({
        // Let's set up our default Filter UI
        Filter: DefaultColumnFilter,
      }),
      []
    )
  
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        visibleColumns,
        preGlobalFilteredRows,
        setGlobalFilter,
    } = useTable(
      {
        columns,
        data,
        defaultColumn, // Be sure to pass the defaultColumn option
        filterTypes,
      },
      useFilters, // useFilters!
      useGlobalFilter // useGlobalFilter!
    )

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
                    GlobalFilter={GlobalFilter}
                    state={state}
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    setGlobalFilter={setGlobalFilter}
                    headerGroups={headerGroups}
                    visibleColumns={visibleColumns}
                /> 
            </div>
        </div>

        <div className="flex justify-center">
            <div className="w-10/12 mt-3 p-2">
                <div style={{ minHeight: 480, width: '100%' }}>
                    <table {...getTableProps()} style={{ width: "100%", overflowY: "scroll" }}>
                        <thead>
                        {headerGroups.map(headerGroup => (
                            <tr style={{ height: "60px" }} {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th
                                {...column.getHeaderProps()}
                                style={{
                                background: '#275E8E',
                                color: '#FFF',
                                fontWeight: '700',
                                fontSize: "15px",
                                textAlign: "center",
                                }}
                            >
                                {column.render('Header')}
                                </th>
                            ))}
                            </tr>
                        ))}
                        <tr>
                            <th
                            colSpan={visibleColumns.length}
                            style={{
                                textAlign: 'left',
                            }}
                            >
                            
                            </th>
                        </tr>
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {rows.map((row, i) => {
                                prepareRow(row)
                                return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                    return <td
                                    {...cell.getCellProps()}
                                    style={{
                                        padding: '10px',
                                        background: row.index % 2 === 1 ? '#E5E5E5' : '#FFF',
                                        textAlign: "center",
                                    }}
                                >
                                    { cell.render('Cell') }
                                </td>
                                    })}
                                </tr>
                                )
                            })}
                        </tbody>
                    </table>
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