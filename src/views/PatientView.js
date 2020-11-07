import React, { Fragment } from "react";

import { NavBarPatient, Footer, PatientCalendar, PatientHeader, OverviewCalendar } from "../components";


const PatientView = () => (
  <Fragment>
  <PatientHeader />
  <NavBarPatient />
    <div className="container flex-grow-1">
      <OverviewCalendar/>
    </div>
  <Footer />
</Fragment>
);

export default PatientView;