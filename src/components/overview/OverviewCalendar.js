import React, { useContext, useState } from "react";
import Grid from "@material-ui/core/Grid";

//For calendar
import { enGB } from "date-fns/locale";
import { DatePickerCalendar } from "react-nice-dates";
import "react-nice-dates/build/style.css";


//For styling calendar
import '../../../src/OverviewCalendar.css';
//import { getDay, getDate } from 'date-fns';
import { getDate } from 'date-fns';
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
//import { date } from "yup";

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
    time: "08:00-09:00",
    activity: "Rond",
    description: "Ta upp något särskilt",
    place: "R34",
  },

  {
    time: "10:00-11:00",
    activity: "Patientbesök",
    description: "Hälsokontroll",
    place: "",
  },
  {
    time: "15:00-17:00",
    activity: "Rapportering",
    description: "Rapportera dagens arbete",
    place: "Mitt kontor",
  },
];


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

const modifiers = {
  highlight: date => getDate(date) === 2 || getDate(date) === 9 || getDate(date) === 16
    || getDate(date) === 21 || getDate(date) === 30
}

const modifiersClassNames = {
  highlight: '-highlight'
}

const Context = React.createContext({ value: null, setValue: () => { } });

const BasicTable = (props) => {
  const classes = useStyles();
  const [rows] = useState(props.props);
  if (tableDay === '02' || tableDay === '09' || tableDay === '21' || tableDay === '16' || tableDay === '30') {
    return (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Tid</StyledTableCell>
                <StyledTableCell align="left">Aktivitet</StyledTableCell>
                <StyledTableCell align="left">Kommentar</StyledTableCell>
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

  }else{
      return (

        <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>Tid</StyledTableCell>
            <StyledTableCell align="left">Aktivitet</StyledTableCell>
            <StyledTableCell align="left">Kommentar</StyledTableCell>
            <StyledTableCell align="left">Plats</StyledTableCell>
          </StyledTableRow>
        </TableHead>
      </Table>
        </TableContainer>);
  }
};
let tableDay;
function setTableDay(date) {
  tableDay = date.toString().slice(8, 10);
   
}


const StaticCalendar = () => {
  const [date, setDate] = useState(new Date());
  const { setValue } = useContext(Context);

  const onChange = (date) => {
    setDate(date);
    setValue(date);
    setTableDay(date);
  };

  return (
    <DatePickerCalendar
      date={date}
      onDateChange={onChange}
      locale={enGB}
      modifiers={modifiers}
      modifiersClassNames={modifiersClassNames}
    />
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
            <div style={{ fontSize: '30px'}} >
              {value.toUTCString().slice(0,16)} </div>
            <BasicTable props={Data} value={value.toUTCString().slice(0, 16)} />
          </Grid>
        </Grid>
      </Context.Provider>
    </div>
  );
};

export default UserCalendar;
