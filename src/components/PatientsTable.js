import React from "react";

import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import { ArrowDropUp, ArrowDropDown } from "@material-ui/icons";

import { useVirtual } from "react-virtual";


const PatientsTable = ({
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
            {headerGroup.headers.map(column => (
                <TableCell
                  {...column.getHeaderProps()}
                  style={{
                    width: "16.66667%",
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
        <div
          ref={parentRef}
          style={{
            display: "block",
            height: `calc(100vh - 520px)`,
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
                    <TableCell
                      {...cell.getCellProps()}
                      style={{
                          padding: '10px',
                          textAlign: "center",
                          width: "18%",
                      }}
                      >
                      {((cellIndex === 0) && (cell.value === "1")) &&
                      <div style={{
                        backgroundColor: "#FF6464",
                        marginRight: "auto",
                        marginLeft: "auto",
                        borderRadius: "15px",
                        width: "90px", 
                        height: "27px"}}>
                      </div>
                      }
      
                      {((cellIndex === 0) && (cell.value === "2")) &&
                      <div style={{
                        backgroundColor: "#FED765",
                        marginRight: "auto",
                        marginLeft: "auto",
                        borderRadius: "15px", 
                        width: "90px", 
                        height: "27px"}}>
                      </div>
                      }
      
                      {((cellIndex === 0) && (cell.value === "3")) &&
                      <div style={{
                        backgroundColor: "#27AE60",
                        marginRight: "auto",
                        marginLeft: "auto",
                        borderRadius: "15px", 
                        width: "90px", 
                        height: "27px"}}>
                      </div>
                      }
      
                      {(cellIndex !== 0) && cell.render('Cell')}
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

export default PatientsTable;

