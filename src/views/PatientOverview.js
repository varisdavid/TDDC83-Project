import React, { Fragment } from "react";

import { Breadcrumbs, Link, AppBar, Typography } from "@material-ui/core"


// Current thinking is that all views described in the 
// prototype should have this as a baseplate, were either the children 
// of "home" or "patients" etc is rendered within

const PatientOverview = () => {
  return (
  <Fragment>
    <Breadcrumbs separator=">" aria-label="breadcrumb">
      <Link color="inherit" href="/overview">
        X_Vårdcentral
      </Link>
      <Link color="inherit" href="/overview/home">
        Hem
      </Link>
    </Breadcrumbs>


    <AppBar className="mt-10 h-20">
      <Typography variant="h6" color="grey">
        X_Vårdcentral
      </Typography>
      <Typography variant="h6" color="grey">
        Help Icon
      </Typography>
      <Typography variant="h6" color="grey">
        Settings Icon
      </Typography>
      <Typography variant="h6" color="grey">
        Logout Icon
      </Typography>
    </AppBar>

    {/* This should be followed by another "navbar which contains the different areas, "home", "patients", "calendar" etc ..*/}

  </Fragment>


  );
};

export default PatientOverview;