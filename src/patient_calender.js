import React, { Component } from 'react';
import Calendar from 'react-calendar';

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