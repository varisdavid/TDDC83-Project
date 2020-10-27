import React, { useContext, useState } from "react";
import Grid from "@material-ui/core/Grid";

//For calendar
import { enGB } from "date-fns/locale";
import { DatePickerCalendar } from "react-nice-dates";
import "react-nice-dates/build/style.css";
//...

//For table
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

// - The functions and styles in this file is supposed to be moved to seperate files
// - Need to store table information in some way, with date as key.

const useStyles = makeStyles({
  table: {
    Width: 50,
  },
  layout: {
    marginTop: 50,
  },
});

const rows = [
  {
    time: "8:00",
    activity: "Rond",
    description: "Ta upp något särskilt",
    place: "R34",
  },
  {
    time: "9:00",
    activity: "",
    description: "",
    place: "",
  },
  {
    time: "10:00",
    activity: "",
    description: "",
    place: "",
  },
];

const Context = React.createContext({ value: null, setValue: () => {} });

const BasicTable = (props) => {
  const classes = useStyles();
  const [row, setRow] = useState(props);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Tid</TableCell>
            <TableCell align="right">Aktivitet</TableCell>
            <TableCell align="right">Beskrivning</TableCell>
            <TableCell align="right">Plats</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.time}>
              <TableCell component="th" scope="row">
                {row.time}
              </TableCell>
              <TableCell align="right">{row.activity}</TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.place}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const StaticCalendar = () => {
  const [date, setDate] = useState(new Date());
  const { setValue } = useContext(Context);

  const onChange = (date) => {
    setDate(date);
    setValue(date);
  };
  return (
    <DatePickerCalendar date={date} onDateChange={onChange} locale={enGB} />
  );
};

const UserCalendar = () => {
  const [value, setValue] = useState(new Date());
  const classes = useStyles();

  return (
    <div>
      <Context.Provider value={{ value, setValue }}>
        <Grid container spacing={10} direction="row" justify="center">
          <Grid item xs={5}>
            <StaticCalendar />
          </Grid>
          <Grid item xs={5} className={classes.layout}>
            <p>{value.toUTCString().slice(0, 16)}</p>
            <BasicTable props={rows} />
          </Grid>
        </Grid>
      </Context.Provider>
    </div>
  );
};

export default UserCalendar;
