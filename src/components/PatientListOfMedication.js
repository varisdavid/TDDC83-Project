import React, {useEffect, useState} from "react";

import {PatientListOfMedicationTable} from "../components";
// import {useAuth0} from "@auth0/auth0-react";


const PatientListOfMedication = () => {

    // const { getAccessTokenSilently } = useAuth0();
    // When something happens, we check to see if we change the sorting option, and we check if the search has been triggered
    const [medicationList, setmedicationList] = useState([]);
    useEffect(() => {
        // Basic example of how to make a authorized fetch call to our backend endpoints
        const medication_list = async () => {
            const ehrid = "9c80a7e4-d314-4dba-997b-2f4ae742bea2"

            const domain = "http://127.0.0.1:5000/medication_list/";
          //  const domain = process.env.REACT_APP_API_DOMAIN + "/medication_list/";
          //  console.log(process.env.REACT_APP_API_DOMAIN);

            try {
                // const token = await getAccessTokenSilently();
                const response = await fetch(domain + ehrid,
                    {
                        headers: {
                            //   Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const responseData = await response.json();
               // console.log(responseData);
                setmedicationList(responseData);
            } catch (error) {
                console.log(error.message);
            }
        };

        medication_list();
    }, []);
   // console.log("Utranflr fölre");
   // console.log(medicationList);
   // console.log("utanfölr efter");


    //Filter the data to an array that will show the current medication
    function filterDaily(data) {
       // console.log("FilteRDataDaily");
        let newArr = []
        for (let i = 0; i < data.length; i++) {
            if (data[i]['Daily'] === 'True') {
                newArr.push(data[i])
            }
        }
        return (newArr)
    }

    const dataDaily = filterDaily(medicationList)

    //Filter the data to an array with when needed medication
    function filterNeed(data) {
      //  console.log("FilteRDataNeed");
       // console.log(data);
        let newArr = []
        for (let i = 0; i < data.length; i++) {
            if (data[i]['Daily'] === 'False') {
                newArr.push(data[i])
            }
        }

        return (newArr)
    }

    const dataNeed = filterNeed(medicationList)

    return (
        <>
            <div style={{padding: "15px"}}></div>
            <b style={{padding: "10px"}}>Aktuella läkemedelsbehandlingar</b>
            <PatientListOfMedicationTable data={dataDaily}/>

            <div style={{padding: "15px"}}></div>
            <b style={{padding: "10px"}}>Vid behov</b>
            <PatientListOfMedicationTable data={dataNeed}/>
        </>
    );
};
export default PatientListOfMedication;