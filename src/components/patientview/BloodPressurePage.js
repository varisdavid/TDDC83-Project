import React, {useMemo} from 'react';
import {BloodPressure} from "..";
import {Button, Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import {ArrowDropDown, ArrowDropUp} from "@material-ui/icons";
import {useFlexLayout, useTable} from "react-table";
import {useVirtual} from "react-virtual";

const BloodPressurePage = () => {
    const data = useMemo(
        () => [

            {
                Date: '2020-05-18',
                BloodPressure: '135/80',
                UpdatedBy: 'Patient',
            },
            {
                Date: '2020-06-13',
                BloodPressure: '135/80',
                UpdatedBy: 'Patient',
            },
            {
                Date: '2020-07-25',
                BloodPressure: '135/80',
                UpdatedBy: 'Vårdpersonal',
            },
            {
                Date: '2020-09-01',
                BloodPressure: '135/80',
                UpdatedBy: 'Vårdoersonal',
            },
            {
                Date: '2020-09-10',
                BloodPressure: '135/80',
                UpdatedBy: 'Patient',
            },
            {
                Date: '2020-10-02',
                BloodPressure: '135/80',
                UpdatedBy: 'Vårdpersonal',
            },
            {
                Date: '2020-10-10',
                BloodPressure: '135/80',
                UpdatedBy: 'Patient',
            },
        ],
        []
    )

    const columns = useMemo(
        () => [

            {
                Header: 'Datum',
                accessor: 'Date',
            },
            {
                Header: 'Blodtryck',
                accessor: 'BloodPressure',
            },
            {
                Header: 'Uppdaterades Av',
                accessor: 'UpdatedBy',
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
    } = useTable({columns, data},
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
        <>
            <div className='flex justify-center'>
                <div>
                    <BloodPressure/>
                </div>

                <div>
                    <Table {...getTableProps()} style={{boxShadow: "5px 7px 20px lightgrey"}}>
                        <TableHead>
                            {headerGroups.map(headerGroup => (
                                <TableRow {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column) => (
                                        <TableCell
                                            {...column.getHeaderProps()}
                                            style={{
                                                width: '100%', //Make first column fixed size
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
                                                            width: '100%', //To make first column fixed size
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

                    <form style={{
                        border: '1px solid lightgrey',
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginTop: "1.5rem",
                        boxShadow: "5px 7px 20px lightgrey",

                    }}>
                        <h1 style={{
                            marginLeft: "10px",
                            marginRight: "10px",
                            marginTop: "10px",
                            fontWeight: "500"
                        }}>Uppdatera
                            information</h1>
                        <br/>
                        <text style={{
                            marginLeft: "10px",
                            marginRight: "10px",
                            marginTop: "10px"
                        }}>Datum:</text>
                        <input style={{
                            border: '1px solid lightgrey',
                            marginLeft: "auto",
                            marginRight: "auto",
                            boxShadow: "inset 0 2px 3px lightgrey"
                        }} name="date"/>
                        <br/>
                        <text style={{
                            marginLeft: "10px",
                            marginRight: "10px",
                            marginTop: "10px"
                        }}>Fyll i ny uppmätt
                            blodtryck:
                        </text>
                        <input style={{
                            border: '1px solid lightgrey',
                            marginLeft: "auto",
                            marginRight: "20px",
                            marginTop: "1.5rem",
                            boxShadow: "inset 0 2px 3px lightgrey",
                        }} name="BloodPressureMeasurement"/>
                        <br/>
                        <div align='right' style={{
                            marginRight:"10px",
                            marginBottom:"10px"
                        }}>
                            <Button
                                className='flex shadow'
                                style={{
                                    border: '2px solid #0066B3',
                                    borderRadius: "0px",
                                    width: '110px',
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                    marginTop: "1.5rem",
                                }}>
                                Bekräfta
                            </Button>
                        </div>
                    </form>


                </div>
            </div>
        </>
    );

};

export default BloodPressurePage;