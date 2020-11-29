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
                        BloodSugar: "4.4",
                        Diastolic: "121.0",
                        Exercise: "1.0",
                        Pulse: "58.0",
                        Systolic: "132.0",
                        Time: "2020-11-20",
                        Weight: "49.0"
                    }, {
                        BloodSugar: "4.4",
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
                    Address: "\u00c5rstav\u00e4gsgatan 2, 351 09 Vara",
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
                        BloodSugar: "3.0",
                        Diastolic: "124.0",
                        Exercise: "1.0",
                        Pulse: "101.0",
                        Systolic: "160.0",
                        Time: "2020-11-20",
                        Weight: "67.0"
                    }, {
                        BloodSugar: "4.4",
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
                        BloodSugar: "3.5",
                        Diastolic: "90",
                        Exercise: "5",
                        Pulse: "55",
                        Systolic: "95",
                        Time: "2020-11-20",
                        Weight: "75"
                    }, {
                        BloodSugar: "3.5",
                        Diastolic: "90",
                        Exercise: "5",
                        Pulse: "55",
                        Systolic: "95",
                        Time: "2020-11-20",
                        Weight: "75"
                    }]
                },
            ],
            []
        )

        const rules = useMemo(
            () => [

                {
                    BadLowBloodSugar: "2",
                    BadLowDiastolic: "40",
                    BadLowExercise: "2",
                    BadLowPulse: "40",
                    BadLowSystolic: "80",
                    BadLowWeight: "40",
                    GoodLowBloodSugar: "3",
                    GoodLowDiastolic: "60",
                    GoodLowExercise: "3",
                    GoodLowPulse: "50",
                    GoodLowSystolic: "100.0",
                    GoodLowWeight: "70.0",
                    GoodHighBloodSugar: "4",
                    GoodHighDiastolic: "90",
                    GoodHighExercise: "4",
                    GoodHighPulse: "60",
                    GoodHighSystolic: "120.0",
                    GoodHighWeight: "90.0",
                    BadHighBloodSugar: "5",
                    BadHighDiastolic: "120",
                    BadHighExercise: "5",
                    BadHighPulse: "80",
                    BadHighSystolic: "140",
                    BadHighWeight: "120"
                },
            ],
            []
        )

        console.log(addPriority(data))

        function addPriority(data) {

            console.log("addpriority");
            console.log("Oändrade data?" + data);

            let measurements = [];

            for (let i = 0; i < data.length; i++) {

                measurements = (data[i]['Measurement']);
                let priorityFactor = setPriority(measurements, rules);
                console.log("prioirtyfActor" + priorityFactor);
                data[i].priority = priorityFactor;

            }
            console.log("altered")
            console.log(data);
        }


        function setPriority(measurements, rules) {

            // let rules = getRules();
            // get rules from database
            let totalPriorityScore, priorityScoreBS, priorityScoreP, priorityScoreSys, priorityScoreDia, priorityScoreW;

            totalPriorityScore = priorityScoreBS = priorityScoreP = priorityScoreSys = priorityScoreDia = priorityScoreW = 0;

            for (let i = 0; i < measurements.length; i++) {
                // measurements.

                console.log("Patientvärde" + measurements[i].BloodSugar);
                console.log("Gränsvärde" + rules[0].BadLowBloodSugar);



                //Bloodsugar
                if (measurements[i].BloodSugar <= rules[0].BadLowBloodSugar) {
                    console.log("Blodsocker1");
                    priorityScoreBS += 3;
                } else if (rules[0].BadLowBloodSugar <= measurements[i].BloodSugar <= rules[0].GoodLowBloodSugar) {
                    console.log("Blodsocker2");
                    priorityScoreBS += 2;
                } else if (rules[0].GoodLowBloodSugar <= measurements[i].BloodSugar <= rules[0].GoodHighBloodSugar) {
                    console.log("Blodsocker3");
                    priorityScoreBS += 1;
                } else if (rules[0].GoodHighBloodSugar <= measurements[i].BloodSugar <= rules[0].BadHighBloodSugar) {
                    console.log("Blodsocker4");
                    priorityScoreBS += 2;
                } else {
                    console.log("Blodsockerr5");
                    priorityScoreBS += 3;
                }


                // Pulse
                if (measurements[i].Pulse <= rules[0].BadLowPulse) {

                    priorityScoreP += 3;
                } else if (rules[0].BadLowPulse <= measurements[i].Pulse <= rules[0].GoodLowPulse) {

                    priorityScoreP += 2;
                } else if (rules[0].GoodLowPulse <= measurements[i].Pulse <= rules[0].GoodHighPulse) {

                    priorityScoreP += 1;
                } else if (rules[0].GoodHighPulse <= measurements[i].Pulse <= rules[0].BadHighPulse) {

                    priorityScoreP += 2;
                } else {

                    priorityScoreP += 3;
                }

                // Systolic
                if (measurements[i].Systolic <= rules[0].BadLowSystolic) {

                    priorityScoreSys += 3;
                } else if (rules[0].BadLowSystolic <= measurements[i].Systolic <= rules[0].GoodLowSystolic) {

                    priorityScoreSys += 2;
                } else if (rules[0].GoodLowSystolic <= measurements[i].Systolic <= rules[0].GoodHighSystolic) {

                    priorityScoreSys += 1;
                } else if (rules[0].GoodHighSystolic <= measurements[i].Systolic <= rules[0].BadHighSystolic) {

                    priorityScoreSys += 2;
                } else {

                    priorityScoreSys += 3;
                }


                //Disastolic
                if (measurements[i].Diastolic <= rules[0].BadLowDiastolic) {

                    priorityScoreDia += 3;
                } else if (rules[0].BadLowDiastolic <= measurements[i].Diastolic <= rules[0].GoodLowDiastolic) {

                    priorityScoreDia += 2;
                } else if (rules[0].GoodLowDiastolic <= measurements[i].Diastolic <= rules[0].GoodHighDiastolic) {

                    priorityScoreDia += 1;
                } else if (rules[0].GoodHighDiastolic <= measurements[i].Diastolic <= rules[0].BadHighDiastolic) {

                    priorityScoreDia += 2;
                } else {

                    priorityScoreDia += 3;
                }

                // Weight
                if (measurements[i].Weight <= rules[0].BadLowWeight) {

                    priorityScoreW += 3;
                } else if (rules[0].BadLowWeight <= measurements[i].Weight <= rules[0].GoodLowWeight) {

                    priorityScoreW += 2;
                } else if (rules[0].GoodLowWeight <= measurements[i].Weight <= rules[0].GoodHighWeight) {

                    priorityScoreW += 1;
                } else if (rules[0].GoodHighWeight <= measurements[i].Weight <= rules[0].BadHighWeight) {

                    priorityScoreW += 2;
                } else {

                    priorityScoreW += 3;
                }
            }

            console.log("Viktvärde" + priorityScoreW);
            console.log("puls" + priorityScoreP);
            console.log("syst" + priorityScoreSys);
            console.log("dia" + priorityScoreDia);
            console.log("bloodsock" + priorityScoreBS);

            totalPriorityScore = ((priorityScoreBS + priorityScoreP + priorityScoreSys + priorityScoreDia + priorityScoreW) / (5*measurements.length));
            console.log("oavrundat, prio" + totalPriorityScore);
            console.log("Prioritetsscore för varje patient:" + Math.round(totalPriorityScore));
            return Math.round(totalPriorityScore);
        }


    }
;

export function test() {

    console.log("test");
}


export default RuleEngine;
