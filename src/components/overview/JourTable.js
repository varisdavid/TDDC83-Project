import React from "react";
import {
  makeStyles,
  withStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Button,
} from "@material-ui/core";

const Data = [
  {
    name: "Peter Johnson",
    phone: "070 - xxxxxxx",
  },
  {
    name: "Marie Håkansson",
    phone: "070 - xxxxxxx",
  },
];

const useStyles = makeStyles((theme) => ({
  table: {
    width: 600,
    margin: 0,
  },
  layout: {
    marginTop: 50,
  },
}));

const ColorButton = withStyles((theme) => ({
    root: {
      borderRadius: "0px",
      width: "130px",
      textTransform: "Capitalize",
      color:"#ffffff" ,
      backgroundColor: "#275E8E",
      '&:hover': {
        backgroundColor:"#275E8E" ,
      },
    },
  }))(Button);

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
  head: {
    backgroundColor: "#275E8E",
    color: theme.palette.common.white,
    fontWeight: 700,
  },
  body: {
    backgroundColor: "#theme.palette.common.white",
    color: theme.palette.common.black,
    fontWeight: 700,
  },
}))(TableRow);

const JourTable = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <ColorButton
        onClick={handleClickOpen}
      >
        Jour
      </ColorButton>
      {open ? (
        <TableContainer className={classes.table}>
          <Table className={classes.table} aria-label="simple table">
            <TableBody>
              {Data.map((row) => (
                <StyledTableRow key={row.time}>
                  <StyledTableCell component="th" scope="row" align="left">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.phone}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
    </>
  );
};

export default JourTable;
