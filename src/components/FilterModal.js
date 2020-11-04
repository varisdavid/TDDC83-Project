import React, { useState } from "react";

import { makeStyles } from '@material-ui/core/styles';
import { Modal, Button } from '@material-ui/core';
import { FilterList } from '@material-ui/icons';

    function rand() {
        return Math.round(Math.random() * 20) - 10;
    }
    
    function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
    }

    const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    }));


  const FilterModal = ({NumberRangeColumnFilter, 
                        SelectColumnFilter, 
                        GlobalFilter,
                        state,
                        preGlobalFilteredRows, 
                        setGlobalFilter,
                        headerGroups,
                        visibleColumns}) => {

    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h2 className="font-bold" id="simple-modal-title">Filtrera</h2>
          
            <div>
                {headerGroups.map(headerGroup => (
                    <div {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <div {...column.getHeaderProps()}>
                        {column.filterable ? column.render('Header') : null}
                        {/* Render the columns filter UI */}
                        <div>{column.filterable ? column.render('Filter') : null}</div>
                        </div>
                    ))}
                    </div>
                ))}
                <tr>
                    <th
                    colSpan={visibleColumns.length}
                    style={{
                        textAlign: 'left',
                    }}
                    >
                    <GlobalFilter
                        preGlobalFilteredRows={preGlobalFilteredRows}
                        globalFilter={state.globalFilter}
                        setGlobalFilter={setGlobalFilter}
                    />
                    </th>
                </tr>
            </div>


            <Button onClick={handleClose}>Ok</Button>
        </div>
      );
    
      return (
          <>
            <Button onClick={handleOpen} className="shadow" style={{ borderRadius: "0", backgroundColor: "#FFF", marginRight: "1.5rem" }}>
                    Filtrera
                <FilterList style={{ marginLeft: "8px", fontSize: "16px" }} />
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
          </>
      );
    }

export default FilterModal;

