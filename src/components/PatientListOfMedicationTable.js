import React, {useMemo} from "react";

import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import { ArrowDropUp, ArrowDropDown } from '@material-ui/icons';
import { useVirtual } from 'react-virtual';

import { useTable, useFlexLayout} from 'react-table'

const PatientListOfMedicationTable = ({data}) => {


    const columns = useMemo(
        () => [

            {Header: 'Läkemedel',
                accessor:'Medication',
            },
            {Header: 'Dos',
                accessor:'Amount',
            },
            {Header: 'Intagsform',
                accessor:'Type',
            },
            {Header: 'Intag',
                accessor:'Dosage',
            },
            {Header: 'Kommentar',
                accessor:'Comments',
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
    } = useTable({ columns, data },
        useFlexLayout,
    );


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
        <Table {...getTableProps()} >
            <TableHead>
                {headerGroups.map(headerGroup => (
                    <TableRow {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <TableCell
                                {...column.getHeaderProps()}
                                style={{
                                    width: '20%', //Make first column fixed size
                                    background: '#275E8E', //Make first column invisible
                                    borderColor: '#FFF', //Make first column invisible
                                    color: '#FFF',
                                    fontWeight: '700',
                                    fontSize: '15px',
                                    textAlign: 'center',
                                }}
                            >
                                {column.render('Header')}
                                <span>
                              {column.isSorted
                                  ? column.isSortedDesc
                                      ? <ArrowDropUp style={{fontSize: '15px'}}/>
                                      : <ArrowDropDown style={{fontSize: '15px'}}/>
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

                                    {row.cells.map((cell) => {
                                        return (
                                            <TableCell {...cell.getCellProps()} style={{
                                                padding: '10px',
                                                textAlign: 'center',
                                                width: '20%', //To make first column fixed size
                                            }}>
                                                {cell.render('Cell')}
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
    );
};
export default PatientListOfMedicationTable;