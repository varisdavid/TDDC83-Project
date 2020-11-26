import React, {useMemo} from 'react';
import {BloodPressure, Notification, TableForChart, FormForUpdateValues} from "..";
import { useFlexLayout, useTable } from "react-table";


const BloodPressurePage = () => {
//Sending the personaldata to the notices. This should be used for the ajax call in the futher as well
    const id="470203-1324"
    //Fake data to the table rendering below
    const data = useMemo(
        () => [

            {
                notices: <Notification value={1} text={'Oväntat skattat värde! Vikt: 30 kg (28 kg under förväntat värde)'} id={id} date={'2020-10-10'} bloodPressure={'135/80'} updatedBy={'Patient'}/>,
                Date: '2020-05-18',
                BloodPressure: '135/80',
                UpdatedBy: 'Patient',
            },
            {
                notices: <Notification value={1} text={'Oväntat skattat värde! Vikt: 30 kg (28 kg under förväntat värde)'} id={id} date={'2020-10-10'} bloodPressure={'135/80'} updatedBy={'Patient'} />,
                Date: '2020-06-13',
                BloodPressure: '135/80',
                UpdatedBy: 'Patient',
            },
            {
                notices: <Notification value={1} text={'Oväntat skattat värde! Vikt: 30 kg (28 kg under förväntat värde)'} id={id} date={'2020-10-10'} bloodPressure={'135/80'} updatedBy={'Patient'}/>,
                Date: '2020-07-25',
                BloodPressure: '135/80',
                UpdatedBy: 'Vårdpersonal',
            },
            {
                notices: <Notification value={2} text={'Oväntat skattat värde! Vikt: 30 kg (28 kg under förväntat värde)'}  id={id} date={'2020-10-10'} bloodPressure={'135/80'} updatedBy={'Patient'}/>,
                Date: '2020-09-01',
                BloodPressure: '135/80',
                UpdatedBy: 'Vårdoersonal',
            },
            {
                notices: <Notification value={0} text={'Oväntat skattat värde! Vikt: 30 kg (28 kg under förväntat värde)'}  id={id} date={'2020-10-10'} bloodPressure={'135/80'} updatedBy={'Patient'}/>,
                Date: '2020-09-10',
                BloodPressure: '135/80',
                UpdatedBy: 'Patient',
            },
            {
                notices: <Notification value={3} text={'Oväntat skattat värde! Vikt: 30 kg (28 kg under förväntat värde)'}  id={id} date={'2020-10-10'} bloodPressure={'135/80'} updatedBy={'Patient'}/>,
                Date: '2020-10-02',
                BloodPressure: '135/80',
                UpdatedBy: 'Vårdpersonal',
            },
            {
                notices: <Notification value={2} text={'Oväntat skattat värde! Vikt: 30 kg (28 kg under förväntat värde)'} id={id} date={'2020-10-10'} bloodPressure={'135/80'} updatedBy={'Patient'}/>,
                Date: '2020-10-10',
                BloodPressure: '135/80',
                UpdatedBy: 'Patient',
            },
        ],
        []
    )

    //Setting the table heads in the table as well as which data goes where
    const columns = useMemo(
        () => [
            {
                Header: '',
                accessor: 'notices',
            },

            {
                Header: 'Datum',
                accessor: 'Date',
            },
            {
                Header: 'Blodtryck',
                accessor: 'BloodPressure',
            },
            {
                Header: 'Uppdaterades Av',
                accessor: 'UpdatedBy',
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
    } = useTable({columns, data},
        useFlexLayout,
    );

    console.log(rows);
    return (
        <>
            {/* Setting up the big div on the page */}
            <div className='flex justify-center' style={{ height: '55vh' }}>
                {/* div to dived the page in two parts*/}
                <div style={{ width: '50%' }}>
                    {/* This is the bloodpressure chart being displayed */}
                    <div style={{ height: '85%' }}>
                        <BloodPressure />
                    </div>
                </div>


                <div style={{ width: '30%' }}>
                    {/* This is the bloodpressure table being displayed */}
                    <div>
                        <TableForChart
                            getTableProps={getTableProps}
                            getTableBodyProps={getTableBodyProps}
                            headerGroups={headerGroups}
                            rows={rows}
                            prepareRow={prepareRow}
                        />
                    </div>

                    {/* The form which you can fill in information about your weight does not save the data any where.
                     Contains two text fields and a button*/}
                    <div style={{ width: '90%',  float: 'right' }}>
                        <FormForUpdateValues />
                    </div>
                </div>
            </div>
        </>
    );

};

export default BloodPressurePage;