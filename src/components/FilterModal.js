import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Modal, Button, FormControl, InputLabel, Select, TextField, MenuItem, FormControlLabel, FormGroup, FormLabel, Checkbox  } from '@material-ui/core';
import { FilterList } from '@material-ui/icons';

    // Placement of the triggered modal
    const getModalStyle = () => {

        const top = 50;
        const left = 50;

        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }

    // Styling of the triggered modal
    const useStyles = makeStyles((theme) => ({
        paper: {
            position: 'absolute',
            backgroundColor: theme.palette.background.paper,
            border: '3px solid #0066B3',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            borderRadius: '30px',
        },
    }));


  const FilterModal = () => {

    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
  
    const [customFilter, setCustomFilter] = useState({
        minAge: 0,
        maxAge: 100,
        gender: '',
        team: '',
        department: '',
        priority: {low: false, average: false, high: false}, // Either low, medium, high, undefined (translated to 3, 2, 1, 0)
        diagnosis: [],
    })

    // Handles opening of modal window
    const handleOpen = () => {
      setOpen(true);
    };
    
    // Handles closing of modal window
    const handleClose = () => {
      setOpen(false);
    };
    
    // General function for handling inputs/changes to the modal form
    const handleChange = (event) => {
        const name = event.target.name;
        
        if (name === "low") {
            setCustomFilter({
                ...setCustomFilter,
                priority: {low: !customFilter.priority.low, average: customFilter.priority.average, high: customFilter.priority.high}
            })
        } else if (name === "average") {
            setCustomFilter({
                ...setCustomFilter,
                priority: {low: customFilter.priority.low, average: !customFilter.priority.average, high: customFilter.priority.high}
            })
        } else if (name === "high") {
            setCustomFilter({
                ...setCustomFilter,
                priority: {low: customFilter.priority.low, average: customFilter.priority.average, high: !customFilter.priority.high}
            })
        } else {
            setCustomFilter({
                ...customFilter,
                [name]: event.target.value,
            })
        }
      };
    

    const selectWidth = '200px';

      return (
          <>
            <Button onClick={handleOpen} className='shadow' style={{ borderRadius: '0', backgroundColor: '#FFF', marginRight: '1.5rem' }}>
                    Filtrera
                <FilterList style={{ marginLeft: '8px', fontSize: '16px' }} />
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-title'
            >
                <div style={modalStyle} className={classes.paper}>
                    <h2 className='font-bold p-2 mt-2' id='modal-title'>Filtrera</h2>
                
                    <div className='flex-col items-start'>
                        <div className='flex mt-4 p-2'>
                            <TextField
                                className='mr-4'
                                id='min-age'
                                label='Min ålder'
                                type='number'
                                style={{width: selectWidth}}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{name: 'minAge'}}
                                value={customFilter.minAge}
                                onChange={handleChange}
                            />
                            <TextField
                                id='max-age'
                                label='Max ålder'
                                type='number'
                                style={{width: selectWidth}}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{name: 'maxAge'}}
                                value={customFilter.maxAge}
                                onChange={handleChange}
                            />
                        </div>
                        
                        <div className='flex-col p-2'>
                            <FormControl className='mt-2' style={{width: '100%'}} variant='outlined'>
                                <InputLabel>Kön</InputLabel>
                                <Select
                                    labelId='demo-simple-select-outlined-label'
                                    id='demo-simple-select-outlined'
                                    value={customFilter.gender}
                                    onChange={handleChange}
                                    label='Gender'
                                    inputProps={{name: 'gender'}}
                                    style={{ width: selectWidth }}

                                >
                                    <MenuItem value=''>
                                        <em>All</em>
                                    </MenuItem>
                                    <MenuItem value={'Male'}>Male</MenuItem>
                                    <MenuItem value={'Female'}>Female</MenuItem>
                                </Select>
                            </FormControl>
                            
                            <FormControl className='mt-2' style={{width: '100%'}} variant='outlined'>
                                <InputLabel>Team</InputLabel>
                                <Select
                                    labelId='demo-simple-select-outlined-label'
                                    id='demo-simple-select-outlined'
                                    value={customFilter.team}
                                    onChange={handleChange}
                                    label='Team'
                                    inputProps={{name: 'team'}}
                                    style={{ width: selectWidth }}

                                >
                                    <MenuItem value=''>
                                        <em>All</em>
                                    </MenuItem>
                                    <MenuItem value={'Team 1'}>Team 1</MenuItem>
                                    <MenuItem value={'Team 2'}>Team 2</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl className='mt-2' style={{width: '100%'}} variant='outlined'>
                                <InputLabel>Department</InputLabel>
                                <Select
                                    labelId='demo-simple-select-outlined-label'
                                    id='demo-simple-select-outlined'
                                    value={customFilter.department}
                                    onChange={handleChange}
                                    label='Department'
                                    inputProps={{name: 'department'}}
                                    style={{ width: selectWidth }}

                                >
                                    <MenuItem value=''>
                                        <em>All</em>
                                    </MenuItem>
                                    <MenuItem value={'Department 1'}>Department 1</MenuItem>
                                    <MenuItem value={'Department 2'}>Department 2</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl className='mt-4 ml-3' component="fieldset">
                                <FormLabel component="legend" style={{color: '#000'}}>Prioritet</FormLabel>
                                <FormGroup className='ml-3'>
                                <FormControlLabel
                                    control={<Checkbox checked={customFilter.priority.low} onChange={handleChange} name="low" />}
                                    label="Låg"
                                    style={{marginBottom: "0px"}}
                                    />
                                <FormControlLabel
                                    control={<Checkbox checked={customFilter.priority.average} onChange={handleChange} name="average"/>}
                                    label="Medel"
                                    style={{marginBottom: "0px"}}
                                    />
                                <FormControlLabel
                                    control={<Checkbox checked={customFilter.priority.high} onChange={handleChange} name="high" />}
                                    label="Hög"
                                    style={{marginBottom: "0px"}}
                                    />
                                </FormGroup>
                            </FormControl>
                        
                        </div>


                    </div>
                    <Button className='shadow' style={{float: 'right', width: '120px'}} onClick={handleClose}>Ok</Button>
                </div>
            </Modal>
          </>
      );
    }

export default FilterModal;

