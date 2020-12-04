import React from 'react';

const ActivityLogPatientEntries = ({ entries }) => {

    return (
        <div>
            {/*Renders the different log entries*/}
            { entries.map((entries, index) => (
                <div key={entries.date} style={{
                    background: '#A9D7FF',
                    padding: '20px',
                    marginBottom: '20px',
                    fontWeight: 'normal',
                }} >
                    {entries.date}, {entries.time} {entries.text}
                </div>
            ))
            }
        </div>
    );
};
export default ActivityLogPatientEntries;