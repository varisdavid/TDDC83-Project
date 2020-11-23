import React, {useMemo} from 'react';
import {WeightChart, TableForChart} from "..";
import {Button, Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import {ArrowDropDown, ArrowDropUp} from "@material-ui/icons";
import {useFlexLayout, useTable} from "react-table";
import {useVirtual} from "react-virtual";


const WeightChartPage = () => {
    //Fake data to be used in the table code below can be changed to real data
    const data = useMemo(
        () => [

            {
                Date: '2020-05-18',
                Weight: '65',
                UpdatedBy: 'Patient',
            },
            {
                Date: '2020-06-13',
                Weight: '62',
                UpdatedBy: 'Patient',
            },
            {
                Date: '2020-07-25',
                Weight: '67',
                UpdatedBy: 'Patient',
            },
            {
                Date: '2020-09-01',
                Weight: '63',
                UpdatedBy: 'Patient',
            },
            {
                Date: '2020-09-10',
                Weight: '66',
                UpdatedBy: 'Patient',
            },
            {
                Date: '2020-10-02',
                Weight: '30',
                UpdatedBy: 'Patient',
            },
            {
                Date: '2020-10-10',
                Weight: '67',
                UpdatedBy: 'Patient',
            },
        ],
        []
    )
    //setting the table head in the table below
    const columns = useMemo(
        () => [

            {
                Header: 'Datum',
                accessor: 'Date',
            },
            {
                Header: 'Vikt',
                accessor: 'Weight',
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
                    {/* This is the weight chart being displayed */}
                    <WeightChart/>
                </div>

                <div>
                    <TableForChart/>

                    {/* The form which you can fill in information about your weight does not save the data any where.
                     Contains two text fields and a button*/}
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
                        }}>Datum:
                        </text>
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
                            vikt:
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
                            marginRight: "10px",
                            marginBottom: "10px"
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

export default WeightChartPage;