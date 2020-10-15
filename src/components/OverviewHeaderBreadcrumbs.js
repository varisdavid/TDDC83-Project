import React, { useState, useEffect } from "react";

import { Breadcrumbs, Link } from "@material-ui/core"


const OverviewHeaderBreadcrumbs = ({activeTabValue}) => {
   
    const [tabText, setTabText] = useState("Home");

    useEffect(() => { 

        if (activeTabValue === 0) {
            setTabText("home")
        } else if (activeTabValue === 1) {
            setTabText("patients")
        } else if (activeTabValue === 2) {
            setTabText("calendar")
        } else if (activeTabValue === 3) {
            setTabText("notices")
        } else if (activeTabValue === 4) {
            setTabText("search")
        }
    }, [activeTabValue]);

    return (
        <>
            <div className="p-2 h-auto">
                <Breadcrumbs className="self-center" separator=">" aria-label="breadcrumb">
                    <Link className="text-gray-800" href="/overview">
                        Overview
                    </Link>
                    <Link className="text-gray-800" href={ "/overview/" + tabText } >
                        { tabText[0].toUpperCase() + tabText.substring(1) }
                    </Link>
                </Breadcrumbs>
            </div>
        </>
    );
};

export default OverviewHeaderBreadcrumbs;