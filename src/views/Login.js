import React, { useState } from "react";

import { FormControl, 
    InputLabel, 
    Select, 
    MenuItem,
    TextField,
    Button
  } from '@material-ui/core';

import logoRegion from "../assets/logo_region.png"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
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
        marginLeft: "auto",
        marginRight: "auto",
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
}));


const Login = () => {

    //////////////////////////////////////////////////////////////////////////////////
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    //////////////////////////////////////////////////////////////////////////////////
  
    const [ userInfo, setUserInfo] = useState({
        workplace: '',
        user_id: '',
        password: '',
    });
    const possibleWorkplaces = ['Ryds vårdcentral', 'Valla vårdcentral', 'Tannefors vårdcentral']

    const handleChange = (event) => {
        const name = event.target.name
        setUserInfo({
            ...userInfo,
            [name]: event.target.value,
        })
    }
  return (
        <>
            <div className="h-100 w-100">
                <div className="flex h-32 p-2">
                    <div className="w-1/5 self-center">
                        <img src={logoRegion} alt="regional logo" />
                    </div>  
                </div>
                <div className="flex w-100" style={{height: `calc(100vh - 8rem)`, backgroundColor: "rgba(39, 94, 142, 0.2)"}}>
                    <div className="flex-col w-1/3 mr-auto ml-auto p-2 mt-20">
                        <h2 style={{fontWeight: "700px", fontSize: "16px", color: "#000"}}>Logga in med ditt organisationskonto</h2>
                        <FormControl className={classes.select} style={{marginLeft: "8px"}} variant='outlined'>
                            <InputLabel>Välj verksamhet</InputLabel>
                            <Select
                                labelId='demo-simple-select-outlined-label'
                                id='demo-simple-select-outlined'
                                value={userInfo.workplace}
                                onChange={handleChange}
                                label='Välj verksamhet' // Needs to be the label your using to calculate the appropriate width in border.
                                inputProps={{name: 'workplace'}} // This is needed to get name value for event.target.
                            >
                                {possibleWorkplaces.map(workplace => {
                                    return (
                                        <MenuItem value={workplace}>{workplace}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>    
                        <TextField
                            className={classes.textField}
                            style={{marginLeft: "8px", marginTop: "15px"}}
                            id='user_id'
                            label='Anställnings-ID/Användarnamn'
                            type='text'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{name: 'user_id' }}
                            value={userInfo.user_id}
                            onChange={handleChange}
                        />
                        <TextField
                            className={classes.textField}
                            style={{marginLeft: "8px", marginTop: "15px"}}
                            id='password'
                            label='Lösenord'
                            type='password'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{name: 'password'}}
                            value={userInfo.pwd}
                            onChange={handleChange}
                        />
                        <Button className='shadow' style={{ marginLeft: "125px", backgroundColor: "#FFF", marginTop: "20px", textTransform: "none", border: '2px solid #0066B3', borderRadius: "0px", width: '100px'}}>Logga in</Button>
                    </div>

                </div>


            </div>

        </>
    );
};

export default Login;