import React, { Fragment } from "react";

import { Breadcrumbs, Link, AppBar, Typography } from "@material-ui/core"


// Current thinking is that all views described in the 
// prototype should have this as a baseplate, were either the children 
// of "home" or "patients" etc is rendered within

const PatientOverview = () => {
  return (
  <Fragment>
    <div className="mt-2 ml-1 h-4">
      <Breadcrumbs eparator=">" aria-label="breadcrumb">
        <Link color="inherit" href="/overview">
          X_Vårdcentral
        </Link>
        <Link color="inherit" href="/overview/home">
          Hem
        </Link>
      </Breadcrumbs>
    </div>


    <div></div>

    {/* This should be followed by another "navbar which contains the different areas, "home", "patients", "calendar" etc ..*/}

  </Fragment>


  );
};

export default PatientOverview;