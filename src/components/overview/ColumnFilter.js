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
  setSettings: () => {},
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

export const ColumnFilter = () => {
  const classes = useStyles();
  const {setSettings } = useContext(settingsContext);
  const [state, setState] = useState(init);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

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
    <div>
      <IconButton onClick={handleClickOpen}>
        <SettingsIcon />
      </IconButton>
      <Dialog aria-labelledby="simple-dialog-title" open={open}>
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
