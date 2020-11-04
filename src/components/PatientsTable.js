import React, { useMemo } from "react";

import { useTable, useFilters, useGlobalFilter } from 'react-table'

// A couple of things, cell 0s should turn into blobs instead of writing their value out,
// it should also be able to understand if there is a alarm thingy triggered, and if so, render that
// next to the appropriate row. Also overscroll should be available for bigger datasets, need to read up
// on react-table. 

const PatientsTable = (GlobalFilter, DefaultColumnFilter, NumberRangeColumnFilter, SelectColumnFilter) => {
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
        filter: "includes"
      },
      {
        Header: 'Namn',
        accessor: 'col2',
      },
      {
        Header: 'Personnummer',
        accessor: 'col3',
        Filter: NumberRangeColumnFilter,
        filter: "between"
      },
      {
        Header: 'Diagnos',
        accessor: 'col4',
        Filter: SelectColumnFilter,
        filter: "includes"
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
    [SelectColumnFilter, NumberRangeColumnFilter]
  )

  const filterTypes = React.useMemo(
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

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    [DefaultColumnFilter]
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,
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
      <table {...getTableProps()} style={{ width: "100%", maxHeight: "100px", overflowY: "scroll" }}>
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
  </>
  );
};

export default PatientsTable;

