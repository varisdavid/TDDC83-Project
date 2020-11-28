import React, {useMemo, useState} from 'react';
import {BloodPressure, Notification, TableForChart, FormForUpdateValues, SliderMeasurements} from "..";
import {useFlexLayout, useTable} from "react-table";


const BloodPressurePage = () => {

    //Fake data to the table rendering below
    const data = useMemo(
        () => [

            {
                notices: <Notification value={1} text={'Oväntat skattat värde! Vikt: 30 kg (28 kg under förväntat värde)'}/>,
                Date: '2020-05-18',
                BloodPressure: '135/80',
                UpdatedBy: 'Patient',
            },
            {
                notices: <Notification value={1} text={'Oväntat skattat värde! Vikt: 30 kg (28 kg under förväntat värde)'}/>,
                Date: '2020-06-13',
                BloodPressure: '135/80',
                UpdatedBy: 'Patient',
            },
            {
                notices: <Notification value={1} text={'Oväntat skattat värde! Vikt: 30 kg (28 kg under förväntat värde)'}/>,
                Date: '2020-07-25',
                BloodPressure: '135/80',
                UpdatedBy: 'Vårdpersonal',
            },
            {
                notices: <Notification value={2} text={'Oväntat skattat värde! Vikt: 30 kg (28 kg under förväntat värde)'}/>,
                Date: '2020-09-01',
                BloodPressure: '135/80',
                UpdatedBy: 'Vårdoersonal',
            },
            {
                notices: <Notification value={0} text={'Oväntat skattat värde! Vikt: 30 kg (28 kg under förväntat värde)'}/>,
                Date: '2020-09-10',
                BloodPressure: '135/80',
                UpdatedBy: 'Patient',
            },
            {
                notices: <Notification value={3} text={'Oväntat skattat värde! Vikt: 30 kg (28 kg under förväntat värde)'}/>,
                Date: '2020-10-02',
                BloodPressure: '135/80',
                UpdatedBy: 'Vårdpersonal',
            },
            {
                notices: <Notification value={2} text={'Oväntat skattat värde! Vikt: 30 kg (28 kg under förväntat värde)'}/>,
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

    //fake data that displays boundaires
    const goalLimitsUpper = [120, 130];
    const goalLimitsLower = [70, 80];
    const accLimitsUpper = [115, 135];
    const accLimitsLower = [65, 85];
    const nonAccLimitsUpper = [110, 140];
    const nonAccLimitsLower = [60, 90];

     //Marks on the slider
     const marks = [
         {
             value: nonAccLimitsLower[0]-2,
             label: nonAccLimitsLower[0]-2+' mmHg',
         },
         {
             value: nonAccLimitsUpper[1]+5,
             label: nonAccLimitsUpper[1]+5+' mmHg',
         },
     ];
 
     //The values displayed on slider
     const [referenceValues, setReferenceValues] = useState (
         [nonAccLimitsLower[0], accLimitsLower[0], goalLimitsLower[0], 
         goalLimitsLower[1], accLimitsLower[1], nonAccLimitsLower[1],
         nonAccLimitsUpper[0], accLimitsUpper[0], goalLimitsUpper[0], 
         goalLimitsUpper[1], accLimitsUpper[1], nonAccLimitsUpper[1]]
     );

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

                {/*This displays the slider for changing the reference values */}
                <div style={{ width: '10%', marginTop: '3vh' }}>
                    <SliderMeasurements
                        marks={marks} 
                        referenceValues={referenceValues}
                        setReferenceValues={setReferenceValues}
                        />
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