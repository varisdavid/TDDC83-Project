import React, {useEffect, useState} from 'react';
import { WeightChart, BloodPressure, PhysicalActivityChart } from "..";


const Measurements = ({ setActiveTabValueM }) => {

    // When something happens, we check to see if we change the sorting option, and we check if the search has been triggered
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
    console.log("Kommer datan här");
    console.log(measurement);
    console.log("enbd");


    return (
        <>
            <div>
                {/*Displays a clickable weightChart*/}
                <div className='flex justify-center' style={{marginTop: 'none', marginBottom: 'none'}}>
                    <div style={{ width: '30%', height: '40vh'}} onClick={(e) => {
                        e.preventDefault();
                        setActiveTabValueM(1);
                    }} >
                        <WeightChart />

                    </div>
                    
                    {/*Displays a clickable BloodPressureChart*/}
                    <div style={{ width: '30%', height: '40vh'}} onClick={(e) => {
                        e.preventDefault();
                        setActiveTabValueM(2);
                    }}>
                        <BloodPressure />
                    </div>

                    {/*Displays a clickable physicalChart*/}
                    <div style={{ width: '30%', height: '40vh'}} onClick={(e) => {
                        e.preventDefault();
                        setActiveTabValueM(3);
                    }}>
                        <PhysicalActivityChart data = {measurement} />
                    </div>
                </div>
            </div>
        </> 
    );
}

export default Measurements;