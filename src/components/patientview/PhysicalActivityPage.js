import React, {useMemo} from 'react';
import {PhysicalActivityChart, Notification,FormForUpdateValues,TableForChartPysicalActivity} from "..";


const PhysicalActivityPage = () => {
//Sending the personaldata to the notices. This should be used for the ajax call in the futher as well
    const id="470203-1324"
    //Fake data to the table below which can be updated to live data if needed
    const data = useMemo(
        () => [

            {
                Date: '2020-05-18',
                PysicalActivity: '3',
                UpdatedBy: 'Patient',
            },
            {
                Date: '2020-06-13',
                PysicalActivity: '4',
                UpdatedBy: 'Patient',
            },
            {
                Date: '2020-07-25',
                PysicalActivity: '5',
                UpdatedBy: 'Patient',
            },
            {
                Date: '2020-09-01',
                PysicalActivity: '6',
                UpdatedBy: 'Patient',
            },
            {
                Date: '2020-09-10',
                PysicalActivity: '7',
                UpdatedBy: 'Patient',
            },
            {
                Date: '2020-10-02',
                PysicalActivity: '8',
                UpdatedBy: 'Patient',
            },
            {
                Date: '2020-10-10',
                PysicalActivity: '9',
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
                notices: <Notification value={3} text={'fysisk aktivitet till'} id={id} date={data[i]['Date']}
                                       measurement={data[i]['PysicalActivity']} updatedBy={data[i]['UpdatedBy']}/>,
                Date: data[i]['Date'],
                PysicalActivity: data[i]['PysicalActivity'],
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
                    {/* This is the physical activity chart being displayed */}
                    <div style={{ height: '85%' }}>
                        <PhysicalActivityChart />
                    </div>
                </div>

                <div style={{ width: '30%' }}>
                    {/* This is the physical activity table being displayed */}
                    <div>
                        <TableForChartPysicalActivity data = {addNotice}
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