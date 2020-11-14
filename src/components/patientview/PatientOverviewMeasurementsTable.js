import React, { useMemo } from 'react';

import { Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';

const PatientOverviewMeasurementsTable = () => {

    const measurements = useMemo (
        () => [
            {measure:'Vikt', average: '60 kg', goal: '62 kg'},
            {measure:'Blodtryck', average: '140 - 160 / 90 - 100', goal: '140 - 160 / 90 - 100'},
            {measure:'Fysisk aktivitet', average: 'Nivå 3 (av 5)', goal: 'Nivå 5 (av 5)'},
          ],
        []
      )


    return(
        <div>
            <Table className='table-patient'>
              <TableHead>
                <TableRow>
                  <TableCell className='cell-table-header'> Mätvärden </TableCell>
                  <TableCell className='cell-table-header'> Snitt senaste 7 dagarna </TableCell>
                  <TableCell className='cell-table-header'> Målvärde </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {measurements.map((measurements, index) => (
                <TableRow className='row-table-body' key={measurements.measure}>
                  <TableCell className='cell-table-body'> {measurements.measure} </TableCell>
                  <TableCell className='cell-table-body'> {measurements.average} </TableCell>
                  <TableCell className='cell-table-body'> {measurements.goal} </TableCell>
                </TableRow>
                ))}
              </TableBody>
            </Table>
        </div>
    );
};
export default PatientOverviewMeasurementsTable;