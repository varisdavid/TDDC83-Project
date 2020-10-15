import React from "react";

import { OverviewHeaderBanner, OverviewHeaderNavigation } from "../components";

const OverviewHeader = ({healthCenter, activeTabValue, setActiveTabValue}) => {

    return (
    <>
        <div className="w-full h-auto shadow">
            <OverviewHeaderBanner healthCenter={healthCenter} />  
            <OverviewHeaderNavigation activeTabValue={activeTabValue} setActiveTabValue={setActiveTabValue} />
        </div>
    </>
    );
};

export default OverviewHeader;