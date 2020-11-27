import React, { useMemo } from 'react';
import { WeightChart, TableForChartWeightChartPage, Notification, FormForUpdateValues } from "..";


const WeightChartPage = () => {
    //Sending the personaldata to the notices. This should be used for the ajax call in the futher as well
    const id="470203-1324"
    //Fake data to be used in the table code below can be changed to real data
    const data = useMemo(
        () => [

            {
                notices: <Notification value={2} text={'Oväntat skattat värde! Vikt: 30 kg (28 kg under förväntat värde)'} id = {id} />,
                Date: '2020-05-18',
                Weight: '65',
                UpdatedBy: 'Patient',
            },
            {
                notices: <Notification value={2} text={'Oväntat skattat värde! Vikt: 30 kg (28 kg under förväntat värde)'} id = {id} />,
                Date: '2020-06-13',
                Weight: '62',
                UpdatedBy: 'Patient',
            },
            {
                notices: <Notification value={0} text={'Oväntat skattat värde! Vikt: 30 kg (28 kg under förväntat värde)'} id = {id} />,
                Date: '2020-07-25',
                Weight: '67',
                UpdatedBy: 'Patient',
            },
            {
                notices: <Notification value={0} text={'Oväntat!'} id = {id} />,
                Date: '2020-09-01',
                Weight: '63',
                UpdatedBy: 'Patient',
            },
            {
                notices: <Notification value={0} text={'Oväntat skattat värde! Vikt: 30 kg (28 kg under förväntat värde)'} id = {id} />,
                Date: '2020-09-10',
                Weight: '66',
                UpdatedBy: 'Patient',
            },
            {
                notices: <Notification value={0} text={'Oväntat skattat värde! Vikt: 30 kg (28 kg under förväntat värde)'} id = {id} />,
                Date: '2020-10-02',
                Weight: '30',
                UpdatedBy: 'Patient',
            },
            {
                notices: <Notification value={0} text={'Oväntat skattat värde! Vikt: 30 kg (28 kg under förväntat värde)'} id = {id} />,
                Date: '2020-10-10',
                Weight: '67',
                UpdatedBy: 'Patient',
            },
        ],
        []
    )
    //Adds the Notification to the data array so that the pop-up modals can retrive the correct data
    function addNotification(data) {
        let newArr = [];

        for (let i = 0; i < data.length; i++) {
            newArr.push({
                notices: <Notification value={3} text={'test'} id={id} date={data[i]['Date']}
                                       measurement={data[i]['BloodPressure']} updatedBy={data[i]['UpdatedBy']}/>,
                Date: data[i]['Date'],
                Weight: data[i]['Weight'],
                UpdatedBy: data[i]['UpdatedBy']})
        }
        return (newArr)
    }

    const addNotice = addNotification(data);
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

                <div style={{ width: '30%' }}>
                    {/* This is the weight table being displayed */}
                    <div>
                        <TableForChartWeightChartPage data ={addNotice}
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

export default WeightChartPage;