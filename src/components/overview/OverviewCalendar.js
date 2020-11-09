import React, { useContext, useState } from "react";
import Grid from "@material-ui/core/Grid";

//For calendar
import { enGB } from "date-fns/locale";
import { DatePickerCalendar } from "react-nice-dates";
import "react-nice-dates/build/style.css";
//...

//For table
import { makeStyles, withStyles } from "@material-ui/core/styles";
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
    marginTop: "1%",
  },
});

const Data = [
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

const StyledHeaderCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.white,
    fontSize: 25,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#275E8E",
    color: theme.palette.common.white,
    fontWeight: 700,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const Context = React.createContext({ value: null, setValue: () => {} });

const BasicTable = (props) => {
  const classes = useStyles();
  const [rows] = useState(props.props);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <StyledTableRow>
            <StyledHeaderCell>{props.value} </StyledHeaderCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>Tid</StyledTableCell>
            <StyledTableCell align="left">Aktivitet</StyledTableCell>
            <StyledTableCell align="left">Beskrivning</StyledTableCell>
            <StyledTableCell align="left">Plats</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.time}>
              <StyledTableCell align="left" component="th" scope="row">
                {row.time}
              </StyledTableCell>
              <StyledTableCell align="left">{row.activity}</StyledTableCell>
              <StyledTableCell align="left">{row.description}</StyledTableCell>
              <StyledTableCell align="left">{row.place}</StyledTableCell>
            </StyledTableRow>
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
            <BasicTable props={Data} value={value.toUTCString().slice(0, 16)} />
          </Grid>
        </Grid>
      </Context.Provider>
    </div>
  );
};

export default UserCalendar;
