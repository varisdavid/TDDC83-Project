import React from "react";

import { Divider } from "@material-ui/core"

import { OverviewHeaderBanner, OverviewHeaderBreadcrumbs, OverviewHeaderNavigation } from "../components";

const OverviewHeader = ({healthCenter, activeTabValue, setActiveTabValue}) => {

    return (
    <>
        <div className="w-full h-auto shadow">
            <OverviewHeaderBreadcrumbs activeTabValue={activeTabValue} />
            <Divider orientation="middle" />
            <OverviewHeaderBanner healthCenter={healthCenter} />  
            <Divider orientation="middle" />              
            <OverviewHeaderNavigation activeTabValue={activeTabValue} setActiveTabValue={setActiveTabValue} />
        </div>
    </>
    );
};

export default OverviewHeader;