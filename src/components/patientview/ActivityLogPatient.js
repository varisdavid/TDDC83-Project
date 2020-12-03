import React, {useMemo} from 'react';
import { ActivityLogPatientSearchBar, ActivityLogPatientEntries } from '..';

//Not logicaly working, more of a visual structure
const ActivityLogPatient = () => {

    //Mock data 
    const entries = useMemo(
        () => [
          { date: '2020-11-02', time: '12:33', text: 'Per Andersson godkände oväntat mätvärde:vikt för Gunilla Johansson'},
          { date: '2020-11-02', time: '12:54', text: 'Per Andersson besökte patienten Gunilla Johansson'},
          { date: '2020-11-01', time: '12:33', text: 'Karl Karlsson godkände oväntat mätvärde:blodtryck för Gunilla Johansson'},
          { date: '2020-11-01', time: '12:33', text: 'Per Andersson godkände oväntat mätvärde:vikt för Gunilla Johansson'},
          { date: '2020-10-30', time: '12:54', text: 'Per Andersson besökte patienten Gunilla Johansson'},
          { date: '2020-10-30', time: '12:33', text: 'Karl Karlsson godkände oväntat mätvärde:blodtryck för Gunilla Johansson'},
          { date: '2020-10-01', time: '12:33', text: 'Per Andersson godkände oväntat mätvärde:vikt för Gunilla Johansson'},
          { date: '2020-09-30', time: '12:54', text: 'Per Andersson besökte patienten Gunilla Johansson'},
          { date: '2020-09-30', time: '12:33', text: 'Karl Karlsson godkände oväntat mätvärde:blodtryck för Gunilla Johansson'},
        ],
        []
      )

    return (
        <div id='tab-scroll' style={{
            border: '2px solid #A9D7FF',
            boxShadow: "5px 7px 20px lightgrey",
            borderRadius: '25px',
            fontSize: '15px',
            fontWeight: 'bold',
            height: '75vh'
        }}>
            <div style={{
                marginLeft: '20%',
                marginTop: '15px',
                marginBottom: '15px',
                fontSize: '15px',
                fontWeight: 'bold',
            }} >
                Aktivitetslogg
            </div>

            <div className="flex mt-2 p-2"
                style={{
                    borderRadius: '25px',
                    background: '#A9D7FF',
                    padding: '20px',
                    marginLeft: '5%',
                    marginRight: '5%',
                    marginBottom: '20px',
                }}>
                <ActivityLogPatientSearchBar/>
            </div>

            <div style={{marginLeft: '5%',
                    marginRight: '5%',}}>
                <ActivityLogPatientEntries 
                entries={entries}/>
            </div>
        </div>
    );
};
export default ActivityLogPatient;