import React from "react";

import { OverviewHeaderBanner } from "../components"

// Current thinking is that all views described in the 
// prototype should have this as a baseplate, were either the children 
// of "home" or "patients" etc is rendered within

const OverviewSettings = () => {

  // will change later on
  const healthCenter = "X_Vårdcentral";

  return (
  <>
    <div className="w-full h-auto">
      <OverviewHeaderBanner healthCenter={healthCenter} />  
    </div>  
  </>

  );
};

export default OverviewSettings;