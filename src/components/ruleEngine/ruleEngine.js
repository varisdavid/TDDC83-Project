// Tänker mig en Get(patient_ID), villket returnerar en lista över alla parametrar över den specifika parametern


// FrontendLogic sort or filter calls for a specific patient prioritization, this functions will
// divide each separate datapoint to a certain subfunction to extract a nominal value for the
// patients specific health measurement. Prio 3 = Bad, Prio 1 = Okey

// Add more functionality to the rule-engine,
// configuration options,
// curvature,
// Std. deviation, Måste läggas in, dubbel lopp....

/*import {
    patientPrioritizationScore
} from '../ruleEngine/ruleEngine'

console.log(patientPrioritizationScore(123));

 */

export function patientPrioritizationScore(Patient_ID) {

    // get....

    const indexValue = (heartRate(Patient_ID)
        + systolicPreasure(Patient_ID)
        + diastolicPreasure(Patient_ID));
    // + oxygenation(Patient_ID)
    // + pulseScore(Patient_ID)
    // + physicalActivity(Patient_ID)
    // + weight(Patient_ID));
    // + age(Patient_ID)??

    console.log(heartRate(Patient_ID));
    console.log(systolicPreasure(Patient_ID));
    console.log(diastolicPreasure(Patient_ID));

    console.log(indexValue);

    if (indexValue < 5) {
        return 1
    } else if (indexValue < 10) {
        return 2
    } else {
        return 3
    }

}

// heartRate does a computation for the value the heartrate value should give the patient regarding its health
function heartRate() {


    // getHeartRate(Patient_ID);
    //let noValues = heartRates.length();

    // Handle empty data sets?
  //  if (noValues === 0) {
        //     return 400
   // }

    const sum = [100];

    if (sum > 50) {
        return 1;
    } else if (sum > 70) {
        return 2;
    } else {
        return 3;
    }
}

function systolicPreasure() {


    //getsystolicPreasure(Patient_ID);

//     let noValues = systolicPreasures.length();

    // Handle empty data sets?
  //  if (noValues === 0) {
  //      return 400
  //  }


       const sum = [100]


    if (sum < 120) {
        return 1;
    } else if (sum < 150) {
        return 2;
    } else {
        return 3;
    }
}

function diastolicPreasure() {

    //getdiastolicPreasure(Patient_ID);
 //   let noValues = diastolicPreasures.length();

    // Handle empty data sets?
//    if (noValues === 0) {
 //       return 400
  //  }

    const sum = [70];

    if (sum < 80) {
        return 1;
    } else if (sum < 100) {
        return 2;
    } else {
        return 3;
    }
}

