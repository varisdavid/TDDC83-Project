import React, {useMemo} from "react";


import { PatientListOfMedicationTable } from "../components";


const PatientListOfMedication = () => {

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