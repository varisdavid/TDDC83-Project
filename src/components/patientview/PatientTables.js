import React from 'react';

import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import { ArrowDropUp, ArrowDropDown } from '@material-ui/icons';
import { useVirtual } from 'react-virtual';

// Renders a table based on props passed down from useTable
const PatientTables = ({
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
}) => {

    return (
        <Table {...getTableProps()} >
            <TableHead>
            {headerGroups.map(headerGroup => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column, columnIndex) => (
                    <TableCell
                    {...column.getHeaderProps()}
                    style={{
                      width:'16.66667%',
                      background:'#275E8E', 
                      borderColor:'#FFF', 
                      color: '#FFF',
                      fontWeight: '700',
                      fontSize: '15px',
                      textAlign: 'center',
                    }} >
                        {column.render('Header')}
                    </TableCell>
                    ))}
                </TableRow>
                ))}
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell>
                        Text
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
};
export default PatientTables;

