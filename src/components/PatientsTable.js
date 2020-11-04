import React from "react";

import { Table as MaUTable, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import { ArrowDropUp, ArrowDropDown } from "@material-ui/icons";

// A couple of things, cell 0s should turn into blobs instead of writing their value out,
// it should also be able to understand if there is a alarm thingy triggered, and if so, render that
// next to the appropriate row. Also overscroll should be available for bigger datasets, need to read up
// on react-table. 

const PatientsTable = ({getTableProps, getTableBodyProps, headerGroups, rows, prepareRow}) => {
  
  return (
  <>   
      <MaUTable {...getTableProps()} style={{ width: "100%", overflowY: "scroll" }}>
        <TableHead>
        {headerGroups.map(headerGroup => (
            <TableRow style={{ height: "60px" }} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
                <TableCell
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
                </TableCell>
            ))}
            </TableRow>
        ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
            {rows.map((row, i) => {
                prepareRow(row)
                return (
                <TableRow {...row.getRowProps()}>
                    {row.cells.map(cell => {
                    
                    return (
                      <TableCell
                        {...cell.getCellProps()}
                        style={{
                            padding: '10px',
                            background: row.index % 2 === 1 ? '#E5E5E5' : '#FFF',
                            textAlign: "center",
                        }}
                       >
                        { cell.render('Cell') }
                      </TableCell>
                    )
                    
                    })}

                </TableRow>
                )
            })}
        </TableBody>
    </MaUTable>
  </>
  );
};

export default PatientsTable;

