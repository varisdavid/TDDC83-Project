
import React from "react";
import {useMemo} from "react";

const RuleEngine = () => {

    const data = useMemo(
        () => [

            {
                Address: "\u00c5rstav\u00e4gsgatan 28, 792 45 Boden",
                Age: "42",
                City: "Boden",
                Contactperson: "{\"name\": \"P\\u00e5linho Domherresson\", \"phone\": \"0787795814\"}",
                Department: "Kirurgi",
                Diagnosises: [{"Diagnosis": "Alzheimers"}],
                EhrID: "c784e009-c51b-437c-9c8d-a4a87dc18a72",
                Email: "lenainho.skalmansson@fejka.nu",
                Gender: "woman",
                Measurement: [{
                    Bloodsugar: "4.4",
                    Diastolic: "121.0",
                    Exercise: "1.0",
                    Pulse: "58.0",
                    Systolic: "132.0",
                    Time: "2020-11-20",
                    Weight: "49.0"
                }, {
                    Bloodsugar: "4.4",
                    Diastolic: "121.0",
                    Exercise: "1.0",
                    Pulse: "58.0",
                    Systolic: "132.0",
                    Time: "2020-11-20",
                    Weight: "49.0"
                }],
                Name: "Lenainho Skalmansson",
                Operation: "Ryds V\u00e5rdcentral",
                PNR: "19780629-9252",
                Phone: "0787017494",
                Team: "[\"hej\", \"H\"]"
            },
            {
                "Address": "\u00c5rstav\u00e4gsgatan 2, 351 09 Vara",
                Age: "41",
                City: "Vara",
                Contactperson: "{\"name\": \"Thomasinho Bofinksson\", \"phone\": \"0751468413\"}",
                Department: "Kardiologi",
                Diagnosises: [
                    {Diagnosis: "Cancer"},
                    {Diagnosis: "ALS"}],

                EhrID: "e874d490-289f-41c3-ac6d-a27ffd7952d7",
                Email: "sarainho.bamsesson@fejka.nu",
                Gender: "woman",
                Measurement: [{
                    Bloodsugar: "3.0",
                    Diastolic: "124.0",
                    Exercise: "1.0",
                    Pulse: "101.0",
                    Systolic: "160.0",
                    Time: "2020-11-20",
                    Weight: "67.0"
                }, {
                    Bloodsugar: "4.4",
                    Diastolic: "121.0",
                    Exercise: "1.0",
                    Pulse: "58.0",
                    Systolic: "132.0",
                    Time: "2020-11-20",
                    Weight: "49.0"
                }],
                Name: "Sarainho Bamsesson",
                Operation: "Valla V\u00e5rdcentral",
                PNR: "19791212-9280",
                Phone: "0779609832",
                Team: "[\"hej\", \"E\"]"
            },
            {
                Address: "Odengatanv\u00e4gen 30, 658 04 Lund",
                Age: "79",
                City: "Lund",
                Contactperson: "{\"name\": \"Bengtinho Hermelinsson\", \"phone\": \"0759482696\"}",
                Department: "Onkologi",
                Diagnosises: [{
                    Diagnosis: "Cancer"
                }],
                EhrID: "03400103-a2e3-4ef1-acab-25fc6cb19221",
                Email: "hannainho.mullvadsson@fejka.nu",
                Gender: "woman",
                Measurement: [{
                    Bloodsugar: "2.5179487179487183",
                    Diastolic: "138.0",
                    Exercise: "3.0",
                    ulse: "93.0",
                    Systolic: "126.0",
                    Time: "2020-11-20",
                    Weight: "124.0"
                }, {
                    Bloodsugar: "4.4",
                    Diastolic: "121.0",
                    Exercise: "1.0",
                    Pulse: "58.0",
                    Systolic: "132.0",
                    Time: "2020-11-20",
                    Weight: "49.0"
                }]
            },
        ],
        []
    )

    function pushPriority(data) {

        for (let i = 0; i < data.length; i++) {
            data[i].push({
                Priority: "123"
            })
        }
    }



function addPriority(data) {

        console.log(data);
        let measurements = [];

        for (let i = 0; i < data.length; i++) {



            measurements = (data[i]['Measurement']);
            let priority = setPriority(measurements);
            pushPriority(data);

            // console.log(priority);
            // call function doing priority
            // Priority(Measurement[i];
            //
            // Add priority to data, demographics
        }
        console.log(data);
     //   return dataWithPriority;
    }

    console.log(addPriority(data));


        const rules = useMemo(
            () => [

                {
                    BBloodsugar: "3",
                    BDiastolic: "140",
                    BExercise: "2.0",
                    BPulse: "93.0",
                    BSystolic: "126.0",
                    BWeight: "100.0",
                    GBloodsugar: "2",
                    GDiastolic: "120",
                    GExercise: "4.0",
                    GPulse: "100",
                    GSystolic: "100",
                    GWeight: "80"
                },
            ],
            []
        )

    function setPriority(measurements) {

       // for (let i = 0; i = measurements.length(); i++) {
            for (let i = 0; 2; i++) {
                let priorityScore;
                // measurements.
                if (measurements[i]['Bloodsugar'] < rules.BBloodsugar) {
                    priorityScore +=1;
                } else if (measurements[i]['Bloodsugar'] < rules.GBloodsugar) {
                    priorityScore +=2;
                } else {
                    priorityScore +=3;
                }

            }
        }
        // let rules = getRules();
        // get rules from database

};

export default RuleEngine;

