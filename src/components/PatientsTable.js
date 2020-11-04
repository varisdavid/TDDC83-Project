import React from "react";

import { ArrowDropUp, ArrowDropDown } from "@material-ui/icons";

// A couple of things, cell 0s should turn into blobs instead of writing their value out,
// it should also be able to understand if there is a alarm thingy triggered, and if so, render that
// next to the appropriate row. Also overscroll should be available for bigger datasets, need to read up
// on react-table. 

const PatientsTable = ({getTableProps, getTableBodyProps, headerGroups, rows, prepareRow}) => {
  
  return (
  <>   
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
                <span>
                  {column.isSorted
                    ? column.isSortedDesc
                      ? <ArrowDropUp style={{fontSize: "15px" }} />
                      : <ArrowDropDown style={{fontSize: "15px" }} />
                    : ''}
                </span>
                </th>
            ))}
            </tr>
        ))}
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

