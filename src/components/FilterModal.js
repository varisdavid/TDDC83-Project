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
const data = ["Diabetes", "Hypotermia"]

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

// Styling of the triggered modal
const useStyles = makeStyles((theme) => ({
paper: {
    maxWidth: "600px",
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    border: '3px solid #0066B3',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: '30px',
},
}));


const FilterModal = ({setDropdownOpen}) => {

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
        diagnoses: [],
    })

    // Handles opening of modal window
    const handleOpen = () => {
        setDropdownOpen(false) // this is to make sure that if we open the modal and previously have access the sorting menu, the sorting menu closes.
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
                ...customFilter,
                priority: {low: !customFilter.priority.low, average: customFilter.priority.average, high: customFilter.priority.high}
            })
        } else if (name === "average") {
            setCustomFilter({
                ...customFilter,
                priority: {low: customFilter.priority.low, average: !customFilter.priority.average, high: customFilter.priority.high}
            })
        } else if (name === "high") {
            setCustomFilter({
                ...customFilter,
                priority: {low: customFilter.priority.low, average: customFilter.priority.average, high: !customFilter.priority.high}
            })
        } else {
            setCustomFilter({
                ...customFilter,
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

    // Keeps track of which diagnosis are chosen
    const [checked, setChecked] = useState([0]);

    // Handles the toggled checkboxes in the resulting diagnosis list.
    const handleToggle = (value) => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
  
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
      setChecked(newChecked);
    };

    const handleFinished = () => {
        setCustomFilter({...customFilter, diagnoses: diagnoses})
        handleClose()
    }

    // This will make changes to diagnoses as soon as the searchValue changes. 
    useEffect(() => {
        setDiagnoses(data.filter(diagnosis => diagnosis.toLowerCase().includes(searchValue.toLowerCase())))
    }, [searchValue])

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
                    
                    {/* De två första textfälten */}
                    <div className='flex mt-4 p-2'>
                        <TextField
                            className='mr-5'
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

                    {/* Wrappar våra två kolumner */}
                    <div className='flex'>
                        {/* De kommande 3 select fälten + checkboxar */}
                        <div className='flex-col w-2/5 p-2 mr-2'>
                            <FormControl className='mt-2' variant='outlined'>
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
                                    <MenuItem value={'Male'}>Man</MenuItem>
                                    <MenuItem value={'Female'}>Kvinna</MenuItem>
                                </Select>
                            </FormControl>
                            
                            <FormControl className='mt-2' variant='outlined'>
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

                            <FormControl className='mt-2' variant='outlined'>
                                <InputLabel>Department</InputLabel>
                                <Select
                                    labelId='demo-simple-select-outlined-label'
                                    id='demo-simple-select-outlined'
                                    value={customFilter.department}
                                    onChange={handleChange}
                                    label='Department'
                                    inputProps={{name: 'department'}}
                                    style={{ width: selectWidth, color: "#0066B3"}}

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
                                    control={<Checkbox style={{color: "#0066B3",}} checked={customFilter.priority.low} onChange={handleChange} name="low" />}
                                    label="Låg"
                                    style={{marginBottom: "0px"}}
                                    />
                                <FormControlLabel
                                    control={<Checkbox style={{color: "#0066B3",}} checked={customFilter.priority.average} onChange={handleChange} name="average"/>}
                                    label="Medel"
                                    style={{marginBottom: "0px"}}
                                    />
                                <FormControlLabel
                                    control={<Checkbox style={{color: "#0066B3",}} checked={customFilter.priority.high} onChange={handleChange} name="high" />}
                                    label="Hög"
                                    style={{marginBottom: "0px"}}
                                    />
                                </FormGroup>
                            </FormControl>
                        </div>
                        
                        {/* Sökfält + resultatruta */}
                        <div className="flex-col w-1/2 p-2 ml-4 mt-5 mb-5" style={{backgroundColor: "rgba(169, 215, 255, 0.3)", borderRadius: "15px"}}>
                            <FormControl className="flex w-full mt-2" style={{height: "auto"}}>
                                <InputLabel disabled className="flex m-2" style={{fontWeight: "400", color: "#000"}}>Diagnos:</InputLabel>
                                <Input
                                    disableUnderline
                                    className='flex text-gray-800'
                                    style={{ 
                                        fontSize: "12px",
                                        backgroundColor: '#FFF', 
                                        borderRadius: '25px 25px',
                                        borderHeight: '0',
                                        width: "70%",
                                        marginLeft: "auto",
                                        marginRight: "5px",
                                        marginTop: "0px",
                                    }}
                                    onChange={handleSearchChange}
                                    value={searchValue}
                                    startAdornment={
                                    <InputAdornment position="start">
                                        <Search style={{marginLeft: "5px", color: "#E0E0E0"}}/>
                                    </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <div style={{marginTop: "10px", width: "80%", marginLeft: "auto", marginRight: "auto", height: "70%", backgroundColor: "#FFFFFF"}}>
                            {diagnoses.map(item => {
                                const labelId = `checkbox-list-label-${item}`;

                                return (
                                  <ListItem key={item} style={{paddingTop: "0px", paddingBottom: "0px"}} role={undefined} button onClick={handleToggle(item)}>
                                    <ListItemIcon>
                                      <Checkbox
                                        edge="start"
                                        checked={checked.indexOf(item) !== -1}
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

