import React, {useMemo} from "react";


import { PatientListOfMedicationTableDaily, PatientListOfMedicationTableNeed } from "../components";


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

      return (
      <>
            <div style={{padding: "15px"}}></div>
            <b style= {{padding: "10px"}}>Aktuella läkemedelsbehandlingar</b>
            <PatientListOfMedicationTableDaily data = {data}/>
        
        <div style={{padding: "15px"}}></div>
          <b style= {{padding: "10px"}}>Vid behov</b>
          <PatientListOfMedicationTableNeed/>


      </>
      );
};
export default PatientListOfMedication;