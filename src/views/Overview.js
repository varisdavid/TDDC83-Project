import React from "react";

import { OverviewHeader } from "../components"

// Current thinking is that all views described in the 
// prototype should have this as a baseplate, were either the children 
// of "home" or "patients" etc is rendered within

const Overview = () => {

  return (
  <>
    <OverviewHeader />
  </>

  );
};

export default Overview;