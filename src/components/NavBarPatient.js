import React from "react";

import PatientNav from "./PatientNav";
import AuthNav from "./AuthNav";

const NavBarPatient = () => {
  return (

    <div className="nav-container mb-3">
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <div className="container">
          <div className="navbar-brand logo" />
          <PatientNav />
          <AuthNav />
        </div>
      </nav>
    </div>
  );
};

export default NavBarPatient;