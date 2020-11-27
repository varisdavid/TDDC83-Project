import React, {useMemo} from 'react';
import {BloodPressure, Notification, TableForChart, FormForUpdateValues} from "..";
import {useFlexLayout, useTable} from "react-table";


const BloodPressurePage = () => {
//Sending the personaldata to the notices. This should be used for the ajax call in the futher as well
    const id = "470203-1324";
    //Fake data to the table rendering below
    const data = useMemo(
        () => [

            {
                notices: <Notification value={3} text={'test'} id={id} date={""}
                                       bloodPressure={""} updatedBy={""}/>,
                Date: '2020-05-18',
                BloodPressure: '135/80',
                UpdatedBy: 'Patient',
            },
            {
                notices: "",
                Date: '2020-06-13',
                BloodPressure: '135/80',
                UpdatedBy: 'Patient',
            },
            {
                notices: "",
                Date: '2020-07-25',
                BloodPressure: '135/80',
                UpdatedBy: 'Vårdpersonal',
            },
            {
                notices: "",
                Date: '2020-09-01',
                BloodPressure: '135/80',
                UpdatedBy: 'Vårdoersonal',
            },
            {
                notices: "",
                Date: '2020-09-10',
                BloodPressure: '135/80',
                UpdatedBy: 'Patient',
            },
            {
                notices: "",
                Date: '2020-10-02',
                BloodPressure: '135/80',
                UpdatedBy: 'Vårdpersonal',
            },
            {
                notices: "",
                Date: '2020-10-10',
                BloodPressure: '135/80',
                UpdatedBy: 'Patient',
            },
        ],
        []
    );

    //Adds the Notification to the data array so that the pop-up modals can retrive the correct data
    function addNotification(data) {
        let newArr = [];

        for (let i = 0; i < data.length; i++) {
            newArr.push({
                notices: <Notification value={3} text={'test'} id={id} date={data[i]['Date']}
                                       bloodPressure={data[i]['BloodPressure']} updatedBy={data[i]['UpdatedBy']}/>,
                Date: data[i]['Date'],
                BloodPressure: data[i]['BloodPressure'],
                UpdatedBy: data[i]['UpdatedBy']})
        }
        return (newArr)
    }

    const addNotice = addNotification(data);

    //Setting the table heads in the table as well as which data goes where
    const columns = useMemo(
        () => [
            {
                Header: '',
                accessor: 'notices',
            },

            {
                Header: 'Datum',
                accessor: 'Date',
            },
            {
                Header: 'Blodtryck',
                accessor: 'BloodPressure',
            },
            {
                Header: 'Uppdaterades Av',
                accessor: 'UpdatedBy',
            },
        ],
        []
    );

const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
} = useTable({columns, data},
    useFlexLayout,
);


return (
    <>
        {/* Setting up the big div on the page */}
        <div className='flex justify-center' style={{height: '55vh'}}>
            {/* div to dived the page in two parts*/}
            <div style={{width: '50%'}}>
                {/* This is the bloodpressure chart being displayed */}
                <div style={{height: '85%'}}>
                    <BloodPressure/>
                </div>
            </div>


            <div style={{width: '30%'}}>
                {/* This is the bloodpressure table being displayed */}
                <div>
                    <TableForChart
                        getTableProps={getTableProps}
                        getTableBodyProps={getTableBodyProps}
                        headerGroups={headerGroups}
                        rows={rows}
                        prepareRow={prepareRow}
                    />
                </div>

                {/* The form which you can fill in information about your weight does not save the data any where.
                     Contains two text fields and a button*/}
                <div style={{width: '90%', float: 'right'}}>
                    <FormForUpdateValues/>
                </div>
            </div>
        </div>
    </>
);

}


export default BloodPressurePage;