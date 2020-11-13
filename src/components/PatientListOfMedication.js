import React from "react";


import { PatientListOfMedicationTableDaily, PatientListOfMedicationTableNeed } from "../components";


const PatientListOfMedication = () => {


      return (
      <>
            <div style={{padding: "15px"}}></div>
            <b style= {{padding: "10px"}}>Aktuella läkemedelsbehandlingar</b>
            <PatientListOfMedicationTableDaily/>
        
        <div style={{padding: "15px"}}></div>
          <b style= {{padding: "10px"}}>Vid behov</b>
          <PatientListOfMedicationTableNeed/>


      </>
      );
};
export default PatientListOfMedication;