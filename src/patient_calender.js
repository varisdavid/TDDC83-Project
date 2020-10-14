import React, { Component } from 'react';
import Calendar from 'react-calendar';
import ReactDOM from 'react-dom';

//install by exicuting: yarn add react-calendar


class patient_calender extends Component {
    state = {
        date: new Date(),
    }

    onChange = date => this.setState({ date })

    render() {
        return (
            <div>
            <Calendar
        onChange={this.onChange}
        value={this.state.date}
        />
        </div>
    );
    }
}
 ReactDOM.render(patient_calender, document.getElementById('patient_calendar'));