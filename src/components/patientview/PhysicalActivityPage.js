import React, {useMemo} from 'react';
import {PhysicalActivityChart, Notification,FormForUpdateValues,TableForChart} from "..";
import {useFlexLayout, useTable} from "react-table";

const PhysicalActivityPage = () => {
//Sending the personaldata to the notices. This should be used for the ajax call in the futher as well
    const id="470203-1324"
    //Fake data to the table below which can be updated to live data if needed
    const data = useMemo(
        () => [

            {
                notices: <Notification value={0} text={'Oväntat!'} id = {id} />,
                Date: '2020-05-18',
                PysicalActivity: '3',
                UpdatedBy: 'Patient',
            },
            {
                notices: <Notification value={0} text={'Oväntat!'} id = {id} />,
                Date: '2020-06-13',
                PysicalActivity: '4',
                UpdatedBy: 'Patient',
            },
            {
                notices: <Notification value={0} text={'Oväntat!'} id = {id} />,
                Date: '2020-07-25',
                PysicalActivity: '5',
                UpdatedBy: 'Patient',
            },
            {
                notices: <Notification value={0} text={'Oväntat!'} id = {id} />,
                Date: '2020-09-01',
                PysicalActivity: '6',
                UpdatedBy: 'Patient',
            },
            {
                notices: <Notification value={1} text={'Oväntat!'} id = {id} />,
                Date: '2020-09-10',
                PysicalActivity: '7',
                UpdatedBy: 'Patient',
            },
            {
                notices: <Notification value={0} text={'Oväntat!'} id = {id} />,
                Date: '2020-10-02',
                PysicalActivity: '8',
                UpdatedBy: 'Patient',
            },
            {
                notices: <Notification value={0} text={'Oväntat!'} id = {id} />,
                Date: '2020-10-10',
                PysicalActivity: '9',
                UpdatedBy: 'Patient',
            },
        ],
        []
    )
    //Setting the name on the table rows as well as which data is place where
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
                Header: 'Fysisk aktivitet',
                accessor: 'PysicalActivity',
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
    } = useTable({ columns, data },
        useFlexLayout,
    );

    return (
        <>
            {/* Setting up the big div on the page */}
            <div className='flex justify-center' style={{ height: '55vh' }}>
                {/* div to dived the page in two parts*/}
                <div style={{ width: '50%' }}>
                    {/* This is the physical activity chart being displayed */}
                    <div style={{ height: '85%' }}>
                        <PhysicalActivityChart />
                    </div>
                </div>

                <div style={{ width: '30%' }}>
                    {/* This is the physical activity table being displayed */}
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

export default PhysicalActivityPage;