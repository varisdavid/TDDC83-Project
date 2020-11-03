import React, { useMemo } from "react";

import { useTable } from 'react-table'

// A couple of things, cell 0s should turn into blobs instead of writing their value out,
// it should also be able to understand if there is a alarm thingy triggered, and if so, render that
// next to the appropriate row. Also overscroll should be available for bigger datasets, need to read up
// on react-table. 

const PatientsTable = () => {

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
          },
          {
            Header: 'Namn',
            accessor: 'col2',
          },
          {
            Header: 'Personnummer',
            accessor: 'col3',
          },
          {
            Header: 'Diagnos',
            accessor: 'col4',
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

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = useTable({ columns, data })
   
    return (
    <>
        <table {...getTableProps()} style={{ width: "100%", overflowY: "auto" }}>
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
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                prepareRow(row)
                return (
                    <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                        return (
                        <td
                            {...cell.getCellProps()}
                            style={{
                                padding: '10px',
                                background: row.index % 2 === 1 ? '#E5E5E5' : '#FFF',
                                textAlign: "center",
                            }}
                        >
                            { cell.render('Cell') }
                        </td>
                        )
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

