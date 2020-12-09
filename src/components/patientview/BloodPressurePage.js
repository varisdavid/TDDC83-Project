import React, {useState, useMemo} from 'react';
import { BloodPressureChart, Notification, TableForChartBloodPressure, FormForUpdateValues , SliderMeasurements} from "..";

    //Sending the personaldata to the notices. This should be used for the ajax call in the futher as well

    //Fake data to the table rendering below

  /*
    const [measurement, setmeasurements] = useState([]);
    useEffect(() => {
        // Basic example of how to make a authorized fetch call to our backend endpoints
        const measurements = async () => {
            const ehrid = "1f0cd2e4-8d8a-4ece-8d5e-100d52b322cc"
            const domain =  "http://127.0.0.1:5000/measurements/";

            try {
                // const token = await getAccessTokenSilently();
                const response = await fetch(domain+ehrid,
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
    },[] );

*/

    const BloodPressurePage = () => {
//Sending the personaldata to the notices. This should be used for the ajax call in the futher as well
        const id = "470203-1324";
        //Fake data to the table rendering below
        const data = useMemo(
            () => [

                {
                    notices: <Notification value={1} text={'Ov'} id={id} date={'2020-12-10'}
                                           bloodPressure={"158/123"} updatedBy={"Patient"}/>,
                    Date: '2020-12-10',
                    BloodPressure: '158/121',
                    UpdatedBy: 'Patient',
                },
                {
                    Date: '2020-12-3',
                    BloodPressure: '133/81',
                    UpdatedBy: 'Patient',
                },
                {
                    notices: "",
                    Date: '2020-11-26',
                    BloodPressure: '125/76',
                    UpdatedBy: 'Vårdpersonal',
                },
                {
                    notices: "",
                    Date: '2020-11-19',
                    BloodPressure: '122/75',
                    UpdatedBy: 'Vårdoersonal',
                },
                {
                    notices: "",
                    Date: '2020-11-12',
                    BloodPressure: '127/80',
                    UpdatedBy: 'Patient',
                },
                {
                    notices: "",
                    Date: '2020-10-29',
                    BloodPressure: '129/83',
                    UpdatedBy: 'Vårdpersonal',
                },
                {
                    notices: "",
                    Date: '2020-10-15',
                    BloodPressure: '130/82',
                    UpdatedBy: 'Patient',
                },
            ],
            []
        );



        //Adds the Notification to the data array so that the pop-up modals can retrive the correct data
    function addNotification(data) {
        let newArr = [];

        for (let i = 0; i < data.length; i++) {
            console.log()
            newArr.push({
                notices: data[i]['notices'],
                Date: data[i]['Date'],
                BloodPressure: data[i]['BloodPressure'],
                UpdatedBy: data[i]['UpdatedBy']

            })
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
                        <BloodPressureChart />
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
