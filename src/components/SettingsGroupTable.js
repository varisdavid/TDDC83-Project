/*
    Format of the JSON object to be handled by the component. 
    {
        name: "", 
        age: "", 
        gender:"", 
        team:"", 
        department: "", 
        risk:"",
        maxAge:"", 
        sortBy: "", 
        diagnos: [],
    }

    TO DO:
    - Add appropriate actions to the IconButtons in table.
    - Add IconButton for adding new group to the table.
    - Add function for adding a new group, according to JSON object above. 
    - Change text font and margins according to prototype.
    - Edit styling of the IconButtons, remove the box that appears when clicking on them
    
*/

import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Paper, IconButton} from '@material-ui/core'
import {Edit, Delete} from '@material-ui/icons';



const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#275E8E",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(even)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


function createData(name, filterOn, sortOn) {
  return { name, filterOn, sortOn };
}
     
const rows = [
  createData("Diabetespatienter", "Diagnos: diabetes", "Risk"),
  createData("Högriskpatienter", "Risk: hög", ""),
  createData("Mitt team", "Team: team 5", "Namn"),

];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});


const SettingsGroupTable = () => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Namn</StyledTableCell>
            <StyledTableCell align="left">Filtrerat efter</StyledTableCell>
            <StyledTableCell align="left">Sorterat efter</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
              <IconButton>
                <Edit fontSize="small" style ={{fill:"#2eb82e"}} />
              </IconButton> 
              <IconButton>
                <Delete fontSize="small" style={{fill:"#ff4d4d"}} />
              </IconButton> 
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="left">{row.filterOn}</StyledTableCell>
              <StyledTableCell align="left">{row.sortOn}</StyledTableCell>
              
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SettingsGroupTable;
