import React from "react";

import { OverviewHeaderBanner } from "../components"
import ActivityLog from "../components/overview/SettingsActivityLog";

const OverviewSettings = () => {

  // Will be fetched by user information later on.
  const healthCenter = 'Ryds vårdcentral';


  return (
    <>
      <div className="w-full h-auto">
        <OverviewHeaderBanner healthCenter={healthCenter} />
        <ActivityLog />
      </div>
    </>

  );
};

export default OverviewSettings;