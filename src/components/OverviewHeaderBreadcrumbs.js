import React, { useState, useEffect } from "react";

import { Breadcrumbs, Link } from "@material-ui/core"


const OverviewHeaderBreadcrumbs = ({activeTabValue, healthCenter}) => {
   
    const [tabText, setTabText] = useState(["Home", "Hem"]);

    useEffect(() => { 

        if (activeTabValue === 0) {
            setTabText(["home", "hem"]);
        } else if (activeTabValue === 1) {
            setTabText(["patients", "patienter"]);
        } else if (activeTabValue === 2) {
            setTabText(["notices", "notislogg"]);
        } else if (activeTabValue === 3) {
            setTabText(["calendar", "kalender"]);
        }
    }, [activeTabValue]);

    return (
        <>
            <div className="p-2 h-auto">
                <Breadcrumbs className="self-center" separator=">" aria-label="breadcrumb">
                    <Link className="text-gray-800" href="/overview">
                        { healthCenter}
                    </Link>
                    <Link className="text-gray-800" href={ "/overview/" + tabText[0] } >
                        { tabText[1][0].toUpperCase() + tabText[1].substring(1) }
                    </Link>
                </Breadcrumbs>
            </div>
        </>
    );
};

export default OverviewHeaderBreadcrumbs;