import React, {useMemo, useState} from 'react';
import {Button, Link, Modal, Table, TableBody, TableCell, TableHead, TableRow, Tooltip} from "@material-ui/core";
import {ArrowDropDown, ArrowDropUp} from "@material-ui/icons";
import {useFlexLayout, useTable} from "react-table";
import {useVirtual} from "react-virtual";
import {NotificationImportant} from '@material-ui/icons';
import {useHistory} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";

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


// Renders a table based on props passed down from useTable
const TableForChart = ({
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
        </>
    );
};

export default TableForChart;

