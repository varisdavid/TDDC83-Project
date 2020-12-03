import React, {useEffect} from 'react';
import { WeightChart, BloodPressure, PhysicalActivityChart } from "..";


const Measurements = ({ setActiveTabValueM }) => {

    // When something happens, we check to see if we change the sorting option, and we check if the search has been triggered
    useEffect(() => {
        // Basic example of how to make a authorized fetch call to our backend endpoints
        const measurements = async () => {
            const ehrid = "c784e009-c51b-437c-9c8d-a4a87dc18a72"
            const domain =  "http://127.0.0.1:5000/measurements";

            try {
                // const token = await getAccessTokenSilently();
                const response = await fetch(domain+ehrid,
                    {
                        headers: {},
                    }
                );

                const responseData = await response.json();
                console.log(responseData);
            } catch (error) {
                console.log(error.message);
            }
        };
        measurements();
    },[] );


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
                        <PhysicalActivityChart />
                    </div>
                </div>
            </div>
        </> 
    );
}

export default Measurements;