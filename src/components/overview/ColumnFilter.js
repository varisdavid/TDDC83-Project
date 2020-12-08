import React, { useContext, useState } from "react";
import SettingsIcon from "@material-ui/icons/Settings";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Button,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Grid,
  Dialog,
  IconButton,
  makeStyles
} from "@material-ui/core";

export const settingsContext = React.createContext({
  settings: null,
  setSettings: () => { },
});

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  MuiCardHeader: {
    backgroundColor: "#275E8E",
    color: "#fafafa",
  },
});

const init = {
  priority: true,
  href: true,
  sweID: true,
  diagnoses: true,
  updatedAt: true,
  updatedBy: true,
};

//This component is used to filter the table located in patients.js. It sets the settingsContext with an list of 
//strings representing the names of the columns to be shown. 
export const ColumnFilter = () => {
  const classes = useStyles();
  const { setSettings } = useContext(settingsContext);
  const [state, setState] = useState(init);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setState(init);
    setOpen(false)
  }

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  //This function loops over the local state(key, value) and pushes the keys to the 
  //context object if the value is false. 
  const submitChange = () => {
    var obj = [];
    for (var key in state) {
      if (state[key] === false) {
        obj.push(key);
      }
    }
    setSettings(obj);
    setOpen(false);
  };

  return (
    <div style={{ width: '5%', float: 'right', height: '10px', marginRight: '7px' }}>
      <IconButton onClick={handleClickOpen}>
        <SettingsIcon />
      </IconButton>
      <Dialog aria-labelledby="simple-dialog-title" open={open} onClose={handleClickClose}>
        <Card className={classes.root}>
          <CardHeader
            title="Översiktsinställningar"
            className={classes.MuiCardHeader}
          />
          <CardContent>
            <Grid container>
              <Grid>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.priority}
                        onChange={handleChange}
                        name="priority"
                      />
                    }
                    label="Prioriteringar"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.href}
                        onChange={handleChange}
                        name="href"
                      />
                    }
                    label="Namn"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.sweID}
                        onChange={handleChange}
                        name="sweID"
                      />
                    }
                    label="Personnummer"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.diagnoses}
                        onChange={handleChange}
                        name="diagnoses"
                      />
                    }
                    label="Diagnos"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.updatedAt}
                        onChange={handleChange}
                        name="updatedAt"
                      />
                    }
                    label="Senast uppdaterad"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.updatedBy}
                        onChange={handleChange}
                        name="updatedBy"
                      />
                    }
                    label="Uppdaterad av"
                  />
                </FormGroup>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={submitChange}>
              Spara
            </Button>
          </CardActions>
        </Card>
      </Dialog>
    </div>
  );
};
