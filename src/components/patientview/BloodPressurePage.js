import React, { useState, useMemo } from 'react';
import { BloodPressure, Notification, TableForChartBloodPressure, FormForUpdateValues , SliderMeasurements} from "..";

const BloodPressurePage = () => {
    //Sending the personaldata to the notices. This should be used for the ajax call in the futher as well
    const id = "470203-1324";
    //Fake data to the table rendering below
    const data = useMemo(
        () => [

            {
                Date: '2020-05-18',
                BloodPressure: '135/80',
                UpdatedBy: 'Patient',
            },
            {
                Date: '2020-06-13',
                BloodPressure: '135/80',
                UpdatedBy: 'Patient',
            },
            {
                Date: '2020-07-25',
                BloodPressure: '135/80',
                UpdatedBy: 'Vårdpersonal',
            },
            {
                Date: '2020-09-01',
                BloodPressure: '135/80',
                UpdatedBy: 'Vårdpersonal',
            },
            {
                Date: '2020-09-10',
                BloodPressure: '135/80',
                UpdatedBy: 'Patient',
            },
            {
                Date: '2020-10-02',
                BloodPressure: '135/80',
                UpdatedBy: 'Vårdpersonal',
            },
            {
                Date: '2020-10-10',
                BloodPressure: '135/80',
                UpdatedBy: 'Patient',
            },
        ],
        []
    );

    //Adds the Notification to the data array so that the pop-up modals can retrive the correct data
    function addNotification(data) {
        let newArr = [];

        for (let i = 0; i < data.length; i++) {
            newArr.push({
                notices: <Notification value={3} text={'blodtrycket till'} id={id} date={data[i]['Date']}
                                       measurement={data[i]['BloodPressure']} updatedBy={data[i]['UpdatedBy']}/>,
                Date: data[i]['Date'],
                BloodPressure: data[i]['BloodPressure'],
                UpdatedBy: data[i]['UpdatedBy']})
        }
        return (newArr)
    }

    const addNotice = addNotification(data);

    //fake data that displays boundaires
    const goalLimitsUpper = [120, 130];
    const goalLimitsLower = [70, 80];
    const accLimitsUpper = [115, 135];
    const accLimitsLower = [65, 85];
    const nonAccLimitsUpper = [110, 140];
    const nonAccLimitsLower = [60, 90];

    //Range on the slider
    const minMax = [nonAccLimitsLower[0] - 2,nonAccLimitsUpper[1] + 5
    ];

    //Marks on the slider
    const marks = [
        {
            value: minMax[0],
            label: minMax[0] + ' mmHg',
        },
        {
            value: minMax[1],
            label: minMax[1] + ' mmHg',
        },
    ];

    //The values displayed on slider
    const [referenceValues, setReferenceValues] = useState(
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
                        minMax={minMax}
                    />
                </div>

                <div style={{width: '30%'}}>
                    {/* This is the bloodpressure table being displayed */}
                    <div>
                        <TableForChartBloodPressure data = {addNotice} />
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
}

export default BloodPressurePage;
