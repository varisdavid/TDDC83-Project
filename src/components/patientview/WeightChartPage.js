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

    //Range on the slider
    const minMax = [0,nonAccLimits[1]+15];

    //Marks on the slider
    const marks = [
        {
            value: minMax[0],
            label: minMax[0]+' kg',
        },
        {
            value: minMax[1],
            label: minMax[1]+' kg',
        },
    ];

    //The values displayed on slider
    const [referenceValues, setReferenceValues] = useState (
        [nonAccLimits[0], accLimits[0], goalLimits[0], goalLimits[1], accLimits[1], nonAccLimits[1]]
    );

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

                {/*This displays the slider for changing the reference values */}
                <div style={{ width: '10%', marginTop: '3vh' }}>
                    <SliderMeasurements
                        marks={marks} 
                        referenceValues={referenceValues}
                        setReferenceValues={setReferenceValues}
                        minMax={minMax}
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