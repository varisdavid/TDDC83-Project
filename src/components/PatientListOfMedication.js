import React, {useMemo, useEffect} from "react";


import { PatientListOfMedicationTable } from "../components";
// import {useAuth0} from "@auth0/auth0-react";


const PatientListOfMedication = () => {







    //    const { getAccessTokenSilently } = useAuth0();
  // When something happens, we check to see if we change the sorting option, and we check if the search has been triggered
  useEffect(() => {
     // Basic example of how to make a authorized fetch call to our backend endpoints
    const medication_list = async () => {
        const ehrid = "c784e009-c51b-437c-9c8d-a4a87dc18a72"
        const domain =  "http://127.0.0.1:5000/medication_list/";

      try {
        // const token = await getAccessTokenSilently();
          const response = await fetch(domain+ehrid,
            {
              headers: {
           //     Authorization: `Bearer ${token}`,
              },
            }
          );

          const responseData = await response.json();
          console.log(responseData);
        } catch (error) {
          console.log(error.message);
        }
      };
      medication_list();
      console.log(medication_list());
  },[] );
    // [getAccessTokenSilently]



 const data =  useMemo(
        () => [

            {
                Medication: 'Tramadol',
                Amount: '650mg',
                Type: 'tablett',
                Dosage:'2 gånger om dagen',
                Comments: 'Tas vid torr mun',
                Daily: 'True',
            },

            {
                Medication:'Genotropin',
                Amount: '400mg',
                Type: 'tablett',
                Dosage:'2 gånger om dagen',
                Comments: 'Tas i samband med mat',
                Daily: 'True',
            },

            {
                Medication: 'Cytostatika',
                Amount: '1000mg',
                Type: 'pulver',
                Dosage: 'vid behov',
                Comments: 'När du känner dig deprimerad',
                Daily: 'False',
            },
        ],
        []
    )

    //Filter the data to an array that will show the current medication
        function filterDaily(data){
            let newArr = []
            for(let i =0; i< data.length; i++){
                if(data[i]['Daily']  === 'True'){
                    newArr.push(data[i])
                }
            }
            return (newArr)
        }
        const dataDaily = filterDaily (data)

    //Filter the data to an array with when needed medication
    function filterNeed(data){
                let newArr = []
                for(let i =0; i< data.length; i++){
                    if(data[i]['Daily']  === 'False'){
                        newArr.push(data[i])
                    }
                }

                return (newArr)
            }
            const dataNeed = filterNeed (data)


      return (
      <>
            <div style={{padding: "15px"}}></div>
            <b style= {{padding: "10px"}}>Aktuella läkemedelsbehandlingar</b>
            <PatientListOfMedicationTable data = {dataDaily}/>
        
        <div style={{padding: "15px"}}></div>
          <b style= {{padding: "10px"}}>Vid behov</b>
          <PatientListOfMedicationTable data = {dataNeed}/>


      </>
      );
};
export default PatientListOfMedication;