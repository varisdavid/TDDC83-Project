import React, {useEffect, useState} from 'react';
import {WeightChart, TableForChartWeightChartPage, Notification, FormForUpdateValues, SliderMeasurements} from "..";

const WeightChartPage = () => {
    //Sending the personaldata to the notices. This should be used for the ajax call in the futher as well
    const id = "470203-1324"
    //Fake data to be used in the table code below can be changed to real data
    const [measurement, setmeasurements] = useState([]);
    useEffect(() => {
        // Basic example of how to make a authorized fetch call to our backend endpoints
        const measurements = async () => {
            const ehrid = "1f0cd2e4-8d8a-4ece-8d5e-100d52b322cc"
            const domain = "http://127.0.0.1:5000/measurements/";

            try {
                // const token = await getAccessTokenSilently();
                const response = await fetch(domain + ehrid,
                    {
                        headers: {},
                    }
                );

                const responseData = await response.json();
                setmeasurements(responseData);
            } catch (error) {
                console.log(error.message);
            }
        };
        measurements();
    }, []);


    //Adds the Notification to the data array so that the pop-up modals can retrive the correct data
    function addNotification(data) {
        let newArr = [];

        for (let i = 0; i < data.length; i++) {
            let prio;
            if (data[i]['Weight: '] > 75) {
                prio = 1;
            } else {
                prio = 0;
            }

            newArr.push({
                notices: <Notification value={prio} text={'vikten till'} id={id} date={data[i]['Time: ']}
                                       measurement={data[i]['Weight: ']} updatedBy={'Patient'}/>,
                Date: data[i]['Time: '],
                Weight: data[i]['Weight: '],
                UpdatedBy: 'Vårdcentral'
            })
        }
        return (newArr)
    }

    const addNotice = addNotification(measurement);

    //fake data that displays boundaires
    const goalLimits = [60, 70];
    const accLimits = [50, 75];
    const nonAccLimits = [40, 79];

    //Range on the slider
    const minMax = [0, nonAccLimits[1] + 15];

    //Marks on the slider
    const marks = [
        {
            value: minMax[0],
            label: minMax[0] + ' kg',
        },
        {
            value: minMax[1],
            label: minMax[1] + ' kg',
        },
    ];

    //The values displayed on slider
    const [referenceValues, setReferenceValues] = useState(
        [nonAccLimits[0], accLimits[0], goalLimits[0], goalLimits[1], accLimits[1], nonAccLimits[1]]
    );

    return (
        <>
            {/* Setting up the big div on the page */}
            <div className='flex justify-center' style={{height: '55vh'}}>
                {/* div to dived the page in two parts*/}
                <div style={{width: '50%'}}>
                    {/* This is the weight chart being displayed */}
                    <div style={{height: '85%'}}>
                        <WeightChart/>
                    </div>
                </div>

                {/*This displays the slider for changing the reference values */}
                <div style={{width: '10%', marginTop: '3vh'}}>
                    <SliderMeasurements
                        marks={marks}
                        referenceValues={referenceValues}
                        setReferenceValues={setReferenceValues}
                        minMax={minMax}
                    />
                </div>

                <div style={{width: '30%'}}>
                    {/* This is the weight table being displayed */}
                    <div>
                        <TableForChartWeightChartPage data={addNotice}/>
                    </div>

                    {/* The form which you can fill in information about your weight does not save the data any where.
                     Contains two text fields and a button*/}
                    <div style={{width: '90%', float: 'right'}}>
                        <FormForUpdateValues/>
                    </div>
                </div>
            </div>
        </>
    );

};

export default WeightChartPage;
