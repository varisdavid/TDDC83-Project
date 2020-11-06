import React from "react";

import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import { ArrowDropUp, ArrowDropDown } from "@material-ui/icons";
import { useVirtual } from "react-virtual";

const Blob = ({value}) => {

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

  return (
    <div style={{
      backgroundColor: color,
      marginRight: "auto",
      marginLeft: "auto",
      borderRadius: "15px",
      width: "90px", 
      height: "27px"}}>
    </div>
  )
}

const NoticesTable = ({
  data,
  getTableProps, 
  getTableBodyProps, 
  headerGroups, 
  rows, 
  prepareRow, 
  }) => {
  
  const parentRef = React.useRef();
  const rowVirtualizer = useVirtual({
    size: data.length,
    parentRef,
    estimateSize: React.useCallback(() => 35, [])
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
                      { (cellIndex === 1 && cell.value === "1") && <Blob value={1}/> }
                      { (cellIndex === 1 && cell.value === "2") && <Blob value={2}/> }
                      { (cellIndex === 1 && cell.value === "3") && <Blob value={3}/> }
                      { cellIndex !== 1 && cell.render('Cell')}
                    </TableCell>
                  )
                  
                  })}
      
              </TableRow>
          )})}
        </TableBody>
      </div>
    </Table>
  </>
  );
};

export default NoticesTable;

