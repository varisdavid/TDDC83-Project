import React, {useMemo} from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import { useTable, useFlexLayout, useFilters, useGlobalFilter, useSortBy } from 'react-table'
import { PatientsTable } from '../components';


const PatientListOfMedication = () => {
    const {
          getTableProps,
          getTableBodyProps,
          headerGroups,
          rows,
          prepareRow,
      } = useTable({ columns, data},
        useFlexLayout,
      );

    const data =  useMemo(
      // To get them in the proper order, using numbers to represent priority, 1 = high, 2 = medium, 3 = low with notification, 4 = low without notification
      () => [
      {
      name: "Gunilla Andersson",
      sweID: '470203-1324',
      diagnoses: ['Diabetes', 'Hypertoni'],
      updatedAt: '2020-10-08',
      updatedBy: 'Patienten',
      age: 73,
      gender: 'female',
      team: 'Team 1',
      department: 'Department 1',
      },
      ],
      []
      )

    const columns = useMemo(
          () => [
          {Header: 'Läkemedel',
          accessor:'name',
          },
          {Header: 'Dos',
          accessor:'sweID',
          },
          {Header: 'Intagningsform',
          accessor:'',
          },
          {Header: 'Intag',
          accessor:'',
          },
          {Header: 'Kommentar',
          accessor:'',
          },
          ],
          []
          )


    return (
    <>
    <PatientsTable
        getTableProps={getTableProps}
        getTableBodyProps={getTableBodyProps}
        headerGroups={headerGroups}
        rows={rows}
        prepareRow={prepareRow}
        />
    </>
    );
};
export default PatientListOfMedication;