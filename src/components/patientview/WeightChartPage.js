import React, { useMemo, useState } from 'react';
import { WeightChart, TableForChart, Notification, FormForUpdateValues, SliderMeasurements } from "..";
import { useFlexLayout, useTable } from "react-table";


const WeightChartPage = () => {
    //Fake data to be used in the table code below can be changed to real data
    const data = useMemo(
        () => [

            {
                notices: <Notification value={2} text={'Oväntat skattat värde! Vikt: 30 kg (28 kg under förväntat värde)'} />,
                Date: '2020-05-18',
                Weight: '65',
                UpdatedBy: 'Patient',
            },
            {
                notices: <Notification value={2} text={'Oväntat skattat värde! Vikt: 30 kg (28 kg under förväntat värde)'} />,
                Date: '2020-06-13',
                Weight: '62',
                UpdatedBy: 'Patient',
            },
            {
                notices: <Notification value={0} text={'Oväntat skattat värde! Vikt: 30 kg (28 kg under förväntat värde)'} />,
                Date: '2020-07-25',
                Weight: '67',
                UpdatedBy: 'Patient',
            },
            {
                Date: '2020-09-01',
                Weight: '63',
                UpdatedBy: 'Patient',
            },
            {
                notices: <Notification value={0} text={'Oväntat skattat värde! Vikt: 30 kg (28 kg under förväntat värde)'} />,
                Date: '2020-09-10',
                Weight: '66',
                UpdatedBy: 'Patient',
            },
            {
                notices: <Notification value={0} text={'Oväntat skattat värde! Vikt: 30 kg (28 kg under förväntat värde)'} />,
                Date: '2020-10-02',
                Weight: '30',
                UpdatedBy: 'Patient',
            },
            {
                notices: <Notification value={0} text={'Oväntat skattat värde! Vikt: 30 kg (28 kg under förväntat värde)'} />,
                Date: '2020-10-10',
                Weight: '67',
                UpdatedBy: 'Patient',
            },
        ],
        []
    )
    //setting the table head in the table below
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
                Header: 'Vikt',
                accessor: 'Weight',
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

    //fake data that displays boundaires
    const goalLimits = [60, 70];
    const accLimits = [50, 75];
    const nonAccLimits = [40, 79];

    const marks = [
        {
            value: 0,
            label: '0 kg',
        },
        {
            value: nonAccLimits[1]+15,
            label: nonAccLimits[1]+15+' kg',
        },
    ];

    const [referenceValues, setReferenceValues] = useState({
        goalLimitHigh: goalLimits[1],
        goalLimitLow: goalLimits[0],
        accLimitHigh: accLimits[1],
        accLimitLow: accLimits[0],
        nonAccLimitHigh: nonAccLimits[1],
        nonAccLimitLow: nonAccLimits[0], 
    });

    return (
        <>
            {/* Setting up the big div on the page */}
            <div className='flex justify-center' style={{ height: '55vh' }}>
                {/* div to dived the page in two parts*/}
                <div style={{ width: '50%' }}>
                    {/* This is the weight chart being displayed */}
                    <div style={{ height: '85%' }}>
                        <WeightChart />
                    </div>
                </div>

                <div style={{ width: '10%' }}>
                    <SliderMeasurements
                        marks={marks} 
                        referenceValues={referenceValues}
                        setReferenceValues={setReferenceValues}
                        />
                </div>

                <div style={{ width: '30%' }}>
                    {/* This is the weight table being displayed */}
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
                    <div style={{ width: '90%', float: 'right' }}>
                        <FormForUpdateValues />
                    </div>
                </div>
            </div>
        </>
    );

};

export default WeightChartPage;