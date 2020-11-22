import React, {useMemo, useState} from 'react';
import {BloodPressure} from "..";
import {Button, Link, Modal, Table, TableBody, TableCell, TableHead, TableRow, Tooltip} from "@material-ui/core";
import {ArrowDropDown, ArrowDropUp} from "@material-ui/icons";
import {useFlexLayout, useTable} from "react-table";
import {useVirtual} from "react-virtual";
import {NotificationImportant} from '@material-ui/icons';
import {useHistory} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";

const BloodPressurePage = () => {
    // Component rendering bell icon (color based on value: integer) and hover information based on (text: string)
    const Notification = ({value, text}) => {

        var color;
        if (value === 1) {
            color = '#FF6464';
        } else if (value === 2) {
            color = '#FED765';
        } else if (value === 3) {
            color = '#27AE60';
        } else if (value === 0) {
            color = '#FFF'; // This is for rendering bug, empty cell not taking same space.
        }

        const classes = useStyles();
        // getModalStyle is not a pure function, we roll the style only on the first render
        const [modalStyle] = useState(getModalStyle);

        const href= "";
        const history = useHistory();

        // Keeps track of whether or not the popup for navigating to specific patient view has been toggled.
        const [openPatientViewConfirm, setOpenPatientViewConfirm] = useState(false);

        // Handles opening of modal window
        const handleOpenConfirmation = () => {
            setOpenPatientViewConfirm(true);
        };

        // Handles closing of modal window
        const handleCloseConfirmation = () => {
            setOpenPatientViewConfirm(false); // Close modal
        };

        const navigateToPatientView = () => {
            history.push(href);
            setOpenPatientViewConfirm(false); // Close modal
        };

        const ConfirmWarning = () => {

            return (
                <Modal
                    open={openPatientViewConfirm}
                    onClose={handleCloseConfirmation}
                    aria-labelledby='modal-popup'
                >
                    <div key="modal-popup-div" style={modalStyle} className={classes.paper}>
                        <NotificationImportant style={{
                            color: color,
                            fontSize: '30px',
                        }}/>
                        <text className='font-bold mt-2' id='modal-popup'>Uppmärksammat mätvärde</text>
                        <h2 className='font-bold mt-3' id='modal-popup'>/sätt in datum/ uppmättes vikten /vikt/ av /person/ ?</h2>
                        <h2 className='font-bold mt-3 flex justify-center' id='modal-popup'> Vill du hantera mätvärdet?</h2>
                        <div className="flex" style={{width: "100%"}}>
                            <Button
                                className='flex shadow'
                                style={{ border: '2px solid #0066B3', borderRadius: "0px", width: '110px', marginLeft: "auto", marginRight: "auto", marginTop: "1.5rem"}}
                                onClick={handleCloseConfirmation}>
                                Avbryt
                            </Button>
                            <Button
                                className='flex shadow'
                                style={{ border: '2px solid #0066B3', borderRadius: "0px", width: '110px', marginLeft: "auto", marginRight: "auto", marginTop: "1.5rem"}}
                                onClick={navigateToPatientView}>
                                Kvittera
                            </Button>
                        </div>
                    </div>
                </Modal>
            );
        }


        return (
            <>
                <Link
                    component="button"
                    style={{color: "#000"}}
                    onClick={handleOpenConfirmation}
                >
            <Tooltip title={text} placement='left-start'>
                <NotificationImportant style={{
                    color: color,
                    fontSize: '30px',
                }}
                />
            </Tooltip>

                </Link>
                <ConfirmWarning />
                </>

        )
    }

    // Used to fix the placement of the triggered modal
    const getModalStyle = () => {

        const top = 50;
        const left = 50;

        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }
    // Styling of the triggered modal + the text and select fields.
    const useStyles = makeStyles((theme) => ({
        paper: {
            maxWidth: '600px',
            position: 'absolute',
            backgroundColor: theme.palette.background.paper,
            border: '3px solid #0066B3',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }));

    //Fake data to the table rendering below
    const data = useMemo(
        () => [

            {
                notices: <Notification value={1} text={'Oväntat skattat värde! Vikt: 30 kg (28 kg under förväntat värde)'}/>,
                Date: '2020-05-18',
                BloodPressure: '135/80',
                UpdatedBy: 'Patient',
            },
            {
                notices: <Notification value={1} text={'Oväntat skattat värde! Vikt: 30 kg (28 kg under förväntat värde)'}/>,
                Date: '2020-06-13',
                BloodPressure: '135/80',
                UpdatedBy: 'Patient',
            },
            {
                notices: <Notification value={1} text={'Oväntat skattat värde! Vikt: 30 kg (28 kg under förväntat värde)'}/>,
                Date: '2020-07-25',
                BloodPressure: '135/80',
                UpdatedBy: 'Vårdpersonal',
            },
            {
                notices: <Notification value={2} text={'Oväntat skattat värde! Vikt: 30 kg (28 kg under förväntat värde)'}/>,
                Date: '2020-09-01',
                BloodPressure: '135/80',
                UpdatedBy: 'Vårdoersonal',
            },
            {
                notices: <Notification value={0} text={'Oväntat skattat värde! Vikt: 30 kg (28 kg under förväntat värde)'}/>,
                Date: '2020-09-10',
                BloodPressure: '135/80',
                UpdatedBy: 'Patient',
            },
            {
                notices: <Notification value={3} text={'Oväntat skattat värde! Vikt: 30 kg (28 kg under förväntat värde)'}/>,
                Date: '2020-10-02',
                BloodPressure: '135/80',
                UpdatedBy: 'Vårdpersonal',
            },
            {
                notices: <Notification value={2} text={'Oväntat skattat värde! Vikt: 30 kg (28 kg under förväntat värde)'}/>,
                Date: '2020-10-10',
                BloodPressure: '135/80',
                UpdatedBy: 'Patient',
            },
        ],
        []
    )

    //Setting the table heads in the table as well as which data goes where
    const columns = useMemo(
        () => [
            {
                Header: '',
                accessor: 'notices',
            },

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
            {/* Setting up the big div on the page */}
            <div className='flex justify-center' style={{height: '50vh'}}>
                {/* div to dived the page in two parts*/}
                <div style={{width: '50%'}}> 
                    {/* The blood pressure chart  */}
                    <div style={{height: '80%'}}>
                    <BloodPressure/>
                    </div>
                    {/*The button below the chart with its styling*/}
                    <div>
                    <Button
                        className='flex shadow'
                        style={{
                            border: '0.5px solid lightgrey',
                            borderRadius: "0px",
                            width: '180px',
                            marginLeft: "auto",
                            marginRight: "auto",
                            marginTop: "1.5rem",
                        }}>
                        Ändra intervall
                    </Button>
                    {/*The checkbox next to the button below the chart*/}
                    <input
                        type='checkbox'
                        style={{
                            marginLeft: "10px",
                            marginRight: "auto",
                        }}/>
                    <text> Visa intervall</text>
                    </div>
                </div>

                <div>
                    {/* This is the Table which get its data from the data constant above */}
                    <Table {...getTableProps()}>
                        <TableHead>
                            {headerGroups.map(headerGroup => (
                                <TableRow {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column, columnIndex) => (
                                        <TableCell
                                            {...column.getHeaderProps()}
                                            style={{
                                                width: (columnIndex === 0) ? '45px' : '30%', //Make first column fixed size
                                                background: (columnIndex === 0) ? '#FFF' : '#275E8E', //Make first column invisible
                                                borderColor: (columnIndex === 0) && '#FFF', //Make first column invisible
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

                                                {row.cells.map((cell, cellIndex) => {
                                                    return (
                                                        <TableCell {...cell.getCellProps()} style={{
                                                            padding: '10px',
                                                            textAlign: 'center',
                                                            width: (cellIndex === 0) ? '45px' : '30%', //To make first column fixed size
                                                            background: (cellIndex === 0) && '#FFF', //To make first column invisible
                                                            borderColor: (cellIndex === 0) && '#FFF', //To make first column invisible
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

                    {/*The form which contains a header and two inputs and a button and styling */}
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

export default BloodPressurePage;