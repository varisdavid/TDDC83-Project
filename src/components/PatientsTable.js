import React from "react";

import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import { ArrowDropUp, ArrowDropDown } from "@material-ui/icons";
import { useVirtual } from "react-virtual";

// Takes a priority (value: integer) and renders a visual blob 
const Blob = ({value}) => {

  var color;
  var text;

  if (value === 1) {
    color = "#FF6464";
    text = "Röd"
  } else if (value === 2) {
    color = "#FED765";
    text = "Gul"
  } else if (value === 3) {
    color = "#27AE60";
    text = "Grön"
  } else {
    return;
  }

  return (
    <div style={{
      backgroundColor: color,
      marginRight: "auto",
      marginLeft: "auto",
      borderRadius: "15px",
      width: "90px", 
      height: "27px"}}>
        <span style={{lineHeight: "27px", color: "rgba(0, 0, 0, 0.87)", }}>{text}</span>
    </div>
  )
}

// Renders a table based on props passed down from useTable
const PatientsTable = ({
  getTableProps, 
  getTableBodyProps, 
  headerGroups, 
  rows, 
  prepareRow, 
  }) => {
  
  // Used for keeping track on the wrapper div (needed for virtualization)
  const parentRef = React.useRef();

  // Using package "react-virtual" for virtualization of 
  // the table, give it rows.length for how many rows there should be
  // its ref to outer div and the estimated size. 
  const rowVirtualizer = useVirtual({
    size: rows.length,
    parentRef,
    estimateSize: React.useCallback(() => 15, [])
  });

  return (
  <>   
      <Table {...getTableProps()} >
        <TableHead>
        {headerGroups.map(headerGroup => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, columnIndex) => (
                <TableCell
                  {...column.getHeaderProps()}
                  style={{
                    width: (columnIndex === 0) ? "45px" : "16.66667%", //Make first column fixed size
                    background: (columnIndex === 0) ? "#FFF" : '#275E8E', //Make first column invisible
                    borderColor: (columnIndex === 0) && "#FFF", //Make first column invisible
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
          <div
            ref={parentRef}
            style={{
              display: "block",
              height: `calc(100vh - 520px)`, //calculated other parts to height of 520 + spacing, so table gets whats left
              overflow: "auto",
              width: `100%`
            }}
          >
          <TableBody
            {...getTableBodyProps}
            className="ListInner"
            style={{
              display: "block",
              height: `${rowVirtualizer.totalSize}px`,
              position: "relative"
            }}
          >
            {rowVirtualizer.virtualItems.map(virtualRow => {
              const row = rows[virtualRow.index];
              prepareRow(row);
              return (
                <TableRow 
                key={virtualRow.index}
                ref={virtualRow.measureRef}
                {...row.getRowProps({
                  style: {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    transform: `translateY(${virtualRow.start}px)`,
                    background: (virtualRow.index % 2) ? '#E5E5E5' : '#FFF',
                  }
                })}
              >
                  
                    {row.cells.map((cell, cellIndex) => {
                    return (
                      <TableCell {...cell.getCellProps()} style={{padding: '10px', 
                                                                  textAlign: "center", 
                                                                  width: (cellIndex === 0) ? '45px' : "18%", //To make first column fixed size
                                                                  background: (cellIndex === 0) && '#FFF', //To make first column invisible
                                                                  borderColor: (cellIndex === 0) && '#FFF', //To make first column invisible
                                                                }}>

                        { (cellIndex === 1 && cell.value === 1) && <Blob value={1}/> }
                        { (cellIndex === 1 && cell.value === 2) && <Blob value={2}/> }
                        { (cellIndex === 1 && cell.value === 3) && <Blob value={3}/> }
                        {/* { (cell.value.length > 1) && cell.value.join() } */}
                        { cellIndex !== 1 && cell.render('Cell')}
                      </TableCell>
                    )
                    
                    })}
                </TableRow>
              )}
            )}
          </TableBody>
        </div>
    </Table>
  </>
  );
};

export default PatientsTable;

