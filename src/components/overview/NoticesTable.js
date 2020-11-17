import React from 'react';

import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import { ArrowDropUp, ArrowDropDown } from '@material-ui/icons';
import { useVirtual } from 'react-virtual';
//import { RowCells } from '@material-ui/data-grid';

// Takes a priority (value: integer) and renders a visual blob 
const Prio = ({ value }) => {

  var color;
  var text;

  if (value === 1) {
    text = 'Hög'
  } else if (value === 2) {
    text = 'Medel'
  } else if (value === 3) {
    text = 'Låg'
  } else {
    return;
  }

  return (
    <div style={{
      backgroundColor: color,
      marginRight: 'auto',
      marginLeft: 'auto',
      borderRadius: '15px',
      width: '90px',
      height: '27px'
    }}>
      <span style={{ lineHeight: '27px', color: 'rgba(0, 0, 0, 0.87)', }}>{text}</span>
    </div>
  )
}

// Renders a table based on props passed down from useTable
const NoticesTable = ({
  getTableProps,
  getTableBodyProps,
  headerGroups,
  rows,
  prepareRow,
}) => {

  // Used for keeping track on the wrapper div (needed for virtualization)
  const parentRef = React.useRef();

  // Using package 'react-virtual' for virtualization of 
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
                    width: (columnIndex === 3) ? '700px' : '16.66669%', // Makes column "Notis" fixed size.
                    background: '#275E8E',
                    color: '#FFF',
                    fontWeight: '700',
                    fontSize: '15px',
                    textAlign: (columnIndex === 4) ? 'center' : 'left',
                  }}
                >
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? <ArrowDropUp style={{ fontSize: '15px' }} />
                        : <ArrowDropDown style={{ fontSize: '15px' }} />
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
            display: 'block',
            maxHeight: `calc(100vh - 620px)`, //calculated other parts to height of 520 + spacing, so table gets whats left
            overflow: 'auto',
            width: `100%`
          }}
        >
          <TableBody
            {...getTableBodyProps}
            className='ListInner'
            style={{
              display: 'block',
              height: `${rowVirtualizer.totalSize}px`,
              position: 'relative'
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
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      transform: `translateY(${virtualRow.start}px)`,
                      background: (virtualRow.index % 2) ? '#E5E5E5' : '#FFF',
                    }
                  })}
                >
                  {row.cells.map((cell, cellIndex) => {
                    return (
                      <TableCell {...cell.getCellProps()} style={{
                        padding: '10px',
                        textAlign: (cellIndex === 4) ? 'center' : 'left',
                        width: (cellIndex === 3) ? '700px' : '18%', //Makes column "Notis" fixed size.
                      }}>
                        { (cellIndex === 4 && cell.value === 1) && <Prio value={1} />}
                        { (cellIndex === 4 && cell.value === 2) && <Prio value={2} />}
                        { (cellIndex === 4 && cell.value === 3) && <Prio value={3} />}
                        { (cellIndex === 4 && cell.value === 4) && <Prio value={3} />}
                        { (cellIndex != 4) && cell.render('Cell')}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            }
            )}
          </TableBody>
        </div>
      </Table>
    </>
  );
};

export default NoticesTable;

