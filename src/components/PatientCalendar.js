import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const PatientCalendar = () => {

    const [value, onChange] = useState(new Date());

    return (
        <div>
            <Calendar
               onChange={onChange}
               value={value}
               //onClickDay = {onChange}
            />
        </div>
    );
};

export default PatientCalendar;