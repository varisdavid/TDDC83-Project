import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, 
        Button, 
        FormControl, 
        InputLabel, 
        InputAdornment, 
        Input, 
        Select, 
        TextField, 
        MenuItem, 
        FormControlLabel, 
        FormGroup, 
        FormLabel, 
        Checkbox, 
        ListItem, 
        ListItemIcon, 
        ListItemText} from '@material-ui/core';
import { FilterList, Search } from '@material-ui/icons';

// Temporary search data
const data = ['Diabetes', 'Hypertoni']

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
    textField: {
        width: '90%',
        marginRight: '1rem',
        '& .MuiFormLabel-root': {
            color: '#0066B3',
        },
        '& .MuiInputBase-input': {
            color: '#0066B3',
        },
        '& label.Mui-focused': {
          color: '#0066B3',
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: '#0066B3',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#0066B3',
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#0066B3',
          },
          '&:hover fieldset': {
            borderColor: '#0066B3',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#0066B3',
          },
        },
    },
    select: {
        width: "90%",
        marginTop: "2rem",
        '& .Mui-focused': {
            color: "#0066B3",
        },
        '& .MuiFormLabel-root.Mui-focused': {
            color: "#0066B3",
        },
        '& .MuiOutlinedInput-notchedOutline': {
            color: "#0066B3",
        },
        "& .MuiOutlinedInput-input": {
            color: "#0066B3"
        },
        "& .MuiInputLabel-root": {
            color: "#0066B3"
        },
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#0066B3"
        },
        "&:hover .MuiOutlinedInput-input": {
            color: "#0066B3"
        },
        "&:hover .MuiInputLabel-root": {
            color: "#0066B3"
        },
        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#0066B3"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
            color: "#0066B3"
        },
        "& .MuiInputLabel-root.Mui-focused": {
            color: "#0066B3"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#0066B3"
        }
    },
    paper: {
        maxWidth: '600px',
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        border: '3px solid #0066B3',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        borderRadius: '30px',
    },
}));


const FilterModal = ({setDropdownOpen, customFilterData, setCustomFilterData, setOwnFilters}) => {

    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);

    // Handles opening of modal window
    const handleOpen = () => {
        setDropdownOpen(false) // this is to make sure that if we open the modal and previously have accessed the sorting menu, the sorting menu closes.
        setOpen(true);
    };

    // Handles closing of modal window
    const handleClose = () => {
        setOpen(false);
    };

    // General function for handling inputs/changes to the modal form
    const handleChange = (event) => {
        const name = event.target.name;
        
        if (name === 'low') {
            setCustomFilterData({
                ...customFilterData,
                priority: {low: !customFilterData.priority.low, average: customFilterData.priority.average, high: customFilterData.priority.high}
            })
        } else if (name === 'average') {
            setCustomFilterData({
                ...customFilterData,
                priority: {low: customFilterData.priority.low, average: !customFilterData.priority.average, high: customFilterData.priority.high}
            })
        } else if (name === 'high') {
            setCustomFilterData({
                ...customFilterData,
                priority: {low: customFilterData.priority.low, average: customFilterData.priority.average, high: !customFilterData.priority.high}
            })
        } else if (name.includes("Age")) {
            setCustomFilterData({
                ...customFilterData,
                [name]: parseInt(event.target.value, 10),
            })
        } else {
            setCustomFilterData({
                ...customFilterData,
                [name]: event.target.value,
            })
        }
    };

    // Keeps track of our search value
    const [searchValue, setSearchValue] = useState('')

    // Handling dynamic search based on what is entered into the search field 
    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    // Keeps track of the list to be mapped
    const [diagnoses, setDiagnoses] = useState(data)

    // Handles the toggled checkboxes in our customFilterState. 
    const handleDiagnoseToggle = (value) => () => {
      const currentIndex = customFilterData.diagnoses.indexOf(value); // This will check if we already have choosen this
      const newChecked = customFilterData.diagnoses; // We copy over our array to a temporary one.

      // If we don't have it, we add it, else we remove it.
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
      setCustomFilterData({...customFilterData, diagnoses: [...newChecked]})
    };

    // Triggered when OK button pressed, closes the modal and sends the filterData to the table.
    const handleFinished = () => {
        setOwnFilters(customFilterData);
        handleClose()
    }

    // This will make changes to diagnoses as soon as the searchValue changes. 
    useEffect(() => {
        setDiagnoses(data.filter(diagnosis => diagnosis.toLowerCase().includes(searchValue.toLowerCase())))
    }, [customFilterData, searchValue])

    return (
        <>
        <Button onClick={handleOpen} >
            <FilterList style={{ fontSize: '25px' }} />
        </Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='modal-title'
        >
            <div style={modalStyle} className={classes.paper}>
                <h2 className='font-bold p-2 mt-2' id='modal-title'>Filtrera</h2>
            
                <div className='flex-col items-start'>
                    
                    {/* De tv?? f??rsta textf??lten */}
                    <div className='flex mt-4 p-2'>
                        <TextField
                            className={classes.textField}
                            id='min-age'
                            label='Min ??lder'
                            type='number'
                            InputLabelProps={{
                                shrink: true,
                                min: 0,
                                max: 200,
                            }}
                            inputProps={{name: 'minAge' }}
                            value={customFilterData.minAge}
                            onChange={handleChange}
                        />
                        <TextField
                            className={classes.textField}
                            id='max-age'
                            label='Max ??lder'
                            type='number'
                            InputLabelProps={{
                                shrink: true,
                                min: 0,
                                max: 200,
                            }}
                            inputProps={{name: 'maxAge'}}
                            value={customFilterData.maxAge}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Wrappar v??ra tv?? kolumner */}
                    <div className='flex'>
                        {/* De kommande 3 select f??lten + checkboxar */}
                        <div className='flex-col w-2/5 p-2 mr-2'>
                            <FormControl className={classes.select} variant='outlined'>
                                <InputLabel>K??n</InputLabel>
                                <Select
                                    labelId='demo-simple-select-outlined-label'
                                    id='demo-simple-select-outlined'
                                    value={customFilterData.gender}
                                    onChange={handleChange}
                                    label='Gender'
                                    inputProps={{name: 'gender'}}
                                >
                                    <MenuItem value={'all'}><em>Alla</em></MenuItem>
                                    <MenuItem value={'male'}>Man</MenuItem>
                                    <MenuItem value={'female'}>Kvinna</MenuItem>
                                </Select>
                            </FormControl>
                            
                            <FormControl className={classes.select} variant='outlined'>
                                <InputLabel>Team</InputLabel>
                                <Select
                                    labelId='demo-simple-select-outlined-label'
                                    id='demo-simple-select-outlined'
                                    value={customFilterData.team}
                                    onChange={handleChange}
                                    label='Team'
                                    inputProps={{name: 'team'}}
                                >
                                    <MenuItem value={'all'}><em>Alla</em></MenuItem>
                                    <MenuItem value={'Team 1'}>Team 1</MenuItem>
                                    <MenuItem value={'Team 2'}>Team 2</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl className={classes.select} variant='outlined'>
                                <InputLabel>Department</InputLabel>
                                <Select
                                    labelId='demo-simple-select-outlined-label'
                                    id='demo-simple-select-outlined'
                                    value={customFilterData.department}
                                    onChange={handleChange}
                                    label='Department'
                                    inputProps={{name: 'department'}}
                                    style={{ color: '#0066B3'}}

                                >
                                    <MenuItem value={'all'}><em>Alla</em></MenuItem>
                                    <MenuItem value={'Department 1'}>Department 1</MenuItem>
                                    <MenuItem value={'Department 2'}>Department 2</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl className='mt-4 ml-3' component='fieldset'>
                                <FormLabel component='legend' style={{color: '#000'}}>Prioritet</FormLabel>
                                <FormGroup className='ml-3'>
                                <FormControlLabel
                                    control={<Checkbox style={{color: '#0066B3',}} checked={customFilterData.priority.low} onChange={handleChange} name='low' />}
                                    label='L??g'
                                    style={{marginBottom: '0px'}}
                                    />
                                <FormControlLabel
                                    control={<Checkbox style={{color: '#0066B3',}} checked={customFilterData.priority.average} onChange={handleChange} name='average'/>}
                                    label='Medel'
                                    style={{marginBottom: '0px'}}
                                    />
                                <FormControlLabel
                                    control={<Checkbox style={{color: '#0066B3',}} checked={customFilterData.priority.high} onChange={handleChange} name='high' />}
                                    label='H??g'
                                    style={{marginBottom: '0px'}}
                                    />
                                </FormGroup>
                            </FormControl>
                        </div>
                        
                        {/* S??kf??lt + resultatruta */}
                        <div className='flex-col w-1/2 p-2 ml-4 mt-5 mb-5' style={{backgroundColor: 'rgba(169, 215, 255, 0.3)', borderRadius: '15px'}}>
                            <FormControl className='flex w-full mt-2' style={{height: 'auto'}}>
                                <InputLabel disabled className='flex m-2' style={{fontWeight: '400', color: '#000'}}>Diagnos:</InputLabel>
                                <Input
                                    disableUnderline
                                    className='flex text-gray-800'
                                    style={{ 
                                        fontSize: '12px',
                                        backgroundColor: '#FFF', 
                                        borderRadius: '25px 25px',
                                        borderHeight: '0',
                                        width: '70%',
                                        marginLeft: 'auto',
                                        marginRight: '5px',
                                        marginTop: '0px',
                                    }}
                                    onChange={handleSearchChange}
                                    value={searchValue}
                                    startAdornment={
                                    <InputAdornment position='start'>
                                        <Search style={{marginLeft: '5px', color: '#E0E0E0'}}/>
                                    </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <div style={{marginTop: '10px', width: '85%', marginLeft: 'auto', marginRight: 'auto', height: '70%', backgroundColor: '#FFFFFF'}}>
                            {diagnoses.map(item => {
                                const labelId = `checkbox-list-label-${item}`;

                                return (
                                  <ListItem key={item} style={{paddingTop: '0px', paddingBottom: '0px'}} role={undefined} button onClick={handleDiagnoseToggle(item)}>
                                    <ListItemIcon style={{minWidth: "0px"}}>
                                      <Checkbox
                                        style={{color: '#0066B3'}}
                                        edge='start'
                                        checked={customFilterData.diagnoses.includes(item)}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                      />
                                    </ListItemIcon>
                                    <ListItemText id={labelId} primary={`${item}`} />
                                  </ListItem>
                                );
                              })}
                            
                            {/* Will be a list of results here later */}
                            </div>
                        </div>                                           
                    </div>
                    <Button className='flex shadow float-right mr-4' style={{width: '120px'}} onClick={handleFinished}>Ok</Button>
                </div>
            </div>
        </Modal>
        </>
    );
}

export default FilterModal;

