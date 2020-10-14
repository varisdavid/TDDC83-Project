import React, { Fragment } from "react";

import { NavBarPatient, Footer, PatientCalendar, PatientHeader } from "../components";


const PatientView = () => (
  <Fragment>
  <PatientHeader />
  <NavBarPatient />
    <div className="container flex-grow-1">
      <PatientCalendar/>
    </div>
  <Footer />
</Fragment>
);

export default PatientView;