import React, {useMemo} from "react";
import { useTable, useFlexLayout} from 'react-table'

import { PatientListOfMedicationTable } from "../components";


const PatientListOfMedication = () => {


    const data =  useMemo(
      () => [
      {
      Läkemedel: 'Alvedon',
      Dos: '1000mg',
      Intagsform: 'tabletter',
      Intag: '2 tabletter dagligen',
      Kommentar: 'Tas i samband med mat',
      Typ: 'daglig',
      },
      {
       Läkemedel: 'Alvedon',
       Dos: '1000mg',
       Intagsform: 'Tabletter',
       Intag: '2 tabletter dagligen',
       Kommentar: 'Tas till maten',
       Typ: 'Behov',
       },
       {
       Läkemedel: 'Alvedon',
       Dos: '1000mg',
       Intagsform: 'tabletter',
       Intag: '2 tabletter dagligen',
       Kommentar: 'Tas i samband med mat',
       Typ: 'daglig',
       },
      ],
      []
      )

    const columns = useMemo(
          () => [

          {Header: 'Läkemedel',
          accessor:'Läkemedel',
          },
          {Header: 'Dos',
          accessor:'Dos',
          },
          {Header: 'Intagsform',
          accessor:'Intagsform',
          },
          {Header: 'Intag',
          accessor:'Intag',
          },
          {Header: 'Kommentar',
          accessor:'Kommentar',
          },
          ],
          []
          )


     const {
               getTableProps,
               getTableBodyProps,
               headerGroups,
               rows,
               prepareRow,
           } = useTable({ columns, data },
             useFlexLayout,
           );


     // Used for keeping track on the wrapper div (needed for virtualization)
     // const parentRef = React.useRef();

      // Using package 'react-virtual' for virtualization of
      // the table, give it rows.length for how many rows there should be
      // its ref to outer div and the estimated size.
    //  const rowVirtualizer = useVirtual({
      //  size: rows.length,
      //  parentRef,
      //  estimateSize: React.useCallback(() => 15, [])
    //  });

      return (
      <>
            <div style={{padding: "15px"}}></div>
            <b style= {{padding: "10px"}}>Aktuella läkemedelsbehandlingar</b>
            <PatientListOfMedicationTable data={data}
                                          getTableProps={getTableProps}
                                          getTableBodyProps={getTableBodyProps}
                                          headerGroups={headerGroups}
                                          rows={rows}
                                          prepareRow={prepareRow}
                                          />
        
        <div style={{padding: "15px"}}></div>
          <b style= {{padding: "10px"}}>Vid behov</b>
          <PatientListOfMedicationTable data={data}
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